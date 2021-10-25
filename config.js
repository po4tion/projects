import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// API URLS
export const API = publicRuntimeConfig.STATE
	? publicRuntimeConfig.DEP_API_URL
	: publicRuntimeConfig.DEV_API_URL;
