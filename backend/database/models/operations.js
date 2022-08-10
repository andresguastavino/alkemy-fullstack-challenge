module.exports = (database, type) => {
    return database.define('operation', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        amount: type.DECIMAL,
        concept: type.STRING,
        type: type.STRING,
        date: type.DATE
    });
};