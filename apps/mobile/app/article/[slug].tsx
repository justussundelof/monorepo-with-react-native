import { useLocalSearchParams, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Article } from '@/types/article';
import { fetchArticleBySlug } from '@/services/articles';

export default function ArticleDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    try {
      setError(null);
      const data = await fetchArticleBySlug(slug);
      setArticle(data);
    } catch (err) {
      setError('Failed to load article');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error || !article) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>{error || 'Article not found'}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: article.title,
        }}
      />
      <ScrollView style={styles.container}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            {article.title}
          </ThemedText>

          {article.category && (
            <View style={styles.categoryBadge}>
              <ThemedText style={styles.categoryText}>{article.category.Name}</ThemedText>
            </View>
          )}

          <ThemedText style={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </ThemedText>

          <View style={styles.divider} />

          <ThemedText style={styles.articleContent}>
            {renderContent(article.content)}
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </>
  );
}

// Simple content renderer for Strapi blocks
function renderContent(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) {
    return 'No content available';
  }

  return blocks
    .map((block: any) => {
      if (block.type === 'paragraph') {
        return block.children?.map((child: any) => child.text).join('') || '';
      }
      if (block.type === 'heading') {
        return '\n' + (block.children?.map((child: any) => child.text).join('') || '') + '\n';
      }
      if (block.type === 'list') {
        return block.children
          ?.map((item: any) => '• ' + item.children?.map((child: any) => child.text).join(''))
          .join('\n');
      }
      return '';
    })
    .join('\n\n');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ef4444',
  },
  title: {
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 24,
  },
});
