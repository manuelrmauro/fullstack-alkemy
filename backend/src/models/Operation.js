const { Model, DataTypes } = require('sequelize');

class Operation extends Model {
  static init(sequelize) {
    super.init(
      {
        concept: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('Income', 'Expense'),
          allowNull: false,
        },
        amount: {
          type: DataTypes.NUMBER,
          allowNull:false
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false
        }
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Operation;
