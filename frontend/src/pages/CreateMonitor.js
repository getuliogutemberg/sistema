import * as React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createLeito } from '../services/serviceApi';
import Alert from '@mui/material/Alert';


// Estilização dos alertas de feedback 
const style = {
    display: 'flex',
    position: 'absolute',
    left: '17%',
    top: '2%',
    width: '530px',
    height: '66px',
    justifyContent: 'center',

}

// Estilização dos label sensores 
const fontStyle = {
    color: '#191a1c',
    fontSize: '1.25rem'
}


const CreateMonitor = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ambientes, setAmbientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState("");
    const [successful, setSuccessful] = useState(false);



    const getToken = async () => {
        var response = await axios.post('https://backend-api-floats.vercel.app/api/login', { 'usr': 'inf', 'pass': '25d55ad283aa400af464c76d713c07ad' });
        const { session_token } = response.data;
        return session_token;
    }

    useEffect(() => {
        const getAmbientes = async () => {
            setLoading(true);
            var sessionToken = await getToken();
            let response = await axios.get(`https://backend-api-floats.vercel.app/api/ambientes/4`, { headers: { sessionToken: sessionToken } })
            setLoading(false);
            return setAmbientes(response.data);
        }

        getAmbientes();

    }, [])

    


    const handleParametros = async (data, e) => {
        e.preventDefault();
        console.log(JSON.stringify(data))

        if (JSON.stringify(data) !== null) {
            await createLeito(data).then(
                () => {
                    setSuccessful(true);
                    reset();
                    setTimeout(() => setSuccessful(false), 2000);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessageError(resMessage);
                    
                }
            );
        }
    };


    return (

        <Container maxWidth="md" sx={{ textAlign: 'center',width:'100%' }}>
            <Paper sx={{ padding: 2, marginTop: 2 }}>

                {
                    messageError ? <Alert severity="error" sx={style} >{messageError}</Alert> :
                        successful ? <Alert severity="success" sx={style}><strong>Criado com sucesso!</strong></Alert> : ''
                }
                <Typography variant="h4" component="div" sx={{ paddingTop: 2 }}>
                    Criar Monitoramento
                </Typography>
                <Typography variant="body" component="div" sx={{ mt: 1, marginLeft: 2, color: '#888888' }}>
                    Preencha o formulário para configurar os parâmetros de monitoramento.
                </Typography>

                <Box component="form" noValidate sx={{ mt: 2, marginLeft: 2, marginRight: 2 }}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="idAirPure"
                                select
                                label="Selecione o ambiente"
                                variant="standard"
                                fullWidth
                                {...register("idAirPure", { required: 'Por favor insera o nome do ambiente' })}
                            >
                                {
                                    loading ? <MenuItem>Aguarde...</MenuItem> :
                                        ambientes.map((data) => (
                                            <MenuItem value={data.id}>AirPure: {data.id} -- <strong> {data.status} </strong></MenuItem>
                                        ))
                                }

                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="nome"
                                variant="standard"
                                label="Nome do monitoramento"
                                fullWidth
                                {...register("nome", {
                                    required: {
                                        value: true,
                                        message: 'Por favor insera o Nome do monitoramento'
                                    },
                                    pattern: {
                                        value: /[A-Za-z0-9]/,
                                        message: 'Insira um número valido!'
                                    }
                                })}
                                error={Boolean(errors.nome)}
                                helperText={errors.nome?.message}
                            />

                        </Grid>
                        <Typography variant="body" component="div" sx={{  color: '#888888', marginLeft: 2, marginTop: 2 }}>
                            Define os valores limite dos sensores de monitoramento.
                        </Typography>

                        <Grid container spacing={2} sx={{ marginTop: 2,alignContent:'center' }}  >

                            <Grid item xs={4} md={2}  >
                                <Typography sx={fontStyle}>
                                    Co2
                                </Typography>
                            </Grid>


                            <Grid item xs={8} md={4}>
                                <TextField
                                    id="limitCOVT"
                                    label="Valor limite CO2"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    {...register("limitCO2", {
                                        required: {
                                            value: true,
                                            message: 'Informe o valor do parâmetro'
                                        },
                                        pattern: {
                                            value: /^[+]?\d*$/,
                                            message: 'Insira um número valido!'
                                        }
                                    })}
                                    error={Boolean(errors.limitCO2)}
                                    helperText={errors.limitCO2?.message}

                                />
                            </Grid>

                            <Grid item xs={4} md={2} >
                                <Typography sx={fontStyle}>
                                    COTV
                                </Typography>
                            </Grid>

                            <Grid item xs={8} md={4} >
                                <TextField
                                    id="limitCOVT"
                                    label="Valor limite COTV"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    {...register("limitCOVT", {
                                        required: {
                                            value: true,
                                            message: 'Informe o valor do parâmetro'
                                        },
                                        pattern: {
                                            value: /^[+]?\d*$/,
                                            message: 'Insira um número valido!'
                                        }
                                    })}
                                    error={Boolean(errors.limitCOVT)}
                                    helperText={errors.limitCOVT?.message}

                                />
                            </Grid>

                        </Grid>



                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
                            <Grid item xs={4} md={2} >
                                <Typography sx={fontStyle}>
                                    Umidade
                                </Typography>
                            </Grid>

                            <Grid item xs={8} md={4} >
                                <TextField
                                    id="limitUmidade"
                                    label="Valor limite Umidade"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    {...register("limitUmidade", {
                                        required: {
                                            value: true,
                                            message: 'Informe o valor para do parâmetro'
                                        },
                                        pattern: {
                                            value: /^[+]?\d*$/,
                                            message: 'Insira um número valido!'
                                        }
                                    })}
                                    error={Boolean(errors.limitUmidade)}
                                    helperText={errors.limitUmidade?.message}

                                />
                            </Grid>


                            <Grid item xs={4} md={2} >
                                <Typography sx={fontStyle}>
                                    Luminosidade
                                </Typography>
                            </Grid>

                            <Grid item xs={8} md={4} >

                                <TextField
                                    id="limitLuminosidade"
                                    label="Valor limite Luminosidade"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    {...register("limitLuminosidade", {
                                        required: {
                                            value: true,
                                            message: 'Informe o valar de parâmetro'
                                        },
                                        pattern: {
                                            value: /^[+]?\d*$/,
                                            message: 'Insira um número valido!'
                                        }
                                    })}
                                    error={Boolean(errors.limitLuminosidade)}
                                    helperText={errors.limitLuminosidade?.message}

                                />
                            </Grid>

                        </Grid>




                        <Grid container spacing={1} sx={{ marginTop: 2 }}>
                            <Grid item xs={4} md={2} >
                                <Typography sx={fontStyle}>
                                    Temperatura
                                </Typography>
                            </Grid>

                            <Grid item xs={8} md={4} >

                                <TextField
                                    id="limitTemperatura"
                                    label="Valor limite Temperatura"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    {...register("limitTemperatura", {
                                        required: {
                                            value: true,
                                            message: 'Informe o valor parâmetro'
                                        },
                                        pattern: {
                                            value: /^[-+]?\d*.?\d*$/,
                                            message: 'Insira um número valido!'
                                        }
                                    })}
                                    error={Boolean(errors.limitTemperatura)}
                                    helperText={errors.limitTemperatura?.message}

                                />
                            </Grid>

                            <Grid item xs={4} md={2} >
                                <Typography sx={fontStyle}>
                                    Ruido sonoro
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={4} >

                                <TextField
                                    id="limitRuidoSonoro"
                                    label="Valor limite ruido sonoro"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    {...register("limitRuidoSonoro", {
                                        required: {
                                            value: true,
                                            message: 'Informe o valor do parâmetro '
                                        },
                                        pattern: {
                                            value: /^[+]?\d*$/,
                                            message: 'Insira um número valido!'
                                        }
                                    })}
                                    error={Boolean(errors.limitRuidoSonoro)}
                                    helperText={errors.limitRuidoSonoro?.message}

                                />
                            </Grid>
                        </Grid>



                    </Grid>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={()=>handleSubmit(handleParametros)}
                    >
                        <strong>Criar</strong>
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default CreateMonitor