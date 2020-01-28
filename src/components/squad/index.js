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

				setData(Object.values(response.val()||{}))

			console.log('respuesta',response);
			
	};

	useEffect(() => {
		getIniciativa();
	}, []);

	if (!data) {
		return <div>cargando</div>;
	}

	return (
		<div className={classes.add}>
			<Fab color='primary' aria-label='add'>
				<AddIcon />
			</Fab>
			<div style={{ textAlign: 'center', color: 'blue' }}>
				PORCENTAJE: {state.porcentaje}%
			</div>

			<div className={classes.root}>
				<Grid container spacing={2}>
					{['nevado', 'in company', 'programacion', 'expro', 'hyper'].map(
						(intens, index) => {
							if (data && data.length > 0) {
								let resul = data.filter(
									e =>
										e.iniciativa === intens && e.name === state.user.displayName
								);

								return (
									<Grid item xs={4} key={index}>
										<Link to={resul.length === 1 ? '/' : `/squad/${intens}`}>
											<Paper
												//onClick={() => alert(intens)}
												elevation={3}
												className={classes.paper}>
												{resul.length === 1 ? (
													<div>
														<div>{resul[0].iniciativa}</div>
														<div>comprometido: {resul[0].comprometido}</div>
														<div>involucrado: {resul[0].involucrado}</div>
													</div>
												) : (
													intens
												)}
											</Paper>
										</Link>
									</Grid>
								);
							}

							return (
								<Grid item xs={6} key={index}>
									<Link to={`/squad/${intens}`}>
										<Paper elevation={3} className={classes.paper}>
											{intens}
										</Paper>
									</Link>
								</Grid>
							);
						}
					)}
				</Grid>
			</div>
		</div>
	);
}
