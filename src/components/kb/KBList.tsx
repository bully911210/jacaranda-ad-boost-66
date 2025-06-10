
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime?: string;
}

interface KBListProps {
  articles: Article[];
  loading?: boolean;
}

const KBList = ({ articles, loading = false }: KBListProps) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Tag className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="font-montserrat font-semibold text-lg text-gray-600 mb-2">
          No articles found
        </h3>
        <p className="font-open-sans text-gray-500">
          Try adjusting your search terms or browse all articles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <article key={article.slug} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <Link to={`/kb/${article.slug}`} className="block p-6">
            <h2 className="font-montserrat font-bold text-xl text-gray-900 mb-3 hover:text-jacaranda transition-colors">
              {article.title}
            </h2>
            <p className="font-open-sans text-gray-600 mb-4 leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
                {article.readTime && (
                  <span>{article.readTime} read</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-jacaranda-50 text-jacaranda-600 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default KBList;
