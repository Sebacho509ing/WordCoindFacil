import axios from 'axios';
import { NewsItem, BinanceArticle } from './types';
import { NEWS_ITEMS_PER_PAGE } from '../../config/binance';

const BINANCE_BLOG_API = 'https://www.binance.com/bapi/composite/v1/public/cms/article/catalog/list/query';

export const getLatestNews = async (page = 1): Promise<NewsItem[]> => {
  try {
    const response = await axios.post<{ data: { articles: BinanceArticle[] } }>(
      BINANCE_BLOG_API,
      {
        catalogId: '48',
        pageNo: page,
        pageSize: NEWS_ITEMS_PER_PAGE
      }
    );

    return response.data.data.articles.map(article => ({
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