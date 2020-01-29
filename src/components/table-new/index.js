/** @format */

import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

//Database
import { database } from '../../utils/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
	table: {
		minWidth: 550
	}
});
export default function MaterialTableDemo() {
	const classes = useStyles();

	const [data, setData] = useState(null);

	const getDatos = async () => {
		const res = await database.ref('model/historial').once('value');
		const array = Object.values(res.val() || {});
		setData(array);
	};

	useEffect(() => {
		getDatos();
	}, []);

	console.log(data);

	const [state, setState] = React.useState({
		columns: [
			{ title: 'Iniciativa', field: 'iniciativa' },
			{ title: 'Rol', field: 'rol' },
			{ title: 'Nombre', field: 'name' },
			{ title: 'Comprometido', field: 'comprometido' },
			{ title: 'Involucrado', field: 'involucrado' },
			{ title: 'H. Comprometido', field: 'horas_compro' },
			{ title: 'H. Involucrado', field: 'horas_invo' },
			{ title: 'H. Inicio', field: 'hora_inicio' },
			{ title: 'H. Fin', field: 'hora_fin' },
			{ title: 'Fecha', field: 'fecha' }
		]
	});

	if (!data) {
		return (
			<div
				className={classes.root}
				style={{ textAlign: 'center', color: 'blue' }}>
				<CircularProgress style={{ width: '100px', marginTop: '80px' }} />
			</div>
		);
	}

	return (
		<div style={{ paddingTop: '1em' }}>
			<MaterialTable
				columns={state.columns}
				data={data}
				options={{
					exportButton: true
				}}
				title='Historial de squads'
			/>
		</div>
	);
}
