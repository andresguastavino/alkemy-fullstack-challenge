module.exports = (database, type) => {
    return database.define('category', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING
    }); 
};