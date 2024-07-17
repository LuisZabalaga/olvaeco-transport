import JumboApp from "@jumbo/components/JumboApp";
import JumboDialog from "@jumbo/components/JumboDialog";
import JumboDialogProvider from "@jumbo/components/JumboDialog/JumboDialogProvider";
import JumboTheme from "@jumbo/components/JumboTheme";
import JumboRTL from "@jumbo/JumboRTL/JumboRTL";
import Div from "@jumbo/shared/Div";
import { CircularProgress } from "@mui/material";
import { claim } from "core/auth/auth.model";
import AuthenticationContext from "core/auth/AuthenticationContext";
import Authorized from "core/auth/Authorized";
import { obtenerClaims } from "core/auth/handlerJWT";

import { routeNoAuthentication, routePath } from "core/route-config";

import { SnackbarProvider } from "notistack";
import React, { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import AppProvider from "./AppProvider";
import { useAuthContext } from "./AppContext";
import { AuthContextProvider } from './AppContext';
import AppRoutes from "./AppRoutes";
import { config } from "./config/main";
import configureStore from './redux/store';
import Login from "core/auth/Login";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});



const store = configureStore();

function App() {

    const [claims, setClaims] = useState<claim[]>([
        // {name: 'email', value:'marco.ch@olympus.pe'},
        //  {name: 'role', value:'admin'}
    ]);

    // console.log(claims);
    
    useEffect(()=>{        
        setClaims(obtenerClaims());        
    },[])

    function  actualizar(claims: claim[]){
        setClaims(claims);       
    }

    function esAdmin(){
        // return claims.findIndex(claim => claim.name === 'role' && claim.value === 'ObjectClass') > -1;
        // return claims.findIndex(claim => claim.name === 'role' && claim.value === '1') > -1;
        return claims.findIndex(claim => claim.value == '1' || claim.value == '0') > -1;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <AuthContextProvider>
                    <BrowserRouter >
                    
                        <AppProvider>
                            <JumboApp activeLayout={config.defaultLayout}>
                                <JumboTheme init={config.theme}>
                                    <JumboRTL>
                                        <JumboDialogProvider>
                                            <JumboDialog/>
                                            <SnackbarProvider
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                maxSnack={3}>
                                                <AuthenticationContext.Provider value={{claims, actualizar}}>
                                                    <Authorized 
                                                    
                                                        authorized={
                                                            
                                                            <AppLayout>
                                                                <Suspense
                                                                    fallback={
                                                                        <Div
                                                                            sx={{
                                                                                display: 'flex',
                                                                                minWidth: 0,
                                                                                alignItems: 'center',
                                                                                alignContent: 'center',
                                                                                height: '100%',
                                                                            }}
                                                                        >
                                                                            <CircularProgress sx={{m: '-40px auto 0'}}/>
                                                                        </Div>
                                                                    }
                                                                >              

                                                                    <Routes>                                                       
                                                                        <>                                                                
                                                                            {routePath.map(route =>
                                                                                <Route key={route.path} path={route.path}                                                            
                                                                                    element={
                                                                                        route.esAdmin && !esAdmin() ? <>Usuario No Autorizado</> : <route.component />                                                                     
                                                                                    }>
                                                                                </Route>)}                                                                 
                                                                        </>                                                     
                                                                    </Routes>
                                                                
                                                                    <AppRoutes/>
                                                                </Suspense>
                                                            </AppLayout>
                                                        }
                                                        noAuthorized={
                                                            // <>
                                                            //     <Routes>
                                                            //     {routeNoAuthentication.map(route =>
                                                            //         <Route key={route.path} path={route.path}                                                            
                                                            //             element={
                                                            //                 <route.component />
                                                            //             }>                                                                    
                                                            //         </Route>)} 
                                                            //     </Routes>
                                                            // </>  
                                                            <Login></Login>
                                                        }
                                                    />                                                
                                                    
                                                </AuthenticationContext.Provider>

                                            </SnackbarProvider>
                                        </JumboDialogProvider>
                                    </JumboRTL>
                                </JumboTheme>
                            </JumboApp>
                        </AppProvider>                    
                        
                    </BrowserRouter>
                </AuthContextProvider>
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
