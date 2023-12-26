import { generateInteger } from './helpers.js';

const pictures = document.querySelector('.pictures');
const picturesTitle = document.querySelector('.pictures__title');
const filtersTitle = document.querySelector('.img-filters__title');
const filters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
let defaultPhotos;

export function generatePictures(photos) {
    defaultPhotos = photos;
    const pics = photos.map(photo => generatePicture(photo));
    pictures.append(...pics);
    picturesTitle.classList.remove('visually-hidden');
    filtersTitle.classList.remove('visually-hidden');
    filters.classList.remove('img-filters--inactive');
}

function generatePicture(photo) {
    const picture = document.querySelector('#picture').cloneNode(true).content;
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__img').id = photo.id;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').innerHTML = `<span class='comments_size'>${photo.comments.length}</span>`;
    picture.querySelector('.picture__comments').innerHTML += `<div class='comment_objects hidden'>${JSON.stringify(photo.comments)}</div>`;
    return picture;
}

function filterRandomPhotos() {
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    removePictures();
    const randomNum = [];
    const randomPhotos = []
    for (let i = 0; i < defaultPhotos.length; i++) {
        if (randomNum.length > 9) break;
        let rand = generateInteger(0, defaultPhotos.length - 1);
        if (!randomNum.includes(rand)) {
            randomPhotos.push(defaultPhotos[rand]);
            randomNum.push(rand);
        }
    }
    const randomPics = randomPhotos.map(photo => generatePicture(photo));
    pictures.append(...randomPics);
}

function filterDiscussedPhotos() {
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    removePictures();
    const discussedPhotos = defaultPhotos.slice();
    const sorted = discussedPhotos.sort((a, b) => {
        if (a.comments.length < b.comments.length) {
            return 1;
        }
        if (a.comments.length > b.comments.length) {
            return -1;
        }
        return 0;
    });

    const discussedPics = sorted.map(photo => generatePicture(photo));
    pictures.append(...discussedPics);
}

function filterDefaultPhotos() {
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.add('img-filters__button--active');
    removePictures();
    const defaultPics = defaultPhotos.map(photo => generatePicture(photo));
    pictures.append(...defaultPics);
}

function removePictures() {
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach(pic => pic.remove());
}

const debounce = (func, wait) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer
            = setTimeout(() => func.apply(context, args), wait)
    }
}

filterRandom.addEventListener('click', debounce(filterRandomPhotos, 500));
filterDiscussed.addEventListener('click', debounce(filterDiscussedPhotos, 500));
filterDefault.addEventListener('click', debounce(filterDefaultPhotos, 500));





