import express from 'express';
import mongoose from 'mongoose';
import Category from '../models/categories.js';

const router = express.Router();

// 获取全部分类
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建新分类
router.post('/', async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      color: req.body.color || '#1890ff'
    });

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 更新分类
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, color: req.body.color },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: '分类未找到' });
    }

    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除分类
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: '分类未找到' });
    }

    // 检查关联文章
    const relatedArticles = await mongoose.model('Article').countDocuments({ 
      category: category._id 
    });

    if (relatedArticles > 0) {
      return res.status(400).json({ 
        message: '该分类下存在关联文章，无法删除' 
      });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: '分类已删除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;