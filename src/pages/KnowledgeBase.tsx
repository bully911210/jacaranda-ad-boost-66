
import { useState, useEffect } from 'react';
import KBLayout from '@/components/kb/KBLayout';
import SearchBar from '@/components/kb/SearchBar';
import KBList, { Article } from '@/components/kb/KBList';

const KnowledgeBase = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load articles from KB index
    const loadArticles = async () => {
      try {
        const response = await fetch('/kb-index.json');
        const data = await response.json();
        setArticles(data.articles || []);
        setFilteredArticles(data.articles || []);
      } catch (error) {
        console.error('Failed to load KB index:', error);
        // Fallback to sample data for development
        const sampleArticles: Article[] = [
          {
            slug: 'facebook-ads-insurance',
            title: 'How to Create High-Converting Facebook Ads for Insurance Companies',
            excerpt: 'Learn the proven strategies and tactics we use to generate qualified leads for insurance companies through Facebook advertising.',
            date: '2025-01-15',
            tags: ['Facebook Ads', 'Insurance', 'Lead Generation'],
            readTime: '8 min'
          },
          {
            slug: 'targeting-strategies',
            title: 'Advanced Audience Targeting Strategies That Actually Work',
            excerpt: 'Discover the surgical targeting methods we use to reach high-intent buyers and maximize your ad spend ROI.',
            date: '2025-01-10',
            tags: ['Targeting', 'Audience', 'ROI'],
            readTime: '6 min'
          },
          {
            slug: 'conversion-optimization',
            title: 'Landing Page Optimization for Insurance Leads',
            excerpt: 'The complete guide to creating landing pages that convert visitors into qualified insurance leads.',
            date: '2025-01-05',
            tags: ['Conversion', 'Landing Pages', 'Optimization'],
            readTime: '10 min'
          }
        ];
        setArticles(sampleArticles);
        setFilteredArticles(sampleArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredArticles(filtered);
    }
  };

  return (
    <KBLayout title="Knowledge Base">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            Marketing Knowledge Base
          </h1>
          <p className="font-open-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, strategies, and best practices for successful digital marketing campaigns.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results Summary */}
        {searchQuery && (
          <div className="text-center">
            <p className="font-open-sans text-gray-600">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Articles List */}
        <KBList articles={filteredArticles} loading={loading} />
      </div>
    </KBLayout>
  );
};

export default KnowledgeBase;
