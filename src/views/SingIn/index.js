/** @format */

import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import { StoreContext } from '../../context/StoreContext';
//import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@material-ui/lab/Alert';

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

export default function SignInSide(props) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const { actions } = useContext(StoreContext);
	const [alert, setAlert] = useState({
		state: false,
		message: null
	});
	const singIn = async e => {
		e.preventDefault();
		const form = new FormData(e.target);
		if (form.get('email') && form.get('password')) {
			setLoading(true);
			try {
				const respo = await auth().signInWithEmailAndPassword(
					form.get('email'),
					form.get('password')
				);
				console.log('RESPO', respo);
				actions.setUser(respo.user);
				actions.setLogin(true);
				// actions.setPorcentaje(100);
				// actions.setHoras(8);
				setLoading(false);
				console.log('loadinggg', loading);
			} catch (error) {
				switch (error.code) {
					case 'auth/user-not-found':
						setAlert({
							state: true,
							message:
								'No hay registro de usuario correspondiente a este identificador. El usuario puede haber sido eliminado'
						});
						break;
					case 'auth/wrong-password':
						setAlert({
							state: true,
							message:
								'La contraseña no es válida o el usuario no tiene una contraseña.'
						});
						break;
					case 'auth/invalid-email':
						console.log('error', error.code);
						setAlert({ state: true, message: 'Email Invalido' });
						break;
					case 'auth/too-many-requests':
						setAlert({ state: true, message: 'demasiadas solicitudes' });
						break;
					default:
						console.log(error.code);
						break;
				}
				setLoading(false);
				console.log(setLoading);
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
						Ingresar
					</Typography>

					<form onSubmit={singIn} className={classes.form} noValidate>
						{alert.state && <Alert severity='error'>{alert.message}</Alert>}
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
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link to='/#' variant='body2'>
									¿Se te olvidó tu contraseña?
								</Link>
							</Grid>
							<Grid item>
								<Link to='/register' variant='body2'>
									{'¿No tienes una cuenta? Regístrate'}
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
