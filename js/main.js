import { generatePictures } from './generatePictures.js';
import { generateBigPicture } from './bigPicture.js';
import { validateForm } from './uploadFileForm.js';
const picturesContainer = document.querySelector('.pictures.container');
const uploadSubmit = document.querySelector('#upload-submit');

fetch('http://localhost:8080/photos').then(data => data.json()).then(photos => {
    generatePictures(photos)
}).catch(err => console.log(err.message));

picturesContainer.addEventListener('click', (evt) => generateBigPicture(evt));

uploadSubmit.addEventListener('click', (evt) => validateForm(evt));