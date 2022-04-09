const router = require("express").Router();
const { postCats, getCats } = require("../controllers/catsControllers");

//post categories
router.post("/", postCats);

//get categories
router.get("/", getCats);

module.exports = router;
