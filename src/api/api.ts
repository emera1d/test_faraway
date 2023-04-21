import {
	IApiProfile,
	IApiProfileRequest,
	IApiProfilesRequest,
	IApiProfilesResponse,
	IApiProfilesData,
} from './interface';

import { profileApiAdapter } from './profileApiAdapter';

const BASE_API_URL = 'https://swapi.dev/api/';

interface IFetchParams {
	body?: { [key: string]: any };
}

export class Api {
	async fetchProfile(req: IApiProfileRequest): Promise<IApiProfile> {
		const data = await this.fetch(`people/${req.id}`) as IApiProfile;

		return profileApiAdapter(data);
	}

	async fetchProfiles(request?: IApiProfilesRequest): Promise<IApiProfilesData> {
		const params = request
			? { body: { page: request.page, search: request.search || undefined } }
			: undefined;
		const data = await this.fetch('people/', params) as IApiProfilesResponse;

		const list = data.results.map((iProfile) => profileApiAdapter(iProfile));

		return { list, count: data.count };
	}

	private async fetch(action: string, params?: IFetchParams): Promise<any> {
		const url = this.makeUrl(`${BASE_API_URL}${action}`, params);
		const res = await fetch(url, { method: 'get' });
		const data = await res.json();

		return data;
	}

	private makeUrl(url: string, params?: IFetchParams): string {
		if (!params) {
			return url;
		}

		const objUrl = new URL(url);
		const body = params.body;
		for (const key in body) {
			if (body[key] !== undefined) {
				objUrl.searchParams.append(key, body[key]);
			}
		}

		return objUrl.toString();
	}
}
