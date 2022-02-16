const { Model, DataTypes } = require('sequelize');
const { hashPasswordSync } = require('../helpers/passwordHash');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            const passwordHash = hashPasswordSync(value);
            this.setDataValue('password', passwordHash);
          },
        },
        registerMethod: {
          type: DataTypes.ENUM('direct', 'google'),
          allowNull: false,
          defaultValue: 'direct',
        },
        validated: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        mailCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Operation, { foreignKey: 'user_id', as: 'operation' });

  }
}

module.exports = User;
