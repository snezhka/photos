
const bigPictureImg = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const socialComments = document.querySelector('.social__comments');
const bigPicture = document.querySelector('.big-picture');
const socialCaption = document.querySelector('.social__caption');
const commentsCount = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const close = document.querySelector('#picture-cancel');

export function generateBigPicture(evt) {
    const smallPicture = evt.currentTarget;
    const comments = smallPicture.querySelector('.comment_objects');
    bigPicture.classList.remove('hidden');
    console.log(evt.currentTarget);
    bigPictureImg.src = evt.target.src;
    likesCount.textContent = smallPicture.querySelector('.picture__likes').textContent;
    const commentsArr = JSON.parse(comments.textContent);
    socialComments.innerHTML = commentsArr.map(comment => `<li class="social__comment"><img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"> <p class="social__text">${comment.message}</p></li>`).join('');
    commentsCount.classList.add('hidden');
    body.classList.add('.modal-open');
    console.log(socialComments);
}

close.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.add('.modal-open');
})
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        bigPicture.classList.add('hidden');
        body.classList.add('.modal-open');
    }
});