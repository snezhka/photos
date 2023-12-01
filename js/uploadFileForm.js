import { hashTagsMax, hashTagMinLength, hashTagMaxLength, commentMaxLength } from './constants.js';
const editForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const hashTags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');

export function uploadFile() {
    editForm.classList.remove('hidden');
    body.classList.add('modal-open');
}

hashTags.addEventListener('keydown', evt => evt.stopPropagation());
comment.addEventListener('keydown', evt => evt.stopPropagation());
hashTags.addEventListener('input', evt => {
    if (evt.target.value.length == 0) {
        hashTags.setCustomValidity('');
    }
});

function closeUploadFile() {
    editForm.classList.add('hidden');
    body.classList.remove('.modal-open');
}
uploadCancel.addEventListener('click', () => {
    closeUploadFile();
})
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        closeUploadFile();
    }
});

export function validateForm(evt) {
    evt.preventDefault();
    validateHashTags();
    validateComments();

}

function validateHashTags() {
    let hashTagsArray = [];
    hashTags.removeAttribute('required');
    if (hashTags.value !== '') {
        hashTagsArray = hashTags.value.split(' ');
    }
    const newHashTagsArray = new Set();
    const regex = /#[0-9]*[a-z]*[A-Z]*/g;
    hashTagsArray.forEach((ht, index) => {
        if (index >= hashTagsMax) {
            hashTags.setCustomValidity('Количество хеш тэгов не должно превышать 5');
        } else {
            if (ht[0] !== '#') {
                hashTags.setCustomValidity('Хэш тэги должны начинаться с #');
            } else if (ht.match(regex).join('') !== ht) {
                hashTags.setCustomValidity('Хэш тэги должны содержать только буквенные и цифровые символы');
            } else if (ht.length > hashTagMaxLength || ht.length < hashTagMinLength) {
                hashTags.setCustomValidity('Длина одного хэш тэга должна быть меньше 20 символов и не должна состоять из одного #');
            } else if (newHashTagsArray.has(ht.toLowerCase())) {
                hashTags.setCustomValidity('Хэш теги не должны повторяться');
            } else {
                hashTags.setCustomValidity('');
            }
            newHashTagsArray.add(ht.toLowerCase());
        }
        hashTags.reportValidity();
    });

}

function validateComments() {
    comment.removeAttribute('required');
    if (comment.value.length > commentMaxLength) {
        comment.setCustomValidity('Длина комментария не должна быть больше 140 символов');
    }
    comment.reportValidity();
}