import { photos } from './photos';

export interface TimelineEvent {
  year: string;
  text: string;
}

export const timeline: TimelineEvent[] = [
  { year: '2016', text: 'The squad forms' },
  { year: '2018', text: 'First road trip disaster' },
  { year: '2020', text: 'Survived quarantine together (barely)' },
  { year: '2022', text: 'The legendary karaoke night' },
  { year: '2024', text: 'Friendsgiving tradition begins' },
  { year: '2026', text: 'This diary. Right now.' },
];

export const timelinePhotos = [
  { src: photos.baby, caption: 'Where it all began' },
  { src: photos.schoolSquad, caption: 'The OG squad' },
  { src: photos.beachUniform, caption: 'Uniform and all' },
  { src: photos.citiOffice, caption: 'Certified adult now' },
];
