/** @format */
import React, { useEffect, useState, useContext } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Nav from '../../components/Nav/';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { StoreContext } from '../../context/StoreContext';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { database } from '../../utils/firebase';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

const ROL = [
	{
		value: 'S_Master'
	},
	{
		value: 'SSE'
	},
	{
		value: 'TEC'
	},
	{
		value: 'DIR'
	},
	{
		value: 'Ven'
	},
	{
		value: 'Junior'
	},
	{
		value: 'SEA'
	},
	{
		value: 'Oper'
	}
];

const PORCEN = [
	{
		value: 0,
		target: '0%'
	},
	{
		value: 10,
		target: '10%'
	},
	{
		value: 20,
		target: '20%'
	},
	{
		value: 30,
		target: '30%'
	},
	{
		value: 40,
		target: '40%'
	},
	{
		value: 50,
		target: '50%'
	},
	{
		value: 60,
		target: '60%'
	},
	{
		value: 70,
		target: '70%'
	},
	{
		value: 80,
		target: '80%'
	},
	{
		value: 90,
		target: '90%'
	},
	{
		value: 100,
		target: '100%'
	}
];

const SquadDetalle = () => {
	const { state, actions } = useContext(StoreContext);
	const classes = useStyles();
	const [squadname, setSquadname] = useState(null);
	const [rol, setRol] = useState('S_Master');
	const [Porcentage, setPorcentage] = useState(state.porcentaje);
	const [horascomprometidos, setHorasCompro] = useState(8);
	const [horasinvolucrado, setHoraInvo] = useState(state.horas);
	const [comprometio, setComprometido] = useState(0);
	const [progress, setProgress] = useState(false);

	const handleChange = event => {
		setRol(event.target.value);
	};

	const actualizarHora = e => {
		var convert = parseInt(e.target.value);
		if (convert > state.porcentaje) {
			return;
		}

		const pocentage = num => {
			switch (num) {
				case 0:
					return 0;
				case 10:
					return 0.1;
				case 20:
					return 0.2;
				case 30:
					return 0.3;
				case 40:
					return 0.4;
				case 50:
					return 0.5;
				case 60:
					return 0.6;
				case 70:
					return 0.7;
				case 80:
					return 0.8;
				case 90:
					return 0.9;
				case 100:
					return 1;
				default:
					return 0;
			}
		};
		setComprometido(e.target.value);
		setPorcentage(state.porcentaje - convert);
		setHorasCompro(parseFloat(pocentage(convert) * parseFloat(8.0)));
		let resul = state.porcentaje - convert;
		setHoraInvo(
			parseFloat(pocentage(resul === 0 ? 1000 : resul) * parseFloat(8.0))
		);
	};

	function addZero(i) {
		if (i < 10) {
			i = '0' + i;
		}
		return i;
	}

	function hoyFecha() {
		var hoy = new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth() + 1;
		var yyyy = hoy.getFullYear();

		dd = addZero(dd);
		mm = addZero(mm);

		return dd + '/' + mm + '/' + yyyy;
	}

	const saveDatos = async e => {
		setProgress(true);
		e.preventDefault();

		// if (Porcentage === 0) {
		// 	alert('procentaje al limite');
		// 	setProgress(false);
		// 	return;
		// }

		const form = new FormData(e.target);
		const data = {
			iniciativa: form.get('iniciativa'),
			rol: form.get('rol'),
			name: form.get('name'),
			comprometido: form.get('comprometido') + '%',
			involucrado: form.get('involucrado'),
			horas_compro: form.get('horas_compro'),
			horas_invo: form.get('horas_invo'),
			hora_inicio: form.get('hora_inicio'),
			hora_fin: form.get('hora_fin'),
			fecha: hoyFecha()
		};

		try {
			await database.ref('model/historial').push(data);
			actions.setPorcentaje(Porcentage);
			actions.setHoras(horasinvolucrado);
			setProgress(false);
			window.location = '/';
		} catch (error) {
			alert(error);
		}

		console.log(data);
	};

	useEffect(() => {
		let pathname = window.location.pathname;
		var squad = pathname.split('/');
		setSquadname(squad[2].replace(/%20/i, ' '));
	}, []);

	return (
		<div>
			<div >
				<Link to='/' >
					<Fab color='primary' aria-label='add'style={{marginTop:'25px',marginLeft:'38px'}}>
						<ArrowBackIcon />
					</Fab>
				</Link>
			</div>
			<div className={classes.paper} style={{marginTop:'10px'}}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					SQUAD
				</Typography>
				<Typography variant='subtitle1'>
					Porcentage total: {Porcentage}%
				</Typography>
				<Typography variant='subtitle1'>
					Horas activas: {horasinvolucrado} horas
				</Typography>

				<form onSubmit={saveDatos} className={classes.form} noValidate>
					{progress && <LinearProgress />}
					<TextField
						variant='outlined'
						margin='normal'
						fullWidth
						id='iniciativa'
						label='INICIATIVA'
						name='iniciativa'
						value={squadname}
						autoComplete='iniciativa'
					/>
					<TextField
						fullWidth
						id='outlined-select-currency'
						select
						name='rol'
						label='ROL'
						value={rol}
						onChange={handleChange}
						variant='outlined'>
						{ROL.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.value}
							</MenuItem>
						))}
					</TextField>
					<TextField
						variant='outlined'
						margin='normal'
						fullWidth
						id='iniciativa'
						label='Nombre'
						name='name'
						value={state.user.displayName}
						autoComplete='iniciativa'
					/>

					<Grid container spacing={1}>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								select
								margin='normal'
								fullWidth
								id='comprometido'
								value={comprometio}
								onChange={actualizarHora}
								label='COMPROMETIDO'
								name='comprometido'
								autoComplete='comprometido'>
								{PORCEN.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.target}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								fullWidth
								value={Porcentage + '%'}
								id='involucrado'
								label='INVOLUCRADOS'
								name='involucrado'
								autoComplete='involucrado'
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								fullWidth
								value={horascomprometidos}
								id='hc'
								label='HC'
								name='horas_compro'
								autoComplete='hc'
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								margin='normal'
								fullWidth
								value={horasinvolucrado}
								id='horas_invo'
								label='HI'
								name='horas_invo'
								autoComplete='hi'
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								id='time'
								name='hora_inicio'
								fullWidth
								label='Hora inicio'
								type='time'
								defaultValue='09:30'
								InputLabelProps={{
									shrink: true
								}}
								inputProps={{
									step: 300 // 5 min
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								variant='outlined'
								id='time'
								name='hora_fin'
								fullWidth
								label='Hora fin'
								type='time'
								defaultValue='07:30'
								InputLabelProps={{
									shrink: true
								}}
								inputProps={{
									step: 300 // 5 min
								}}
							/>
						</Grid>
					</Grid>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Guardar
					</Button>
				</form>
			</div>
		</div>
	);
};

export default SquadDetalle;
