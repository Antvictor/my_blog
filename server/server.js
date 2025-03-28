import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(cors());
const __dirname = path.resolve();// MongoDB连接
const db = mongoose.connect(process.env.MONGODB_URI || 'mongodb://bloguser:securepassword@localhost:27018/my_blog?authSource=admin&authMechanism=SCRAM-SHA-256&readPreference=secondaryPreferred');

mongoose.connection.on('connected', () => {
  console.log('成功连接到MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB连接错误:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB连接断开');
});

// 中间件配置
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 文件上传配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('仅支持图片文件'));
    }
  }
});

// 路由引入
import articleRoutes from './routes/articles.js';
import categoryRoutes from './routes/categories.js';

app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);

// 图片上传接口
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.status(200).json({
    url: `/uploads/${req.file.filename}`
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});