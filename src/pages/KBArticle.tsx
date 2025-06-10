
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import KBLayout from '@/components/kb/KBLayout';
import { Calendar, Tag, Clock } from 'lucide-react';

interface ArticleData {
  title: string;
  content: string;
  date: string;
  tags: string[];
  readTime?: string;
  excerpt: string;
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
        // Try to load the markdown content
        const response = await fetch(`/content/kb/${slug}.md`);
        if (!response.ok) {
          throw new Error('Article not found');
        }
        
        const markdown = await response.text();
        
        // Parse frontmatter and content (simple implementation)
        const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1];
          const content = frontmatterMatch[2];
          
          // Parse frontmatter
          const frontmatterData: Record<string, any> = {};
          frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
              let value: string | string[] = valueParts.join(':').trim();
              
              // Handle arrays (tags)
              if (value.startsWith('[') && value.endsWith(']')) {
                value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
              } else {
                // Remove quotes
                value = value.replace(/^["']|["']$/g, '');
              }
              
              frontmatterData[key.trim()] = value;
            }
          });
          
          setArticle({
            title: frontmatterData.title || 'Untitled',
            content: content,
            date: frontmatterData.date || '',
            tags: Array.isArray(frontmatterData.tags) ? frontmatterData.tags : [],
            readTime: frontmatterData.readTime,
            excerpt: frontmatterData.excerpt || ''
          });
        } else {
          throw new Error('Invalid article format');
        }
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
      <KBLayout title="Loading..." showBackButton={true}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </KBLayout>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/kb" replace />;
  }

  return (
    <KBLayout title={article.title} showBackButton={true}>
      <article className="prose prose-lg max-w-none">
        {/* Article Header */}
        <div className="not-prose mb-8 pb-8 border-b">
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
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
          </div>
          
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-jacaranda-50 text-jacaranda-600 rounded-full text-sm font-medium flex items-center"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:font-montserrat prose-headings:font-bold prose-p:font-open-sans prose-p:leading-relaxed prose-a:text-jacaranda prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
        />
      </article>
    </KBLayout>
  );
};

export default KBArticle;
