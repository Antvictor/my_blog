import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import ArticleView from './ArticleView';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${id}`);
        if (!response.ok) throw new Error('文章获取失败');
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <Spin tip="加载中..." size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 24 }}>{article.title}</h1>
      <ArticleView 
        content={article.content} 
        stats={{
          wordCount: article.wordCount,
          readingTime: article.readingTime
        }}
      />
    </div>
  );
};

export default ArticleDetail;