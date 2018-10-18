import React from 'react';
import { Router, Routes, getSiteProps, Tracker } from 'landr';
import { Provider } from 'resin-components';
import styled, { injectGlobal } from 'styled-components';
import get from 'lodash/get';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Helmet from './components/Helmet';
import ThemeStyles, { globalStyles } from './theme';

const Wrapper = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
`;

const Content = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const windowGlobal = typeof window !== 'undefined' && window;

export default getSiteProps(props => {
	const minimal = windowGlobal.location.pathname !== '/success-banner'
	console.log(windowGlobal.location.pathname === '/success-banner')
	const getProp = key => get(props, key);
	const mergedTheme = ThemeStyles(getProp('settings.theme'));
	injectGlobal`${globalStyles(mergedTheme)}`;
	return (
		<Router>
			<Tracker
				prefix={getProp('repository.name')}
				analytics={getProp('settings.analytics')}
			>
				<Provider theme={mergedTheme}>
					<Wrapper>
						<Helmet {...props} />
						{ minimal && <Nav {...props} />}
						<Content>
							<Routes />
						</Content>
						{ minimal && <Footer {...props} />}
					</Wrapper>
				</Provider>
			</Tracker>
		</Router>
	);
});
