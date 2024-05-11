import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import AuthserveceApi from "../services/authService"


const SignUpSide = ({setValue}) => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    setMessage("");
    setLoading(true);

    
     AuthserveceApi.registerUser(data.get('cpf'), data.get('telefone'), data.get('name'), data.get('email'), data.get('password'), data.get('confPassword')).then(
        () => {
          AuthserveceApi.login(data.get('email'), data.get('password')).then(
            () =>{
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

          )

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
   


  };

  return (

    
      
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{  bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form"  onSubmit={handleRegister} sx={{ mt: 1 }}>
          
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="cpf"
                label="CPF"
                name="cpf"
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
           
              <TextField
               variant="standard"
               margin="normal"
               required
               fullWidth
                name="name"
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
            
              <TextField
               variant="standard"
               margin="normal"
               required
               fullWidth
                name="telefone"
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
            
              <TextField
               variant="standard"
               margin="normal"
               required
               fullWidth
                name="email"
                id="email"
                label="Email"
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
            
            
              <TextField
                variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
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
           
            
              <TextField
               variant="standard"
               margin="normal"
               required
               fullWidth
                name="confPassword"
                label="Confirmar senha"
                type="password"
                id="confPassword"
                {...register("confPassword", {
                  required: {
                    value: true,
                    message: 'Por favor confirma sua senha'
                  },
                  pattern: {
                    value: /[A-Za-z0-9]/,
                    message: 'Por favor insira um senha valido!'
                  }
                })}
                error={Boolean(errors.confPassword)}
                helperText={errors.confPassword?.message}

              />
           
          <Button
            
            margin="normal"
            required
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            {loading ? <CircularProgress /> : "Cadastrar Usuário"}
          </Button>

          {message ? <Alert severity="error">{message}</Alert> : ''}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" onClick={() => setValue(0)} variant="body2">
                Ja tem uma conta? Entrar
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    

  );
}
export default SignUpSide 