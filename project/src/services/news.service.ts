import axios from 'axios';

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  time: string;
}

// Binance blog API endpoint
const BINANCE_BLOG_API = 'https://www.binance.com/bapi/composite/v1/public/cms/article/catalog/list/query';
const ITEMS_PER_PAGE = 3;

export const getLatestNews = async (page = 1): Promise<NewsItem[]> => {
  try {
    const response = await axios.post(BINANCE_BLOG_API, {
      catalogId: '48',
      pageNo: page,
      pageSize: ITEMS_PER_PAGE
    });

    return response.data.data.articles.map((article: any) => ({
      id: article.id,
      title: article.title,
      source: 'Binance',
      url: `https://www.binance.com/en/blog/${article.code}`,
      time: new Date(article.publishDate).toLocaleString()
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};