import { generatePictures } from './generatePictures.js';
import { generateBigPicture } from './bigPicture.js';
import { validateForm } from './uploadFileForm.js';
import { Photo } from './photo.js';
const picturesContainer = document.querySelector('.pictures.container');
const uploadSubmit = document.querySelector('#upload-submit');

generatePictures(new Array(25).fill(null).map(() => new Photo()));

picturesContainer.addEventListener('click', (evt) => generateBigPicture(evt));

uploadSubmit.addEventListener('click', (evt) => validateForm(evt));