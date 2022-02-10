const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/User');

const createUser = async (request, response) => {
  const { email, password } = request.body;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({
      where: {email},
    });

    if (user) {
      if (user.email === email)
        return response
          .status(400)
          .json({ message: 'The email is already in use' });
    }

    user = await User.create({
      email,
      password,
    });

    // Generar JWT
    const token = await generateJWT({
      id: user.id,
      email: user.email,
    });

    return response.status(201).json({
      id: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

module.exports = {
  createUser,
};
