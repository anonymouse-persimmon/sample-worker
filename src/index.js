import proxy from './proxy';

export default {
	async fetch(request, env, ctx) {
		return proxy.fetch(request, env, ctx);
	},
};
