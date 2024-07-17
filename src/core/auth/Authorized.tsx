import React, { ReactElement, useContext, useEffect, useState } from "react";
import AuthenticationContext from "./AuthenticationContext";

export default function Authorized(props: authorizedProps){

    const [isAuthorized, setisAuthorized] = useState(false);
    const {claims} = useContext(AuthenticationContext);

    // console.log(claims);
    
    useEffect(() =>{
        
        if (props.role){
            // const indice = claims.findIndex(claim => claim.name === 'role' && claim.value === props.role)
            const indice = claims.findIndex(claim => claim.name === 'role' && claim.value === props.role)
            // console.log(indice);
            setisAuthorized(indice > -1);      
        } else{
            setisAuthorized(claims.length > 0);
        }
        
    }, [claims, props.role])

    return(
        <>
            {isAuthorized ? props.authorized : props.noAuthorized}
        </>
    )
}

interface authorizedProps{
    authorized: ReactElement;
    noAuthorized?: ReactElement;
    role?: string;
}