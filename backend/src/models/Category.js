const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('Income', 'Expense'),
          allowNull: false,
        },
        allowDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Operation, { foreignKey: 'category_id', as: 'operation' });
  }
}

module.exports = Category;