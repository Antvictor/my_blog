import React from 'react';
import { Card, Statistic } from 'antd';
import { marked } from 'marked';

const ArticleView = ({ content, stats }) => {
  const htmlContent = marked(content || '');

  return (
    <div className="article-container">
      <div 
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{ marginBottom: 24 }}
      />
      
      <Card title="文章统计" bordered={false}>
        <Statistic
          title="字数统计"
          value={stats?.wordCount || 0}
          style={{ marginRight: 16 }}
        />
        <Statistic
          title="阅读时长"
          value={stats?.readingTime || 0}
          suffix="分钟"
        />
      </Card>
    </div>
  );
};

export default ArticleView;

<style jsx>{`
  .article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
  }
  
  :global(.article-container h1) {
    border-bottom: 2px solid #eee;
    padding-bottom: 0.3em;
  }
  
  :global(.article-container pre) {
    background: #f6f8fa;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
  }
`}</style>