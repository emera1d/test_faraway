import React, { FC, useCallback } from 'react';

import { IApiProfile } from '@api';
import { GenderIcon } from '@components';

import css from './profileitem.module.scss';

interface IProfileItemProps {
	profile: IApiProfile;
	onClick: (profile: IApiProfile) => void;
}

export const ProfileItem: FC<IProfileItemProps> = ({ profile, onClick }) => {
	const onClickContainer = useCallback(() => onClick(profile), [profile, onClick]);

	return (
		<div className={css.container} onClick={onClickContainer}>
			<GenderIcon gender={profile.gender} color={profile.skin_color} />
			<span className={css.name}>{profile.name}</span>
			<span className={css.birthyear}>
				Birth: {profile.birth_year}
			</span>
		</div>
	);
};