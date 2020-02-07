/** @format */

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { database } from '../../utils/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

/* Ventana modal */

/* */

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
	},
	paperr: {
		position: 'absolute',
		width: 400,
		height: 400,
		backgroundColor: theme.palette.background.paper,
		borderRadius: '10px', //Modificaion del borde del modal
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	titulo: {
		color: 'black',
		textAlign: 'center'
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

export default function CenteredGrid() {
	const classes = useStyles();
	const [data, setData] = useState(null);
	const [arreglo, setArreglo] = React.useState(null);

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

	const getDatos = async () => {
		const res = await database.ref('model/nuevo').once('value');
		if (res.val()) {
			const array = Object.values(res.val() || {});
			setArreglo(array);
		} else {
			setArreglo(['']);
		}
	};

	useEffect(() => {
		getDatos();
	}, []);

	const getIniciativa = async () => {
		const response = await database
			.ref('model/historial')
			.orderByChild('fecha')
			.equalTo(hoyFecha())
			.once('value');

		setData(Object.values(response.val() || {}));
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
			<div className={classes.root}>
				<Grid container spacing={2}>
					{arreglo.map((intens, index) => {
						if (data && data.length > 0) {
							let resul = data.filter(e => e.iniciativa === intens.name);
							return (
								<Grid item xs={6} key={index}>
									{resul !== null && resul.length > 0 ? (
										<Paper
											elevation={3}
											className={classes.paper}
											style={{
												marginTop: '0px',
												background: intens.color,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}>
											{resul.length >= 1 ? (
												<div>
													<Typography
														variant='h4'
														component='h2'
														style={{ color: 'white' }}>
														{resul[0].iniciativa}
													</Typography>
													<hr style={{ color: 'white' }}></hr>
													<table>
														<thead>
															<tr>
																<th
																	style={{
																		paddingRight: '5px',
																		color: 'white'
																	}}>
																	Nombre
																</th>

																<th
																	style={{
																		paddingRight: '5px',
																		color: 'white'
																	}}>
																	Rol
																</th>
																<th
																	style={{
																		paddingRight: '5px',
																		color: 'white'
																	}}>
																	Compro.
																</th>
																<th
																	style={{
																		paddingRight: '5px',
																		color: 'white'
																	}}>
																	Involu.
																</th>
																<th
																	style={{
																		paddingRight: '5px',
																		color: 'white'
																	}}>
																	H. Inicio
																</th>
																<th
																	style={{
																		paddingRight: '5px',
																		color: 'white'
																	}}>
																	H. Fin
																</th>
															</tr>
														</thead>

														{resul.map((res, ind) => (
															<tbody key={ind}>
																<tr>
																	<th>
																		<p style={{ color: 'white' }}>{res.name}</p>
																	</th>
																	<th>
																		<p style={{ color: 'white' }}>{res.rol}</p>
																	</th>
																	<th>
																		<p style={{ color: 'white' }}>
																			{res.comprometido}
																		</p>
																	</th>
																	<th>
																		<p style={{ color: 'white' }}>
																			{res.involucrado}
																		</p>
																	</th>
																	<th>
																		<p style={{ color: 'white' }}>
																			{res.hora_inicio}
																		</p>
																	</th>
																	<th>
																		<p style={{ color: 'white' }}>
																			{res.hora_fin}
																		</p>
																	</th>
																</tr>
															</tbody>
														))}
													</table>
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
									) : null}
								</Grid>
							);
						}

						return (
							<Grid item xs={6} key={index}>
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
							</Grid>
						);
					})}
				</Grid>
			</div>
		</div>
	);
}

/* MODAL */
