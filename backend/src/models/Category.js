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
        },
        deleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Operation, { foreignKey: 'category_id', as: 'operation' });
    this.belongsTo(models.User,{ foreignKey: 'user_id', as: 'user' })
  }
}

module.exports = Category;