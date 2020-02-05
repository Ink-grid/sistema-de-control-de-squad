/** @format */

import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { StoreContext } from '../../../../context/StoreContext';
import { auth } from '../../../../utils/firebase';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

import './topbar.css';

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: 'none'
	},
	flexGrow: {
		flexGrow: 1
	},
	signOutButton: {
		marginLeft: theme.spacing(1)
	}
}));

const Topbar = props => {
	const { className, onSidebarOpen, ...rest } = props;
	const { state, actions } = useContext(StoreContext);
	const classes = useStyles();
	console.log(state);
	const [notifications] = useState([]);

	const logout = async () => {
		try {
			await auth().signOut();
			actions.setLogin(false);
			actions.setUser({ displayName: null });
			//window.location = '/';
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div className='topbar'>
			<AppBar {...rest} className={clsx(classes.root, className)}>
				<Toolbar>
					<div
						style={{
							width: '195px',
							height: '60px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'flex-end'
						}}>
						<RouterLink to='/'>
							<img
								alt='Logo'
								height='45'
								src='https://firebasestorage.googleapis.com/v0/b/squad-35b7f.appspot.com/o/LOGO%20INK%20GRID%20EN%20BLANCO.png?alt=media&token=df49e847-d020-47f1-b941-684a77a03c62'
								width='70'
							/>
						</RouterLink>
					</div>
					<div className={classes.flexGrow} />
					<Hidden mdDown>
						<IconButton color='inherit'>
							<Badge
								badgeContent={notifications.length}
								color='primary'
								variant='dot'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							className={classes.signOutButton}
							color='inherit'
							onClick={() => logout()}>
							<InputIcon />
						</IconButton>
					</Hidden>
					<Hidden lgUp>
						<IconButton color='inherit' onClick={onSidebarOpen}>
							<MenuIcon />
						</IconButton>
					</Hidden>
				</Toolbar>
			</AppBar>
		</div>
	);
};

Topbar.propTypes = {
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func
};

export default Topbar;
