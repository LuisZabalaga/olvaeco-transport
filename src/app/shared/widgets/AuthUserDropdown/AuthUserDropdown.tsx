import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import Div from "@jumbo/shared/Div";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { ListItemIcon, ListItemText, ThemeProvider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import AuthenticationContext from 'core/auth/AuthenticationContext';
import { logout } from 'core/auth/handlerJWT';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { authUser } from "./fake-db";
import { useJwt } from "react-jwt";

const AuthUserDropdown = () => {
    const {actualizar, claims} = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const {theme} = useJumboTheme();
    const {setAuthToken} = useJumboAuth();

    let user, role;

    if (window.localStorage.getItem("token")) {
        if (claims[0]) { 
            user = claims[0].value + " " + claims[2].value;
        }else {
            user = 'Sin Nombre';
        }
        if (claims[1]) {
            switch (claims[1].value.toString()) {
                case '0':
                    role = 'Cliente';
                    break;
                case '1':
                    role = 'Empleado';
                    break;
                default:
                    role = 'Administrador';
                    break;
            }
            console.log(role);
        }else {
            role = 'Sin Rol';
        }
    }

    function getNameUser(): string{
        
        return claims.filter(x => x.name === "name")[0]?.value;
    }

    const onLogout = () => {
        // setAuthToken(null);
        navigate("/login");
    };

    return (
        <ThemeProvider theme={theme}>            
            <JumboDdPopover
                triggerButton={
                    <Avatar
                        src={authUser.profile_pic}
                        sizes={"small"}
                        sx={{boxShadow:25, cursor:'pointer', border:'1px solid #D1D8DC'}}
                    />
                }
            >
                <Div sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width:'150px',
                    p: theme => theme.spacing(2.5),
                }}>
                    <Avatar src={authUser.profile_pic} alt={authUser.name} sx={{width: 75, height: 75, mb: 3}}/>
                    {/* <Typography variant={"h5"}>{getNameUser()}</Typography>
                    <Typography variant={"body1"} color="text.secondary">{authUser.handle}</Typography> */}
                    <Typography variant={"h6"}>{ user }</Typography>
                    <Typography style={{textTransform:'uppercase'}} variant={"body1"} color="text.secondary">{ role }</Typography>
                </Div>
                <Divider/>
                <nav>
                    <List disablePadding sx={{pb: 1}}>
                        {/* <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <PersonOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Perfil" sx={{my: 0}}/>
                        </ListItemButton> */}
                        {/* <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <EditOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Edit Profile" sx={{my: 0}}/>
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <RepeatOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText onClick={() => navigate("/samples/content-layout")} primary="Switch User"
                                          sx={{my: 0}}/>
                        </ListItemButton> */}
                        <ListItemButton onClick={() => {
                                logout();
                                onLogout()
                                actualizar([]);
                            }}>
                            <ListItemIcon sx={{minWidth: 36}}>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Salir" sx={{my: 0}} />
                        </ListItemButton>
                    </List>
                </nav>
            </JumboDdPopover>
        </ThemeProvider>
    );
};

export default AuthUserDropdown;
