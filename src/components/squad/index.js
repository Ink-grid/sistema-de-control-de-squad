/** @format */

import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { database } from '../../utils/firebase';
import AddIcon from '@material-ui/icons/Add';
import { StoreContext } from '../../context/StoreContext';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

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
	},
	add: {
		padding: '1em',
		textAlign: 'end'
	},
	contenido: {
		...theme.typography.button,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(1)
	}
}));

export default function CenteredGrid() {
	const classes = useStyles();
	const [data, setData] = useState(null);
	const { state } = useContext(StoreContext);

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

	const getIniciativa = async () => {
		const response = await database
			.ref('model/historial')
			.orderByChild('fecha')
			.equalTo(hoyFecha())
			.once('value');

		setData(Object.values(response.val() || {}));

		console.log('respuesta', response);
	};

	//Este metodo se ejecuta al momento de crearse la function principal
	useEffect(() => {
		getIniciativa();
	}, []);

	if (!data) {
		return <div>cargando</div>;
	}
	return (
		<div className={classes.add} style={{ marginBottom: '100px' }}>
			<Fab
				color='primary'
				aria-label='add'
				style={{ marginBottom: '20px', marginTop: '10px' }}>
				<AddIcon />
			</Fab>
			<div style={{ textAlign: 'center', color: 'blue', marginBottom: '30px' }}>
				PORCENTAJE: {state.porcentaje}%
			</div>
			<div className={classes.root}>
				<Grid container spacing={2}>
					{[
						{
							name: 'nevado',
							color: '#388E3C'
						},
						{
							name: 'programacion',
							color: '#212121'
						},
						{
							name: 'hyper',
							color: '#FFEB3B'
						},
						{
							name: 'expro',
							color: '#D32F2F'
						},
						{
							name: 'in company',
							color: '#536DFE'
						}
					].map((intens, index) => {
						if (data && data.length > 0) {
							let resul = data.filter(
								e =>
									e.iniciativa === intens.name &&
									e.name === state.user.displayName
							);
							return (
								<Grid item xs={4} key={index}>
									<Link
										to={resul.length === 1 ? '/' : `/squad/${intens.name}`}
										style={{ textDecoration: 'none' }}>
										<Paper
											elevation={3}
											className={classes.paper}
											style={{
												background: intens.color,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}>
											{resul.length === 1 ? (
												<div>
													<Typography
														variant='4'
														component='h2'
														style={{ color: 'white' }}>
														{resul[0].iniciativa}
													</Typography>
													<Typography
														variant='4'
														component='h5'
														style={{ color: 'white' }}>
														comprometido: {resul[0].comprometido}
													</Typography>
													<Typography
														variant='4'
														component='h5'
														style={{ color: 'white' }}>
														involucrado: {resul[0].involucrado}
													</Typography>
												</div>
											) : (
												<Typography
													variant='h4'
													component='h2'
													style={{ color: 'white' }}>
													{intens.name}
												</Typography>
											)}
										</Paper>
									</Link>
								</Grid>
							);
						}

						return (
							<Grid item xs={6} key={index}>
								<Link
									to={`/squad/${intens.name}`}
									style={{ textDecoration: 'none' }}>
									<Paper
										elevation={3}
										className={classes.paper}
										style={{ background: intens.color }}>
										<Typography
											variant='h4'
											component='h2'
											style={{ color: 'white' }}>
											{intens.name}
										</Typography>
									</Paper>
								</Link>
							</Grid>
						);
					})}
				</Grid>
			</div>
		</div>
	);
}
