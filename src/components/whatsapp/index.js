import React from 'react';
import {TextField,InputLabel,Button,TextareaAutosize} from '@material-ui/core';

const WhatsApp = () =>{
    return(
        <div style={{marginTop:'20px',width:'300px',marginLeft:'300px',marginTop:'80px'}}>
            <h1 style={{textAlign:'center'}}>Envio por WhatsApp</h1>
            <form id="formm"  noValidate>
                <InputLabel id="demo-simple-select-helper-label">Numero</InputLabel>
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='nameSquad'
                    label='Numero'
                    name='nameSquad'
                    autoComplete='nameSquad'
                    autoFocus
                />
               <InputLabel id="demo-simple-select-helper-label">Mensaje</InputLabel>
                <br></br>
               <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    fullWidth
                    rows="4"
                    variant="outlined"
                />

                <div style={{marginTop:'10px'}}>	
                        <Button type="submit" fullWidth variant="contained" color="primary" >
                            Enviar
                        </Button>
                    </div>			
                </form>	
        </div>
    )
}

export default WhatsApp;