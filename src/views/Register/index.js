/** @format */

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { auth } from '../../utils/firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			ink-grid {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.grey[900]
				: theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignUpSide(props) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);

	
	const registerUser = async e => {
		e.preventDefault();

		const form = new FormData(e.target);

		if (form.get('email') && form.get('password')) {
			setLoading(true);
			try {
				await auth().createUserWithEmailAndPassword(
					form.get('email'),
					form.get('password')
				);

				const user = auth().currentUser;
				await user.updateProfile({
					displayName: form.get('name')
				});

				setLoading(false);
				window.location = '/';
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				{loading && <LinearProgress />}
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Registrar
					</Typography>
					<form onSubmit={registerUser} className={classes.form} noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='name'
							label='Nombre'
							name='name'
							autoComplete='name'
							autoFocus
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<FormControlLabel
							control={<Checkbox value='admin' color='primary' />}
							label='Administrador'
						/>

						<FormControlLabel
							control={<Checkbox value='normal' color='primary' />}
							label='Usuario normal'
						/>

						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							registrar
						</Button>
						<Grid container>
							<Grid item xs></Grid>
							<Grid item>
								<Link to='/' variant='body2'>
									{'¿ya tienes un cuenta? Iniciar sesión'}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
