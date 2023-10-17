import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { removeApi } from '@/redux/remove/api';

export const removeAction = createAsyncThunk('remove/remove', async (id: string) => {
    return await removeApi(id);
});

export const clearAction = createAction('remove/clear', () => {
    return { payload: { } };
});