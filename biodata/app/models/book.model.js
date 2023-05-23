module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("books",{
        
        nama: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tempat_lahir: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tanggal_lahir: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: false
        }

    });
    return Book;
};