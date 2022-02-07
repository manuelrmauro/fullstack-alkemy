const { Model, DataTypes } = require('sequelize');
const { hashPasswordSync } = require('../helpers/passwordHash');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
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
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        photo: {
          type: DataTypes.JSON,
          allowNull: true,
        },
        socialPhoto: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        registerMethod: {
          type: DataTypes.ENUM('direct', 'google'),
          allowNull: false,
          defaultValue: 'direct',
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        deleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        validated: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        firstLogin: {
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
    this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    this.belongsTo(models.Company, { as: 'company', foreignKey: 'company_id' });
    this.hasMany(models.Product, {
      as: 'publications',
      foreignKey: 'publisher_id',
    });
    this.hasMany(models.Donation, {
      as: 'donations',
      foreignKey: 'publisher_id',
    });
    this.hasMany(models.Order, { as: 'orders', foreignKey: 'buyer_id' });
    this.hasMany(models.Cart, { foreignKey: 'user_id', as: 'cart' });
  }
}

module.exports = User;
