const { Op } = require('sequelize');
const Category = require('../models/Category');
const Operation = require('../models/Operation');

const order = ['id', 'desc'];

const getOperations = async (req, res) => {
	try {
		const { userId } = req;
		const { type } = req.query;
		let operations;
		if (type === 'income') {
			operations = await Operation.findAll({
				order,
				include: { model: Category },
				where: { [Op.and]: [{ type: 'Income' }, { user_id: userId }] },
			});
		} else if (type === 'expense') {
			operations = await Operation.findAll({
				order,
				include: { model: Category },
				where: { [Op.and]: [{ type: 'Expense' }, { user_id: userId }] },
			});
		} else {
			operations = await Operation.findAll({
				order,
				include: { model: Category },
				where: { user_id: userId },
			});
		}
		res.status(200).json(operations);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

const getResume = async (req, res) => {
	try {
		const { userId } = req;
		const incomes = await Operation.findAll({
			where: { [Op.and]: [{ type: 'Income' }, { user_id: userId }] },
		});
		const expenses = await Operation.findAll({
			where: { [Op.and]: [{ type: 'Expense' }, { user_id: userId }] },
		});
		const operations = await Operation.findAll({
			order,
			include: { model: Category },
			where: { user_id: userId },
			limit: 10,
		});
		let incomesAmount = incomes.reduce((a, b) => a.amount + b.amount + 0);
		let expensesAmount = expenses.reduce((a, b) => a.amount + b.amount + 0);
		const total = incomesAmount - expensesAmount;
		res.status(200).json({ total, operations });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
};

const addOperation = async (req, res) => {
	try {
		const { userId } = req;
		const { concept, type, amount, date } = req.body;
		const operation = await Operation.create({ concept, type, amount}); //<<< ACA ES DONDE ROMPE
		await operation.setUser(userId); 
		res.status(200).json(operation);
	} catch (error) {
    console.log(error)
		res.status(500).json({ message: 'Internal server error' });
	}
};

const uploadOperation = async (req, res) => {
	try {
		const { id } = req.params;
		const { concept, amount, date } = req.body;
		const { userId } = req;
		const data = {};
		if (concept) data.concept = concept;
		if (amount) data.amount = amount;
		if (date) data.date = date;
		const operation = await Operation.findOne({
			where: { [Op.and]: [{ user_id: userId }, { id }] },
		});
		if (!operation) {
			return res.status(404).json({ message: 'Operation not found' });
		}
		await operation.update(data);
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
	addOperation,
	uploadOperation,
	deleteOperation,
	getResume,
};
