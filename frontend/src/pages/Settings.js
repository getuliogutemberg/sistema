import React from 'react'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Settings = () => {
    const navigate = useNavigate();
   
     
    return (
        <Container maxWidth="sm" sx={{textAlign: 'center',color:'#888888'}}>
            <Typography variant="h4" component="div" sx={{marginTop:20,color:'#143053'}}>
                Configuração do Sistema !
            </Typography>
            <Typography variant="h6" component="div" >
                
            </Typography>
            <Typography variant="body2" gutterBottom sx={{textAlign: 'center'}}>
              Aqui você pode definir os parâmetros de alertas que serão monitorados.
            </Typography>
            <Button variant="contained" sx={{
                marginTop:2,
                marginBottom:2,
                backgroundColor: '#143053',
                '&:hover': {
                  backgroundColor: '#143053',
                },
            }} onClick={()=>{navigate("/monitor")}}>Salvar</Button>
      </Container>
    );
}

export default Settings