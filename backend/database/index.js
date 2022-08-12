const { DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_DIALECT } = process.env;

const Sequelize = require('sequelize');

const OperationModel = require('./models/operations');
const CategoryModel = require('./models/categories');
const UserModel = require('./models/users');

const database = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT
});

const Operation = OperationModel(database, Sequelize);
const Category = CategoryModel(database, Sequelize);
const User = UserModel(database, Sequelize);

// Define relation between operations and categories
Category.hasMany(Operation, {
    foreignKey: {
        name: 'category_id',
        allowNull: true
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});
Operation.belongsTo(Category, {
    foreignKey: 'category_id'
});

// Define relation between operations and users
User.hasMany(Operation, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Operation.belongsTo(User, {
    foreignKey: 'category_id'
});

database.sync({ force: false })
    .then(console.log('Database synced succesfully!'))
    .catch(err => console.error('An error ocurred when trying to sync with the database: ', err));
    

module.exports = {
    Operation, 
    Category, 
    User,
};