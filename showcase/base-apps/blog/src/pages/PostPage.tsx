import { Link, useParams } from 'react-router';
import ArticleBody from '../components/ArticleBody';
import PostCard from '../components/PostCard';
import PostMeta from '../components/PostMeta';
import TableOfContents from '../components/TableOfContents';
import TagChip from '../components/TagChip';
import { findPost, getRelatedPosts } from '../data/posts';

export default function PostPage() {
  const { slug } = useParams();
  const post = findPost(slug);

  if (!post) {
    return (
      <div className="empty-state" data-testid="post-not-found">
        <h1>Post not found</h1>
        <p className="muted">There is no post at “{slug}”. It may have been renamed.</p>
        <Link to="/">Back to all posts</Link>
      </div>
    );
  }

  const related = getRelatedPosts(post);

  return (
    <>
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <ol>
          <li>
            <Link to="/">All posts</Link>
          </li>
          <li aria-current="page">{post.title}</li>
        </ol>
      </nav>

      <div className="article-layout">
        <article className="article" data-testid="article">
          <header className="article-header">
            <h1 data-testid="article-title">{post.title}</h1>
            <PostMeta post={post} detailed />
            <ul className="tag-list" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <TagChip tag={tag} />
                </li>
              ))}
            </ul>
          </header>
          <ArticleBody blocks={post.body} />
        </article>

        <aside className="article-aside">
          <TableOfContents blocks={post.body} />
        </aside>
      </div>

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-heading" data-testid="related-posts">
          <h2 id="related-heading">Related posts</h2>
          <ul className="post-list post-list-grid">
            {related.map((item) => (
              <li key={item.slug}>
                <PostCard post={item} testId="related-post" linkTestId="related-post-link" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
