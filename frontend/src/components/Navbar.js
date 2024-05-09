import {React, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {useNavigate} from "react-router-dom";
import AuthserveceApi from '../services/authService';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Sistema 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  

const NavBar = () =>{
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(()=>{
        const user = localStorage.getItem("user");
        
        if(user){
            setCurrentUser(user);
        }

        
    },[]);


    const Logout = () => {
      AuthserveceApi.logout(localStorage.getItem("user")).then(()=>{
        navigate("/")
        window.location.reload();
      },(error)=>{
        console.log(error)
      })
      
      
    }

    

    return(
        <Box sx={{ flexGrow: 1 }}>  
         <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor: 'highlight'}} variant="dense">
            <Toolbar>
                
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 , textAlign: 'left',ml:5}}>
                   <a href="/" className='buttonSistema'><strong>{"Sistema"}</strong></a> 
                </Typography>
               {currentUser ? (
                <>
                <Box sx={{ flexGrow: 1 , textAlign: 'right'  }}>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        
                    >
                    <Avatar/>
                  </StyledBadge>
                  <Button color="inherit" onClick={()=>Logout()} sx={{ ml: 2}}>logout</Button>
              </Box>
                  </>
                ) : ( 
              <Box sx={{ flexGrow: 0 }}>
                 {/* <Button color="inherit" onClick={()=>navigate("/")} sx={{ ml: 2}}>Entrar</Button> */}
                 <Copyright sx={{ color : 'white'}} />
                </Box>
                )}
            </Toolbar>
        </AppBar>
     </Box> 
    );
}
export default NavBar