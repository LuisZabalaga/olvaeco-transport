import React, { useEffect, useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Article } from "@mui/icons-material";
import { truncate } from "fs";

const Menus = [
    {
        label: 'sidebar.menu.home',
        type: "section",
        children: [
            {
                uri: `/transactions`,
                // label: 'sidebar.menuItem.status',
                label: 'Transacciones',
                type: "nav-item",
                icon: <TurnedInIcon sx={{fontSize: 20}}/>
            },
            {
                uri: `/status`,
                // label: 'sidebar.menuItem.status',
                label: 'Estados',
                type: "nav-item",
                icon: <TurnedInIcon sx={{fontSize: 20}}/>
            },
            {
                uri: `/services`,
                // label: 'sidebar.menuItem.status',
                label: 'Servicios',
                type: "nav-item",
                icon: <StorageIcon sx={{fontSize: 20}}/>
            },
            // {
            //     uri: `/companies`,
            //     label: 'Organizaciones',
            //     type: "nav-item",
            //     icon: <SettingsIcon sx={{fontSize: 20}}/>,
            // },            
            {
                uri: `/inquiries`,
                label: 'Consultas Reniec',
                type: "nav-item",
                icon: <Article sx={{fontSize: 20}}/>,
            },
            {
                uri: `/logs`,
                label: 'Logs',
                type: "nav-item",
                icon: <ErrorIcon sx={{fontSize: 20}}/>,
            },
            // {
            //     label: 'sidebar.menuItem.reports',
            //     type: "collapsible",
            //     icon: <PieChartIcon sx={{fontSize: 20}}/>,
            //     children: [                    
            //         {
            //             uri: "/reports",
            //             label: "sidebar.menuItem.boxReports",
            //             type: "nav-item"
            //         },
            //         {
            //             uri: "/graphs",
            //             label: "sidebar.menuItem.statisticalGraphs",
            //             type: "nav-item"
            //         },
            //         {
            //             uri: "/user-updated",
            //             label: "sidebar.menuItem.usersUpdated",
            //             type: "nav-item"
            //         },
            //     ]
            // }            
        ]
    },
];

export default Menus;
