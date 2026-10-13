import { findAuthor } from '../data/authors';
import { formatDate, readingTime, type Post } from '../data/posts';

export default function PostMeta({ post, detailed = false }: { post: Post; detailed?: boolean }) {
  const author = findAuthor(post.authorId);
  return (
    <p className="post-meta muted small">
      <span data-testid={detailed ? 'article-author' : undefined}>{author.name}</span>
      <span aria-hidden="true"> · </span>
      <time dateTime={post.date} data-testid={detailed ? 'article-date' : undefined}>
        {formatDate(post.date)}
      </time>
      <span aria-hidden="true"> · </span>
      <span data-testid={detailed ? 'article-reading-time' : undefined}>{readingTime(post)} min read</span>
    </p>
  );
}
