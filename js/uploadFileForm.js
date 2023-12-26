import { hashTagsMax, hashTagMinLength, hashTagMaxLength, commentMaxLength } from './constants.js';
const editForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const hashTags = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const imgPreview = document.querySelector('.img-upload__preview img');
const buttonSubmit = document.querySelector('#upload-submit');
const uploadForm = document.querySelector('#upload-select-image');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const uploadButton = document.querySelector('#upload-file');

export function uploadFile(evt) {
    editForm.classList.remove('hidden');
    body.classList.add('modal-open');
    const uploadedFile = evt.target.files[0];
    if (uploadedFile.type !== 'image/png' && uploadedFile.type !== 'image/jpeg') console.log('File type should by png or jpeg!');
    imgPreview.file = uploadedFile;
    const reader = new FileReader();
    reader.onload = function (e) {
        imgPreview.src = e.target.result;
        console.log(e.target);
        console.log(imgPreview);
    };
    reader.onerror = function () { console.log(reader.error) };
    reader.readAsDataURL(uploadedFile);
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
    clearForm();
})
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        clearForm();
    }
});

export function validateForm() {
    validateHashTags();
    validateComments();

}

function validateHashTags() {
    let hashTagsArray = [];
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
    if (comment.value.length > commentMaxLength) {
        comment.setCustomValidity('Длина комментария не должна быть больше 140 символов');
    }
    comment.reportValidity();
}

uploadForm.addEventListener('submit', async function (evt) {
    evt.preventDefault();
    validateForm();
    const formData = new FormData(form);
    formData.set('filename', JSON.stringify(imgPreview.file.name));
    const payload = JSON.stringify(Object.fromEntries(formData));
    console.log('Form', payload);
    let response;
    let result;
    try {
        response = await fetch('http://localhost:8080/photo', {
            method: 'POST',
            body: payload,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    } catch (err) {
        generateErrorMessage();
        console.log(err.message);
    }
    try {
        result = await response.json();
        clearForm();
        generateSuccessMessage();
    } catch (err) {
        generateErrorMessage();
        console.log(err.message);
    }
});

function clearForm() {
    const effectNone = document.querySelector('#effect-none');
    const effectChecked = document.querySelector('input:checked');
    scaleControlValue.value = '100%';
    const styleAttr = imgUploadPreview.getAttribute('style');
    if (styleAttr?.includes('filter')) {
        imgUploadPreview.style.filter = 'none';
    }
    if (styleAttr?.includes('scale')) {
        imgUploadPreview.style.scale = 'none';
    }
    effectChecked.checked = false;
    effectNone.checked = true;
    hashTags.value = '';
    comment.value = '';
    closeUploadFile();
    uploadButton.value = '';
}

function generateSuccessMessage() {
    const success = document.querySelector('#success').cloneNode(true).content;
    body.append(success);
    const successForm = document.querySelector('.success');
    successForm.style.display = 'flex';
    document.addEventListener('click', evt => closeSuccessForm(evt));
    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            closeSuccessForm(evt);
        }
    });
    function closeSuccessForm(evt) {
        if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
            successForm.remove();
        }
    }
}

function generateErrorMessage() {
    const error = document.querySelector('#error').cloneNode(true).content;
    body.append(error);
    const errorForm = document.querySelector('.error');
    document.addEventListener('click', evt => closeErrorForm(evt));
    document.addEventListener('keydown', evt => {
        if (evt.key === 'Escape') {
            closeErrorForm(evt);
        }
    });
    function closeErrorForm(evt) {
        if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
            errorForm.remove();
        }
    }
}
