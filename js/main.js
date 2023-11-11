import { Photo } from './photo.js';
const photos = new Array(25).fill(null).map(() => new Photo());
console.log(photos);