module.exports = (sequelize, DataTypes) =>{
    const Products = sequelize.define("Products", {
        pName : {
            type : DataTypes.STRING,
            allowNull : false
        },
        pDesc : {
            type : DataTypes.STRING,
            allowNull : false
        },
        pPrice : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        pQuantity : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
    });

    return Products;
}