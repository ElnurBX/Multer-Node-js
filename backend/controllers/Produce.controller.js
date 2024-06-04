const { Produce } = require("../models/Produce.model");

const ProduceController = {
  getAll: async (req, res) => {
    try {
      const items = await Produce.find();
      res.status(200).send(items);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Produce.findById(id);
      if (!item) {
        return res.status(404).send("Item not found");
      }
      res.status(200).send(item);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  addSingle: async (req, res) => {
    try {
      const { title, price } = req.body;
      const img = req.file.filename;
      const newProduce = new Produce({ title, price, imgs: [img] });
      await newProduce.save();
      res.status(201).send(newProduce);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  addMultiple: async (req, res) => {
    try {
      const { title, price } = req.body;
      const imgs = req.files.map(file => file.filename);
      const newProduce = new Produce({ title, price, imgs });
      await newProduce.save();
      res.status(201).send(newProduce);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Produce.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).send("Item not found");
      }
      res.status(200).send(item);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedItem = await Produce.findByIdAndUpdate(id, { ...req.body }, { new: true });
      if (!updatedItem) {
        return res.status(404).send("Item not found");
      }
      res.status(200).send(updatedItem);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

module.exports = { ProduceController };
