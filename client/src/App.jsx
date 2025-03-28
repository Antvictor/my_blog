import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout, Tabs } from 'antd';
import MainLayout from './MainLayout';
import Home from './Home';
import CategoryList from './CategoryList';
import MarkdownEditor from './MarkdownEditor';
import ArticleDetail from './ArticleDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="article/:id" element={<ArticleDetail />} />
        </Route>
        <Route path="/editor" element={<MarkdownEditor />} />
      </Routes>
    </Router>
  )
}

export default App
