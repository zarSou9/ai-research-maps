import type { PageLoad } from './$types';
import { allTrees } from '$lib/allTrees';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
	const treeDetails = allTrees.find((t) => t.pathName === params.tree);
	if (!treeDetails) {
		throw error(404, {
			message: 'Tree not found'
		});
	}

	const treePromise = treeDetails.fullTree
		? Promise.resolve(treeDetails.fullTree)
		: fetch(`/trees/${treeDetails.pathName}.json`).then((response) => response.json());
	return {
		...treeDetails,
		treePromise
	};
};
