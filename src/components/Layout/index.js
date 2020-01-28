/** @format */

import React from 'react';
import Nav from '../Nav/';

// import Home from '../pages/Home';
// import Contac from '../pages/Contac';
// import Service from '../pages/Services';

const Layout = props => (
	<div className='Layout'>
		<Nav />
		{props.children}
	</div>
);

export default Layout;
