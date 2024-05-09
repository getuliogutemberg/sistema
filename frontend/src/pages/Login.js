import * as React from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImgSignin from '../assets/signinImg.png';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import SignInSide from '../components/SignInSide';
import SignUpSide from '../components/SignUpSide';
import AuthserveceApi from "../services/authService"
import { useNavigate } from "react-router-dom";



const theme = createTheme();


// Tabs 
function TabPanel(props) {
    
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const Login = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const Logout = () => {
        AuthserveceApi.logout(localStorage.getItem("user")).then(()=>{
          navigate("/")
          window.location.reload();
        },(error)=>{
          console.log(error)
        })
        
        
      }

      const [currentUser, setCurrentUser] = useState(undefined);

      useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          setCurrentUser(user);
        } 
    
      }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                <Grid item  md={ 8 } sx={{ display: { xs: 'none' , md: 'block'}}} >
                    <Box
                        sx={{
                            mt: 15,
                            textAlign: 'center',
                            marginRight: '1rem',
                            marginLeft: '1rem',
                            color: '#143053'
                        }}
                    >
                        <Typography variant="h3" component="div">
                            Sistema 
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ mt: 5,textAlign: 'justify' }}>
                            Anim irure commodo irure sunt commodo exercitation incididunt adipisicing dolore veniam laboris velit. Quis commodo et consectetur minim laboris elit ea. Excepteur officia cillum exercitation nulla. Aliqua tempor ad duis proident. Magna minim ea enim laborum reprehenderit commodo. Do aute enim fugiat nisi mollit ea ea. Ullamco Lorem excepteur elit consectetur qui est ipsum nisi sunt deserunt Lorem aliqua aute laborum.

                        </Typography>
                        <Box sx={{ borderRadius: '10px',   }}>
                            <img src={ImgSignin} alt="" style={{ height: '100%',maxHeight:'500px' ,width:'100%', maxWidth:'500px'}}/>
                        </Box>
                    {currentUser && <Button onClick={() => Logout()} variant="contained" sx={{ mt: 15, }}>Sair</Button>}
                    </Box>
                </Grid>

                {!currentUser && <Grid item xs={12} md={4} component={Paper} elevation={6} square>
               <Box
                        sx={{
                            my: 0,
                            mx: 0,
                            mt: 15,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered >
                                <Tab label="Acessar" {...a11yProps(0)} />
                                <Tab label="Cadastrar" {...a11yProps(1)} />
                            </Tabs>
                        </Box>

                        <TabPanel value={value} index={0}>
                            <SignInSide setValue={setValue}/>
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            <SignUpSide setValue={setValue}/>
                        </TabPanel>

                    </Box>
                </Grid>}

            </Grid>
        </ThemeProvider>
    );
}
export default Login