const Category = require("../models/Category");

const postCats = async (req, res, next) => {
    // try {
    //     const dbCats = await Category.find();
    //     const cats = req.body.cats.filter((cat) => {
    //         const isAvaliable = dbCats.some((dbCat) => {
    //             return dbCat.name === cat.name;
    //         });
    //         return !isAvaliable;
    //     });
    //     const savedCat = await Category.insertMany(cats);
    //     res.status(200).json(savedCat);
    // } catch (error) {
    //     res.status(500).json(error);
    // }
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getCats = async (req, res, next) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = { postCats, getCats };
