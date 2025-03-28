import express from 'express';
import mongoose from 'mongoose';
import Article from '../models/articles.js';

const router = express.Router();

// 获取分页文章列表
router.get('/', async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;
    
    const [articles, total] = await Promise.all([
      Article.find()
        .skip(skip)
        .limit(pageSize)
        .populate('category', 'name color')
        .sort({ createdAt: -1 }),
      Article.countDocuments()
    ]);

    res.json({
      items: articles,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 创建新文章
router.post('/', async (req, res) => {
  try {
    const newArticle = new Article({
      ...req.body,
      createdAt: new Date()
    });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 获取单个文章详情
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('category', 'name color');
    
    if (!article) {
      return res.status(404).json({ message: '文章未找到' });
    }
    
    // 更新阅读量
    article.readCount += 1;
    await article.save();
    
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 更新文章
router.put('/:id', async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedArticle) {
      return res.status(404).json({ message: '文章未找到' });
    }
    
    res.json(updatedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 删除文章
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    
    if (!deletedArticle) {
      return res.status(404).json({ message: '文章未找到' });
    }
    
    res.json({ message: '文章已删除' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;