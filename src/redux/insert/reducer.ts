import { createReducer } from '@reduxjs/toolkit';
import { clearActiveRowAction, insertAction } from '@/redux/insert/actions';
import defaultState from '@/redux/insert/defaultState';
import { clearAction } from '@/redux/insert/actions';

export const insertReducer = createReducer(defaultState, builder => {
    builder
        .addCase(insertAction.pending, (state, action) => {
            state.isError = false;
            state.isLoading = true;
            state.isNew = !action.meta.arg.id;
        })
        .addCase(insertAction.fulfilled, (state, action) => {
            state.isFinished = true;
            state.isLoading = false;
            state.activeRow = action.payload.data;
        })
        .addCase(insertAction.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
        .addCase(clearAction, (state, action) => {
            state.isFinished = false;
        })
        .addCase(clearActiveRowAction, (state, action) => {
            state.activeRow = undefined;
        });
});