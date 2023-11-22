import { generatePictures } from './generatePictures.js';
import { generateBigPicture } from './bigPicture.js';
import { Photo } from './photo.js';
const photos = new Array(25).fill(null).map(() => new Photo());
generatePictures(photos);
const picturesContainer = document.querySelector('.pictures.container');

picturesContainer.addEventListener('click', (evt) => {
    generateBigPicture(evt);
});