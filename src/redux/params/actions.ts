import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Field, Filter } from '@/redux/params/types';

export const changeSortingAction = createAction('params/change-sorting', (field: Field) => {
    return { payload: field };
});

export const changeFiltersAction = createAction('params/change-filters', (filters: Filter[]) => {
    return { payload: { filters } };
});