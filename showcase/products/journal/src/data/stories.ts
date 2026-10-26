export type SectionId = 'food' | 'design' | 'music' | 'neighbourhoods';
export type Kind = 'Essay' | 'Review' | 'Guide' | 'Interview' | 'Photo essay';

export interface Section {
  id: SectionId;
  name: string;
  editor: string;
  intro: string;
}

export const sections: Section[] = [
  {
    id: 'food',
    name: 'Food',
    editor: 'Nadia Okafor',
    intro:
      'Where Calder eats, who cooks it and what it costs. Reviews are paid for by us, booked under another name and never shown to the restaurant first.',
  },
  {
    id: 'design',
    name: 'Design',
    editor: 'Elliot Vance',
    intro:
      'Buildings, rooms, objects and the people who make them — from the housing trust stairwells to the last workshop bending neon by hand.',
  },
  {
    id: 'music',
    name: 'Music',
    editor: 'Ciarán Doyle',
    intro:
      'Gigs worth leaving the house for, the shops that keep the city digging, and the labels, choirs and DJs who make up its sound.',
  },
  {
    id: 'neighbourhoods',
    name: 'Neighbourhoods',
    editor: 'Ruth Abernethy',
    intro:
      'One street at a time: the markets, terraces, corner shops and fights over planning that decide what living in Calder is actually like.',
  },
];

export function sectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export interface Author {
  name: string;
  role: string;
  bio: string;
}

export const authors: Record<string, Author> = {
  'Nadia Okafor': {
    name: 'Nadia Okafor',
    role: 'Food editor',
    bio: 'Nadia has written about Calder’s kitchens since 2017 and edits the food section. She has eaten at every stall under the Tanner Street arches at least twice, and has opinions about all of them.',
  },
  'Elliot Vance': {
    name: 'Elliot Vance',
    role: 'Design editor',
    bio: 'Elliot trained as an architect before deciding he preferred writing about buildings to drawing them. He lives in a 1960s maisonette he will not stop talking about.',
  },
  'Ciarán Doyle': {
    name: 'Ciarán Doyle',
    role: 'Music editor',
    bio: 'Ciarán has run a Thursday night at the Coal Exchange for nine years and reviewed some six hundred gigs. He still buys a ticket for every one of them.',
  },
  'Ruth Abernethy': {
    name: 'Ruth Abernethy',
    role: 'Neighbourhoods editor',
    bio: 'Ruth grew up above a launderette in Upper Weir and covers housing, planning and the city’s streets. She is the only person on staff who reads every council minute.',
  },
  'Hana Novak': {
    name: 'Hana Novak',
    role: 'Contributing writer',
    bio: 'Hana writes about bread, work and the hours most people sleep through. Her first book, on night shifts, is out next spring.',
  },
  'Femi Adeyemi': {
    name: 'Femi Adeyemi',
    role: 'Contributing writer',
    bio: 'Femi is a record dealer, occasional DJ and the author of Halfpenny’s monthly crate column.',
  },
  'Saoirse Lynch': {
    name: 'Saoirse Lynch',
    role: 'Staff writer',
    bio: 'Saoirse covers the arts and anything with a queue outside it. Before Halfpenny she spent four years on a regional news desk.',
  },
  'Jun Takeda': {
    name: 'Jun Takeda',
    role: 'Photo editor',
    bio: 'Jun commissions and edits Halfpenny’s photography and shoots the Saturday photo essay.',
  },
  'Owen Pryce': {
    name: 'Owen Pryce',
    role: 'Contributing writer',
    bio: 'Owen writes about design, furniture and the small industries that survive in the old mill district.',
  },
};

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite: string }
  | { type: 'photo'; photo: string; caption: string; wide?: boolean };

export interface Story {
  slug: string;
  section: SectionId;
  kind: Kind;
  title: string;
  dek: string;
  author: string;
  date: string;
  /** Sort key, ISO. */
  iso: string;
  read: number;
  photo: string;
  caption: string;
  body: Block[];
  /** Venue facts printed on reviews. */
  verdict?: { place: string; address: string; price: string; rating: number };
}

const p = (text: string): Block => ({ type: 'p', text });

export const LONG_READ = 'the-last-hour-at-tanner-street';

export const stories: Story[] = [
  {
    slug: LONG_READ,
    section: 'food',
    kind: 'Essay',
    title: 'The last hour at Tanner Street',
    dek: 'For eleven years the night market under the railway arches has fed shift workers, students and anyone else awake after ten. Next spring the arches close for repair. Nadia Okafor spent a month of Fridays there, from setting up to sweeping down.',
    author: 'Nadia Okafor',
    date: '24 October 2026',
    iso: '2026-10-24',
    read: 12,
    photo: 'food-night-stall',
    caption: 'The first stall to light up on a Friday is usually the last to go dark.',
    body: [
      p('At half past six on a Friday the arches on Tanner Street are still just arches: nine brick vaults under the viaduct, shuttered, damp at the corners, with a smell of diesel from the bus depot opposite. By seven there are vans reversing onto the cobbles, gas bottles being rolled on their rims, and somebody shouting about an extension lead. By eight it is the busiest square of pavement in Calder.'),
      p('The Tanner Street night market began in 2015 with four stalls and a borrowed generator. It now has twenty-two traders, a waiting list that nobody admits to running, and a Friday crowd that the market’s own volunteers put at about three thousand people. It has never had a website. The opening hours — eight until one — have been painted on the same board, propped against the same arch, for eleven years.'),
      p('In March the arches close. Network engineers found water getting into the brickwork two winters ago, and the repair, which will take most of a year, means the vaults have to be emptied. The traders have been offered pitches in the car park behind the Corn Exchange. Most of them will take it. Almost none of them think it will be the same.'),
      p('I wanted to see the market as the people who run it do, so for four Fridays in September and October I arrived when the first van did and left when the last bin bag had gone into the skip. This is what I saw.'),
      { type: 'h2', text: 'Seven o’clock: the set-up' },
      p('The first trader on the cobbles is almost always Dev Sharma, who sells chaat from a tray the size of a door. He has done this for nine years and has the set-up down to fourteen minutes: trestle, cloth, tray, the twelve steel bowls of chutney and sev and pomegranate that go round its edge in the same order every week. He does not use a list. “If I change the order, I forget the tamarind,” he says. “Once, I forgot the tamarind. People still talk about it.”'),
      { type: 'photo', photo: 'food-street-tray', caption: 'Dev Sharma’s tray, fourteen minutes into set-up. The order of the bowls has not changed in nine years.' },
      p('Behind him, the arches fill from the inside out. The traders with gas — the noodle bar, the two grills, the woman who makes doughnuts to order — take the deep vaults where the extraction is better and the wind does not get at the flames. The cold stalls, pickles and bread and the man who sells only clementines in winter, take the mouths of the arches. Nobody remembers agreeing this. It is simply how it works.'),
      p('What strikes you, early, is how quiet it is. Traders who will spend the next five hours shouting over each other move around in near-silence, lending each other gaffer tape and change. Lena Kowalczyk, who runs the doughnut stall with her sister, says the hour before opening is the best part of the week. “Everyone is nice to each other at seven,” she says. “At midnight, less so.”'),
      { type: 'h2', text: 'Nine o’clock: the rush' },
      p('There are, according to the traders, three crowds at Tanner Street, and they arrive in order. The first is families and couples, out early, who eat standing up and leave by ten. The second is the pre-gig and pre-pub crowd, who move fast, order for groups, and pay by card. The third — the one the market was really built for — comes after eleven.'),
      p('At nine, though, it is all elbows. The queue for the noodle bar in the fourth arch runs back past the clementine man, round the bins and out onto the pavement. Ama Boateng, who has run the bar since 2018, makes one soup — a curried broth with egg noodles, topped with a handful of noodles fried until they shatter — and makes about four hundred bowls of it a night. Her brother takes the money. Her nephew, fifteen, is in charge of the fried noodles and is very serious about it.'),
      { type: 'photo', photo: 'food-noodle-soup', caption: 'The only thing on the menu at the fourth arch: curried noodle soup, £8.50, with the crispy noodles added at the last second.' },
      p('I asked Ama why she has never added a second dish. She looked at me as if I had asked why she does not also sell shoes. “Then there would be two queues,” she said. “And one of them would be shorter. And everybody would want to be in that one.”'),
      p('By ten the cobbles are slick with spilt drink and the generator at the far end has started its own rhythm, a low cough every few seconds that you stop hearing after twenty minutes. Volunteers in orange tabards — there are six of them, all regulars, none paid — empty the bins every half hour and point people to the one toilet, which is in the pub across the road and which the landlord has never once complained about.'),
      { type: 'quote', text: 'At ten the market feeds people who are going out. At midnight it feeds people who have been working. Those are not the same job.', cite: 'Ama Boateng, the fourth arch' },
      { type: 'h2', text: 'Eleven o’clock: the third crowd' },
      p('The shift changes at the infirmary at ten and at the parcel depot at half past. By eleven the people coming up Tanner Street are different: nurses in coats over scrubs, warehouse staff in hi-vis, two bus drivers who have come straight from the depot opposite and who, Dev tells me, have eaten at his stall every Friday for six years. Taxi drivers park on the double yellows with their hazards on and run in.'),
      p('This is the crowd the market was started for. Its founder, a former chef called Rob Ellery who now runs a bakery in Salt Quay, worked nights at the infirmary kitchens in his twenties and remembers what there was to eat in Calder at midnight: a kebab shop, a petrol station and a vending machine. “The idea was never a food market,” he told me. “The idea was dinner, for people whose dinner is at midnight.”'),
      p('The traders change their pace for it. Prices on several stalls drop after eleven — not officially, but noticeably. Portions get bigger. The grill in the seventh arch starts doing a “last orders” plate that is whatever is left, for a fiver. A paramedic called Joe, eating it on an upturned crate, tells me it is the best meal he has every week. “It’s not the food, exactly,” he says, and then reconsiders. “No, it is the food.”'),
      { type: 'photo', photo: 'hood-market-street', caption: 'Tanner Street from the viaduct steps, just after eleven. The awnings come down in the order they went up.', wide: true },
      { type: 'h2', text: 'One o’clock: sweeping down' },
      p('The board says one o’clock and the market keeps to it more strictly than you might expect. At ten to, the generators start going off one by one, and the arches go dark from the back. The traders have to be off the cobbles by two, under the terms of the licence, and they are; the licence has been renewed every year since 2016 and nobody wants to be the reason it is not.'),
      p('Packing down is louder than setting up. Everyone is tired and the jokes get worse. Food that will not keep goes round the traders, then to the volunteers, then, in foil trays, to the night shelter on Mill Lane, which sends someone with a trolley at quarter past. Lena counts out the float on an upturned bucket. Ama’s nephew, finally off fried-noodle duty, falls asleep in the van.'),
      p('The last thing to go is always the board. Dev carries it into the back of his van and wedges it behind the tray. He has painted the hours on it three times, he says, every time somebody has suggested a sign that lights up.'),
      { type: 'h2', text: 'What happens in March' },
      p('The move to the Corn Exchange car park is, on paper, an improvement. There will be proper power, so no generators. There will be toilets. The surface is tarmac rather than cobbles, which the doughnut sisters say will save their ankles. The council has promised the market will return to the arches when the repair is done, though it has not said when that will be or what the rent will be when it does.'),
      p('The traders are pragmatic. Most have families and mortgages and vans to pay for, and a Friday night is a fifth of their income. They will go where the pitches are. But nearly everyone I spoke to said the same thing in different words: that the arches do something the car park will not. They keep the rain off and the noise in. They make three thousand strangers feel like they are in somebody’s kitchen.'),
      p('On my last Friday I asked Rob Ellery, who still comes most weeks, whether the market would survive the move. He thought about it for a long time. “It’ll survive,” he said. “Whether it’s still Tanner Street is a different question. You can move the stalls. I don’t know if you can move the hour.”'),
      p('The Tanner Street night market runs every Friday, 8pm–1am, until Friday 26 February 2027. It reopens in the Corn Exchange car park on Friday 5 March.'),
    ],
  },
  {
    slug: 'the-bakers-who-start-at-three',
    section: 'food',
    kind: 'Interview',
    title: 'The bakers who start at three',
    dek: 'Five ovens, two mixers and a shift that ends before most of the city has had breakfast. Inside the wholesale bakery that supplies half the cafés in Calder.',
    author: 'Hana Novak',
    date: '22 October 2026',
    iso: '2026-10-22',
    read: 7,
    photo: 'food-baguettes',
    caption: 'The first rack of the morning, at 5.40am. It will be in a café on Bridge Street by seven.',
    body: [
      p('The alarm at Ferris & Daughter goes off at 2.45am, and by three the first of the day’s 1,800 baguettes is being shaped by hand on a floured bench that has been in the building since 1974.'),
      p('“People think the hard part is the hours,” says Marta Ferris, who took over the bakery from her father in 2019. “The hours are fine. The hard part is that bread does not care if you are tired. It wants exactly what it wants, exactly when it wants it.”'),
      p('We spoke to Marta and her team across a night shift about the cafés that rely on them, why they still shape everything by hand, and what it is like to finish work at eleven in the morning.'),
    ],
  },
  {
    slug: 'review-lantern-noodle-bar',
    section: 'food',
    kind: 'Review',
    title: 'Lantern, Corn Exchange: the broth is the whole point',
    dek: 'A twelve-seat noodle counter that does three things and will not be talked into a fourth. Go hungry, go early, don’t ask for the menu.',
    author: 'Nadia Okafor',
    date: '20 October 2026',
    iso: '2026-10-20',
    read: 5,
    photo: 'food-noodle-soup',
    caption: 'Khao soi at Lantern, £11, with pickled mustard greens and a wedge of lime on the side.',
    verdict: { place: 'Lantern', address: '3 Corn Exchange Arcade, Calder', price: 'About £30 for two', rating: 4 },
    body: [
      p('There is a moment, about four spoonfuls into the khao soi at Lantern, when the heat arrives all at once and you realise the broth has been building towards it the whole time. It is the best bowl of noodles I have eaten in Calder this year, and possibly the best value.'),
      p('Lantern has twelve stools, one cook and a menu written on a strip of masking tape. There are three soups, a plate of greens and a coconut pudding that sells out by eight. You queue on the arcade floor; nobody seems to mind.'),
    ],
  },
  {
    slug: 'twelve-pastries-worth-crossing-the-river-for',
    section: 'food',
    kind: 'Guide',
    title: 'Twelve pastries worth crossing the river for',
    dek: 'From a cardamom bun in Salt Quay to the only proper Portuguese tart north of the Weir. Our food desk ate its way round the city’s bakeries so you don’t have to.',
    author: 'Saoirse Lynch',
    date: '17 October 2026',
    iso: '2026-10-17',
    read: 9,
    photo: 'food-pastries',
    caption: 'The morning counter at Fold, Bridge Street, before the 8am queue.',
    body: [
      p('Calder has, by our count, thirty-one independent bakeries, which is either a sign of a healthy city or a sign that nobody here can make their own breakfast. We visited all of them across three weeks and came back with twelve pastries we would cross town for.'),
      p('The rules were simple: everything bought at the counter, paid for by us, eaten within ten minutes. No croissant could win on looks alone. Several tried.'),
    ],
  },
  {
    slug: 'review-wild-rye-salt-quay',
    section: 'food',
    kind: 'Review',
    title: 'Wild Rye, Salt Quay: the loaf that ate the menu',
    dek: 'A bakery that opened a dining room and somehow made the bread even more important. A lovely, uneven lunch.',
    author: 'Nadia Okafor',
    date: '13 October 2026',
    iso: '2026-10-13',
    read: 5,
    photo: 'food-loaf',
    caption: 'The fruit loaf at Wild Rye, served warm in its basket with cultured butter.',
    verdict: { place: 'Wild Rye', address: '18 Salt Quay, Calder', price: 'About £55 for two', rating: 3 },
    body: [
      p('The first thing to arrive at Wild Rye is a warm fruit loaf in a basket, and it is so good that the rest of lunch spends its time trying to catch up.'),
      p('Rob Ellery’s bakery has been one of the best in the city for six years. The new dining room behind it is bright, friendly and, for now, uneven: a superb plate of beans on toast, a timid soup, a pudding I would go back for.'),
    ],
  },
  {
    slug: 'a-spice-stall-crawl-of-the-eastgate-arcades',
    section: 'food',
    kind: 'Guide',
    title: 'A spice-stall crawl of the Eastgate arcades',
    dek: 'Seven stalls, one afternoon, about twenty pounds. A walking route through the covered arcades where the city buys its chillies, nuts and chaat.',
    author: 'Hana Novak',
    date: '9 October 2026',
    iso: '2026-10-09',
    read: 6,
    photo: 'food-street-tray',
    caption: 'Spiced nuts and sev, sold by the scoop, at the north entrance of the Eastgate arcade.',
    body: [
      p('Start at the north entrance, where the arcade smells of roasting cumin, and work south. You will want cash, an empty bag and no plans for dinner.'),
      p('The route takes about two hours at a stroll and covers seven stalls, from a nut roaster who has worked the same corner since 1988 to a stand that sells nothing but pickles.'),
    ],
  },
  {
    slug: 'forty-years-behind-the-counter',
    section: 'food',
    kind: 'Interview',
    title: '“People want to know what’s good this week”: forty years behind the counter',
    dek: 'Pat Mulvey has run a greengrocer on Weir Road since 1986. She talks supermarkets, seasons and why she will never sell a strawberry in January.',
    author: 'Ruth Abernethy',
    date: '6 October 2026',
    iso: '2026-10-06',
    read: 8,
    photo: 'hood-greengrocer',
    caption: 'Pat Mulvey’s front display on Weir Road, rebuilt by hand every morning at six.',
    body: [
      p('Pat Mulvey arranges the front of her shop every morning at six, and she does it the same way her mother did: the brightest thing in the middle, the cheapest thing at the front, and nothing out of season anywhere.'),
      p('“People don’t come here for the prices,” she says. “They come here because I’ll tell them the plums are no good this week. The supermarket won’t tell you that.”'),
    ],
  },
  {
    slug: 'review-linden-room',
    section: 'food',
    kind: 'Review',
    title: 'Linden Room: breakfast in the old print works',
    dek: 'Long tables, tall windows and a very good plate of eggs in a converted print hall. Weekends are chaos; go on a Tuesday.',
    author: 'Saoirse Lynch',
    date: '2 October 2026',
    iso: '2026-10-02',
    read: 4,
    photo: 'design-cafe-window',
    caption: 'The long table under the north windows at Linden Room, mid-morning on a weekday.',
    verdict: { place: 'Linden Room', address: 'Unit 2, Printworks Yard, Calder', price: 'About £25 for two', rating: 4 },
    body: [
      p('The print works on Alder Street closed in 1991 and spent thirty years as a carpet warehouse. Its new tenant has kept the brick, the steel windows and the floor, and filled the hall with long shared tables and the smell of toast.'),
      p('The menu is short and does breakfast properly: eggs, beans, a very good rye toast and a pot of coffee that arrives without anyone asking. Prices are fair. The weekend queue is not.'),
    ],
  },
  {
    slug: 'where-to-eat-on-a-sunday',
    section: 'food',
    kind: 'Guide',
    title: 'Where to eat on a Sunday when everything is shut',
    dek: 'Half the city’s kitchens close on Sundays. Here are the eighteen that don’t, from a market lunch to a roast that is worth the bus.',
    author: 'Nadia Okafor',
    date: '28 September 2026',
    iso: '2026-09-28',
    read: 7,
    photo: 'hood-market-street',
    caption: 'Sunday lunchtime on Pell Street, where the market cafés open from ten.',
    body: [
      p('Calder has a Sunday problem. Most independent kitchens close for the day, and the ones that do not are booked out by Thursday. We asked chefs, waiters and readers where they eat on their day off.'),
      p('The list is sorted by neighbourhood and marked by how easy it is to walk in. Bookings are noted where they help.'),
    ],
  },
  {
    slug: 'the-chef-who-makes-one-soup',
    section: 'food',
    kind: 'Interview',
    title: 'The chef who makes one soup, very well',
    dek: 'Ama Boateng serves four hundred bowls of the same curried noodle soup every Friday under the Tanner Street arches. She has no plans to add a second.',
    author: 'Hana Novak',
    date: '24 September 2026',
    iso: '2026-09-24',
    read: 6,
    photo: 'food-night-stall',
    caption: 'The fourth arch on Tanner Street at nine o’clock on a Friday.',
    body: [
      p('Ama Boateng started her noodle bar in 2018 with a recipe from her grandmother, a borrowed burner and the conviction that one dish, done right, is enough.'),
      p('Eight years on, the queue at the fourth arch is the longest at the market. We talked about stock, family, and why she has turned down three offers of a restaurant.'),
    ],
  },
  {
    slug: 'the-stairwells-of-the-housing-trust',
    section: 'design',
    kind: 'Essay',
    title: 'The stairwells of the Calder Housing Trust',
    dek: 'Built for 1930s tenants who would never own a car, the trust’s blocks put their best design into the one place everyone passed through. A look up, from the bottom.',
    author: 'Elliot Vance',
    date: '23 October 2026',
    iso: '2026-10-23',
    read: 10,
    photo: 'design-square-stair',
    caption: 'Looking up through the stairwell of Block C, Holloway Court, completed in 1936.',
    body: [
      p('The tenants of the Calder Housing Trust did not get much: two rooms, a scullery, a shared drying yard. What they got, without asking, was some of the most careful stair design in the north.'),
      p('The trust’s architect believed the stair was the street of the building, and drew every one of them like a public space. Ninety years on, the railings are still the best thing on the estate.'),
    ],
  },
  {
    slug: 'why-every-new-cafe-looks-like-this',
    section: 'design',
    kind: 'Essay',
    title: 'Why every new café looks like this',
    dek: 'White tiles, metal stools, a bare bulb. How one interior became the default for an entire city’s counters, and who is starting to push back.',
    author: 'Owen Pryce',
    date: '19 October 2026',
    iso: '2026-10-19',
    read: 8,
    photo: 'design-bar-stools',
    caption: 'Metal stools and white metro tiles: the counter that launched a thousand cafés.',
    body: [
      p('Walk into any café that opened in Calder in the last five years and you will probably find the same three things: white tiles, metal stools and a counter you are expected to stand at.'),
      p('It is a cheap fit-out, it photographs well and it wipes clean. Owen Pryce asked the designers responsible whether it is also, quietly, a little bit lazy.'),
    ],
  },
  {
    slug: 'review-concrete-futures',
    section: 'design',
    kind: 'Review',
    title: 'Concrete Futures at the Hallam Gallery: a love letter with footnotes',
    dek: 'A big, generous show about the city’s post-war buildings that is sometimes too fond of them to ask the hard questions.',
    author: 'Elliot Vance',
    date: '15 October 2026',
    iso: '2026-10-15',
    read: 6,
    photo: 'design-concrete-stair',
    caption: 'A cast of the library stair, the centrepiece of the show’s second room.',
    verdict: { place: 'Hallam Gallery', address: 'Gallery Square, Calder', price: 'Free, until 10 January', rating: 4 },
    body: [
      p('The centrepiece of Concrete Futures is a full-size cast of the central library stair, curving up through the second room of the Hallam Gallery like something alive. It is breathtaking, and it sets the tone for a show that is breathless in general.'),
      p('There is a lot to love here: original drawings, models and the first proper account of the city architect’s department. There is less on what it was like to live in these buildings, and that gap is hard to ignore.'),
    ],
  },
  {
    slug: 'the-last-workshop-bending-neon',
    section: 'design',
    kind: 'Interview',
    title: 'The last workshop in Calder bending neon by hand',
    dek: 'Glass, gas and a 1,000-degree flame. Inside the mill-district workshop that still makes signs the old way.',
    author: 'Owen Pryce',
    date: '8 October 2026',
    iso: '2026-10-08',
    read: 7,
    photo: 'design-neon-enter',
    caption: 'A sign made for a basement club on Mill Lane, tested in the workshop doorway.',
    body: [
      p('There used to be eleven neon workshops in Calder. Now there is one, on the second floor of a former thread mill, and it is booked up until the summer.'),
      p('Its owner learned to bend glass from the man who ran the workshop before her. She explains why LED copies never look quite right, and why she still tests every sign in the doorway.'),
    ],
  },
  {
    slug: 'inside-the-restored-alder-theatre',
    section: 'design',
    kind: 'Guide',
    title: 'Inside the restored Alder Theatre',
    dek: 'Seven years and £14 million later, the city’s grandest staircase is back. What to look at on the free open days this autumn.',
    author: 'Saoirse Lynch',
    date: '30 September 2026',
    iso: '2026-09-30',
    read: 5,
    photo: 'design-red-stair',
    caption: 'The restored grand stair, recarpeted in a red woven to the 1904 pattern.',
    body: [
      p('The Alder Theatre closed in 2019 with water coming through the dome. It reopens this winter with its plasterwork repaired, its seats rebuilt and its grand stair recarpeted in a red copied from a single surviving scrap.'),
      p('Free open days run every Saturday in November. Here is what to look for, from the painted ceiling to the box office nobody is allowed to change.'),
    ],
  },
  {
    slug: 'chairs-light-and-the-long-afternoon',
    section: 'design',
    kind: 'Essay',
    title: 'Chairs, light and the long afternoon',
    dek: 'A short essay on the best seat in the city, and what a good room does with October sunlight.',
    author: 'Elliot Vance',
    date: '21 September 2026',
    iso: '2026-09-21',
    read: 4,
    photo: 'design-chair-shadows',
    caption: 'Four o’clock at the reading room on Bridge Street, when the light reaches the back wall.',
    body: [
      p('At about four o’clock in October the light in the reading room on Bridge Street comes in low enough to reach the back wall, and every chair in the place throws a shadow twice its length.'),
      p('It is not an accident. The room was designed for it, and it is a reminder of what a building can do when somebody thinks about the afternoon.'),
    ],
  },
  {
    slug: 'a-week-behind-the-counter-at-spindle-records',
    section: 'music',
    kind: 'Essay',
    title: 'A week behind the counter at Spindle Records',
    dek: 'Seventy thousand records, one till, and customers who know exactly what they want and can’t remember what it’s called.',
    author: 'Femi Adeyemi',
    date: '21 October 2026',
    iso: '2026-10-21',
    read: 9,
    photo: 'music-shop-aisle',
    caption: 'The second aisle at Spindle Records, where the soul section starts and the jazz never quite ends.',
    body: [
      p('Spindle Records has been on Nelson Street since 1979 and has never once, as far as anyone can tell, been tidy. Femi Adeyemi spent a week working the counter.'),
      p('He learned the filing system (there isn’t one), the regulars (there are hundreds) and the single most common question asked in a record shop, which is “do you know that song that goes…”'),
    ],
  },
  {
    slug: 'review-low-tide-choir',
    section: 'music',
    kind: 'Review',
    title: 'Low Tide Choir at the Coal Exchange: loud, kind and slightly too long',
    dek: 'The city’s best-loved band played the biggest hometown show of their career. It was a celebration, and it felt like one.',
    author: 'Ciarán Doyle',
    date: '18 October 2026',
    iso: '2026-10-18',
    read: 4,
    photo: 'music-gig',
    caption: 'The second encore, under the purple lights, with the whole room singing.',
    verdict: { place: 'Coal Exchange', address: 'Exchange Street, Calder', price: 'Tour continues to December', rating: 4 },
    body: [
      p('By the second encore, nobody in the Coal Exchange was listening to Low Tide Choir so much as singing over them, and the band seemed perfectly happy about it.'),
      p('It was the biggest hometown show of their career, and they played like a band who know exactly how lucky they are. They also played for two hours and forty minutes, which is about forty minutes too long.'),
    ],
  },
  {
    slug: 'the-tape-trade',
    section: 'music',
    kind: 'Essay',
    title: 'The tape trade',
    dek: 'Cassettes never went away in Calder. A small network of labels, dubbing rooms and swaps is keeping the format, and a certain kind of DIY music, alive.',
    author: 'Ciarán Doyle',
    date: '11 October 2026',
    iso: '2026-10-11',
    read: 8,
    photo: 'music-cassette',
    caption: 'A demo from 1994, label hand-written, found in a box at the Pell Street flea.',
    body: [
      p('The cassette is cheap, robust and almost impossible to skip. For a small group of Calder labels, that makes it the perfect format.'),
      p('Ciarán Doyle visited the dubbing rooms, swap nights and tiny labels that release music nowhere else, and asked why anyone would choose tape in 2026.'),
    ],
  },
  {
    slug: 'the-record-shops-ranked',
    section: 'music',
    kind: 'Guide',
    title: 'The city’s record shops, ranked by how long you’ll stay',
    dek: 'From a twenty-minute browse to a lost afternoon. A guide to the nine independent record shops still open in Calder.',
    author: 'Femi Adeyemi',
    date: '4 October 2026',
    iso: '2026-10-04',
    read: 7,
    photo: 'music-record-racks',
    caption: 'The new arrivals racks at Groove Cellar, restocked on Thursdays.',
    body: [
      p('There are nine independent record shops in Calder, which is more than there were ten years ago. We ranked them the only way that matters: how long you will lose in each one.'),
      p('Times are averages from our staff, who were sent in with no plans and asked to leave when they felt like it. One of them did not come back until the shop shut.'),
    ],
  },
  {
    slug: 'the-dj-who-only-plays-records-under-a-pound',
    section: 'music',
    kind: 'Interview',
    title: 'The DJ who only plays records under a pound',
    dek: 'Every record in her set came out of a bargain bin. Her monthly night is the hardest ticket in town.',
    author: 'Femi Adeyemi',
    date: '26 September 2026',
    iso: '2026-09-26',
    read: 6,
    photo: 'music-digging',
    caption: 'Digging through the 50p box at the back of Spindle Records.',
    body: [
      p('The rule is simple: nothing that cost more than a pound. Every record at Bargain Bin, the monthly night at the Lamp Room, came out of a charity shop, a car boot or the 50p box at the back of a record shop.'),
      p('Its DJ talks about what she has found, what she will never play, and why the cheap records are often the best ones.'),
    ],
  },
  {
    slug: 'the-label-that-pressed-the-city',
    section: 'music',
    kind: 'Essay',
    title: 'The label that pressed the city',
    dek: 'Between 1978 and 1991, one tiny label released almost every band that mattered in Calder. Its archive has just been found in a lock-up.',
    author: 'Ciarán Doyle',
    date: '19 September 2026',
    iso: '2026-09-19',
    read: 11,
    photo: 'music-record-crates',
    caption: 'Part of the label’s archive: some 4,000 records, found in a lock-up in Salt Quay.',
    body: [
      p('When the lock-up on Ferry Lane was cleared in August, it held forty years of damp, a broken moped and around four thousand records: almost the entire back catalogue of the label that defined Calder’s sound.'),
      p('Ciarán Doyle tells the story of the label, the people who ran it and what happens to the archive now.'),
    ],
  },
  {
    slug: 'saturday-at-the-pell-street-flea',
    section: 'neighbourhoods',
    kind: 'Photo essay',
    title: 'Saturday at the Pell Street flea',
    dek: 'Brass, glass, coats and a great deal of haggling. Jun Takeda spent a morning at the city’s oldest flea market.',
    author: 'Jun Takeda',
    date: '25 October 2026',
    iso: '2026-10-25',
    read: 4,
    photo: 'hood-flea-crowd',
    caption: 'Ten o’clock, and the browsers are three deep at the book stall.',
    body: [
      p('The Pell Street flea has run every Saturday since 1962 and has never had more than a rope and a chalk line to mark the pitches. Jun Takeda photographed it from setting up to the last haggle.'),
      { type: 'photo', photo: 'hood-flea-table', caption: 'Glassware and brass on the first table inside the rope. Everything is £5 unless you ask.' },
      { type: 'photo', photo: 'hood-flea-clothes', caption: 'Coats by the kilo at the far end, where the serious buyers start.' },
    ],
  },
  {
    slug: 'painted-row',
    section: 'neighbourhoods',
    kind: 'Essay',
    title: 'Painted Row: how one street chose its colours',
    dek: 'Thirty-two houses, thirty-two colours and one very long residents’ meeting. The story behind the most photographed terrace in Calder.',
    author: 'Ruth Abernethy',
    date: '16 October 2026',
    iso: '2026-10-16',
    read: 8,
    photo: 'hood-painted-terraces',
    caption: 'Ashby Terrace, known to everyone as Painted Row, on a bright morning in October.',
    body: [
      p('In 2009 the residents of Ashby Terrace agreed to paint their houses. They did not agree on anything else, and the result is the most photographed street in the city.'),
      p('Ruth Abernethy talks to the people who live there about the meeting, the paint, and what it is like to have strangers photograph your front door every day.'),
    ],
  },
  {
    slug: 'living-here-upper-weir',
    section: 'neighbourhoods',
    kind: 'Guide',
    title: 'Living here: Upper Weir',
    dek: 'Steep streets, red roofs and the best view of the river. Our neighbourhood guide to the hill above the old mill district.',
    author: 'Ruth Abernethy',
    date: '7 October 2026',
    iso: '2026-10-07',
    read: 9,
    photo: 'hood-colour-cottages',
    caption: 'The cottages on Hill Rise, climbing up from the river towards the reservoir.',
    body: [
      p('Upper Weir is the part of Calder where everything is uphill, including the rent. It is also where you will find the city’s best view, two of its best pubs and a primary school with a waiting list longer than the high street.'),
      p('Our guide covers where to eat, drink and walk, what it costs to live there, and what the people who have lived there longest think of the newcomers.'),
    ],
  },
  {
    slug: 'the-fight-over-florian-terrace',
    section: 'neighbourhoods',
    kind: 'Essay',
    title: 'The fight over Florian Terrace',
    dek: 'A developer wants to replace a row of 1890s houses with flats. The residents want to keep them. The council has three weeks to decide.',
    author: 'Ruth Abernethy',
    date: '1 October 2026',
    iso: '2026-10-01',
    read: 10,
    photo: 'hood-red-row',
    caption: 'Florian Terrace, twenty-six houses built for railway workers in 1894.',
    body: [
      p('Florian Terrace has stood at the end of the tram line since 1894. A planning application lodged in August would replace it with 140 flats. The residents, many of whom have lived there for decades, have organised.'),
      p('Ruth Abernethy has read the application, the objections and the council’s housing targets, and explains what is really at stake.'),
    ],
  },
  {
    slug: 'second-hand-sundays',
    section: 'neighbourhoods',
    kind: 'Guide',
    title: 'Second-hand Sundays: the city’s best car boots and swaps',
    dek: 'Where to find a coat for £3, a lamp for £8 and a record you have been looking for since 2004.',
    author: 'Saoirse Lynch',
    date: '22 September 2026',
    iso: '2026-09-22',
    read: 6,
    photo: 'hood-flea-clothes',
    caption: 'The Sunday swap in the Weir Road school yard, where everything is free after noon.',
    body: [
      p('Calder’s weekend second-hand scene does not stop at Pell Street. Here are the car boots, swaps and jumble sales worth setting an alarm for.'),
      p('Each listing has opening times, the best time to arrive and what to bring. Cash is still king; so is a big bag.'),
    ],
  },
];

export function storyBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function storiesIn(section: SectionId): Story[] {
  return stories.filter((s) => s.section === section).sort((a, b) => b.iso.localeCompare(a.iso));
}

export const latest = [...stories].sort((a, b) => b.iso.localeCompare(a.iso));

export const mostRead: string[] = [
  LONG_READ,
  'the-fight-over-florian-terrace',
  'twelve-pastries-worth-crossing-the-river-for',
  'the-label-that-pressed-the-city',
  'painted-row',
];

export function storyHref(s: Story): string {
  return `/stories/${s.slug}`;
}
