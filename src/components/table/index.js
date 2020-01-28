import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


//Database
import { database } from '../../utils/firebase';

import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});


/// ejemplo 


export default function SimpleTable() {

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
   console.log(data)
   if(!data){
        return(
            <div className={classes.root} style={{ textAlign: 'center', color: 'blue' }}>
                <CircularProgress style={{  width:'100px',marginTop:'80px' }} />
            </div>
        )
        
   }

  return (
    <TableContainer component={Paper} style={{width:'90%',marginTop:'40px',marginLeft:'70px'}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">rol</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Hora fin</TableCell>
            <TableCell align="right">Hora inicio</TableCell>
            <TableCell align="right">Horas comprobada</TableCell>
            <TableCell>Comprometido</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(ele => (
            <TableRow key={ele}>
              <TableCell align="right">{ele.name}</TableCell>
              <TableCell align="right">{ele.rol}</TableCell>
              <TableCell align="right">{ele.fecha}</TableCell>
              <TableCell align="right">{ele.hora_fin}</TableCell>
              <TableCell align="right">{ele.hora_inicio}</TableCell>
              <TableCell align="right">{ele.horas_compro}</TableCell>
              <TableCell component="th" scope="row">
                {ele.comprometido}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
          {/**
              data.map(ele=>{
                  return( <div key={ele}>
              {ele.comprometido}
                  </div>)
              })
               */
            }
      </div>
    </TableContainer>
  );
}
