export type PageSlot =
  | { type: 'welcome-left' }
  | { type: 'welcome-right' }
  | { type: 'childhood'; part: number }
  | { type: 'roast'; part: number }
  | { type: 'friend-message'; person: number }
  | { type: 'friend-photos'; person: number }
  | { type: 'photo-pair'; pair: number }
  | { type: 'final-left' }
  | { type: 'final-right' };

export interface Spread {
  left: PageSlot;
  right: PageSlot;
}

// Childhood Memories: 17 photos across 4 pages (5/4/4/4).
// The Roast Page: 7 photos across 2 pages (3/4).
// Messages: Aditi/Disha/Aishwarya/Tanish/Tanuj each get message+photos;
// the remaining six photo-only friends close out the section as two
// triples on one spread.
export const pages: Spread[] = [
  { left: { type: 'welcome-left' }, right: { type: 'welcome-right' } },
  { left: { type: 'childhood', part: 0 }, right: { type: 'childhood', part: 1 } },
  { left: { type: 'childhood', part: 2 }, right: { type: 'childhood', part: 3 } },
  { left: { type: 'roast', part: 0 }, right: { type: 'roast', part: 1 } },
  { left: { type: 'friend-message', person: 0 }, right: { type: 'friend-photos', person: 0 } },
  { left: { type: 'friend-message', person: 1 }, right: { type: 'friend-photos', person: 1 } },
  { left: { type: 'friend-message', person: 2 }, right: { type: 'friend-photos', person: 2 } },
  { left: { type: 'friend-message', person: 3 }, right: { type: 'friend-photos', person: 3 } },
  { left: { type: 'friend-message', person: 4 }, right: { type: 'friend-photos', person: 4 } },
  { left: { type: 'photo-pair', pair: 0 }, right: { type: 'photo-pair', pair: 1 } },
  { left: { type: 'final-left' }, right: { type: 'final-right' } },
];
