import { configureStore, } from '@reduxjs/toolkit';

import { reducer } from './reducer';

export const store = configureStore({
	reducer,
	devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export const wrapper = createWrapper(() => store);