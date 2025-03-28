import React from 'react';
import { Card, List, Tag } from 'antd';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  // 临时测试数据
  const categories = [
    {
      id: 1,
      name: '前端开发',
      articleCount: 12,
      color: '#108ee9'
    },
    {
      id: 2,
      name: '技术杂谈',
      articleCount: 8,
      color: '#87d068'
    }
  ];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>文章分类</h2>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={categories}
        renderItem={item => (
          <List.Item>
            <Card
              title={
                <Link to={`/category/${item.id}`}>
                  {item.name}
                  <Tag color={item.color} style={{ marginLeft: 8 }}>
                    {item.articleCount}篇
                  </Tag>
                </Link>
              }
              hoverable
            >
              相关文章列表...
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CategoryList;