import { API_URL, API_ENDPOINTS } from '@/constants/config';
import { ArticlesResponse, Article } from '@/types/article';

/**
 * Fetch all articles from Strapi
 */
export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}${API_ENDPOINTS.articles}?populate=category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json: ArticlesResponse = await response.json();
    return json.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

/**
 * Fetch a single article by slug
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.articles}?filters[slug][$eq]=${slug}&populate=category`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json: ArticlesResponse = await response.json();
    return json.data[0] || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}
