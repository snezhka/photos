const editForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const hashTags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
let hashTagsArray = [];

export function uploadFile() {
    editForm.classList.remove('hidden');
    body.classList.add('modal-open');
}

hashTags.addEventListener('keydown', evt => evt.stopPropagation());
comment.addEventListener('keydown', evt => evt.stopPropagation());

uploadCancel.addEventListener('click', () => {
    editForm.classList.add('hidden');
    body.classList.remove('.modal-open');
    // uploadFileInput.value = '';
})
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        editForm.classList.add('hidden');
        body.classList.remove('.modal-open');
        // uploadFileInput.value = '';
    }
});

export function validateForm(evt) {
    evt.preventDefault();
    validateHashTags();
    validateComments();

}

function validateHashTags() {
    hashTags.removeAttribute('required');
    if (hashTags.value !== '') {
        hashTagsArray = hashTags.value.split(' ');
    }
    const newHashTagsArray = new Set();
    const regex = /#[0-9]*[a-z]*[A-Z]*/g;
    hashTagsArray.forEach((ht, index) => {
        if (index == 5) {
            hashTags.setCustomValidity('Количество хеш тэгов не должно превышать 5');
        } else {
            if (ht[0] !== '#') {
                hashTags.setCustomValidity('Хэш тэги должны начинаться с #');
                // hashTags.reportValidity();
            } else if (ht.match(regex).join('') !== ht) {
                hashTags.setCustomValidity('Хэш тэги должны содержать только буквенные и цифровые символы');
            } else if (ht.length > 20 || ht.length < 2) {
                hashTags.setCustomValidity('Длина одного хэш тэга должна быть меньше 20 символов и не должна состоять из одного #');
            } else if (newHashTagsArray.has(ht.toLowerCase())) {
                hashTags.setCustomValidity('Хэш теги не должны повторяться');
            } else {
                hashTags.setCustomValidity("");
            }
            newHashTagsArray.add(ht.toLowerCase());
        }
        hashTags.reportValidity();
    });

}

function validateComments() {
    comment.removeAttribute('required');
    if (comment.value.length > 140) {
        comment.setCustomValidity('Длина комментария не должна быть больше 140 символов');
    }
    comment.reportValidity();
}