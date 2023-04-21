import {
	profileSlice,
	profilesSlice,
} from './slices';

export const reducer = {
	['profile']: profileSlice.reducer,
	['profiles']: profilesSlice.reducer,
};
