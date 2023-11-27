
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialComments = document.querySelector('.social__comments');
const bigPicture = document.querySelector('.big-picture');
const socialCaption = document.querySelector('.social__caption');
const commentsCount = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const close = document.querySelector('#picture-cancel');

export function generateBigPicture(evt) {
    const smallPicture = evt.target;
    if (smallPicture.className == 'picture__img') {
        const pictures = Array.from(document.querySelectorAll('.picture__img'));
        const targetElement = pictures.find(pic => pic.id == smallPicture.id).parentElement;
        const comments = targetElement.querySelector('.comment_objects');
        bigPicture.classList.remove('hidden');
        bigPictureImg.src = evt.target.src;
        likesCount.textContent = targetElement.querySelector('.picture__likes').textContent;
        const commentsArr = JSON.parse(comments.textContent);
        socialComments.innerHTML = commentsArr.map(comment => `<li class="social__comment"><img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"> <p class="social__text">${comment.message}</p></li>`).join('');
        commentsCount.classList.add('hidden');
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