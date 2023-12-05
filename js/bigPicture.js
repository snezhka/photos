
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialComments = document.querySelector('.social__comments');
const bigPicture = document.querySelector('.big-picture');
const socialCaption = document.querySelector('.social__caption');
const body = document.querySelector('body');
const close = document.querySelector('#picture-cancel');
const commentsLoader = document.querySelector('.social__comments-loader');
const commentsShown = document.querySelector('.comments-shown');
const commentsCount = document.querySelector('.comments-count');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

let commentsArr = [];
let commentsNum = 0;

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

function generateComments(commentsNum) {
    commentsCount.innerHTML = commentsNum;
    let i = Math.min(5, commentsArr.length);
    let shown = 0;
    while (i != 0) {
        socialComments.innerHTML += `<li class="social__comment"><img class="social__picture" src="${commentsArr[0].avatar}" alt="${commentsArr[0].name}" width="35" height="35"> <p class="social__text">${commentsArr[0].message}</p></li>`;
        commentsShown.innerHTML = ++shown;
        commentsArr.shift();
        i--;
    }
    if (commentsArr.length == 0) {
        commentsLoader.classList.add('hidden');
        commentsShown.innerHTML = commentsNum;
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
commentsLoader.addEventListener('click', () => generateComments(commentsNum));
scaleControlSmaller.addEventListener('click', () => {
    const currentValue = +scaleControlValue.value.slice(0, -1);
    const newValue = (currentValue - 25) < 25 ? 25 : currentValue - 25;
    scaleControlValue.value = `${newValue} %`;
    imgUploadPreview.setAttribute('style', `scale:${(newValue / 100)}`);
})
scaleControlBigger.addEventListener('click', () => {
    const currentValue = +scaleControlValue.value.slice(0, -1);
    const newValue = (currentValue + 25) > 100 ? 100 : currentValue + 25;
    scaleControlValue.value = `${newValue} %`;
    imgUploadPreview.setAttribute('style', `scale:${(newValue / 100)}`);
})
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});