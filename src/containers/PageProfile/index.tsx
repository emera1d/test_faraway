import React, { FC, useEffect, useMemo } from 'react';

import { fetchProfileById, setProfileFields } from '@store';
import { useAppDispatch, useAppSelector, useAppParams } from '@hooks';
import { CircularProgress, GenderIcon, Page } from '@components';

import { Field } from './Field';

import css from './pageprofile.module.scss';

export const PageProfile: FC = () => {
	const params = useAppParams();
	const dispatch = useAppDispatch();
	const { profile } = useAppSelector((store) => store.profile);

	useEffect(() => {
		const profileId = Number(params.id);
		dispatch(fetchProfileById(profileId));
	}, []);

	const fields = useMemo(() => {
		if (!profile) {
			return null;
		}

		const common = [
			{ name: 'gender', value: profile.gender },
			{ name: 'birth_year', value: profile.birth_year },
			{ name: 'height', value: profile.height },
			{ name: 'mass', value: profile.mass },
		];

		const additional = [
			{ name: 'skin_color' , value: profile.skin_color },
			{ name: 'hair_color' , value: profile.hair_color },
			{ name: 'eye_color' , value: profile.eye_color },
		];

		return { common, additional };
	}, [profile]);

	if (!profile || !fields) {
		return (
			<Page>
				<div className={css.loading}>
					<CircularProgress />
				</div>
			</Page>
		);
	}

	const dateCreated = new Date(profile.created);
	const dateEdited = new Date(profile.edited);

	const onChangeField = (name: string, value: string) => {
		const data = { [name]: value };

		dispatch(setProfileFields(data));
	};

	return (
		<Page>
			<div className={css.header}>
				<GenderIcon gender={profile.gender} color={profile.skin_color} />
				<h3 className={css.name}>{profile.name}</h3>
				<span className={css.created}>
					<span>Created</span>
					<span>{dateCreated.toLocaleDateString()} {dateCreated.toLocaleTimeString()}</span>
				</span>
			</div>
			<div className={css.params}>
				<div className={css.common}>
					{fields.common.map((iField) => (
						<Field
							name={iField.name}
							value={iField.value}
							onChange={onChangeField}
							key={`${iField.name}_${iField.value}`}
						/>
					))}
				</div>
				<div className={css.additional}>
					{fields.additional.map((iField) => (
						<Field
							name={iField.name}
							value={iField.value}
							onChange={onChangeField}
							key={`${iField.name}_${iField.value}`}
						/>
					))}
				</div>
			</div>
			<div className={css.edited}>
				Edited: {dateEdited.toLocaleDateString()} {dateEdited.toLocaleTimeString()}
			</div>
		</Page>
	);
};
