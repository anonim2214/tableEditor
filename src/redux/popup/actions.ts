import { createAction } from '@reduxjs/toolkit';

import PopupType from './types';

export const openPopup = createAction('popup/open', (type: PopupType, data = null) => {
    return { payload: { type, data } };
});

export const closePopup = createAction('popup/close', (type: PopupType) => {
    return { payload: { type } };
});