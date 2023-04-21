import { IApiProfile } from '@api';

const URL_TPL = 'https://swapi.dev/api/people/';

export const profileApiAdapter = (profile: Omit<IApiProfile, 'id'>): IApiProfile => {
	const id = Number(profile.url.replace(URL_TPL, '').slice(0, -1));

	return { ...profile, id };
};
