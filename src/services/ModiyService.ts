import { IApiProfile } from '@api';

type ProfileFields = Partial<IApiProfile>;

const STORAGE_KEY = 'sw_profiles';

class CModifyService {
	private map: { [ key: number ]: ProfileFields } = {};

	constructor() {
		this.load();
	}

	getProfile(id: number): ProfileFields | null {
		return this.map[id] || null;
	}

	saveProfile(id: number, data: ProfileFields) {
		if (!this.map[id]) {
			this.map[id] = {};
		}

		this.map[id] = {
			...this.map[id],
			...data,
		};

		this.save();
	}

	private load() {
		const value = localStorage.getItem(STORAGE_KEY);
		if (value) {
			this.map = JSON.parse(value);
		}
	}

	private save() {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.map));
	}
}

export const ModifyService = new CModifyService();
