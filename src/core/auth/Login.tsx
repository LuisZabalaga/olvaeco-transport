import { useContext, useState, useEffect } from "react";
import { 
    Card, 
    CardContent, 
    IconButton,
    Typography, 
    InputAdornment, 
    InputLabel, 
    OutlinedInput, 
    FormControl,
    CircularProgress,
    TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { credentialsUser } from "./auth.model";
import { obtenerClaims, saveTokenLocalStorage } from "./handlerJWT";
import { Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthenticationContext from "./AuthenticationContext";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthService from '../helpers/HttpInstance';
import Div from "@jumbo/shared/Div";
import backgroundImg from '../assets/images/olva-fondo.jpg';
import * as yup from "yup";
import { toast } from "react-toastify";
import LogoEco from "../assets/images/logo-olva-eco.png";
import { StylesLogin } from './StylesLogin';

// import { useAuthContext } from "../../app/AppContext";
// import authServices from "../../../services/auth-services";
// import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const validationSchema = yup.object({
    username: yup
        .string()        
        .required('Usuario es requerido'),
    password: yup
        .string()
        .required('Contraseña es requerida'),
});

export default function Login(){

    // const isAuthenticated = useAuthContext();

    // useEffect(() => {

    // }, [])

    const styles = StylesLogin();

    const [ loading, setLoading ] = useState(false);
    const {actualizar} = useContext(AuthenticationContext);
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    // const {claims} = useContext(AuthenticationContext);

    async function login(credentials: credentialsUser){

        // try {
        //     const response = await
        //         axios.post<responseAuth>(`${urlLogin}`, credentials); 
        //         saveTokenLocalStorage(response.data);
        //         actualizar(obtenerClaims());
        //         // window.localStorage.setItem("orgId", orgDesc.orgId);            
        //         navigate("/status");               
            
        //     } catch (error) {
        //         setErrors(error.response.data);
        //         console.log(error.response.data);
        //     }

        // console.log(credentials);
        
        setLoading(true);
        AuthService.sendLoginData(credentials).then((res) => {
            saveTokenLocalStorage(res);
            actualizar(obtenerClaims());
            console.log("RESPUESTA", res);
            setTimeout(function(){      
                setLoading(false);
            }, 2000);
            if (res) {
                toast.success(`Bienvenido a Olva Eco-Transport: ${credentials.username}`, { theme: "colored", className:"toast-message" });
                if (res.role === '1') {
                    console.log(res.role, credentials.username);
                    navigate("/dashboard");  
                } else {
                    console.log(res.role, credentials.username);
                    navigate("/dashboard");
                }
            }
        })
        .catch((err) => {
            console.log("ERROR", err);
            setTimeout(function(){      
                setLoading(false);
            }, 1000);
            toast.error("Error, Credenciales Incorrectas.", { theme: "colored", className:"toast-message" });
        })

    }

    const [valuesPass, setValuesPass] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(

        <Div sx={{
                width: '100%',
                minWidth: '100%',
                minHeight: '100vh',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'end',
                boxSizing: 'border-box',
                backgroundImage: `url(${backgroundImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                // paddingBottom:'10px'
            }}
        >     

            <Div sx={{
                    width: 320,                  
                    marginRight: '40px',
                    textAlign: 'center',
                    padding: 'auto',
                    
                }}
            >
                <Card
                    sx={{
                        display: 'flex',
                        minWidth: 0,
                        flexDirection: {xs: 'column', md: 'row'},
                        boxShadow:'0 0.5rem 1.25rem rgba(0, 163, 254, 0.9)',
                    }}
                >
                    <CardContent sx={{flex:1, p:3, textAlign: 'center'}} >       
                        <Div sx={{width: '100%', maxWidth: 500, mt:2}}>
                            <Typography variant="subtitle2" gutterBottom component="div" sx={{fontSize:'17px'}}>
                                Bienvenido a 
                            </Typography>
                        </Div>
                        {/* <Div sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', mt:1, mb:1 }}>               
                            <Typography variant="h1" sx={{mt: 1, fontSize:'27px', fontWeight:'bold', color:'#024AC2' }}>Olva</Typography>
                            <Typography variant="h1" sx={{mt: 0, fontSize:'27px', fontWeight:'bold', color:'#024AC2' }}>Eco-Transport</Typography>
                        </Div> */}
                        <Div sx={{display:'flex',justifyContent:'center',alignItems:'center',mt:1,mb:3}}>               
                            <img src={LogoEco} alt="Logo Olva Eco-Transport" style={{width:'250px'}} />
                        </Div>
                        <Formik
                            validateOnChange={true}
                            initialValues={{
                                username: '',
                                password: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={                           
                                async values => await login(values)
                            }
                        >
                            {({isSubmitting}) => (
                                <Form style={{textAlign: 'center'}} noValidate autoComplete='off'>
                                    <Div sx={{mt: 1, mb: 2}}>
                                        <JumboTextField
                                            fullWidth
                                            name="username"
                                            label="Usuario"
                                        />
                                    </Div>                                                
                                    <Div sx={{mt: 1, mb: 2}}>
                                        <JumboTextField
                                            fullWidth                                                         
                                            name="password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            label="Contraseña"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}                                                          
                                        />                                                   
                                    </Div>                                                    

                                    <LoadingButton
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        // color="success"
                                        loading={loading}                                     
                                        size="large"
                                        sx={{mb:1}}
                                        className={styles.ButtonLogin}
                                        disabled={isSubmitting}
                                    >
                                        Iniciar Sesión
                                    </LoadingButton>

                                    <Div sx={{width:'100%', maxWidth:500, mb:0}}>
                                    </Div>

                                </Form>
                            )}
                        </Formik>
                    </CardContent>                                
                </Card>        
            </Div>
            <Div sx={{width:'100%', textAlign:'center', marginBottom:'10px'}}>
                <Typography variant="caption" sx={{textAlign:'center', color:'white'}} gutterBottom>
                    {/* © 2024 Derechos Reservados Olva Eco-Transport. */}
                </Typography>
            </Div>

        </Div>
        
    )
}