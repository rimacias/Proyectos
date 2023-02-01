'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee.init({
    employeeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    extension: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    officeCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'offices',
        key: 'officeCode'
      }
    },
    reportsTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employees',
        key: 'employeeNumber'
      }
    },
    jobTitle: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employees',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employeeNumber" },
        ]
      },
      {
        name: "reportsTo",
        using: "BTREE",
        fields: [
          { name: "reportsTo" },
        ]
      },
      {
        name: "officeCode",
        using: "BTREE",
        fields: [
          { name: "officeCode" },
        ]
      },
    ]
  });
  return employee;
};