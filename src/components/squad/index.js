/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	root: {
		height: '550px',
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		padding: '2em'
	},
	paper: {
		height: '200px',
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
}));

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				{['nevado', 'in company', 'expro', 'HYPER'].map((intens, index) => (
					<Grid item key={index} xs={6}>
						<Paper elevation={3} className={classes.paper}>
							{intens}
						</Paper>
					</Grid>
				))}
			</Grid>
		</div>
	);
}
