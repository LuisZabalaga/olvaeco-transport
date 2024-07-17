import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
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
import { RiEdit2Fill, RiFileExcel2Fill } from "react-icons/ri";
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

import { StylesCustomers } from './StylesCustomers';
import { IoMdAddCircle } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";

import {Breadcrumbs, Link} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

// import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
// import {LocalizationProvider } from "@mui/x-date-pickers";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format } from "date-fns";

const Customers = () => {

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
            textTransform: 'uppercase',
            paddingLeft: '6px',
            paddingRight: '6px',
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
            fontSize: '12.5px',
            // cursor: 'pointer',
         }
      },
      cells: {
         style: {
            paddingLeft: '6px',
            paddingRight: '6px',
            // margin:'auto',
         },
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
      width: '50px',
      wrap: true,
      reorder: true,
      style: {
        // color: '#202124',
        color: '#475259',
      //   fontSize: '14px',
        // fontWeight: 500,
      },
    },
    {
      name: 'Nombres',
      selector: row => row.nombre + " " + row.apellidos,
      sortable: true,
      wrap: true,
      reorder: true,
      style: {
        // color: '#202124',
        color: '#475259',
      //   fontSize: '14px',
        // fontWeight: 500,
      },
    },
    {
      name: 'DNI',
      selector: row => row.dni,
      sortable: true,
      width: '7%',
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      // width: '13%',
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'F. Nacimiento',
      selector: row => row.fechaNacimiento,
      sortable: true,
      width: '9%',
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Celular',
      selector: row => row.telefono,
      sortable: true,
      width: '9%',
      wrap: true,
      reorder: true,
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
      name: 'Estado',
      selector: row => <div style={{backgroundColor: row.estadoCliente === 'ACTIVO' ? '#00FF41' : '#F71920', padding:'3px', borderRadius:'4px',color:'white'}}>{row.estadoCliente}</div>,
      sortable: true,
      width: '8%',
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
   },
   {
      name: 'Acciones',
      cell: row =>
        <>
          <Tooltip title="Ver Empleado" arrow TransitionComponent={Zoom}>
            <IconButton aria-label="Sites" size="small" onClick={() => handleEmployeeModal(row)}>
              <FaUserCircle style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Modificar Empleado" arrow TransitionComponent={Zoom}>
            <IconButton aria-label="Sites" size="small" onClick={() => handleEditModal(row)}>
              <RiEdit2Fill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
            </IconButton>
          </Tooltip>          
          <Tooltip title="Eliminar Empleado" arrow TransitionComponent={Zoom}>
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

   const styles = StylesCustomers();
   const [loading, setLoading] = useState(false);
   const [showUserModal, setUserModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);
   const [showPropertiesModal, setShowPropertiesModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const date = format(new Date(), "yyyy-MM-dd");
   const [birthDate, setBirthDate] = useState(date);

   const [listCustomers, setListCustomers] = useState([]);
   const [customerProperties, setCustomerProperties] = useState([]);
   const [customerId, setCustomerId] = useState(null);
   const [customerData, setCustomerData] = useState({
      nombre:'',
      apellidos:'',
      dni:'',
      email:'',
      telefono:'',
      fechaNacimiento:birthDate,
      estadoCliente:''
   });

   const handleChange = ({ target }) => {
      setCustomerData({
         ...customerData,
         [target.name]: target.value,
      });      
   };

   const handleChangeBirth = (newValue: any) => {
      setBirthDate(format(new Date(newValue), "yyyy-MM-dd"));
      setCustomerData({
        ...customerData,
        "fechaNacimiento": format(new Date(newValue), "yyyy-MM-dd")
      })
   };
   
   useEffect(() => {
      handleGetAllEmployees();
   }, []);

   const handleGetAllEmployees = async() => {
      setLoading(true);
      await APISERVICE.getAllCustomers().then((res) => {
         console.log("LISTA DE CLIENTES", res);
         setListCustomers(res);
         setLoading(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleGetEmployeeById = async(customerId:any) => {
      setLoading(true);
      await APISERVICE.getCustomerById(customerId).then((res) => {
         console.log("EMPLEADO__ ", res);
         setCustomerProperties(res);
         setLoading(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleCreateEmployee = async() => {
      setLoading(true);
      await APISERVICE.createCustomer(customerData).then((res) => {
         console.log("CREADO", res);
         setListCustomers(res);
         setLoading(false);
         handleGetAllEmployees();
         setShowEditModal(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleUpdatedEmployeeById = async() => {
      setLoading(true);
      await APISERVICE.updatedCustomerById(customerData, customerId).then((res) => {
         console.log("ACTUALIZADO", res);
         setLoading(false);
         handleGetAllEmployees();
         setShowEditModal(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleDeleteEmployeeById = async() => {
      setLoading(true);
      await APISERVICE.deleteCustomerById(customerId).then((res) => {
         console.log("ELIMINADO", res);
         setLoading(false);
         handleGetAllEmployees();
         setShowDeleteModal(false);
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
   }

   const handleEmployeeModal =  (employee: any) => {
      setUserModal(true);
      handleGetEmployeeById(employee.id);
   }

   const handleAddModal =  () => {
      setShowEditModal(true);
      setCustomerId(null);
      setCustomerData({
         nombre:'',
         apellidos:'',
         dni:'',
         email:'',
         telefono:'',
         fechaNacimiento:'',
         estadoCliente:''
      });
   }

   const handleEditModal =  (employee: any) => {
      setShowEditModal(true);
      setCustomerId(employee.id);
      handleGetEmployeeById(employee.id);
      
      customerData.nombre = employee.nombre;
      customerData.apellidos = employee.apellidos;
      customerData.dni = employee.dni;
      customerData.email = employee.email;
      customerData.telefono = employee.telefono;
      customerData.fechaNacimiento = employee.fechaNacimiento;
      customerData.estadoCliente = employee.estadoCliente;

      setBirthDate(employee.fechaNacimiento);

   }

   const handlePropertiesUserModal =  (employee: any) => {
      handleGetEmployeeById(employee.id);
      setShowPropertiesModal(true);
   }

   const handleDeleteUserModal =  (employee: any) => {
      handleGetEmployeeById(employee.id);
      setCustomerId(employee.id);
      setShowDeleteModal(true);
   }

   const { register, handleSubmit, formState: {errors} } = useForm();

   const subHeaderComponent = (
      <div style={{display: 'flex',width:'100%',justifyContent:'space-between'}}>
         <div style={{margin:'0px', display:'flex',alignItems:'center'}}>
            <Button variant="contained" className={styles.ButtonLogin} size="medium" onClick={handleAddModal}>
               <IoMdAddCircle style={{fontSize:'16px'}} />
               &nbsp;Agregar
            </Button>
         </div>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField id="outlined-basic" label="Search" variant="outlined" size="small" style={{ margin: '5px' }} />
            <Tooltip title="Enviar a Correo" arrow TransitionComponent={Zoom}>
               <div className={styles.ButtomOptionTable} >
                  <MdEmail style={{ margin:'5px',fontSize:'27px' }} color="action" />
               </div>
            </Tooltip>
            <Tooltip title="Descargar PDF" arrow TransitionComponent={Zoom}>
               <div className={styles.ButtomOptionTable} >
                  <VscFilePdf style={{ margin:'5px',fontSize:'24px' }} color="action" />
               </div>
            </Tooltip>
            <Tooltip title="Descargar Excel" arrow TransitionComponent={Zoom}>
               <div className={styles.ButtomOptionTable} >
                  <RiFileExcel2Fill style={{ margin:'5px',fontSize:'24px' }} color="action" />
               </div>
            </Tooltip>
         </div>
      </div>
   );

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por Página:', 
    rangeSeparatorText: 'de'
  }

//   console.log("data cargada", customerProperties);

  return (
    <div>
      <Div className={styles.DivTitle}>
        <Typography variant={"h4"} gutterBottom component="div" className={styles.TypographyTitle} >
            <FaUsers className={styles.TypographyTitleIcon} />
            Clientes
        </Typography>
        <div role="presentation" style={{marginRight:'15px'}}>
            <Breadcrumbs aria-label="breadcrumb" sx={{color:'white'}} >
               <Link
                  underline="hover"
                  sx={{display:'flex',alignItems:'center',color:'white'}}
                  color="inherit"
                  href="/"
               >
                  <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>
                  Configuración
               </Link>
               <Link
                  underline="hover"
                  sx={{display:'flex',alignItems:'center',color:'white'}}
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
               >
                  <WhatshotIcon sx={{mr: 0.5}} fontSize="inherit"/>
                  Clientes
               </Link>
               <Typography
                  sx={{display:'flex',alignItems:'center',color:'white'}}
                  color="text.primary"
               >
                  <GrainIcon sx={{mr: 0.5}} fontSize="inherit"/>
                  Eliminados
               </Typography>
            </Breadcrumbs>
         </div>
      </Div>
  
      <Div sx={{bgcolor:'background.paper'}} className={styles.DivBody}>
          {/* <Form style={{textAlign: 'center'}} noValidate autoComplete='off'> */}
          <Typography variant={"h4"} gutterBottom component="div" className={styles.TypographyTitleTable} >
            <FaClipboardList className={styles.TypographyTitleTableIcon} />
            Lista de Clientes
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

          {/* <div style={{margin:'10px 0px'}}>
            <Button variant="contained" className={styles.ButtonLogin} size="small" onClick={handleAddModal}>
               <BsPersonFillAdd style={{fontSize:'16px'}} />
               &nbsp;Agregar
            </Button>
          </div> */}

          <DataTable
            //   title='Organización'
            columns={columns}
            data={listCustomers}
            customStyles={customStyles}
            className={styles.DataTable}
            pagination={listCustomers.length > 10 ? true : false}
            highlightOnHover
            pointerOnHover

            dense={true}
            striped={true}
            subHeaderComponent={subHeaderComponent}
            subHeader
            // subHeaderAlign="right"
            subHeaderWrap

            // progressComponent={loading ? 'Cargando Usuarios...' : false}
            // progressPending={true}
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent={loading ? <CircularProgress style={{color:'#024AC2'}} /> : false}            
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
               Cliente:&nbsp; 
               {loading ? 'Sin Nombre' : customerProperties["nombre"] + " " + customerProperties["apellidos"]}
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
                           Detalles de Cliente:&nbsp; 
                           {customerProperties ? customerProperties["nombre"] : 'Sin Nombre'}
                        </ListSubheader>
                        }
                     >
                        <ListItemButton>
                           <ListItemIcon>
                              <BsPersonVcardFill style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Nombres:" secondary={customerProperties["nombre"]} />
                        </ListItemButton>
                        <ListItemButton>
                           <ListItemIcon>
                              <BsPersonSquare style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Apellidos:" secondary={customerProperties["apellidos"]} />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Email:"  secondary={customerProperties["email"]}/>
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <BsPersonSquare style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Estado:" secondary={customerProperties["estadoCliente"]} />
                        </ListItemButton>
                        {/* <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaHospitalAlt style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Locales Asignados:" secondary={customerProperties["establishment"] === '1' ? 'Farmacia 1' : 'Farmacia 2'} />
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
                    
          {/* SHOW ADD OR EDIT MODAL CUSTOMER*/}
          <Dialog
              open={showEditModal}
              fullWidth={true}
              maxWidth="md"
              onClose={() => setShowEditModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               {
                  customerId ? (
                     <>
                        Modificar Cliente:&nbsp; 
                        {loading ? 'Sin Nombre' : customerProperties["nombre"] + " " + customerProperties["apellidos"]}
                     </>
                  ) : (
                     <>
                        Agregar Cliente
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
                        <LocalizationProvider  dateAdapter={AdapterDayjs}>
                           <div className={styles.DivPaperContent}>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    id="outlined-basic" 
                                    label="Nombres" 
                                    variant="outlined"
                                    name="nombre"
                                    value={customerData.nombre}
                                    onChange={handleChange}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    id="outlined-basic" 
                                    label="Apellidos" 
                                    variant="outlined"
                                    name="apellidos"
                                    value={customerData.apellidos}
                                    onChange={handleChange}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    type="number"
                                    size="small"
                                    id="outlined-basic" 
                                    label="DNI" 
                                    variant="outlined"
                                    name="dni"
                                    value={customerData.dni}
                                    onChange={handleChange}
                                 />
                              </Div>                 
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined"
                                    name="email"
                                    value={customerData.email}
                                    onChange={handleChange}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    type="number"
                                    size="small"
                                    id="outlined-basic" 
                                    label="Celular" 
                                    variant="outlined"
                                    name="telefono"
                                    value={customerData.telefono}
                                    onChange={handleChange}
                                 />
                              </Div>
                              <Div>                           
                                 <DesktopDatePicker
                                    label="Fecha Nacimiento"
                                    inputFormat="YYYY-MM-DD"
                                    value={birthDate}
                                    // views={["year", "month", "day"]}
                                    onChange={handleChangeBirth}
                                    renderInput={(props) => <TextField {...props} size="small" fullWidth />}
                                 />
                              </Div>                              
                              <Div>
                                 <TextField
                                    fullWidth
                                    size="small"
                                    id="outlined-select-currency"
                                    select
                                    label="Estado"
                                    name="estadoCliente"
                                    value={customerData.estadoCliente}
                                    onChange={handleChange}
                                    style={{textAlign: 'left'}}                    
                                    // helperText="Seleccione Organización"
                                 >             
                                    <MenuItem value="0">Selecciona Estado</MenuItem>
                                    <MenuItem value="ACTIVO">ACTIVO</MenuItem>     
                                    <MenuItem value="INACTIVO">INACTIVO</MenuItem>
                                 </TextField>
                              </Div> 
                           </div>
                        </LocalizationProvider>                      
                     </>                                            
                  )
               }                                 
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowEditModal(false)}>Cancelar</Button>
               {/* <Button variant="contained" style={{backgroundColor:'#024AC2'}} size="small" onClick={handleUpdatedEmployeeById}>Guardar</Button> */}
               <LoadingButton
                  variant="contained"   
                  loading={loading}                                     
                  size="small"      
                  className={styles.ButtonLogin}
                  onClick={customerId ? handleUpdatedEmployeeById : handleCreateEmployee}
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
                  Cliente:&nbsp; 
                  {loading ? 'Sin Nombre' : customerProperties["nombre"]}
              </DialogTitle>
              <DialogContent>
                {/* <DataTable
                  //   title='Organización'
                  // columns={columnsProperties}
                  data={propertiesUser}
                  customStyles={customStyles}
                  className={styles.DataTable}
                  // pagination={listCustomers.length > 10 ? true : false}
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

          {/* SHOW DELETE EMPLOYEE */}
          <Dialog
              open={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               Eliminar Cliente:&nbsp; 
               {loading ? 'Sin Nombre' : customerProperties["nombre"]}
            </DialogTitle>
            <DialogContent style={{paddingBottom:'0px'}}>
               <DialogContentText id="alert-dialog-description">
                  ¿Desea eliminar el Cliente?
               </DialogContentText> 
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
               {/* <Button variant="contained" style={{backgroundColor:'#024AC2'}} size="small" onClick={handleDeleteEmployeeById}>Aceptar</Button> */}
               <LoadingButton
                  variant="contained"   
                  loading={loading}                                     
                  size="small"      
                  className={styles.ButtonLogin}
                  onClick={handleDeleteEmployeeById}
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

export default Customers