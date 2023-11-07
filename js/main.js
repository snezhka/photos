import { generatePictures } from './generatePictures.js';
import { Photo } from './photo.js';
const photos = new Array(25).fill(null).map(() => new Photo());
generatePictures(photos);
console.log(photos);