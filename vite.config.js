// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import("vite").UserConfig} */
const config = {
	plugins: [sveltekit()],
	preview: {
		port: 5000,
		host: true
	}
};

export default config;
