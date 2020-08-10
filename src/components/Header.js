import React from 'react';
import PropTypes from 'prop-types';
import { SVGLink } from '../components/SVGSprites';

const Header = ({ searchPatterns, history }) => (
	<div>
		<div className="header">
			<div className="header__logo">
				<a onClick={history.push.bind({ pathname: '/' })}>
					<SVGLink name="logo" />
				</a>
			</div>
		</div>
	</div>
);

Header.propTypes = {
	searchPatterns: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

export default Header;
