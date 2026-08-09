export type PageSlot =
  | { type: 'welcome-left' }
  | { type: 'welcome-right' }
  | { type: 'childhood'; part: number }
  | { type: 'roast'; part: number }
  | { type: 'messages-left' }
  | { type: 'messages-right' }
  | { type: 'blank' };

export interface Spread {
  left: PageSlot;
  right: PageSlot;
}

// Childhood Memories: 17 photos across 4 pages (5/4/4/4).
// The Roast Page: 7 photos across 3 pages (3/2/2), the 4th slot left blank.
export const pages: Spread[] = [
  { left: { type: 'welcome-left' }, right: { type: 'welcome-right' } },
  { left: { type: 'childhood', part: 0 }, right: { type: 'childhood', part: 1 } },
  { left: { type: 'childhood', part: 2 }, right: { type: 'childhood', part: 3 } },
  { left: { type: 'roast', part: 0 }, right: { type: 'roast', part: 1 } },
  { left: { type: 'roast', part: 2 }, right: { type: 'blank' } },
  { left: { type: 'messages-left' }, right: { type: 'messages-right' } },
];
