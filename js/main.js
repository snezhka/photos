import { generatePictures } from './generatePictures.js';
import { generateBigPicture } from './bigPicture.js';
import { uploadFile, validateForm } from './uploadFileForm.js';
import { Photo } from './photo.js';
// const photos = new Array(25).fill(null).map(() => new Photo());
const picturesContainer = document.querySelector('.pictures.container');
const uploadFileInput = document.querySelector('#upload-file');
const uploadSubmit = document.querySelector('#upload-submit');

generatePictures(new Array(25).fill(null).map(() => new Photo()));

picturesContainer.addEventListener('click', (evt) => generateBigPicture(evt));

uploadFileInput.addEventListener('change', (evt) => uploadFile(evt));
uploadSubmit.addEventListener('click', (evt) => validateForm(evt));