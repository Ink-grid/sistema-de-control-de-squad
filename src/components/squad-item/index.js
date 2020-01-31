import React, { useState,useEffect} from 'react';
import { database} from '../../utils/firebase';
import {Grid,Link,Paper,Typography,makeStyles} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        height: '550px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: '2em'
    }
}));


export default function SquadItem() {
   
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <div>ITEM SQUAD</div>
        </div>
    )
    

}