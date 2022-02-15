const { v4: uuidv4 } = require('uuid');
const { googleVerify } = require('../services/googleAuth');
const User = require('../models/User');

const { generateJWT } = require('../helpers/generateJWT');

const authGoogle = async (request, response) => {
  const { tokenId } = request.body;

  try {
    const { email} = await googleVerify(tokenId);

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      // Tengo que creear el usuario
      const newUser = await User.create({
        email,
        password: uuidv4(),
        registerMethod: 'google',
      });

      // Generar JWT
      const token = await generateJWT({
        id: newUser.id,
        email: newUser.email
      });

      return response.status(201).json({
        id: newUser.id,
        email: newUser.email,
        token,
      });
    }

    // Generar JWT
    const token = await generateJWT({
      id: user.id,
      email: user.email
    });

    return response.json({
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = { authGoogle };
