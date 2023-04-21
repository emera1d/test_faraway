import React from 'react';
import { Route } from 'react-router-dom';

import { PageProfile } from './PageProfile';
import { PageProfiles } from './PageProfiles';

export const AppRouter = (
	<>
	<Route path="/" element={<PageProfiles />} />
	<Route path="/profiles" element={<PageProfiles />} />
	<Route path="/profile/:id" element={<PageProfile />} />
	</>
);
