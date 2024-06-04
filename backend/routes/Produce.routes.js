const express = require("express");
const { ProduceController } = require("../controllers/Produce.controller");
const upload = require("../middleware/upload"); 
const router = express.Router();

router.get("/", ProduceController.getAll);
router.get("/:id", ProduceController.getById);
router.post("/single", upload.single('img'), ProduceController.addSingle); 
router.post("/multiple", upload.array('imgs', 10), ProduceController.addMultiple); 
router.delete("/:id", ProduceController.delete);
router.put("/:id", upload.array('imgs', 10), ProduceController.edit); 
module.exports = router;
