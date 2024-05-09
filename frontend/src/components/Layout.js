import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';

import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDrawer, setOpenDrawer] = React.useState(false);
  
  const navigate = useNavigate();

  const menuItem = [

 


    {
        text: 'Relatório',
        icon:  <BarChartIcon />,
        path:  '/report'
    },
    
    {
      text: 'Monitor',
      icon: <MonitorHeartOutlinedIcon/>,
      path:  '/monitor'
  },
    
  ]
  const menuItemSub = [
    {
      text: 'Criar Monitoramento',
      icon: <DisplaySettingsOutlinedIcon/>,
      path:  "/novo-monitoramento"
    },

    {
      text: 'Usuários',
      icon: <PermIdentityIcon/>,
      path:  '/users'
  },
  

    {
        text: 'Configurações',
        icon: <SettingsOutlinedIcon/>,
        path:  '/setting'
    },

    {
        text: 'Notificações',
        icon: <NotificationsNoneOutlinedIcon/>,
        path:  "/notification"
    }

  ]


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
      <Button onClick={() => setOpenDrawer(!openDrawer)} sx={{zIndex: (theme) => theme.zIndex.drawer + 1,color:'white',alignContent: 'center',height: "60px"}} >
        <MenuIcon/>
      </Button>

      <Drawer
        open={openDrawer}
        // anchor="left"
        // variant="temporary"
        // variant="permanent"
        // variant="persistent"

        onClose={() => setOpenDrawer(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar  />
        <Box sx={{ overflow: 'auto' }}>
          <List>
                {menuItem.map(item =>(    
                  <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
                  <ListItemIcon>
                   {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          <Divider />
          <List>
                {user ? menuItemSub.map(item =>(    
                  <ListItemButton key={item.text} onClick={() => navigate(item.path)}>
                  <ListItemIcon>
                   {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )): 
              <ListItemButton key={'Login'} onClick={() => navigate('/')}>
              <ListItemIcon>
               <LoginIcon/>
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItemButton>
              }
            </List>
        </Box>
      </Drawer>

      
    </Box>
  );
}
export default Layout