import React from 'react';
import Stack from "@mui/material/Stack";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import AuthUserDropdown from "../../../../shared/widgets/AuthUserDropdown";
// import NotificationsDropdown from "../../../../shared/NotificationsDropdown";
// import MessagesDropdown from "../../../../shared/MessagesDropdown";
import SearchGlobal from "../../../../shared/SearchGlobal";
import { IconButton, Slide, useMediaQuery, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import JumboIconButton from "@jumbo/components/JumboIconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Logo from "../../../../shared/Logo";
import {SIDEBAR_STYLES, SIDEBAR_VARIANTS} from "@jumbo/utils/constants";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";


const Header = () => {
    const {sidebarOptions, setSidebarOptions} = useJumboLayoutSidebar();
    const [dropdownSearchVisibility, setDropdownSearchVisibility] = React.useState(false);
    const {headerTheme} = useJumboHeaderTheme();

    const showDropdownSearch = useMediaQuery('(max-width:575px)');

    return (
        <React.Fragment>
            {
                (
                    sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER
                    || sidebarOptions.variant === SIDEBAR_VARIANTS.TEMPORARY
                    || (sidebarOptions.variant === SIDEBAR_VARIANTS.PERSISTENT && !sidebarOptions.open)
                ) &&
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{
                            ml: sidebarOptions.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER ? -2 : 0,
                            mr: 3,
                        }}
                        onClick={() => setSidebarOptions({open: !sidebarOptions.open})}
                    >
                        {
                            sidebarOptions?.open ? <MenuOpenIcon/> : <MenuIcon/>
                        }
                    </IconButton>
            }
            {
                sidebarOptions?.style === SIDEBAR_STYLES.CLIPPED_UNDER_HEADER &&
                <Logo sx={{ mr: 3 }} mode={headerTheme.type ?? "light"} mini={undefined}/>
            }
            {
                showDropdownSearch &&
                <Slide in={dropdownSearchVisibility}>
                    <Div
                        sx={{
                            zIndex: 5,
                            left: 0,
                            right: 0,
                            position: 'absolute',
                            height: '100%',
                        }}
                    >
                        <SearchGlobal
                            sx={{
                                maxWidth: 'none',
                                height: '100%',
                                display: 'flex',

                                '& .MuiInputBase-root': {
                                    flex: 1,
                                    borderRadius: 0,
                                    background: theme => theme.palette.background.default,
                                },
                                '& .MuiInputBase-input': {
                                    pr: 6,
                                }
                            }}
                        />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: 15,
                                top: '50%',
                                color: 'inherit',
                                transform: 'translateY(-50%)',
                            }}
                            onClick={() => setDropdownSearchVisibility(false)}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Div>
                </Slide>
            }
            
            {/* Input Buscar */}
            {
                !showDropdownSearch &&
                <SearchGlobal
                    sx={{
                        maxWidth: {xs: 240, md: 320}                        
                    }}
                />
            }
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ml: "auto"}}>
                {
                    showDropdownSearch &&
                    <JumboIconButton elevation={25} onClick={() => setDropdownSearchVisibility(true)}>
                        <SearchIcon fontSize={"small"}/>
                    </JumboIconButton>
                }
                {/* <MessagesDropdown/>
                <NotificationsDropdown/> */}
                {/* <Div sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        p: theme => theme.spacing(1),
                    }}
                >
                    <img src={spanish} alt="Español" style={{width:'29px', marginTop:'0px', cursor:'pointer'}} />
                </Div> */}
                {/* <Div sx={{display:'flex', justifyContent:'center', alignItems:'center', p: theme => theme.spacing(2)}}>
                    <Typography variant="h1" sx={{mr: -1.6, mt: 1, fontSize:'24px', fontWeight:'bold', color:'#3BD2A2' }}>Mo</Typography>
                    <img src={moneta} alt="Logo Moneta" style={{width:'55px', height:'60px', marginTop:'0px' }} />
                    <Typography variant="h1" sx={{ml: -1.6, mt: 1, fontSize:'24px', fontWeight:'bold' }}>neta</Typography>
                </Div> */}
                <AuthUserDropdown/>
            </Stack>
        </React.Fragment>
    );
};

export default Header;
