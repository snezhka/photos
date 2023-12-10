export const likes = {
    min: 15,
    max: 200,
}

export const comments = {
    min: 1,
    max: 10,
}

export const avatars = {
    min: 1,
    max: 6,
}

export const messages = ['Все відмінно!', 'Загалом все непогано.Але не всі.',
    'Коли ви робите фотографію, добре б прибирати палець із кадру.Зрештою, це просто непрофесійно.',
    'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
    'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
    'Обличчя людей на фотці перекошені, ніби їх побивають.Як можна було зловити такий невдалий момент?'];

export const names = ['Иван', 'Федор', 'Илья', 'Виктор', 'Петр', 'Максим', 'Денис', 'Дмитрий', 'Валерий', 'Алексей'];

export const surNames = ['Иванов', 'Петров', 'Лысенко', 'Шевченко', 'Кузнецов', 'Смирнов', 'Попов', 'Васильев', 'Соколов', 'Михайлов'];

export const hashTagsMax = 5;
export const hashTagMinLength = 2;
export const hashTagMaxLength = 20;
export const commentMaxLength = 140;
export const resizeStep = 25;
export const resizeMax = 100;
export const modLength = 2;

export const effectsRanges = {
    'chrome': {
        min: 0,
        max: 1,
        step: 0.1,
        effect: 'grayscale'
    },
    'sepia': {
        min: 0,
        max: 1,
        step: 0.1,
        effect: 'sepia'
    },
    'marvin': {
        min: 0,
        max: 1,
        step: 0.01,
        effect: 'invert'
    },
    'phobos': {
        min: 1,
        max: 30,
        step: 1,
        effect: 'blur'
    },
    'heat': {
        min: 1,
        max: 3,
        step: 0.1,
        effect: 'brightness'
    }
};