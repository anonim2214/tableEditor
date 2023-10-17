import { createReducer } from '@reduxjs/toolkit';
import { clearAction, removeAction } from '@/redux/remove/actions';
import defaultState from '@/redux/remove/defaultState';

export const removeReducer = createReducer(defaultState, builder => {
    builder
        .addCase(removeAction.pending, (state, action) => {
            state.isError = false;
            state.isLoading = true;
            state.isFinished = false;
        })
        .addCase(removeAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.removedRows.push(action.meta.arg);
            state.isFinished = true;
        })
        .addCase(removeAction.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
        .addCase(clearAction, (state, action) => {
            state.isFinished = false;
        });
});