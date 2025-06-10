
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import KBLayout from '@/components/kb/KBLayout';
import { Calendar, Tag, Clock } from 'lucide-react';

interface ArticleData {
  title: string;
  date: string;
  tags: string[];
  readTime?: string;
  content: string;
}

const KBArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        // In a real implementation, this would load the compiled MDX component
        // For now, we'll show a sample article
        const sampleContent = `
# ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}

This is a sample article demonstrating the knowledge base functionality. In a full implementation, this content would be loaded from compiled MDX files.

## Key Points

- **Targeted Approach**: Focus on high-intent audiences
- **Data-Driven**: Use analytics to optimize performance  
- **Conversion Focus**: Every element should drive results

## Best Practices

1. Start with clear objectives
2. Test everything systematically
3. Measure and optimize continuously

## Conclusion

Implementing these strategies will help you achieve better results with your digital marketing campaigns.
        `;

        const sampleArticle: ArticleData = {
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          date: '2025-01-15',
          tags: ['Strategy', 'Marketing', 'Best Practices'],
          readTime: '5 min',
          content: sampleContent
        };

        setArticle(sampleArticle);
      } catch (error) {
        console.error('Failed to load article:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <KBLayout showBackButton>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </KBLayout>
    );
  }

  if (notFound || !article) {
    return (
      <KBLayout title="Article Not Found" showBackButton>
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Tag className="w-16 h-16 mx-auto" />
          </div>
          <h1 className="font-montserrat font-bold text-2xl text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="font-open-sans text-gray-600 mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </KBLayout>
    );
  }

  return (
    <KBLayout title={article.title} showBackButton>
      <article className="bg-white rounded-lg shadow-sm border p-8">
        {/* Article Header */}
        <header className="mb-8 pb-6 border-b">
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(article.date).toLocaleDateString()}
            </div>
            {article.readTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} read
              </div>
            )}
            <div className="flex items-center gap-2">
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
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none font-open-sans"
          dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
        />
      </article>
    </KBLayout>
  );
};

export default KBArticle;
