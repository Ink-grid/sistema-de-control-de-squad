import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

//Database
import { database } from '../../utils/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    table: {
      minWidth: 550,
    },
  });
export default function MaterialTableDemo() {
    const classes = useStyles();

    const [data, setData] = useState(null);

    const getDatos = async () => {
        const res = await database.ref('model/historial').once('value')
        const array = Object.values(res.val() || {})
        setData(array)
    }
    
    useEffect(()=> {
        getDatos()
    }, [])

    console.log(data);
    

  const [state, setState] = React.useState({
    columns: [
      { title: 'Nombre', field: 'name' },
      { title: 'Rol', field: 'rol' },
      { title: 'Fecha', field: 'fecha' },
      { title: 'Hora Inicio', field: 'hora_inicio' },
      { title: 'Hora Fin', field: 'hora_fin' },
      { title: 'Hora comprobada', field: 'horas_compro' },
      { title: 'Hora invocada', field: 'horas_invo' },
      { title: 'Iniciativa', field: 'iniciativa' },
      { title: 'Involucrado',field: 'involucrado',},
    ]
  });


  if(!data){
    return(
        <div className={classes.root} style={{ textAlign: 'center', color: 'blue' }}>
            <CircularProgress style={{  width:'100px',marginTop:'80px' }} />
        </div>
    )
    
}

  return (
    <MaterialTable
    style={{marginTop:'100px'}}
        columns={state.columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}