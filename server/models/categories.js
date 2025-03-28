import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true
  },
  color: {
    type: String,
    default: '#1890ff'
  },
  articleCount: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Category', CategorySchema);