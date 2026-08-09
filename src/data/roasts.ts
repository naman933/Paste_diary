import { receipts } from './photos';

export interface ReceiptPhoto {
  src: string;
  from: string;
  quote: string;
  rotate: number;
}

// Real screenshots from Yash's actual Instagram/Facebook posts — the receipts.
export const receiptPhotos: ReceiptPhoto[] = [
  { src: receipts[0], from: 'the._.purple._.doc', quote: "You've became fat, man", rotate: -3 },
  { src: receipts[1], from: 'gowtami_menon', quote: 'Thank me for making you look okayish?', rotate: 2 },
  { src: receipts[2], from: 'bharath.29_', quote: 'Really man.. hockey? 😂😂😂', rotate: 1 },
  { src: receipts[3], from: '__amar.nath', quote: 'Tumko bahar kisne chod dia? zoo se 😂', rotate: -2 },
  { src: receipts[4], from: 'saket_0707', quote: 'Nazi bro? 😂', rotate: 3 },
  { src: receipts[5], from: 'paste_yash', quote: 'Nacho!', rotate: -1 },
  { src: receipts[6], from: 'Naman Karn', quote: 'aur ye munh mein lete hue 🔥😁', rotate: 2 },
];
