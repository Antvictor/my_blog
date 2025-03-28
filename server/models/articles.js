import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  coverImage: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  readCount: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false }
});

export default mongoose.model('Article', ArticleSchema);