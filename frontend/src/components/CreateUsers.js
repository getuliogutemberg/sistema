import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import AuthserveceApi from "../services/authService"
import { useForm } from "react-hook-form";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Avatar, Card, CardActions, CardContent, Divider, } from '@mui/material';

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};
const CreateUsers = (props) => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = (data, e) => {
        e.preventDefault();
        console.log(JSON.stringify(data))

        setMessage("");
        setLoading(true);

        if (JSON.stringify(data) !== null) {
            AuthserveceApi.registerUser(data.cpf, data.telefone, data.name, data.email, data.password, data.confPassword).then(
                () => {
                    navigate("/wellcome");
                    

                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }


    };

    return (
        <>

            <Container maxWidth="lg" sx={{ textAlign: 'center' ,color:'#888888' }}>
                <Grid container spacing={3} >
                    <Grid item lg={4} md={4} xs={12} >
                        <Card {...props}  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',  }}>
                            <CardContent>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Avatar
                                        src={user.avatar}
                                        sx={{
                                            height: 64,
                                            mb: 2,
                                            width: 64
                                        }}
                                    />
 
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Button
                                color="primary"
                                fullWidth
                                variant="text"
                            >
                                Upload picture
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                <Grid item lg={8} md={8} xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Box
                            sx={{
                               
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                               
                            }}
                        >
                            <Typography variant="h6" component="div" sx={{ paddingTop: 2, color: '#888888' }}>
                                Criar conta do usuário reponsável pelo o manitoramento 
                            </Typography>

                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            fullWidth
                                            id="name"
                                            label="Nome"
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: 'Por favor informe seu Nome'
                                                },
                                                pattern: {
                                                    value: /[a-z-A-Z][a-z]/,
                                                    message: 'Insira um Nome valido!'
                                                }
                                            })}
                                            error={Boolean(errors.name)}
                                            helperText={errors.name?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            fullWidth
                                            id="cpf"
                                            label="CPF"
                                            {...register("cpf", {
                                                required: {
                                                    value: true,
                                                    message: 'Por favor informe seu CPF'
                                                },
                                                pattern: {
                                                    value: /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/,
                                                    message: 'Insira um CPF valido!'
                                                }
                                            })}
                                            error={Boolean(errors.cpf)}
                                            helperText={errors.cpf?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            fullWidth
                                            id="telefone"
                                            label="Telefone"
                                            {...register("telefone", {
                                                required: {
                                                    value: true,
                                                    message: 'Por favor informe seu número de telefone'
                                                },
                                                pattern: {
                                                    value: /[0-9]{11}/,
                                                    message: 'Insira um número valido!'
                                                }
                                            })}
                                            error={Boolean(errors.telefone)}
                                            helperText={errors.telefone?.message}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            autoComplete="email"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: 'Por favor informe seu Email'
                                                },
                                                pattern: {
                                                    value: /^[a-z.!#$%&'*+/=?^_`{|}~-]+@[a-z-0-9](?:[a-z-0-9-]{0,61}[a-z-0-9])?(?:\.[a-z-0-9](?:[a-z-0-9-]{0,61}[a-z-0-9])?)*$/,
                                                    message: 'Por favor insira um Email valido !'
                                                }
                                            })}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email?.message}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            fullWidth
                                            label="Criar senha"
                                            type="password"
                                            id="password"
                                            {...register("password", {
                                                required: {
                                                    value: true,
                                                    message: 'Por favor Cria uma senha'
                                                },
                                                pattern: {
                                                    value: /[A-Za-z0-9]/,
                                                    message: 'Por favor insira um senha valido !'
                                                }
                                            })}
                                            error={Boolean(errors.password)}
                                            helperText={errors.password?.message}

                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit(handleRegister)}
                                >
                                    {loading ? <CircularProgress /> : <strong>Criar</strong>}
                                </Button>

                                {message ? <Alert severity="error">{message}</Alert> : ''}

                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

        </Container>
        </>
    );
}

export default CreateUsers;