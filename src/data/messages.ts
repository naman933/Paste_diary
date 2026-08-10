import aditi1 from '../assets/photos/messages/aditi-1.jpeg';
import aditi2 from '../assets/photos/messages/aditi-2.jpeg';
import aishwarya from '../assets/photos/messages/aishwarya.jpeg';
import disha from '../assets/photos/messages/disha.jpeg';
import harnoor from '../assets/photos/messages/harnoor.jpeg';
import naman from '../assets/photos/messages/naman.jpg';
import param from '../assets/photos/messages/param.jpeg';
import seem from '../assets/photos/messages/seem.jpeg';
import shreya from '../assets/photos/messages/shreya.jpeg';
import shristi from '../assets/photos/messages/shristi.jpeg';
import tanish from '../assets/photos/messages/tanish.jpeg';
import tanuj from '../assets/photos/messages/tanuj.jpeg';

export interface FriendMessage {
  name: string;
  lines: string[];
  photos: string[];
}

// Friends who left a message. Photos paired in where available.
export const friendMessages: FriendMessage[] = [
  {
    name: 'Aditi',
    lines: [
      'I learned from you that it’s okay to be Steve',
      'You bring a ray of positivity and calm that was missed in the chaotic bunch called Rec 2.0, the extra 2 months better get you that ppo 😡',
    ],
    photos: [aditi1, aditi2],
  },
  {
    name: 'Disha',
    lines: [
      'Still left to learn - how the world looks like from so high up above!',
      'One thing I will always cherish will be you dropping in sweet wishes and appreciation texts for my smollest achievements!',
    ],
    photos: [disha],
  },
  {
    name: 'Aishwarya',
    lines: [
      'Plot twists arent just for movies xD',
      'We are all in the same boat ifykyk xDD',
      'Timing beats history 🤣🤣🤣',
      'Still not over us beating C in the Badminton Div Wars finals',
    ],
    photos: [aishwarya],
  },
  {
    name: 'Tanish',
    lines: ['I had better hopes from you, you were my role model'],
    photos: [tanish],
  },
  {
    name: 'Tanuj',
    lines: ['Is pe ruk jaaio ab'],
    photos: [tanuj],
  },
  {
    name: 'Shristi',
    lines: [
      'Hey Paste',
      'You are one of the sweetest people in our group, we bonded over our pune stories and IM assignments 😂😂',
      'Hope you get the PPO and don’t you dare forget to give me a referral later ❤️❤️😌😌',
    ],
    photos: [shristi],
  },
  {
    name: 'Seem',
    lines: ['If this was the most thrilling thing you have done...wait for so many more to come!! ;)', 'To the start of something!!'],
    photos: [seem],
  },
];

export interface PhotoOnlyFriend {
  name: string;
  src: string;
}

// Friends with a photo but no written message — paired up two per page.
export const photoOnlyFriends: PhotoOnlyFriend[] = [
  { name: 'Harnoor', src: harnoor },
  { name: 'Shreya', src: shreya },
  { name: 'Param', src: param },
  { name: 'Naman', src: naman },
];

export const photoPairs: PhotoOnlyFriend[][] = [
  [photoOnlyFriends[0], photoOnlyFriends[1]],
  [photoOnlyFriends[2], photoOnlyFriends[3]],
];
