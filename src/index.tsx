import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@store';
import { Application } from '@containers';

createRoot(document.getElementById('approot')!).render(
	<Provider store={store}>
		<Application />
	</Provider>
);
