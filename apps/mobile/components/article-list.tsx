import { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Article } from '@/types/article';
import { fetchArticles } from '@/services/articles';
import { useColorScheme } from '@/hooks/useColorScheme';

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  const loadArticles = async () => {
    try {
      setError(null);
      const data = await fetchArticles();
      setArticles(data);
    } catch (err) {
      setError('Failed to load articles. Make sure Strapi is running on http://localhost:1337');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadArticles();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading articles...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity onPress={loadArticles} style={styles.retryButton}>
          <ThemedText style={styles.retryText}>Retry</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  if (articles.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText style={styles.emptyText}>No articles found</ThemedText>
        <ThemedText style={styles.emptySubtext}>
          Create articles in your Strapi admin panel at http://localhost:1337/admin
        </ThemedText>
      </View>
    );
  }

  const renderArticle = ({ item }: { item: Article }) => (
    <TouchableOpacity style={styles.articleCard}>
      <ThemedView style={styles.cardContent}>
        <ThemedText type="subtitle" style={styles.articleTitle}>
          {item.title}
        </ThemedText>
        {item.category && (
          <View style={styles.categoryBadge}>
            <ThemedText style={styles.categoryText}>{item.category.name}</ThemedText>
          </View>
        )}
        <ThemedText style={styles.articleDate}>
          {new Date(item.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={articles}
      renderItem={renderArticle}
      keyExtractor={(item) => item.documentId}
      contentContainerStyle={styles.listContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
    opacity: 0.6,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  articleCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  articleTitle: {
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  articleDate: {
    fontSize: 12,
    opacity: 0.6,
  },
});
