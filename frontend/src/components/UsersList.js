import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box } from '@mui/system';

const ITEM_HEIGHT = 40;

const UsersList = () => {
    const [leitos, setLeitos] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const getLeitos = async () => {
        let response = await axios.get(`http://192.168.1.17:8080/api/leitos`,)
        return setLeitos(response.data);
    }

    useEffect(() => {
        getLeitos();
    }, [])

    const rows = leitos.map((row, index) => ({
        id: index,
        idLeito: row.idLeito,
        idAirPure: row.idAirPure,
        nome: row.nome,
        limitCo2: row.limitCo2,
        limitCOVT: row.limitCOVT,
        limitLuminosidade: row.limitLuminosidade,
        limitRuidoSonoro: row.limitRuidoSonoro,
        limitTemperatura: row.limitTemperatura,
        limitUmidade: row.limitUmidade,
        createdAt: row.createdAt


    }));


    const columns = [
        { field: 'idLeito', headerName: 'IdLeito', width: 150 },
        { field: 'idAirPure', headerName: 'IdAirPure', width: 150 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'limitCo2', headerName: 'Valor limite CO2', width: 150 },
        { field: 'limitCOVT', headerName: 'Valor limite COVT', width: 150 },
        { field: 'limitLuminosidade', headerName: 'Valor limite Luminosidade', width: 150 },
        { field: 'limitRuidoSonoro', headerName: 'Valor limite Ruido sonoro', width: 150 },
        { field: 'limitTemperatura', headerName: 'Valor limite Temperatura', width: 150 },
        { field: 'limitUmidade', headerName: 'Valor limite Umidade', width: 150 },
        { field: 'createdAt', headerName: 'Data de criação', width: 150 },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClickMenu}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '150px',
                                },
                            }}
                        >


                            <MenuItem >
                                <EditOutlinedIcon sx={{ mr: 1 }} />
                                Editar
                            </MenuItem>
                            <MenuItem  >
                                <DeleteOutlineOutlinedIcon sx={{ mr: 1 }} />
                                Excluir
                            </MenuItem>

                        </Menu>
                    </>
                );
            },
        },
    ];




    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} disableColumnMenu/>
        </Box>
    );
}
export default UsersList;