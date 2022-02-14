const { Op } = require('sequelize');
const Category = require('../models/Category');
const Operation = require('../models/Operation');

const order = [['id', 'desc']];

const getOperations = async (req, res) => {
	try {
		const { userId } = req;
		const { type, category } = req.query;
		const whereOpAnd = [{ user_id: userId }];
		let operations;
		if (category && category !== 'all') whereOpAnd.push({ category_id: category });
		if (type === 'income') {
			whereOpAnd.push({ type: 'Income' });
			operations = await Operation.findAll({
				order,
				include: { model: Category, as: 'category' },
				where: { [Op.and]: whereOpAnd },
			});
		} else if (type === 'expense') {
			whereOpAnd.push({ type: 'Expense' });
			operations = await Operation.findAll({
				order,
				include: { model: Category, as: 'category' },
				where: { [Op.and]: whereOpAnd },
			});
		} else {
			operations = await Operation.findAll({
				order,
				include: { model: Category, as: 'category' },
				where: { user_id: userId },
			});
		}
		res.status(200).json(operations);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const getOperationById = async(req, res) => {
	try {
		const { userId } = req;
		const {id} =  req.params
		const operation = await Operation.findByPk(id, {include: { model: Category, as: 'category' }})
		if (!operation) return res.status(404).json({message: 'Operation not found'})
		if (operation.user_id !== userId) return res.status(404).json({message: 'Operation not found'})
		return res.status(200).json(operation)
	} catch (error) {
		return res.status(500).json({message: 'Internal server error'})
	}
}

const getResume = async (req, res) => {
	try {
		const { userId } = req;
		const incomes = await Operation.findAll({
			include: { model: Category, as: 'category' },
			where: { [Op.and]: [{ type: 'Income' }, { user_id: userId }] },
		});
		const expenses = await Operation.findAll({
			include: { model: Category, as: 'category' },
			where: { [Op.and]: [{ type: 'Expense' }, { user_id: userId }] },
		});
		const operations = await Operation.findAll({
			order,
			include: { model: Category, as: 'category' },
			where: { user_id: userId },
			limit: 10,
		});
		let totalIncomes = 0;
		let totalExpenses = 0;
		let incomesCategories = [];
		let expensesCategories = [];
		console.log(incomes, expenses);
		incomes.forEach((income) => {
			totalIncomes += income.amount;
			const category = incomesCategories.find(
				(item) => item.category === income.category.name
			);
			if (!category) {
				incomesCategories.push({
					category: income.category.name,
					area: income.amount,
				});
			} else {
				category.area += income.amount;
			}
		});
		expenses.forEach((expense) => {
			totalExpenses += expense.amount;
			const category = expensesCategories.find(
				(item) => item.category === expense.category.name
			);
			if (!category) {
				expensesCategories.push({
					category: expense.category.name,
					area: expense.amount,
				});
			} else {
				category.area += expense.amount;
			}
		});
		const total = totalIncomes - totalExpenses + 0;
		res.status(200).json({
			total,
			operations,
			totalIncomes,
			totalExpenses,
			incomesCategories,
			expensesCategories,
		});
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

const addOperation = async (req, res) => {
	try {
		const { userId } = req;
		const { concept, type, amount, date, category } = req.body;
		const operation = await Operation.create({ concept, type, amount, date });
		await operation.setUser(userId);
		await operation.setCategory(category);
		res.status(200).json(operation);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const uploadOperation = async (req, res) => {
	try {
		const { id } = req.params;
		const { concept, amount, date, category } = req.body;
		const { userId } = req;
		const data = {};
		if (concept) data.concept = concept;
		if (amount) data.amount = amount;
		if (date) data.date = date;
		const operation = await Operation.findOne({
			where: { [Op.and]: [{ user_id: userId }, { id }] },
			include: { model: Category, as: 'category' },
		});
		if (!operation) {
			return res.status(404).json({ message: 'Operation not found' });
		}
		await operation.update(data);
		if (category_id) operation.setCategory(category);
		return res.status(200).json(operation);
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

const deleteOperation = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req;
		const operation = await Operation.findOne({
			where: { [Op.and]: [{ user_id: userId }, { id }] },
		});
		if (!operation) {
			return res.status(404).json({ message: 'Operation not found' });
		}
		await operation.destroy();
		return res.status(200).json({ message: 'Success' });
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = {
	getOperations,
	getOperationById,
	addOperation,
	uploadOperation,
	deleteOperation,
	getResume,
};
