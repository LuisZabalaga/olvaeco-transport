import React, {Suspense, useContext} from 'react';
import {IconButton, Typography} from "@mui/material";
// import Menus from "./Menus";
import JumboVerticalNavbar from "@jumbo/components/JumboVerticalNavbar/JumboVerticalNavbar";
import {DrawerHeader} from "@jumbo/components/JumboLayout/style";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import useJumboSidebarTheme from "@jumbo/hooks/useJumboSidebarTheme";
import {SIDEBAR_STYLES, SIDEBAR_VIEWS} from "@jumbo/utils/constants/layout";
// import Logo from "../../../../shared/Logo";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Zoom from "@mui/material/Zoom";
import Div from "@jumbo/shared/Div";
import SidebarSkeleton from "./SidebarSkeleton";
import Logo from 'app/shared/Logo';
import LogoEco from '../../../../../core/assets/images/logo-olva-eco.png';
import AuthenticationContext from 'core/auth/AuthenticationContext';

import ErrorIcon from '@mui/icons-material/Error';
import EngineeringIcon from '@mui/icons-material/Engineering';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Article, Leaderboard } from "@mui/icons-material";
import { BsFillPersonVcardFill, BsGearFill } from 'react-icons/bs';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { BsCartPlusFill } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { MdOutlinePointOfSale } from "react-icons/md";
import { BsPieChartFill } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { FaUserTie } from "react-icons/fa";

const Sidebar = () => { 

    const {claims} = useContext(AuthenticationContext);

    let role, validate = false;
    if (window.localStorage.getItem("token")) {
        // user = claims[0].value;
        if (claims[1]) {
            role = claims[1].value;
        } else {
            role = 2;
            console.log("No hay ROL ELSE");
        }        
        console.log(role);
        if (role === 1) {
            validate = true;
        }
    }

    // console.log(user);

    const Menus = [
        {
            label: 'sidebar.menu.home',
            type: "section",
            children: [
                validate ?
                    {
                        uri: `/dashboard`,
                        label: 'Dashboard',
                        type: "nav-item",
                        icon: <BsPieChartFill style={{fontSize: 20}}/>,
                    } : null,
                {
                    // uri: `/queries`,
                    label: 'Consultas',
                    type: "collapsible",
                    icon: <SiOpenstreetmap style={{fontSize: 20}}/>,
                    children: [                    
                        {
                            uri: "/consult-rute",
                            label: "Consultar Distancia",
                            type: "nav-item"
                        },
                        {
                            uri: "/shipping-tracking",
                            label: "Seguimiento Envio",
                            type: "nav-item"
                        },
                        {
                            uri: "/check-shipping",
                            label: "Consultar Envios",
                            type: "nav-item"
                        },                        
                    ]
                },
                // validate ?  
                    {
                        label: 'Programación',
                        type: "collapsible",
                        icon: <BsCashCoin style={{fontSize:20}}/>,
                        children: [                    
                            {
                                uri: "/shipments",
                                label: "Envios",
                                type: "nav-item"
                            },
                            {
                                uri: "/packages",
                                label: "Paquetes",
                                type: "nav-item"
                            },
                            {
                                uri: "/package-types",
                                label: "Tipo Paquetes",
                                type: "nav-item"
                            },                            
                        ]
                    }, // : null,       
                    validate ?  
                    {
                        uri: 'customers',
                        label: 'Clientes',
                        type: "nav-item",
                        icon: <FaUserTie style={{fontSize:20}}/>,                       
                    } : null,     
                    
                // {
                //     label: 'Compras',
                //     type: "collapsible",
                //     icon: <BsCartPlusFill style={{fontSize:20}}/>,
                //     children: [                    
                //         {
                //             uri: "/reports",
                //             label: "Cotizaciones",
                //             type: "nav-item"
                //         },
                //         {
                //             uri: "/graphs",
                //             label: "Comprobante Electronico",
                //             type: "nav-item"
                //         },
                //         {
                //             uri: "/user-updated",
                //             label: "Guia de Remisión",
                //             type: "nav-item"
                //         },
                //         {
                //             uri: "/user-updated",
                //             label: "Notas de Venta",
                //             type: "nav-item"
                //         },
                //     ]
                // },
                // validate ?                    
                //     {
                //         label: 'Inventario',
                //         type: "collapsible",
                //         icon: <MdInventory style={{fontSize:20}}/>,
                //         children: [                    
                //             {
                //                 uri: "/products",
                //                 label: "Productos",
                //                 type: "nav-item",
                //             },
                //             // {
                //             //     uri: "/graphs",
                //             //     label: "Comprobante Electronico",
                //             //     type: "nav-item"
                //             // },
                //             // {
                //             //     uri: "/user-updated",
                //             //     label: "Guia de Remisión",
                //             //     type: "nav-item"
                //             // },
                //             // {
                //             //     uri: "/user-updated",
                //             //     label: "Notas de Venta",
                //             //     type: "nav-item"
                //             // },
                //         ]
                //     } : null,
                // {
                //     label: 'Caja',
                //     type: "collapsible",
                //     icon: <MdOutlinePointOfSale style={{fontSize:20}}/>,
                //     children: [                    
                //         {
                //             uri: "/reports",
                //             label: "Cotizaciones",
                //             type: "nav-item"
                //         },
                //         {
                //             uri: "/graphs",
                //             label: "Comprobante Electronico",
                //             type: "nav-item"
                //         },
                //         {
                //             uri: "/user-updated",
                //             label: "Guia de Remisión",
                //             type: "nav-item"
                //         },
                //         {
                //             uri: "/user-updated",
                //             label: "Notas de Venta",
                //             type: "nav-item"
                //         },
                //     ]
                // },
                validate ?                    
                    {
                        label: 'Configuración',
                        type: "collapsible",
                        icon: <BsGearFill style={{fontSize:20}}/>,
                        children: [                    
                            {
                                uri: "/users",
                                label: "Usuarios",
                                type: "nav-item",
                                // icon: <FaUsers style={{fontSize: 20}}/>
                            },
                            {
                                uri: "/employees",
                                label: "Empleados",
                                type: "nav-item",
                            }
                            // {
                            //     uri: "/graphs",
                            //     label: "Comprobante Electronico",
                            //     type: "nav-item"
                            // },
                            // {
                            //     uri: "/user-updated",
                            //     label: "Guia de Remisión",
                            //     type: "nav-item"
                            // },
                            // {
                            //     uri: "/user-updated",
                            //     label: "Notas de Venta",
                            //     type: "nav-item"
                            // },
                        ]
                    } : null,     

                // validate ?
                //     {
                //         uri: `/config`,
                //         label: 'Config',
                //         type: "nav-item",
                //         icon: <BsGearFill style={{fontSize:20}}/>
                //     } : null,

                // {
                //     uri: `/users`,
                //     // label: 'sidebar.menuItem.status',
                //     label: 'Usuarios',
                //     type: "nav-item",
                //     icon: <FaUsers style={{fontSize: 20}}/>
                // },
            ]
        },
    ];

    return (
        <React.Fragment>
            <SidebarHeader/>
            <JumboScrollbar
                autoHide
                autoHideDuration={200}
                autoHideTimeout={500}
            >
                <Suspense
                    fallback={
                        <Div
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                alignItems: 'center',
                                alignContent: 'center',
                                px: 3
                            }}
                        >
                            <SidebarSkeleton/>
                        </Div>
                    }
                >
                    <JumboVerticalNavbar translate items={Menus}/>
                </Suspense>
            </JumboScrollbar>
        </React.Fragment>
    );
};

const SidebarHeader = () => {
    const {sidebarOptions, setSidebarOptions} = useJumboLayoutSidebar();
    const {sidebarTheme} = useJumboSidebarTheme();   

    const isMiniAndClosed = React.useMemo(() => {
        return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
    }, [sidebarOptions.view, sidebarOptions.open]);

    const {claims} = useContext(AuthenticationContext);

    let user;
    if (window.localStorage.getItem("token")) {
        if (claims[0]) { 
            user = claims[0].value + " " + claims[2].value;
        }else {
            user = 'Sin Nombre';
        }
        console.log("CLAIMS", claims);
    }

    return (
        <React.Fragment>
            {
                sidebarOptions?.style !== SIDEBAR_STYLES.CLIPPED_UNDER_HEADER &&
                <DrawerHeader>
                    {/* <Logo mini={isMiniAndClosed} mode={sidebarTheme.type} sx={{mr: 3}}/> */}
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
                            <img src={LogoEco} alt="Logo Olva Eco-Transport" style={{width:'145px'}} />
                            {/* <Typography 
                                variant="h1"
                                sx={{fontSize:'19px', fontWeight:'bold', color:'#475259',margin:'0px' }}
                            >
                                Olva
                            </Typography>
                            <Typography 
                                variant="h1"
                                sx={{fontSize:'19px', fontWeight:'bold', color:'#475259',margin:'0px' }}
                            >
                                Eco-Transport
                            </Typography>                                              */}
                        </div>                                         
                    {
                        sidebarOptions?.view !== SIDEBAR_VIEWS.MINI &&
                        <Zoom in={sidebarOptions?.open}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ml: 0, mr: -1.5}}
                                onClick={() => setSidebarOptions({open: false})}
                            >
                                <MenuOpenIcon/>
                            </IconButton>
                        </Zoom>
                    }
                    
                </DrawerHeader>
            }
            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                <Typography sx={{fontSize:'14px', fontWeight:'none', color:'#475259' }}>{ user }</Typography>
            </div>
        </React.Fragment>
    )
};

export default Sidebar;
