import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/auth-service';


const RequireAuth = () => {
    const auth = authService.getCurrentUser();
    return (
        auth ?
             <Outlet/>
            :
            <Navigate to = "/"/>
    );
}

export default RequireAuth