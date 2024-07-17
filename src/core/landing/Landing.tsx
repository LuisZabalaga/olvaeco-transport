import React from "react";
import JumboButton from "@jumbo/components/JumboButton/JumboButton";
import Authorized from "core/auth/Authorized";
export default function Landing(){
    return(
        <>
            <Authorized 
                noAuthorized = { <> Nó estas autorizado</> }
                role = "ObjectClass"
                authorized = {
                    <>
                        Estás autorizado
                        <div>
                            <span>Componente nuevo Landing prueba</span>                        
                            <JumboButton>Boton</JumboButton>
                        </div>
                    </>
                }
                
            />
            
                       
        </>
    )
}