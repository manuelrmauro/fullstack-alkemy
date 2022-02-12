const { Op } = require('sequelize');
const Category = require('../models/Category');

const order = ['id', 'desc'];

const getCategories = async (req, res) => {
	try {
		const { type } = req.query;
		const { userId } = req;
		const or = [{ user_id: userId }, { allowDelete: false }];
		let categories;
		if (type === 'income') {
			categories = await Caterogy.findAll({
				order,
				where: { [Op.and]: [{ type: 'Income' }, { [Op.or]: or }] },
			});
		} else if (type === 'expense') {
			categories = await Category.findAll({
				order,
				where: { [Op.and]: [{ type: 'Expense' }, { [Op.or]: or }] },
			});
		} else {
			categories = await Category.findAll({ order, where: { [Op.or]: or } });
		}
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
const addCategory = async (req, res) => {
	try {
		const { userId } = req;
		const { name, type } = req.body;
		let category = await Category.findOne({
			where: {
				[Op.or]: [
					{ [Op.and]: [{ user_id: userId }, { name }, { type }] },
					{ [Op.and]: [{ name }, { allowDelete: false }] },
				],
			},
		});
		if (category) {
			return res.status(400).json({ message: 'This category already exists' });
		}
		category = await Category.create({ name, type, allowDelete: true });
		await category.setUser(userId);
		res.status(200).json(category);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};
const deleteCategory = async (req, res) => {
	try {
		const { userId } = req;
		const { id } = req.params;
		const category = await Category.findOne({
			where: {
				[Op.and]: [{ user_id: userId }, { id }],
			},
		});
		if (!category) {
			return res.status(400).json({ message: 'Category not found' });
		}
		category.destroy();
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	getCategories,
	addCategory,
	deleteCategory,
};
