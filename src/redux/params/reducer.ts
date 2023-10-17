import { createReducer } from '@reduxjs/toolkit';
import { changeFiltersAction, changeSortingAction, setActiveRowAction } from '@/redux/params/actions';
import defaultState from '@/redux/params/defaultState';

export const paramsReducer = createReducer(defaultState, builder => {
    builder
        .addCase(changeSortingAction, (state, action) => {
            if (state.sorting.length > 0) {
                const sortingIndex = state.sorting.findIndex(e => e.field === action.payload);
                if (sortingIndex > -1) {
                    if (state.sorting[sortingIndex].type === 'asc') {
                        state.sorting[sortingIndex].type = 'desc';
                    } else {
                        state.sorting.splice(sortingIndex, 1);
                    }
                } else {
                    if ((action.payload === 'state' || action.payload === 'city' || action.payload === 'country') &&
                        !(state.sorting[0].field === 'state' || state.sorting[0].field === 'city' || state.sorting[0].field === 'country') ||
                        !(action.payload === 'state' || action.payload === 'city' || action.payload === 'country')) {
                        state.sorting = [];
                    }
                    state.sorting.push({
                        field: action.payload,
                        type: 'asc',
                    });
                }
            } else {
                state.sorting.push({
                    field: action.payload,
                    type: 'asc',
                });
            }
        }).addCase(changeFiltersAction, (state, action) => {
            state.filters = action.payload.filters;
        });
});