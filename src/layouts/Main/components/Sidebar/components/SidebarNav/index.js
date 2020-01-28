/**
 * /* eslint-disable react/display-name
 *
 * @format
 */

import React, { forwardRef, useContext } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
//import { getIcons } from '../../../../../../utils/Libs';
//import { useGet } from '../../../../../../services/useService';
//import { StoreContext } from '../../../../../../context/StoreContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { List, ListItem, Button, colors } from '@material-ui/core';

import LibraryBooksSharpIcon from '@material-ui/icons/LibraryBooksSharp';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import './sidebar.css';


const useStyles = makeStyles(theme => ({
	root: {},
	item: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0
	},
	button: {
		color: colors.blueGrey[800],
		padding: '10px 8px',
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '100%',
		fontWeight: theme.typography.fontWeightMedium
	},
	icon: {
		color: theme.palette.icon,
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		marginRight: theme.spacing(1)
	},
	active: {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		'& $icon': {
			color: theme.palette.primary.main
		}
	}
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div ref={ref} style={{ flexGrow: 1 }}>
		<RouterLink {...props} />
	</div>
));

const SidebarNav = props => {
	// const { state } = useContext(StoreContext);
	//
	//const [data] = useGet(
	// `https://pacific-mesa-11643.herokuapp.com/api/users/${state.user.displayName}`
	//);
	//let data = [];

	const { pages, className, ...rest } = props;

	const classes = useStyles();
/**
	if (data.length !== 0) {
		return (
			<div style={{ textAlign: 'center' }}>
				{' '}
				<CircularProgress />{' '}
			</div>
		);
	}
 */
	return (
	
	/*<List {...rest} className={clsx(classes.root, className)}>
			{data.map(page => (
				<ListItem className={classes.item} disableGutters key={page.title}>
					<Button
						activeClassName={classes.active}
						className={classes.button}
						component={CustomRouterLink}
						to={page.href}>
						<div className={classes.icon}></div>
						{page.title}
					</Button>
				</ListItem>
			))}
	*/<List {...rest} className={clsx(classes.root, className)}>
				<ListItem className={classes.item} disableGutters>
					<Button
						activeClassName={classes.active}
						className={classes.button}
						component={CustomRouterLink}
						to='/'>
						<div className={classes.icon}>
							<HomeIcon/>
						</div>
						Squad
					</Button>
				</ListItem>
				<ListItem className={classes.item} disableGutters>
				<Button
					activeClassName={classes.active}
					className={classes.button}
					component={CustomRouterLink}
					to='/register'>
					<div className={classes.icon}>
						<LibraryBooksSharpIcon/>
					</div>
					Detalle Squad
				</Button>
			</ListItem>
			<ListItem className={classes.item} disableGutters>
			<Button
				activeClassName={classes.active}
				className={classes.button}
				component={CustomRouterLink}
				to='/nuevo'>
				<div className={classes.icon}>
					<GroupIcon/>
				</div>
				Report Squad
			</Button>
		</ListItem>
	</List>
	);
};

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
};

export default SidebarNav;
