// Strapi Article Types
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any; // Strapi blocks type
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category?: {
    id: number;
    documentId: string;
    name: string;
  };
}

export interface ArticlesResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
