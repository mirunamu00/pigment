import { TAG_LABELS, type TagId } from '../data/posts';

export default function TagChip({ tag }: { tag: TagId }) {
  return (
    <span className="tag-chip" data-testid="post-tag">
      {TAG_LABELS[tag]}
    </span>
  );
}
