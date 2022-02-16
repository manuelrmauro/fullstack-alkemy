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
			where: { email },
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

const getUser = async (req, res) => {
	try {
		const { userId } = req;
		console.log(userId);
		const user = await User.findByPk(userId, {
			attributes: {
				exclude: ['password', 'registerMethod', 'createdAt', 'updatedAt'],
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

const validate = async (req, res) => {
  try {
    const { id, usercode } = req.params;
    const user = await User.findOne({
      where: { [Op.and]: [{ id }, { mailCode: usercode }] },
    });
    if (!user.validated) {
      await user.update({ validated: true });
      await user.update({ mailCode: null });
    } else {
      return res.status(201).json({ message: 'Your account is already validated' });
    }
    return res.status(200).json({ message: 'Your account was validated' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
	createUser,
	getUser,
	validate
};
