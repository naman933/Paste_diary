import { photos } from './photos';

export interface Photo {
  src: string;
  caption: string;
}

// All 17 photos from the Childhood folder, oldest to most recent.
export const childhoodPhotos: Photo[] = [
  { src: photos.baby, caption: 'Where it all began' },
  { src: photos.toddlerCostume, caption: 'Certified menace since birth' },
  { src: photos.brothersHug, caption: 'Partners in crime' },
  { src: photos.kidShelf, caption: 'Just a kid and his toys' },
  { src: photos.mallChristmas, caption: 'Mall Christmas run' },
  { src: photos.schoolSquad, caption: 'The OG squad' },
  { src: photos.beachUniform, caption: 'Uniform and all' },
  { src: photos.hillsideSelfie, caption: 'Somewhere, sometime' },
  { src: photos.twoTeens, caption: 'Way back when' },
  { src: photos.blueKurta, caption: 'Festival night' },
  { src: photos.tealKurta, caption: 'Another festival fit' },
  { src: photos.tieSchool, caption: 'School formals' },
  { src: photos.tieCloseup, caption: 'Same day, closer look' },
  { src: photos.prismaShades, caption: 'From way back' },
  { src: photos.citiOffice, caption: 'Certified adult now' },
  { src: photos.workTeam, caption: 'The whole crew' },
  { src: photos.trainingRifle, caption: 'Training day chaos' },
];
