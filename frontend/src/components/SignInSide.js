import * as React  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AuthserveceApi from "../services/authService"
import { useNavigate } from "react-router-dom";

 







const SignInSide = ({setValue}) => {



 

 const navigate = useNavigate();
 

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    AuthserveceApi.login(data.get('email'), data.get('password')).then(
      (res) => {
        console.log(res)
        res.roles.at() === "ROLE_ADMIN" ? navigate("/setting") : navigate("/report");
        

      },
      (error) => {
        console.log(error)

        
      }
    );
  };



  return (
    <Box
      sx={{
        mt: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
      }}
    >
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email"
          name="email"
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Lembrar de mim"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Entrar
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {"Esqueceu sua senha?"}
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" onClick={() => setValue(1)} variant="body2">
              {"Não tem uma conta? Registrar-se"}
            </Link>
          </Grid>
        </Grid>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Box>
    </Box>





  );
}
export default SignInSide