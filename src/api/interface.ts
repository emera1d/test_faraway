type ApiItemUrl = string;
type ApiDate = string;
type ApiSwDate = string;

type ApiHairColor = string;
type ApiEyeColor = string;

export enum EGender {
	MALE = 'male',
	FEMALE = 'female',
	HERMAPHRODITE = 'hermaphrodite',
	NA = 'n/a',
};

export type ESkinColor = string;

export interface IApiProfile {
	id: number;
	name: string;
	height: string;
	mass: string;
	hair_color: ApiHairColor; 
	birth_year: ApiSwDate, 
	skin_color: ESkinColor;
	eye_color: ApiEyeColor;
	gender: EGender, 
	homeworld: ApiItemUrl;
	films: ApiItemUrl[];
	species: ApiItemUrl[];
	vehicles: ApiItemUrl[];
	starships: ApiItemUrl[];
	created: ApiDate; 
	edited: ApiDate;
	url: ApiItemUrl;
}

export interface IApiProfileRequest {
	id: number;
}

export interface IApiProfileResponse {

}

export interface IApiProfilesRequest {
	page?: number;
	search?: string;
}

export interface IApiProfilesResponse {
	count: number, 
    next: string, 
    previous: string, 
    results: Omit<IApiProfile, 'id'>[];
}

export interface IApiProfilesData {
	list: IApiProfile[];
	count: number;
}
