const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const { comparePassword } = require('../helpers/passwordHash');
const { generateJWT } = require('../helpers/generateJWT');

const userLogin = async (request, response) => {
  const { email, password } = request.body;

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      where: { [Op.and]: [{ email }, { status: true }] },
    });

    if (!user) {
      return response.status(400).json({
        message: 'Verifique sus credenciales',
      });
    }

    if (user.deleted) {
      return response.status(400).json({
        message: 'El usuario fue borrado',
      });
    }
    if (!user.validated) {
      return response.status(401).json({
        message: 'El usuario aun no fue validado',
      });
    }

    // Confirmar los passwords
    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return response.status(400).json({
        message: 'Verifique sus credenciales',
      });
    }
    // Generar JWT
    const token = await generateJWT({
      id: user.id,
      name: user.name,
      roleId: user.role_id,
    });

    if (!user.firstLogin) {
      user.update({ firstLogin: true });
      return response.status(201).json({
        id: user.id,
        name: user.name,
        photo: user.photo,
        socialPhoto: user.socialPhoto,
        roleId: user.role_id,
        token,
        isFirstLogin : true
      });
    }
    return response.status(200).json({
      id: user.id,
      name: user.name,
      photo: user.photo,
      socialPhoto: user.socialPhoto,
      roleId: user.role_id,
      token,
      isFirstLogin : false
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Por favor hable con el administrador',
    });
  }
};

const renewToken = async (request, response) => {
  const { userId, userName, userRoleId } = request;
  // Generar JWT
  const token = await generateJWT({
    id: userId,
    name: userName,
    roleId: userRoleId,
  });

  return response.json({
    id: userId,
    name: userName,
    roleId: userRoleId,
    token,
  });
};

module.exports = { userLogin, renewToken };
