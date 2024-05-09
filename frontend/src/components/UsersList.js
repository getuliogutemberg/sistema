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
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const getUsers = async () => {
        let response = await axios.get(`http://localhost:8080/users`)
        console.log(response.data)
        return setUsers(response.data);
    }

    useEffect(() => {
        getUsers();
    }, [])

    const rows = users.map((row) => ({
        cpf: row.cpf,
        createdAt: row.createdAt,
        email: row.email,
        id: row.id,
        isConnected: row.isConnected,
        name: row.name,
        roles: row.roles[0].name,
        telefone: row.telefone,
        updatedAt: row.updatedAt,
        



    }));


    const columns = [
        { field: 'cpf', headerName: 'cpf', width: 150 },
        { field: 'createdAt', headerName: 'createdAt', width: 150 },
        { field: 'email', headerName: 'email', width: 150 },
        { field: 'id', headerName: 'id', width: 150 },
        { field: 'isConnected', headerName: 'isConnected', width: 150 },
        { field: 'name', headerName: 'name', width: 150 },
        { field: 'roles', headerName: 'roles', width: 150 },
        { field: 'telefone', headerName: 'telefone', width: 150 },
        { field: 'updatedAt', headerName: 'updatedAt', width: 150 },
       

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