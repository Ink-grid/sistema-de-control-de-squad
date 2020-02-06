/** @format */

import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { database, storage } from '../../utils/firebase';
import { StoreContext } from '../../context/StoreContext';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';

/* Ventana modal */
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/* Sweet Alert */
import swal from 'sweetalert';

/* */
import { Select, MenuItem, InputLabel } from '@material-ui/core';

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
	const { state } = useContext(StoreContext);
	const [open, setOpen] = React.useState(false);
	const [url, setUrl] = React.useState(null);
	const [arreglo, setArreglo] = React.useState(null);

	/* Color state */
	const [color, setColor] = React.useState('');

	const getcolorExa = name => {
		switch (name) {
			case 'rojo':
				return '#D32F2F';
			case 'verde':
				return '#388E3C';

			case 'azul':
				return '#536DFE';

			case 'amarillo':
				return '#FFA000';

			case 'morado':
				return '#7B1FA2';

			case 'rosado':
				return '#E91E63';
			case 'naranja':
				return '#FF5722';
			default:
				return '#388E3C';
		}
	};

	const saveImage = e => {
		/*
			Este evento sintético se reutiliza por motivos de rendimiento. Si está viendo esto, está accediendo a 
			la propiedad `type` en un evento sintético liberado / anulado. Esto se establece en nulo. 
			Si debe mantener el evento sintético original, use event.persist (). 
			Consulte https://fb.me/react-event-pooling para obtener más información.
		*/
		e.persist();
		const storageRef = storage.ref();
		console.log('REFF', e.target.files);
		console.log('REF1F', e.target.files[0]);
		//FileList	File

		const name = Math.random();
		if (e.target.files && e.target.files[0]) {
			let file = e.target.files[0];
			const uploadFile = storageRef.child(`pink-grid/${name}`).put(file);
			uploadFile.then(snap => {
				snap.ref.getDownloadURL().then(downloadURL => {
					setUrl(downloadURL);
					console.log('URL', downloadURL);
				});
			});
		} else {
			console.log('ERROR');
		}
	};

	const getDataSqual = async e => {
		const response = await database
			.ref('model/historial')
			.orderByChild('fecha')
			.equalTo(hoyFecha())
			.once('value');

		console.log(response);
	};

	const saveData = async e => {
		e.preventDefault();
		setOpen(false);
		const form = new FormData(e.target);
		console.log(url);
		const newSquad = {
			name: form.get('nameSquad'),
			color: getcolorExa(form.get('colorSquad')),
			image: url
		};

		try {
			const respo = await swal({
				title: '¿Estas seguro?',
				text: 'Desea crear un nuevo Squad!',
				icon: 'warning',
				buttons: true,
				dangerMode: true
			});
			if (respo) {
				await database.ref('model/nuevo').push(newSquad);
				const guard = await swal('Creado satisfactoriamente', {
					icon: 'success'
				});
				if (guard) {
					window.location = '/';
				}
			}

			//window.location = '/';
		} catch (error) {
			alert(error);
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
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

	const getDatos = async () => {
		const res = await database.ref('model/nuevo').once('value');
		if (res.val()) {
			const array = Object.values(res.val() || {});
			setArreglo(array);
		} else {
			setArreglo(['']);
		}
	};

	console.log(arreglo);
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
	console.log(data);
	//Este metodo se ejecuta al momento de crearse la function principal
	useEffect(() => {
		getIniciativa();
	}, []);

	if (!data) {
		return <div>cargando</div>;
	}
	return (
		<div className={classes.add} style={{ marginBottom: '100px' }}>
			{/* MODAL*/}

			<Modal
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
				open={open}
				onClose={handleClose}>
				<div
					className={classes.paperr}
					style={{ marginLeft: '500px', marginTop: '120px' }}>
					<h2 id='simple-modal-title' className={classes.titulo}>
						Crear squad
					</h2>
					<form
						onSubmit={saveData}
						id='formm'
						className={classes.form}
						noValidate>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='nameSquad'
							label='Name Squad'
							name='nameSquad'
							autoComplete='nameSquad'
							autoFocus
						/>

						<InputLabel id='demo-simple-select-helper-label'>Color</InputLabel>

						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={color}
							name='colorSquad'
							style={{ width: '100%', marginBottom: '15px' }}
							onChange={e => setColor(e.target.value)}>
							<MenuItem value='rojo'>Rojo</MenuItem>
							<MenuItem value='verde'>Verde</MenuItem>
							<MenuItem value='azul'>Azul</MenuItem>
							<MenuItem value='morado'>Morado</MenuItem>
							<MenuItem value='amarillo'>Amarillo</MenuItem>
						</Select>
						{console.log(color)}

						<input
							type='file'
							onChange={saveImage}
							name='imagen'
							style={{ marginBottom: '15px' }}
						/>
						<div>
							<Button
								type='submit'
								className={classes.submit}
								fullWidth
								variant='contained'
								color='primary'>
								Guardar
							</Button>
						</div>
					</form>
				</div>
			</Modal>

			<div
				style={{
					textAlign: 'center',
					color: 'black',
					marginBottom: '-120px',
					marginTop: '40px'
				}}>
				PORCENTAJE: {state.porcentaje}%
			</div>
			<div className={classes.root} style={{ marginTop: '200px' }}>
				<Grid container spacing={2}>
					{arreglo.map((intens, index) => {
						if (data && data.length > 0) {
							let resul = data.filter(e => e.iniciativa === intens.name);
							return (
								<Grid item xs={6} key={index}>
									<Link
										to={resul.length === 1 ? '/' : `/squad/${intens.name}`}
										style={{ textDecoration: 'none' }}>
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
																	Comprometidos
																</th>
																<th
																	style={{
																		paddingRight: '5px',
																		color: 'white'
																	}}>
																	Involucrados
																</th>
															</tr>
														</thead>

														{resul.map((res, ind) => (
															<tbody>
																<tr key={ind}>
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
																</tr>
															</tbody>
														))}
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

/* MODAL */
