import React, { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, ChevronDown } from 'lucide-react';
import { getLatestNews, NewsItem } from '../../services/news.service';

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getLatestNews(page);
        setNews(prev => [...prev, ...newsData]);
      } catch (err) {
        setError('Error al cargar noticias');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  if (loading && page === 1) {
    return (
      <div className="bg-gray-100 dark:bg-dark-light p-6 rounded-lg shadow-lg animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error && news.length === 0) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-dark-light p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Newspaper className="text-primary w-6 h-6" />
          <h2 className="text-xl font-bold">Últimas Noticias</h2>
        </div>
      </div>
      <div className="space-y-4">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-dark p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-light transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>{item.source}</span>
                  <span className="mx-2">•</span>
                  <span>{item.time}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </a>
        ))}

        {!loading && !error && (
          <button
            onClick={() => {
              setShowMore(true);
              setPage(p => p + 1);
            }}
            disabled={loading}
            className="w-full py-2 text-primary hover:text-primary-dark flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Ver más noticias
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};