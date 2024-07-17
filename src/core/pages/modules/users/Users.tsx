import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import APISERVICE from "../../../helpers/HttpInstance";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { Card, CardContent, Checkbox, FormControlLabel, IconButton, Typography, Switch, FormGroup } from "@mui/material";
import Div from "@jumbo/shared/Div";
import DataTable from 'react-data-table-component';
import AppsIcon from '@mui/icons-material/Apps';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LoadingButton from "@mui/lab/LoadingButton";
import { BiImageAdd } from "react-icons/bi";
import { BsShieldShaded, BsFillTagsFill, BsCheckLg, BsGearFill, BsApp, BsCursorFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { FaUserCircle, FaEdit, FaUser, FaUsers, FaClipboardList } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";
import Divider from "@mui/material/Divider";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import { MenuItem, TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import atob from 'atob';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import CircularProgress from '@mui/material/CircularProgress';
import { BsPersonSquare } from "react-icons/bs";
import { BsPersonVcardFill } from "react-icons/bs";
import { FaHospitalAlt } from "react-icons/fa";
import { BsPersonFillAdd } from "react-icons/bs";

import { StylesUsers } from './StylesUsers';

const Users = () => {

  const customStyles = {
    headRow: {
      style: {
        // border: 'none',	
        backgroundColor: '#F7F7F7',	
      },
    },
    headCells: {
      style: {
        color: '#202124',
        fontSize: '10.5px',
        textTransform: 'uppercase'
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        // borderRadius: '25px',
        outline: '1px solid #FFFFFF',
      },
      style: {
        backgroundColor: '#F7F7F7',
        // cursor: 'pointer',
      }
    },
    pagination: {
      style: {
        // border: 'none',
      },
    },
  };
  
  const columns = [
    {
      cell: () => <FaUser style={{ fill:'#475259', fontSize:'16px' }} />,
      width: '56px',
      style: {
        borderBottom: '1px solid #FFFFFF',
        marginBottom: '-1px',
      },
    },
    {
      name: '#',
      selector: row => row.id,
      sortable: true,
      // grow: 2,
      style: {
        // color: '#202124',
        color: '#475259',
        fontSize: '14px',
        // fontWeight: 500,
      },
    },
    {
      name: 'Nombres',
      selector: row => row.name,
      sortable: true,
      // grow: 2,
      style: {
        // color: '#202124',
        color: '#475259',
        fontSize: '14px',
        // fontWeight: 500,
      },
    },
    {
      name: 'Usuario',
      selector: row => row.email,
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
   //  {
   //    name: 'Rol',
   //    selector: row => row.state === 0 ? (<BsApp style={{color:'red'}} />) : (<BsCheckLg style={{color:'#3BD2A2'}}/>),
   //    sortable: true,
   //    style: {
   //      color: '#475259',
   //    },	
   //  },
   {
      name: 'Perfil',
      selector: row => row.role === '1' ? 'Administrador' : 'Usuario',
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
   //  {
   //    name: 'Local',
   //    selector: row => row.establishment === '1' ? 'Farmacia 1' : 'Farmacia 2',
   //    sortable: true,
   //    style: {
   //      color: '#475259',
   //    },	
   //  },
    {
      name: 'Acciones',
      cell: row =>
        <>
          <Tooltip title="Ver Usuario" arrow TransitionComponent={Zoom}>
            <IconButton aria-label="Sites" size="small" onClick={() => handleUserModal(row)}>
              <FaUserCircle style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Modificar Usuario" arrow TransitionComponent={Zoom}>
            <IconButton aria-label="Sites" size="small" onClick={() => handleEditModal(row)}>
              <RiEdit2Fill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
            </IconButton>
          </Tooltip>          
          {/* <Tooltip title="Propiedades" arrow TransitionComponent={Zoom}>
            <IconButton aria-label="Sites" size="small" onClick={() => {handlePropertiesUserModal(row)}}>
              <BsGearFill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Eliminar Usuario" arrow TransitionComponent={Zoom}>
            <IconButton aria-label="Sites" size="small" onClick={() => {handleDeleteUserModal(row)}}>
              <BsTrashFill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
            </IconButton>
          </Tooltip>
        </>,
      allowOverflow: true,
      button: true,
      width: '140px',
    },
  ];

   const styles = StylesUsers();
   const [loading, setLoading] = useState(false);
   const [showUserModal, setUserModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [showPropertiesModal, setShowPropertiesModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const [listUsers, setListUsers] = useState([]);
   const [userProperties, setUserProperties] = useState([]);
   const [userId, setUserId] = useState(null);
   const [userData, setUserData] = useState({
      name:'',
      email:'',
      role:'',
      establishment:'1',
      password:'123456',
   });

   const handleChange = ({ target }) => {
      setUserData({
         ...userData,
         [target.name]: target.value,
      });      
   };

   useEffect(() => {
      handleGetAllUsers();
   }, []);

   const handleGetAllUsers = async() => {
      setLoading(true);
      await APISERVICE.getAllUsers().then((res) => {
         console.log("LISTA DE USUARIOS", res);
         setListUsers(res);
         setLoading(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleGetUserById = async(userId:any) => {
      setLoading(true);
      await APISERVICE.getUserById(userId).then((res) => {
         console.log("USUARIO__ ", res);
         setUserProperties(res.user);
         setLoading(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleCreateUser = async() => {
      setLoading(true);
      await APISERVICE.registerUser(userData).then((res) => {
         console.log("CREADO", res);
         setListUsers(res);
         setLoading(false);
         handleGetAllUsers();
         setShowEditModal(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleUpdatedUserById = async() => {
      setLoading(true);
      await APISERVICE.updatedUserById(userData, userId).then((res) => {
         console.log("ACTUALIZADO", res);
         setLoading(false);
         handleGetAllUsers();
         setShowEditModal(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleDeleteUserById = async() => {
      setLoading(true);
      await APISERVICE.deleteUserById(userId).then((res) => {
         console.log("ELIMINADO", res);
         setLoading(false);
         handleGetAllUsers();
         setShowDeleteModal(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleUserModal =  (user: any) => {
      setUserModal(true);
      handleGetUserById(user.id);
   }

   const handleAddModal =  () => {
      setShowEditModal(true);
      setUserId(null);
      setUserData({
         name:'',
         email:'',
         role:'',
         establishment:'1',
         password:'',
      });
   }

   const handleEditModal =  (user: any) => {
      setShowEditModal(true);
      setUserId(user.id);
      handleGetUserById(user.id);
      
      userData.name = user.name;
      userData.email = user.email;
      userData.role = user.role;
      userData.establishment = user.establishment;
   }

   const handlePropertiesUserModal =  (user: any) => {
      handleGetUserById(user.id);
      setShowPropertiesModal(true);
   }

   const handleDeleteUserModal =  (user: any) => {
      handleGetUserById(user.id);
      setUserId(user.id);
      setShowDeleteModal(true);
   }

   const { register, handleSubmit, formState: {errors} } = useForm();

  // const validateFormUser = (values) => {    
  //   const errors = {};
  //   if(!values.organization){
  //     errors.organization = "Organizaciones es Requerido";
  //   }
  //   if(!values.sites){
  //     errors.sites = "Sitios es Requerido";
  //   }
  //   if(!values.unit){
  //     errors.unit = "Unidades Organizativas es Requerido";
  //   }   
  //   return errors;
  // }

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por Página:', 
    rangeSeparatorText: 'de'
  }

  return (
    <div>
      <Div className={styles.DivTitle}>
        <Typography variant={"h4"} gutterBottom component="div" className={styles.TypographyTitle} >
            <FaUsers className={styles.TypographyTitleIcon} />
            Usuarios
        </Typography>
        <Typography variant={"h4"} gutterBottom component="div" className={styles.TypographyTitle} >
            {/* {orgDesc["desc"]} */}
        </Typography>
      </Div>
  
      <Div sx={{bgcolor:'background.paper'}} className={styles.DivBody}>
          {/* <Form style={{textAlign: 'center'}} noValidate autoComplete='off'> */}
          <Typography variant={"h4"} gutterBottom component="div" className={styles.TypographyTitleTable} >
            <FaClipboardList className={styles.TypographyTitleTableIcon} />
            Lista de Usuarios
          </Typography>

          {/* <Divider />
          <Typography variant={"h5"} gutterBottom component="div" className={styles.TypographyTitleFilter} >
            Filtros:
          </Typography>
          <Paper className={styles.DivPaper} elevation={3}>
            <div className={styles.DivPaperContent}>           
            </div>                        
          </Paper> */}
   
          {/* <Typography style={{color:'#024AC2'}} variant={"h4"} gutterBottom component="div" className={styles.TypographyTitleFilter} >
            Tabla de Usuarios:
          </Typography> */}

          <div style={{margin:'10px 0px'}}>
            <Button variant="contained" className={styles.ButtonLogin} size="small" onClick={handleAddModal}>
               <BsPersonFillAdd style={{fontSize:'16px'}} />
               &nbsp;Agregar
            </Button>
          </div>
          <DataTable
            //   title='Organización'
            columns={columns}
            data={listUsers}
            customStyles={customStyles}
            className={styles.DataTable}
            pagination={listUsers.length > 5 ? true : false}
            highlightOnHover
            pointerOnHover
            // progressComponent={loading ? 'Cargando Usuarios...' : false}
            // progressPending={true}
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent={loading ? <CircularProgress style={{color:'#024AC2'}} /> : false}
            striped
          />

          {/* SHOW USER MODAL */}
          <Dialog
              open={showUserModal}
              fullWidth={true}
              maxWidth="xs"
              onClose={() => setUserModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               Usuario:&nbsp; 
               {loading ? 'Sin Nombre' : userProperties["name"]}
            </DialogTitle>
            <DialogContent style={{paddingBottom:'0px'}}>
               {
                  loading ? (
                     <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 0px'}}>
                        <CircularProgress style={{color:'#024AC2'}} />
                     </div>                     
                  ) : (
                     <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                           Detalles de Usuario:&nbsp; 
                           {userProperties ? userProperties["name"] : 'Sin Nombre'}
                        </ListSubheader>
                        }
                     >
                        <ListItemButton>
                           <ListItemIcon>
                              <BsPersonVcardFill style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Nombres:" secondary={userProperties["name"]} />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Usuario:"  secondary={userProperties["email"]}/>
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <BsPersonSquare style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Perfil:" secondary={userProperties["role"] === '1' ? 'Administrador': 'Usuario'} />
                        </ListItemButton>
                        {/* <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaHospitalAlt style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Locales Asignados:" secondary={userProperties["establishment"] === '1' ? 'Farmacia 1' : 'Farmacia 2'} />
                        </ListItemButton>                */}
                     </List>
                  )
               }   
               {/* <DialogContentText id="alert-dialog-description">
               <FormGroup aria-label="position" row style={{justifyContent:'center',padding:'15px'}}>
                  <FormControlLabel
                  // value="start"
                  control={
                     <Switch color="primary" name="state" checked={stateUser.state===1 ? true : false} onChange={handleChangeStateUser} />
                  }
                  label="Estado de Usuario"
                  labelPlacement="start"
                  />
               </FormGroup>
               
               </DialogContentText>  */}
                              
            </DialogContent>
                     
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setUserModal(false)}>Cerrar</Button>
            </DialogActions>
          </Dialog>
                    
          {/* SHOW ADD OR EDIT MODAL USER*/}
          <Dialog
              open={showEditModal}
              fullWidth={true}
              maxWidth="xs"
              onClose={() => setShowEditModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               {
                  userId ? (
                     <>
                        Modificar Usuario:&nbsp; 
                        {loading ? 'Sin Nombre' : userProperties["name"]}
                     </>
                  ) : (
                     <>
                        Agregar Usuario
                     </>
                  )
               }               
            </DialogTitle>
            <DialogContent style={{paddingBottom:'0px'}}>
               {
                  loading ? (
                     <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',padding:'10px 0px'}}>
                        <CircularProgress style={{color:'#024AC2'}} />
                     </div>                     
                  ) : (
                     <>
                        <div className={styles.DivPaperContent}>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 id="outlined-basic" 
                                 label="Nombres" 
                                 variant="outlined"
                                 name="name"
                                 value={userData.name}
                                 onChange={handleChange}
                              />
                           </Div>                           
                           <Div>
                              <TextField
                                 fullWidth
                                 size="small"
                                 id="outlined-select-currency"
                                 select
                                 label="Perfil"
                                 name="role"
                                 value={userData.role}
                                 onChange={handleChange}
                                 style={{textAlign: 'left'}}                    
                                 // helperText="Seleccione Organización"
                              >             
                                 <MenuItem value="2">Selecciona Perfil</MenuItem>
                                 <MenuItem value="1">Administrador</MenuItem>     
                                 <MenuItem value="0">Usuario</MenuItem>
                              </TextField>
                           </Div> 
                           {/* <Div>
                              <TextField
                                 fullWidth
                                 size="small"
                                 id="outlined-select-currency"
                                 select
                                 label="Local"
                                 name="establishment"
                                 value={userData.establishment}
                                 onChange={handleChange}
                                 style={{textAlign: 'left'}}                    
                                 // helperText="Seleccione Organización"
                              >                   
                                 <MenuItem value="0">Selecciona Local</MenuItem>
                                 <MenuItem value="1">Farmacia 1</MenuItem>
                                 <MenuItem value="2">Farmacia 2</MenuItem>
                              </TextField>
                           </Div> */}
                        </div>        
                        <Divider style={{margin:'12px 0px'}}/>
                        <div className={styles.DivPaperContent}>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 id="outlined-basic" 
                                 label="Usuario" 
                                 variant="outlined"
                                 name="email"
                                 value={userData.email}
                                 onChange={handleChange}
                              />
                           </Div>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 id="outlined-basic" 
                                 label="Contraseña" 
                                 variant="outlined"
                                 name="password"
                                 value={userData.password}
                                 onChange={handleChange}
                              />
                           </Div>
                        </div> 
                     </>                                            
                  )
               }                                 
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowEditModal(false)}>Cancelar</Button>
               {/* <Button variant="contained" style={{backgroundColor:'#024AC2'}} size="small" onClick={handleUpdatedUserById}>Guardar</Button> */}
               <LoadingButton
                  variant="contained"   
                  loading={loading}                                     
                  size="small"      
                  className={styles.ButtonLogin}
                  onClick={userId ? handleUpdatedUserById : handleCreateUser}
                  // disabled={isSubmitting}
               >
                  Guardar
               </LoadingButton>
            </DialogActions>
          </Dialog>

          {/* SHOW USER PROPERTIES */}
          <Dialog
              open={showPropertiesModal}
              onClose={() => setShowPropertiesModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
                  Usuario:&nbsp; 
                  {loading ? 'Sin Nombre' : userProperties["name"]}
              </DialogTitle>
              <DialogContent>
                {/* <DataTable
                  //   title='Organización'
                  // columns={columnsProperties}
                  data={propertiesUser}
                  customStyles={customStyles}
                  className={styles.DataTable}
                  // pagination={listUsers.length > 10 ? true : false}
                  highlightOnHover
                  pointerOnHover
                  // progressComponent={'Cargando Usuarios...'}
                  // progressPending={true}
                  paginationComponentOptions={paginationComponentOptions}
                  noDataComponent="No hay registros para mostrar"
                  striped
                /> */}
              </DialogContent>
              <DialogActions>
                  <Button variant="outlined" size="small" onClick={() => setShowPropertiesModal(false)}>Cancelar</Button>
                  {/* <Button onClick={() => setOpen(false)} autoFocus>
                      Agree
                  </Button> */}
              </DialogActions>
          </Dialog>

          {/* SHOW DELETE USER */}
          <Dialog
              open={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               Eliminar Usuario:&nbsp; 
               {loading ? 'Sin Nombre' : userProperties["name"]}
            </DialogTitle>
            <DialogContent style={{paddingBottom:'0px'}}>
               <DialogContentText id="alert-dialog-description">
                  ¿Desea eliminar el Usuario?
               </DialogContentText> 
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
               {/* <Button variant="contained" style={{backgroundColor:'#024AC2'}} size="small" onClick={handleDeleteUserById}>Aceptar</Button> */}
               <LoadingButton
                  variant="contained"   
                  loading={loading}                                     
                  size="small"      
                  className={styles.ButtonLogin}
                  onClick={handleDeleteUserById}
                  // disabled={isSubmitting}
               >
                  Aceptar
               </LoadingButton>
            </DialogActions>
          </Dialog>

      </Div>
    </div>
  )
}

export default Users