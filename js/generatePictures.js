const pictures = document.querySelector('.pictures');
const picturesTitle = document.querySelector('.pictures__title');

export function generatePictures(photos) {
    const pics = photos.map(photo => generatePicture(photo));
    pictures.append(...pics);
    picturesTitle.classList.remove('visually-hidden');
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

