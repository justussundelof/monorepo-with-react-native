import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ArticleList } from '@/components/article-list';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Articles</ThemedText>
        <ThemedText style={styles.subtitle}>
          Latest articles from your Strapi backend
        </ThemedText>
      </View>
      <ArticleList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.6,
  },
});
