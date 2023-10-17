import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { insertApi } from '@/redux/insert/api';
import { InsertData } from '@/types';

export const insertAction = createAsyncThunk('insert/insert', async (data: InsertData) => {
    return await insertApi(data);
});

export const clearAction = createAction('insert/clear', () => {
    return { payload: { } };
});
export const clearActiveRowAction = createAction('insert/clear-active-row', () => {
    return { payload: { } };
});