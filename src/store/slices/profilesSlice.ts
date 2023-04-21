import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Api, IApiProfile, IApiProfilesData } from '@api';
import { ModifyService } from '@services';

interface IProfilesState {
	isLoading: boolean;
	list: IApiProfile[];
	page: number;
	pages: number;
	search: string;
}

const initialState: IProfilesState = {
	page: 1,
	pages: 0,
	list: [],
	isLoading: false,
	search: '',
};

const PAGE_ITEMS_COUNT = 10;

export const fetchProfiles = createAsyncThunk(
	'profiles/fetchProfiles',
	async (data: { page: number, search?: string }, thunkAPI) => {
		const api = new Api();

		const params: { page: number, search?: string } = { page: data.page };
		if (data.search) {
			params.search = data.search;
		}
		const response = await api.fetchProfiles(params);
		return response;
	}
);

export const profilesSlice = createSlice({
	name: 'profiles',
	initialState,
	reducers: {
		setPage: (state, { payload }: { payload: number }) => {
			state.page = payload;
		},
		setSearch: (state, { payload }: { payload: string }) => {
			state.search = payload;
		}
	},
	extraReducers: {
		[String(fetchProfiles.pending)]: (state) => {
			state.isLoading = true;
		},
		[String(fetchProfiles.fulfilled)]: (state, { payload }: { payload: IApiProfilesData }) => {
			state.isLoading = false;

			state.list = payload.list.map((iProfile) => {
				let profile = iProfile;

				const modified = ModifyService.getProfile(profile.id);
				if (modified) {
					profile = {
						...profile,
						...modified,
					};
				}

				return profile;
			});

			state.pages = Math.ceil(payload.count / PAGE_ITEMS_COUNT)
		},
		[String(fetchProfiles.rejected)]: (state) => {
			state.isLoading = false;
		},
	},
});

export const {
	setPage,
	setSearch,
} = profilesSlice.actions;
