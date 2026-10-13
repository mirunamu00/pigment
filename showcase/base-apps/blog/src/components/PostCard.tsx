import { Link } from 'react-router';
import type { Post } from '../data/posts';
import PostMeta from './PostMeta';
import TagChip from './TagChip';

interface PostCardProps {
  post: Post;
  testId?: string;
  linkTestId?: string;
}

export default function PostCard({ post, testId = 'post-card', linkTestId = 'post-link' }: PostCardProps) {
  return (
    <article className="post-card" data-testid={testId}>
      <h3 className="post-card-title">
        <Link to={`/posts/${post.slug}`} data-testid={linkTestId}>
          {post.title}
        </Link>
      </h3>
      <PostMeta post={post} />
      <p>{post.excerpt}</p>
      <ul className="tag-list" aria-label="Tags">
        {post.tags.map((tag) => (
          <li key={tag}>
            <TagChip tag={tag} />
          </li>
        ))}
      </ul>
    </article>
  );
}
