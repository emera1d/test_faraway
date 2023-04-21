import React, { FC, PropsWithChildren } from 'react';

import css from './page.module.scss';

interface IPageProps extends PropsWithChildren {
}

export const Page: FC<IPageProps> = ({ children }) => {
	return (
		<div className={css.container}>
			{children}
		</div>
	);
};
