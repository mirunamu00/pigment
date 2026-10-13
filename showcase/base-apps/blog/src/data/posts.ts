export type TagId = 'engineering' | 'design' | 'writing' | 'process' | 'remote-work';

export const TAGS: { id: TagId; label: string }[] = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'design', label: 'Design' },
  { id: 'writing', label: 'Writing' },
  { id: 'process', label: 'Process' },
  { id: 'remote-work', label: 'Remote work' },
];

export const TAG_LABELS: Record<TagId, string> = Object.fromEntries(TAGS.map((tag) => [tag.id, tag.label])) as Record<
  TagId,
  string
>;

export type Block =
  | { type: 'heading'; level: 2 | 3; id: string; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'figure'; alt: string; caption: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  authorId: string;
  /** ISO date, e.g. 2026-09-28 */
  date: string;
  tags: TagId[];
  featured?: boolean;
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: 'shipping-a-design-system',
    title: 'What We Learned Shipping a Design System to Twelve Teams',
    excerpt:
      'A component library is the easy part. The hard part is getting twelve teams with twelve deadlines to adopt it without stopping their own work.',
    authorId: 'maya-okafor',
    date: '2026-09-28',
    tags: ['design', 'engineering', 'process'],
    featured: true,
    body: [
      {
        type: 'paragraph',
        text: 'Eighteen months ago we had four different date pickers, three shades of "primary" blue and a modal that could only be closed by refreshing the page. Everyone agreed this was a problem. Nobody had time to fix it. This is the story of how we got from there to a shared system that twelve product teams now use every day, and the mistakes we made along the way.',
      },
      {
        type: 'paragraph',
        text: 'None of what follows is novel. Most of it is written down somewhere already. But it is one thing to read that adoption matters more than coverage, and another to watch a beautifully documented component sit unused for a quarter because nobody trusted it.',
      },
      { type: 'heading', level: 2, id: 'start-with-an-inventory', text: 'Start with an inventory' },
      {
        type: 'paragraph',
        text: 'Before writing a single component we spent two weeks taking screenshots. Every button, input, banner and table in production went into a shared board, grouped by what it was trying to do rather than what it looked like. The board was ugly and the exercise was tedious, but it changed the conversation. Instead of arguing about taste, we could point at forty-one buttons and ask which of them were actually different.',
      },
      {
        type: 'paragraph',
        text: 'The answer was six. Six real variants, each with a clear job, hiding inside forty-one implementations. That number became the scope of the first release and the easiest argument we ever had to win.',
      },
      {
        type: 'figure',
        alt: 'A grid of mismatched button screenshots grouped into six labelled clusters',
        caption: 'The inventory board after grouping: forty-one buttons, six actual jobs.',
      },
      { type: 'heading', level: 2, id: 'make-adoption-the-metric', text: 'Make adoption the metric' },
      {
        type: 'paragraph',
        text: 'Our first instinct was to measure the system by how many components it had. That is a vanity number. A library with eighty components and two consumers is a hobby project. We switched to tracking how many screens in production rendered at least one shared component, and how many local overrides each team carried. Those two numbers told us where the system was helping and where it was getting in the way.',
      },
      {
        type: 'quote',
        text: 'A design system is a product whose users are your colleagues. If they route around it, that is feedback, not insubordination.',
        cite: 'From our internal kickoff notes',
      },
      { type: 'heading', level: 3, id: 'office-hours', text: 'Office hours beat documentation' },
      {
        type: 'paragraph',
        text: 'We wrote thorough documentation and almost nobody read it. What worked was a standing thirty-minute slot twice a week where anyone could bring a screen they were building. Half of the improvements in our second release came directly from those sessions, usually from someone saying "I wanted to use your table, but it does not do this one thing."',
      },
      { type: 'heading', level: 2, id: 'migrating-without-a-freeze', text: 'Migrating without a freeze' },
      {
        type: 'paragraph',
        text: 'No team was going to stop feature work for a migration, so we made the migration small enough to fit between features. Each shared component shipped with a codemod for the most common old pattern, and every codemod produced a diff a reviewer could read in under five minutes.',
      },
      {
        type: 'code',
        language: 'bash',
        code: 'npx @acme/ui-codemods buttons ./src --dry-run\n# Rewrote 37 files, skipped 4 with custom props\nnpx @acme/ui-codemods buttons ./src',
      },
      {
        type: 'paragraph',
        text: 'The skipped files were the interesting ones. They were almost always cases where a team needed something the system did not provide yet, which made them a ready-made backlog.',
      },
      { type: 'heading', level: 2, id: 'what-we-would-do-again', text: 'What we would do again' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Run the inventory before designing anything, and share it widely.',
          'Ship a small first release that replaces something people already use.',
          'Measure adoption and local overrides instead of component count.',
          'Pair every breaking change with a codemod and a short migration note.',
          'Keep office hours on the calendar even when attendance is low.',
        ],
      },
      {
        type: 'paragraph',
        text: 'The system is not finished, and it will not be. But it has crossed the line from something we maintain to something other teams depend on, and that is the only milestone that ever really mattered.',
      },
    ],
  },
  {
    slug: 'release-notes-people-read',
    title: 'Writing Release Notes People Actually Read',
    excerpt:
      'Most release notes are written for the team that shipped the change. A few small habits make them useful to the people who have to live with it.',
    authorId: 'priya-natarajan',
    date: '2026-09-17',
    tags: ['writing', 'process'],
    body: [
      {
        type: 'paragraph',
        text: 'If you have ever scrolled past a changelog entry that says "various fixes and improvements", you already know the problem. Release notes are often the last thing written before a deploy, by the person who is most tired of the change. The result is accurate, technically, and useless to almost everyone who reads it.',
      },
      { type: 'heading', level: 2, id: 'who-is-reading', text: 'Decide who is reading' },
      {
        type: 'paragraph',
        text: 'Every release has at least three audiences: people who use the product, people who support it, and people who build on top of it. They want different things. Users want to know what changed for them. Support wants to know what might generate questions. Integrators want to know what might break. Trying to serve all three in one paragraph serves none of them.',
      },
      {
        type: 'paragraph',
        text: 'We now split every set of notes into short sections with plain headings, and we leave a section out entirely when it has nothing to say. An empty "Breaking changes" heading is reassuring; a missing one makes people nervous.',
      },
      { type: 'heading', level: 2, id: 'lead-with-the-effect', text: 'Lead with the effect, not the cause' },
      {
        type: 'paragraph',
        text: 'Engineers naturally describe the change they made. Readers care about the change they will notice. "Refactored the export queue" becomes "Large exports now finish in about half the time." The first sentence is true; the second one is useful.',
      },
      {
        type: 'quote',
        text: 'Write the note you would want to receive on the morning something stops working.',
        cite: 'A support engineer, in a retro we still quote',
      },
      { type: 'heading', level: 3, id: 'a-simple-template', text: 'A simple template' },
      {
        type: 'paragraph',
        text: 'We keep a template in the repository so nobody starts from a blank page. It is short on purpose.',
      },
      {
        type: 'code',
        language: 'markdown',
        code: '## 4.12.0 (October 2)\n\n### What changed for you\n- Large exports finish in about half the time.\n\n### Heads up\n- The legacy CSV option is hidden for new workspaces.\n\n### Breaking changes\nNone.',
      },
      {
        type: 'figure',
        alt: 'Two versions of the same release note side by side, before and after editing',
        caption: 'The same release, described for the people who shipped it and for the people who use it.',
      },
      { type: 'heading', level: 2, id: 'a-review-checklist', text: 'A review checklist' },
      {
        type: 'paragraph',
        text: 'Release notes get reviewed like code now. The reviewer is usually someone outside the team, and they work through the same short list every time.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Could a customer understand each line without opening the ticket?',
          'Is every behavior change described by its effect?',
          'Is anything that needs action from the reader called out first?',
          'Are the breaking changes listed, even if the answer is "none"?',
        ],
      },
      {
        type: 'paragraph',
        text: 'It takes ten minutes. It has saved us far more than ten minutes of support time on almost every release since we started.',
      },
    ],
  },
  {
    slug: 'intro-to-feature-flags',
    title: 'A Gentle Introduction to Feature Flags',
    excerpt:
      'Feature flags let you separate deploying code from releasing it. Used carefully, they make releases boring. Used carelessly, they make code unreadable.',
    authorId: 'daniel-reyes',
    date: '2026-09-03',
    tags: ['engineering'],
    body: [
      {
        type: 'paragraph',
        text: 'A feature flag is a condition in your code that decides, at runtime, whether a piece of behavior is turned on. That is the whole idea. The value comes from what it lets you do: merge unfinished work safely, release to a small group first, and turn something off in seconds without a deploy.',
      },
      { type: 'heading', level: 2, id: 'the-smallest-useful-flag', text: 'The smallest useful flag' },
      {
        type: 'paragraph',
        text: 'You do not need a vendor to start. A typed object loaded at startup is enough to learn the habits that matter.',
      },
      {
        type: 'code',
        language: 'ts',
        code: "const flags = {\n  newCheckout: process.env.FLAG_NEW_CHECKOUT === 'on',\n} as const;\n\nexport function isEnabled(name: keyof typeof flags) {\n  return flags[name];\n}",
      },
      { type: 'heading', level: 2, id: 'flags-have-a-lifespan', text: 'Flags have a lifespan' },
      {
        type: 'paragraph',
        text: 'The most common failure is not a bad flag but an old one. Every flag doubles the number of paths through a piece of code, and flags that outlive their purpose quietly turn simple functions into puzzles.',
      },
      {
        type: 'quote',
        text: 'Adding a flag is a commitment to removing it.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Give every flag an owner and an expected removal date.',
          'Roll out to internal users, then a small percentage, then everyone.',
          'Delete the flag and the old code path in the same pull request.',
        ],
      },
      {
        type: 'figure',
        alt: 'A timeline showing a flag moving from internal rollout to full release to removal',
        caption: 'A healthy flag lives for weeks, not quarters.',
      },
      {
        type: 'paragraph',
        text: 'Start with one flag on one risky change. Once removing it feels routine, you are ready for more.',
      },
    ],
  },
  {
    slug: 'smaller-pull-requests',
    title: 'The Case for Smaller Pull Requests',
    excerpt:
      'Large pull requests feel efficient to write and are expensive to review. Here is how we nudged our team toward smaller changes without adding rules.',
    authorId: 'daniel-reyes',
    date: '2026-08-21',
    tags: ['engineering', 'process'],
    body: [
      {
        type: 'paragraph',
        text: 'A reviewer can give real attention to about two hundred lines of change. Past that, reviews turn into skimming, and skimming is how bugs get approved. We did not want a hard limit, so we looked for ways to make small changes the easy default.',
      },
      { type: 'heading', level: 2, id: 'stack-your-changes', text: 'Stack your changes' },
      {
        type: 'paragraph',
        text: 'Most large pull requests are several small ones travelling together. Splitting them into a stack, where each change builds on the previous one, lets reviewers approve the safe parts quickly and spend their attention where it is needed.',
      },
      { type: 'heading', level: 2, id: 'review-within-a-day', text: 'Review within a day' },
      {
        type: 'paragraph',
        text: 'People batch their work into big pull requests when reviews are slow. We agreed that every request gets a first response within one working day. Pull request size dropped on its own within a month.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Separate refactors from behavior changes.',
          'Land the data model before the screens that use it.',
          'Put feature work behind a flag so partial changes can merge.',
        ],
      },
    ],
  },
  {
    slug: 'meetings-across-time-zones',
    title: 'Running Calm Meetings Across Six Time Zones',
    excerpt:
      'When half the team is starting their day and the other half is ending it, meetings need a different shape. Ours got shorter, fewer and better written.',
    authorId: 'maya-okafor',
    date: '2026-08-06',
    tags: ['remote-work', 'process'],
    body: [
      {
        type: 'paragraph',
        text: 'Our team spans six time zones, which means there is exactly one hour each day when everyone is plausibly awake. We used to fill that hour with status updates. Now we protect it for decisions that genuinely need a conversation.',
      },
      { type: 'heading', level: 2, id: 'write-first-meet-second', text: 'Write first, meet second' },
      {
        type: 'paragraph',
        text: 'Every meeting starts with a short document shared a day ahead. Anyone who cannot attend leaves comments, and the meeting begins with those comments rather than a recap. Most weeks, the document resolves the question and the meeting is cancelled.',
      },
      {
        type: 'quote',
        text: 'The best meeting is the one the document made unnecessary.',
      },
      { type: 'heading', level: 2, id: 'rotate-the-inconvenience', text: 'Rotate the inconvenience' },
      {
        type: 'paragraph',
        text: 'When a meeting has to happen at an awkward hour, we rotate who takes the early or late slot. It is a small thing, and it is the thing people mention most when they talk about why the team feels fair.',
      },
    ],
  },
  {
    slug: 'designing-empty-states',
    title: 'Designing Empty States That Help',
    excerpt:
      'An empty screen is often the first thing a new user sees. It should explain what belongs there and how to put it there.',
    authorId: 'priya-natarajan',
    date: '2026-07-24',
    tags: ['design', 'writing'],
    body: [
      {
        type: 'paragraph',
        text: 'Empty states are easy to forget because the people building a product rarely see them. Their accounts are full of test data. New users, on the other hand, see nothing but empty states for their first few minutes, and those minutes decide whether they come back.',
      },
      { type: 'heading', level: 2, id: 'three-kinds-of-empty', text: 'Three kinds of empty' },
      {
        type: 'list',
        ordered: true,
        items: [
          'First use: nothing has been created yet.',
          'No results: a search or filter matched nothing.',
          'Cleared: the user finished everything, which is good news.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Each one needs different words. A first-use state should invite action. A no-results state should offer a way back. A cleared state can simply say well done and get out of the way.',
      },
      { type: 'heading', level: 2, id: 'one-clear-action', text: 'One clear action' },
      {
        type: 'paragraph',
        text: 'Resist the urge to fill the space with tips. One sentence explaining what belongs here and one button to add it will outperform a carousel of features every time.',
      },
    ],
  },
  {
    slug: 'month-without-notifications',
    title: 'Notes From a Month Without Chat Notifications',
    excerpt:
      'I turned off every chat notification for thirty days and checked messages on a schedule instead. Nothing caught fire, and a few things got noticeably better.',
    authorId: 'daniel-reyes',
    date: '2026-07-10',
    tags: ['remote-work'],
    body: [
      {
        type: 'paragraph',
        text: 'The experiment was simple: no badges, no sounds, no banners. I checked chat at the top of each hour and otherwise left it closed. I told my team in advance and asked them to phone me if something was truly urgent.',
      },
      { type: 'heading', level: 2, id: 'what-changed', text: 'What changed' },
      {
        type: 'paragraph',
        text: 'Nobody phoned. My longest uninterrupted stretch of work went from about twenty minutes to nearly two hours. Response times to messages got slower on average but more thoughtful, and several threads resolved themselves before I ever saw them.',
      },
      { type: 'heading', level: 2, id: 'what-i-kept', text: 'What I kept' },
      {
        type: 'paragraph',
        text: 'I turned notifications back on for direct messages and for one incident channel. Everything else stays on a schedule. It turns out that most messages can wait an hour, and the ones that cannot are rarely sent by chat.',
      },
    ],
  },
];

export function findPost(slug: string | undefined): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): Post {
  return posts.find((post) => post.featured) ?? posts[0];
}

/** Posts that share the most tags with the given post, newest first on ties. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      shared: candidate.tags.filter((tag) => post.tags.includes(tag)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.candidate.date.localeCompare(a.candidate.date))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

function blockText(block: Block): string {
  switch (block.type) {
    case 'heading':
    case 'paragraph':
    case 'quote':
      return block.text;
    case 'code':
      return block.code;
    case 'list':
      return block.items.join(' ');
    case 'figure':
      return block.caption;
  }
}

const WORDS_PER_MINUTE = 200;

export function readingTime(post: Post): number {
  const words = post.body
    .map(blockText)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
