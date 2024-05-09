import * as React from 'react';
import { Box, Container } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CollapsibleTable from '../components/CollapsibleTable'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getRelatorios } from '../services/serviceApi';
import { Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bubble } from 'react-chartjs-2';

// Dashboard 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,

);



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: new Date(),
    },
  },
};

const labels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];

const data = {
  labels,
  datasets: [
    {
      label: 'Não conformidade',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

  ],
};

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




const Report = () => {
  const [value, setValue] = useState(0);
  const [reports, setReports] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const getReports = async () => {
    let response = await getRelatorios();
    return setReports(response.data);
  }


  useEffect(() => {
  
    getReports();
  }, [])

 
 

//Datagrid

const rows = reports.map((row,index)=>({
  id: index,
  idRelatorio: row.idRelatorio,
  idLeito: row.idLeito,
  idAirPure: row.idAirPure,
  nome: row.nome,
  co2: row.co2,
  tvoc: row.tvoc,
  luminosidade: row.luminosidade,
  ruido: row.ruido,
  temperatura: row.limitTemperatura,
  umidade: row.limitUmidade,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt

}));

const columns = [
  { field: 'idRelatorio', headerName: 'IdRelatorio', width: 150 },
  { field: 'id', headerName: 'Id', width: 150 },
  { field: 'idAirPure', headerName: 'IdAirPure', width: 150 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  { field: 'co2', headerName: 'CO2', width: 150 },
  { field: 'tvoc', headerName: 'Tvoc', width: 150 },
  { field: 'luminosidade', headerName: 'Luminosidade', width: 150 },
  { field: 'ruido', headerName: 'Ruido sonoro', width: 150 },
  { field: 'temperatura', headerName: 'Temperatura', width: 150 },
  { field: 'umidade', headerName: 'Umidade', width: 150 },
  { field: 'createdAt', headerName: 'Data de criação', width: 150 },
  { field: 'updatedAt', headerName: 'Data de update', width: 150 },
];
 const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};



const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const dataBar = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const dataPie = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const optionsBubble = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
const dataBubble = {
  datasets: [
    {
      label: 'Red dataset',
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Blue dataset',
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
  return (
    
      <Container maxWidth="xl" sx={{ textAlign: 'center' }}>
         <Paper sx={{ padding: 2, marginTop: 2 }}>
         <Typography variant="h4" component="div" sx={{ paddingTop: 2 }}>
        Relatórios
      </Typography>
      <Typography variant="body" component="div" sx={{ mt: 1, marginLeft: 2, color: '#888888' }}>
        Aqui você pode gerar relatórios.
      </Typography>
        
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab label="Dashboard" {...a11yProps(0)} />
              <Tab label="Histórico por Filtro" {...a11yProps(1)} />
              <Tab label="Relatório em lista " {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Grid container spacing={0}>
              <Grid item xs={12}  md={6}>
                <Typography variant="body" component="div" sx={{  color: '#888888' }}>
                  
                  <Line options={options} data={data} />
                </Typography>
              </Grid>
              <Grid item xs={12}  md={6}>
                <Typography variant="body" component="div" sx={{ color: '#888888' }}>
                 
                <Bar options={optionsBar} data={dataBar} />;
                </Typography>
              </Grid>
              <Grid item xs={12}  md={6}>
                <Typography variant="body" component="div" sx={{  color: '#888888' }}>
                  
                  <Pie data={dataPie} />;
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body" component="div" sx={{ color: '#888888' }}>
                  
                  <Bubble options={optionsBubble} data={dataBubble} />;
                </Typography>
              </Grid>
              
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Typography variant="body" component="div" sx={{ mt: 5, mb: 5, marginLeft: 2, color: '#888888' }}>
              Relatórios dos Históricos
            </Typography>
            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} />
            </Box>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Typography variant="body" component="div" sx={{ mt: 5, marginLeft: 2, color: '#888888' }}>
              Históricos de Criação
            </Typography>
            <Box sx={{ mt: 5, mb: 5, maxWith: '100%' }}>
              <CollapsibleTable />
            </Box>
          </TabPanel>

       
        </Paper>
      </Container>
    
  );
}

export default Report