import { generatePictures } from './generatePictures.js';
import { generateBigPicture } from './bigPicture.js';
import { Photo } from './photo.js';
const photos = new Array(25).fill(null).map(() => new Photo());
generatePictures(photos);
const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const commentObjects = document.querySelector('.comment_objects');

pictures.forEach((picture) => picture.addEventListener('click', (evt) => {
    // bigPicture.classList.remove('hidden');
    // commentObjects.classList.remove('hidden');
    generateBigPicture(evt);
}));