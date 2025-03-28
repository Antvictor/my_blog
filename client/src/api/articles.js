export const fetchArticles = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(`/api/articles?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('获取数据失败');
    return await response.json();
  } catch (error) {
    console.error('获取文章列表失败:', error);
    throw error;
  }
};