interface BlogType {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default BlogType;
