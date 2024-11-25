import express from 'express';
import Product from '../models/Product.js';
import { verifyToken, isAdmin, isModerator } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, isAdmin, async (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = new Product({ name, price, description });
  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
});

router.get('/', verifyToken, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.put('/:id', verifyToken, isModerator, async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
});

router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
