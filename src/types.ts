export type ModalState =
  | { type: 'camera' }
  | { type: 'cake' }
  | { type: 'sticky' }
  | { type: 'photo'; src: string; caption: string }
  | null;

export type Phase = 'dark' | 'lit' | 'opening' | 'open';
export type FlipDirection = 'next' | 'prev' | null;
