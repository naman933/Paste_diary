import { photos } from './photos';

export interface Photo {
  src: string;
  caption: string;
}

export interface FriendSpread {
  name: string;
  initial: string;
  since: string;
  color: string;
  msg: string;
  photos: Photo[];
  roast: string;
}

export const friends: FriendSpread[] = [
  {
    name: 'Jamie',
    initial: 'J',
    since: '2018',
    color: '#C9A63A',
    msg: "Yash, you absolute legend.\n\nRemember our road trip when the GPS died and you navigated us using the actual stars? (We ended up at a gas station 3 miles from where we started, but still.)\n\nYou're the kind of friend who shows up at 2am with snacks when someone's having a bad day. Never change.",
    photos: [
      { src: photos.brothersHug, caption: "Way back when" },
      { src: photos.kidShelf, caption: "Still the same troublemaker" },
    ],
    roast: 'Your email etiquette is... charmingly unique. Never change. 🙃',
  },
  {
    name: 'Sara',
    initial: 'S',
    since: '2017',
    color: '#B85C5C',
    msg: "Happy birthday to the only person I know who can trip over absolutely nothing and make it look graceful.\n\nYou've been my go-to call for good news AND bad news since forever. Here's to another year of your questionable life decisions that somehow always work out.",
    photos: [
      { src: photos.mallChristmas, caption: "Mall Christmas run" },
      { src: photos.hillsideSelfie, caption: "That one road trip" },
    ],
    roast: "You've had the same password forever. It's honestly impressive. 🔓",
  },
  {
    name: 'Mike',
    initial: 'M',
    since: '2019',
    color: '#5C8AB8',
    msg: "Bro, where do I even start.\n\nYou're the glue of this group and everyone knows it. Also the only person who can make a 20-minute story about going to the grocery store genuinely entertaining.\n\nNever stop being you. (Except maybe learn to cook. Please.)",
    photos: [
      { src: photos.twoTeens, caption: "Somewhere, sometime" },
      { src: photos.blueKurta, caption: "Festival night" },
    ],
    roast: "Your cooking is... an adventure. We love you for trying tho.",
  },
  {
    name: 'Priya',
    initial: 'P',
    since: '2016',
    color: '#8B5CA8',
    msg: "Yash Paste. The nickname. The legend.\n\nTen years of friendship and you still haven't returned my hoodie. At this point it's yours. I've accepted it.\n\nYou make every room brighter just by walking into it. Happy birthday, you wonderful human.",
    photos: [
      { src: photos.tealKurta, caption: "College days" },
      { src: photos.tieSchool, caption: "Formal-ish" },
    ],
    roast: "Still waiting for you to return my hoodie from 2019. It's fine. Really.",
  },
  {
    name: 'Dan & Taylor',
    initial: 'D',
    since: '2020',
    color: '#5CAA8B',
    msg: "From Dan: Your dance moves are truly one of a kind. Never stop. And I mean that sincerely — they make everyone smile.\n\nFrom Taylor: Remember when you teared up at that dog food ad? Honestly, same. You have the biggest heart of anyone we know.",
    photos: [
      { src: photos.tieCloseup, caption: "Same day, closer look" },
      { src: photos.workTeam, caption: "The whole crew" },
    ],
    roast: '"Almost ready!" — a phrase with very flexible meaning coming from you. ⏰',
  },
];
