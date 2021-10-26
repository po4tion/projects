import * as React from 'react';
import NProgress from 'nprogress';
import Head from 'next/head';
import Router from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { theme, createEmotionCache } from '/view';
import { Layout } from '/components';
import '/public/css/nprogress.css';

// NProgress settings
Router.events.on('routeChangeStart', url => {
	console.log(url);
	NProgress.start();
});
Router.events.on('routeChangeComplete', url => {
	NProgress.done();
});
Router.events.on('routeChangeError', url => {
	NProgress.done();
});

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	return (
		<>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta charSet="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale= 1.0"
					/>
					<title>{process.env.APP_NAME}</title>
				</Head>
				<ThemeProvider theme={theme}>
					<Layout>
						<CssBaseline />
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</CacheProvider>
		</>
	);
}
