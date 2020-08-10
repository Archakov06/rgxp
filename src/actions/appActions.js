export const setPatterns = payload => ({
	type: 'SET_PATTERNS',
	payload
});

export const setTag = tag => ({
	type: 'SET_TAG',
	payload: tag
});

export const searchPatterns = payload => ({
	type: 'SEARCH_PATTERNS',
	payload
});

export const setLoading = bool => ({
	type: 'SET_LOADING',
	payload: bool
});
