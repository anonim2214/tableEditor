import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { paramsReducer } from '@/redux/params/reducer';
import { popupReducer } from '@/redux/popup/reducer';
import { removeReducer } from '@/redux/remove/reducer';
import { insertReducer } from '@/redux/insert/reducer';

const ACTIONS_TO_HIDE = [
];

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                // // Ignore these action types
                ignoredActions: [],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.filters', 'payload.data.handler'],
                // // Ignore these paths in the state
                ignoredPaths: ['params.filters.0.value.0', 'params.filters.0.value.1'],
            },
        }),
    reducer: {
        params: paramsReducer,
        popup: popupReducer,
        remove: removeReducer,
        insert: insertReducer,
    },
    devTools: { predicate: (state, action) => !ACTIONS_TO_HIDE.includes(action.type) },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
