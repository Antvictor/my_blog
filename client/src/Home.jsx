import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { fetchArticles } from './api/articles';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { items } = await fetchArticles(1, 10);
        setArticles(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>加载失败：{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>最新文章</h2>
      {articles.map(article => (
        <Card
          key={article.id}
          title={article.title}
          extra={<Link to={`/article/${article.id}`}>阅读全文</Link>}
          style={{ marginBottom: 16 }}
        >
          <div style={{ color: '#666' }}>
            {article.content.slice(0, 200)}{article.content.length > 200 && '...'}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
            发布时间：{article.createdAt}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;