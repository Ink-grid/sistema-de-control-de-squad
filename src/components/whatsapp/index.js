/** @format */

import React, { useState } from 'react';
import { database } from '../../utils/firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
import { TextField, InputLabel, Button } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';

const WhatsApp = () => {
	const [nume, setNum] = useState(null);
	const [completed, setCompleted] = useState({
		status: false,
		porcenta: 0
	});

	const product_id = 'aae999cf-0207-4ddc-ab5f-cd830d05ad08';
	const secret_token = 'a53e11d4-0a33-41cf-8e84-a66a7d924952';
	// phone_id can be found at https://console.maytapi.com/ or from  /api/<product_id>/listPhones endpoint.
	const phone_id = '1049';
	let url = `https://api.maytapi.com/api/${product_id}/${phone_id}/sendMessage`;

	const save_data = e => {
		e.preventDefault();
		setCompleted(presv => ({ ...presv, status: true }));
		const form = new FormData(e.target);
		if (nume) {
			let num = 0;
			nume.forEach(async (element, index) => {
				num += 1;
				setCompleted(presv => ({ ...presv, porcenta: num }));
				const data = {
					to_number: '+51' + element.replace(/\r/gi, ''), // Receivers phone
					message: form.get('mensaje'), // Message
					type: 'text' // Message type
				};

				const response = await fetch(url, {
					method: 'POST', // or 'PUT'
					body: JSON.stringify(data), // data can be `string` or {object}!
					headers: {
						'x-maytapi-key': secret_token
					}
				});

				console.log(response);
			});
		}

		setCompleted({ status: false });
	};

	function leerArchivo(e) {
		var archivo = e.target.files[0];
		if (!archivo) {
			return;
		}
		var lector = new FileReader();
		lector.onload = function(e) {
			var contenido = e.target.result;
			const nums = contenido.split(/\n/);
			setNum(nums);
			//console.log(arrar);
			// arrar.forEach(element => {
			//
			// 	datas.push(data);
			//});
		};
		lector.readAsText(archivo);
	}

	console.log(nume);

	return (
		<div
			style={{
				marginTop: '20px',
				width: '300px',
				marginLeft: '300px',
				marginTop: '80px'
			}}>
			{completed.status && (
				<LinearProgress variant='determinate' value={completed.porcenta} />
			)}
			<h1 style={{ textAlign: 'center' }}>Envio por WhatsApp</h1>
			<form onSubmit={save_data} id='formm' noValidate>
				<TextField
					id='outlined-multiline-static'
					label='Iniciativa'
					multiline
					name='iniciativa'
					fullWidth
					variant='outlined'
				/>

				<br />
				<br />
				<InputLabel id='demo-simple-select-helper-label'>Numeros:</InputLabel>
				<br />
				<input onChange={leerArchivo} type='file'></input>

				<br></br>
				<br></br>

				<TextField
					id='outlined-multiline-static'
					label='Mensaje'
					name='mensaje'
					multiline
					fullWidth
					rows='4'
					variant='outlined'
				/>

				<div style={{ marginTop: '10px' }}>
					<Button type='submit' fullWidth variant='contained' color='primary'>
						Enviar
					</Button>
				</div>
			</form>
		</div>
	);
};

export default WhatsApp;
