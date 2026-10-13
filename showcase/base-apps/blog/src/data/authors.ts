export interface Author {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
}

export const authors: Author[] = [
  {
    id: 'maya-okafor',
    name: 'Maya Okafor',
    initials: 'MO',
    role: 'Editor and design systems lead',
    bio: 'Maya has spent the last decade helping product teams agree on what a button is. She edits Field Notes and still reviews every pull request that touches the component library.',
  },
  {
    id: 'daniel-reyes',
    name: 'Daniel Reyes',
    initials: 'DR',
    role: 'Staff engineer',
    bio: 'Daniel works on deployment tooling and the boring infrastructure that keeps releases quiet. He writes about small, reversible changes and the habits that make them possible.',
  },
  {
    id: 'priya-natarajan',
    name: 'Priya Natarajan',
    initials: 'PN',
    role: 'Documentation lead',
    bio: 'Priya leads documentation and internal communication. She believes most process problems are writing problems in disguise, and that a good changelog is a gift to your future self.',
  },
];

export function findAuthor(id: string): Author {
  const author = authors.find((item) => item.id === id);
  if (!author) throw new Error(`Unknown author: ${id}`);
  return author;
}
