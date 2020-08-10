import React from 'react';

import { Pattern, PatternPlaceholder } from './Pattern';

const Home = ({ dict, isLoading, isReady, patterns, language, history }) => {
	const emoj = ['😔', '😞', '😣', '😑', '😕', '😶', '☹️', '🙁'];

	return (
		<div className="patterns">
			{isReady &&
				patterns.length > 0 &&
				patterns.map((obj, index) => (
					<Pattern
						key={'pattern-block-' + index}
						language={language}
						obj={obj}
						dict={dict}
						history={history}
					/>
				))}
			{isReady &&
				!patterns.length && (
					<div className="patterns__no-result">
						<h2>
							{dict.searchResult.notFoundTitle}{' '}
							{emoj[Math.floor(Math.random() * emoj.length)]}
						</h2>
						<p>{dict.searchResult.notFoundText}</p>
					</div>
				)}
			{isLoading &&
				[...Array(10).keys()].map(o => (
					<PatternPlaceholder key={'placeholder-block-' + o} />
				))}
		</div>
	);
};

export default Home;
