'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer.init({
    customerNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    contactLastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    contactFirstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    addressLine1: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    addressLine2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    postalCode: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    salesRepEmployeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employeeNumber'
      }
    }
  }, {
    sequelize,
    modelName: 'customer',
    tableName: 'customers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customerNumber" },
        ]
      },
      {
        name: "salesRepEmployeeNumber",
        using: "BTREE",
        fields: [
          { name: "salesRepEmployeeNumber" },
        ]
      },
    ]
  });
  return customer;
};