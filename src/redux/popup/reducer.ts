import { createReducer } from '@reduxjs/toolkit';

import { closePopup, openPopup } from './actions';
import { PopupState } from '@/redux/popup/types';

const defaultState: PopupState = { currentPopup: null, popupsData: [] };

export const popupReducer = createReducer(defaultState, builder => {
    builder
        .addCase(openPopup, (state, action) => {
            const popup = {
                data: action.payload.data,
                type: action.payload.type,
            };
            state.popupsData = [popup, ...state.popupsData.filter(el => el.type !== action.payload.type)];
            state.currentPopup = popup;
        })
        .addCase(closePopup, (state, action) => {
            state.popupsData = [...state.popupsData.filter(el => el.type !== action.payload.type)];
            state.currentPopup = state.popupsData[0] || null;
        });
});
