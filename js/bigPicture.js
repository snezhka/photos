import { resizeStep, resizeMax, modLength, effectsRanges } from './constants.js';
import { uploadFile } from './uploadFileForm.js';
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialComments = document.querySelector('.social__comments');
const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const close = document.querySelector('#picture-cancel');
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsShown = document.querySelector('.comments-shown');
const commentsCount = document.querySelector('.comments-count');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadScale = document.querySelector('.img-upload__scale');
const imgUploadForm = document.querySelector('.img-upload__form');
let slider = document.querySelector('#slider');
const sliderContainer = document.querySelector('.effect-level__slider');
let commentsArr = [];
let commentsNum = 0;

//Slider
function createSlider(effectName) {
    if (effectName == 'none') slider.remove();
    else {
        reloadSlider();
        const effectRange = effectsRanges[effectName];
        noUiSlider.create(slider, {
            start: effectRange.max,
            tooltips: true,
            range: {
                'min': effectRange.min,
                'max': effectRange.max
            },
            step: effectRange.step,
            connect: 'upper'
        });
        slider.noUiSlider.on('update', () => {
            let currentEffectName = '';
            Array.from(imgUploadPreview.classList).forEach((className) => {
                if (className.includes('--')) {
                    currentEffectName = className.slice(className.indexOf('--') + modLength);
                }
            })
            if (currentEffectName) changeEffectDensity(currentEffectName);
        });
    }
}

function reloadSlider() {
    slider.remove();
    slider = document.createElement('div');
    slider.id = 'slider';
    sliderContainer.appendChild(slider);
}

function changeEffectDensity(currentEffectName) {
    const currentEffectRange = effectsRanges[currentEffectName];
    let currentStep = +slider.noUiSlider.get();
    if (currentEffectName == 'phobos') currentStep += 'px';
    const filterValue = `filter: ${currentEffectRange.effect}(${currentStep})`;
    if (filterValue) imgUploadPreview.setAttribute('style', filterValue);

}

//Effects
imgUploadForm.addEventListener('change', (evt) => {
    if (evt.target.id == 'upload-file') {
        uploadFile(evt)
        createSlider('none');
    }
    if (evt.target.id.includes('effect')) {
        Array.from(imgUploadPreview.classList).forEach((className) => {
            if (className.includes('--')) {
                imgUploadPreview.classList.remove(className);
            }
        })
        const styleAttr = imgUploadPreview.getAttribute('style');
        if (styleAttr?.includes('filter')) imgUploadPreview.removeAttribute('style');
        const effectName = evt.target.value;
        if (effectName) {
            imgUploadPreview.classList.add(`effects__preview--${effectName}`);
            createSlider(effectName);
        }
    }

});

//Big picture
export function generateBigPicture(evt) {
    const smallPicture = evt.target;
    if (smallPicture.className == 'picture__img') {
        const pictures = Array.from(document.querySelectorAll('.picture__img'));
        const targetElement = pictures.find(pic => pic.id == smallPicture.id).parentElement;
        const comments = targetElement.querySelector('.comment_objects');
        bigPicture.classList.remove('hidden');
        bigPictureImg.src = evt.target.src;
        likesCount.textContent = targetElement.querySelector('.picture__likes').textContent;
        socialComments.innerHTML = '';
        commentsArr = JSON.parse(comments.textContent);
        commentsNum = commentsArr.slice().length;
        commentsLoader.classList.remove('hidden');
        generateComments(commentsNum);
        body.classList.add('.modal-open');
    }
}
function closeBigPicture() {
    bigPicture.classList.add('hidden');
    body.classList.remove('.modal-open');
}
close.addEventListener('click', () => {
    closeBigPicture();
})
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        closeBigPicture();
    }
});

//Comments
function generateComments(commentsNum) {
    commentsCount.innerHTML = commentsNum;
    let i = Math.min(5, commentsArr.length);
    let shown = 0;
    while (i != 0) {
        socialComments.innerHTML += `< li class="social__comment" > <img class="social__picture" src="${commentsArr[0].avatar}" alt="${commentsArr[0].name}" width="35" height="35"> <p class="social__text">${commentsArr[0].message}</p></li>`;
        commentsShown.innerHTML = ++shown;
        commentsArr.shift();
        i--;
    }
    if (commentsArr.length == 0) {
        commentsLoader.classList.add('hidden');
        commentsShown.innerHTML = commentsNum;
    }
}
commentsLoader.addEventListener('click', () => generateComments(commentsNum));

//Resize
imgUploadScale.addEventListener('click', (evt) => {
    let newValue;
    const currentValue = +scaleControlValue.value.slice(0, -1);
    if (evt.target.className.includes('smaller')) {
        newValue = (currentValue - resizeStep) < resizeStep ? resizeStep : currentValue - resizeStep;
    } else {
        newValue = (currentValue + resizeStep) > resizeMax ? resizeMax : currentValue + resizeStep;
    }
    scaleControlValue.value = `${newValue}% `;
    imgUploadPreview.setAttribute('style', `scale:${(newValue / 100)} `);
});
