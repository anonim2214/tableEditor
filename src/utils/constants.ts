import { Field } from '@/redux/params/types';

const fieldToTitle = (field: Field): string => {
    switch (field) {
        case 'name': return 'Имя';
        case 'phone': return 'Телефон';
        case 'email': return 'Email';
        case 'country': return 'Страна';
        case 'city': return 'Город';
        case 'state': return 'Штат';
        case 'licence_accepted': return 'Соглашение';
        case 'email_mail_accepted': return 'Рассылка';
        case 'updated': return 'Обновлено';
        case 'created': return 'Создано';
    }
};

const fields: Field[] = ['name', 'phone', 'email', 'country', 'state', 'city', 'licence_accepted', 'email_mail_accepted', 'created', 'updated'];

export { fields, fieldToTitle };