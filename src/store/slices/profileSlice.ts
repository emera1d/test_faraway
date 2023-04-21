
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api, IApiProfile } from '@api';
import { ModifyService } from '@services';

interface IProfileState {
	isLoading: boolean;
	profile: IApiProfile | null;
}

const initialState: IProfileState = {
	isLoading: false,
	profile: null,
};

export const fetchProfileById = createAsyncThunk(
	'profile/fetchProfile',
	async (id: number, thunkAPI) => {
		const api = new Api();
		const response = await api.fetchProfile({ id });

		return response;
	}
);

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfileFields: (state, { payload }: { payload: Partial<IApiProfile> }) => {
			if (!state.profile) {
				return;
			}

			const changes: Partial<IApiProfile> = {
				...payload,
				edited: new Date().toISOString(),
			};

			state.profile = {
				...state.profile,
				...changes,
			};

			ModifyService.saveProfile(state.profile.id, changes);
		},
	},
	extraReducers: {
		[String(fetchProfileById.pending)]: (state) => {
			state.isLoading = true;
			state.profile = null;
		},
		[String(fetchProfileById.fulfilled)]: (state, { payload }: { payload: IApiProfile }) => {
			state.isLoading = false;
			let profile = payload;

			const modified = ModifyService.getProfile(profile.id);
			if (modified) {
				profile = {
					...profile,
					...modified,
				};
			}

			state.profile = profile;
		},
		[String(fetchProfileById.rejected)]: (state) => {
			state.isLoading = false;
		},
	},
});

export const {
	setProfileFields,
} = profileSlice.actions;
