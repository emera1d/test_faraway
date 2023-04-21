import React, { FC } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';

import { AppRouter } from './AppRouter';

const router = createBrowserRouter(createRoutesFromElements(AppRouter));

export const Application: FC = () => {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
};
