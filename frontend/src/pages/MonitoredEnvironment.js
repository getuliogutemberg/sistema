import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import CardMonitored from '../components/CardMonitored';
import CircularProgress from '@mui/material/CircularProgress';
import { deleteLeitos, getLeitos } from '../services/serviceApi';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
 

const MonitoredEnvironmente = () => {

  const [loading, setLoading] = useState(false);
  const [dataLeitos, setDataLeitos] = useState([]);
  
  const navigate = useNavigate();

    useEffect(() => {

      const getDataLeitos = async () => {
        setLoading(true);
        let response = await getLeitos();
        setLoading(false);
        return setDataLeitos(response.data);
      }


      getDataLeitos();

    }, [])

  console.log(dataLeitos);

  const reload = () => {
    window.location.reload('false');

  }

  const cardDelete = async (id) => {
    try {
      await deleteLeitos(id);
      return setDataLeitos(dataLeitos.filter(dataLeito => dataLeito.idLeito !== id));
    } catch (e) {
      console.error("error api delete", e);
    }


  }

  const cardUpdate =  (id) => {
    setLoading(true);
     navigate(`/leitoform-update/${id}`);

  }


  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Paper sx={{ padding: 2, marginTop: 2 }}>


      <Typography variant="h4" component="div" sx={{ paddingTop: 2 }}>
        Monitoramentos
      </Typography>
      <Typography variant="body" component="div" sx={{ mt: 1, marginLeft: 2, color: '#888888' }}>
        Acompanhamento dos monitores configurados para receber alertas.<Button variant="text" onClick={reload}>Atualizar</Button>
      </Typography>

      {loading ?
        <CircularProgress sx={{ mt: 20 }} />
        :
        <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
            dataLeitos.map((data) => (
              <Grid item key={data.id} xs={12} md={4} sm={12}>
                <CardMonitored
                  data={data}
                  handleDelete={cardDelete}
                  handleUpdate={cardUpdate}
                />
              </Grid>
            ))
          }
        </Grid>
      }
      </Paper>
    </Container>
  );
}
export default MonitoredEnvironmente