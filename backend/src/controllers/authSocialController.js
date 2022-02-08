const { v4: uuidv4 } = require('uuid');
const { googleVerify } = require('../services/googleAuth');
const User = require('../models/User');

const { generateJWT } = require('../helpers/generateJWT');

const authGoogle = async (request, response) => {
  const { tokenId } = request.body;

  try {
    const { name, email, picture } = await googleVerify(tokenId);

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      // Tengo que creear el usuario

      const newUser = await User.create({
        name,
        email,
        socialPhoto: picture,
        password: uuidv4(),
        registerMethod: 'google',
      });

      await newUser.setRole(1);

      // Generar JWT
      const token = await generateJWT({
        id: newUser.id,
        name: newUser.name,
        roleId: newUser.role_id,
      });

      return response.status(201).json({
        id: newUser.id,
        name: newUser.name,
        photo: newUser.photo,
        socialPhoto: newUser.socialPhoto,
        roleId: newUser.role_id,
        token,
      });
    }

    // Si el usuario en DB
    if (!user.status) {
      return response.status(401).json({
        message: 'Hable con el administrador, usuario bloqueado',
      });
    }

    // Generar JWT
    const token = await generateJWT({
      id: user.id,
      name: user.name,
      roleId: user.role_id,
    });

    return response.json({
      id: user.id,
      name: user.name,
      photo: user.photo,
      socialPhoto: picture,
      roleId: user.role_id,
      token,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Por favor hable con el administrador',
    });
  }
};

module.exports = { authGoogle };
