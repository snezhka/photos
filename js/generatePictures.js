const pictures = document.querySelector('.pictures');

export function generatePictures(photos) {
    const pics = photos.map(photo => generatePicture(photo));
    pictures.append(...pics);
}

export function generatePicture(photo) {
    const picture = document.querySelector('#picture').cloneNode(true).content;
    picture.querySelector('.picture__img').src = photo.url;
    picture.querySelector('.picture__likes').textContent = photo.likes;
    picture.querySelector('.picture__comments').textContent = photo.comments;
    return picture;
}
