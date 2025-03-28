import React, { useState } from 'react';
import { Card, Tree, Upload, Button, Row, Col } from 'antd';
import { FolderOutlined, FileOutlined, UploadOutlined } from '@ant-design/icons';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const MarkdownEditor = () => {
  const [content, setContent] = useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);
  
  // 分类树示例数据
  const categoryTree = [{
    title: '技术文章',
    key: 'tech',
    icon: <FolderOutlined />,
    children: [
      { title: '前端开发', key: 'frontend', icon: <FileOutlined /> },
      { title: '后端架构', key: 'backend', icon: <FileOutlined /> },
    ],
  }];

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleUpload = (file) => {
    // 图片上传处理逻辑
    console.log('Uploading file:', file);
    return false;
  };

  return (
    <Card title="文章编辑" bordered={false}>
      <Row gutter={24}>
        <Col span={18}>
          <MdEditor 
            value={content}
            style={{ height: '500px' }}
            renderHTML={(text) => text}
            onChange={handleEditorChange}
          />
        </Col>
        
        <Col span={6}>
          <Card title="分类管理" style={{ marginBottom: 24 }}>
            <Tree
              treeData={categoryTree}
              showIcon
              selectedKeys={selectedKeys}
              onSelect={(keys) => setSelectedKeys(keys)}
            />
          </Card>
          
          <Upload 
            beforeUpload={handleUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Col>
      </Row>
    </Card>
  );
};

export default MarkdownEditor;