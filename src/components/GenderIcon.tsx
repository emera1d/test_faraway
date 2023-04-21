import React, { FC } from 'react';

import { EGender, ESkinColor } from '@api';
import {
	FaceIcon,
	Face3Icon,
	SmartToyIcon,
	TagFacesIcon,
	NoAccountsIcon,
} from '@components';

interface IGenderIconProps {
	gender: EGender;
	color: string;
}

const getSkinColor = (color: string) => {
	color = color.split(', ')[0];

	switch (color) {
		case 'white':	return 'white';
		case 'red':		return 'red';
		case 'green':	return 'green';
		case 'blue':	return 'blue';
		case 'orange':	return 'orange';
		case 'gold':	return 'gold';
		case 'brown':	return 'brown';
		case 'grey':	return 'grey';
		case 'fair':	return '#ecbcb4';
		case 'light':	return '#ecbcb4';
		default:		return 'black';
	}
};

export const GenderIcon: FC<IGenderIconProps> = ({ gender, color }) => {
	const props = { style: { color: getSkinColor(color) } };

	switch (gender) {
		case EGender.MALE:			return (<FaceIcon {...props} />);
		case EGender.FEMALE:		return (<Face3Icon {...props} />);
		case EGender.HERMAPHRODITE:	return (<TagFacesIcon {...props} />);
		case EGender.NA:			return (<SmartToyIcon {...props} />);
		default:					return (<NoAccountsIcon {...props} />);

	}
};
