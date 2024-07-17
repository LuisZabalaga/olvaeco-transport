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
import { RiEdit2Fill } from "react-icons/ri";
import { FaUserCircle, FaEdit, FaUser, FaUsers } from "react-icons/fa";
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
import { BsBasket2Fill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

import {Breadcrumbs, Link} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

import { StylesPackageTypes } from './StylesPackageTypes';

const PackageTypes = () => {

   
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
 
 const columnsProducts = [
   {
     cell: () => <BsBasket2Fill style={{ fill:'#475259', fontSize:'16px' }} />,
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
     width: '60px',
     // grow: 2,
     style: {
       // color: '#202124',
       color: '#475259',
       fontSize: '14px',
       // fontWeight: 500,
     },
   },
   {
     name: 'Tipo de Paquete',
     selector: row => row.nombre,
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
     name: 'Descripción de Paquete',
     selector: row => row.descripcion,
     sortable: true,
     style: {
       color: '#475259',
     },	
   }, 
   {
     name: 'Acciones',
     cell: row =>
       <>
         <Tooltip title="Ver Tipo Paquete" arrow TransitionComponent={Zoom}>
           <IconButton aria-label="Sites" size="small" onClick={() => handleProductModal(row)}>
             <FaUserCircle style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
           </IconButton>
         </Tooltip>
         <Tooltip title="Modificar Tipo Paquete" arrow TransitionComponent={Zoom}>
           <IconButton aria-label="Sites" size="small" onClick={() => handleEditProductModal(row)}>
             <RiEdit2Fill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
           </IconButton>
         </Tooltip>          
         <Tooltip title="Eliminar Tipo Paquete" arrow TransitionComponent={Zoom}>
           <IconButton aria-label="Sites" size="small" onClick={() => {handleDeleteProductModal(row)}}>
             <BsTrashFill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
           </IconButton>
         </Tooltip>
       </>,
     allowOverflow: true,
     button: true,
     width: '140px',
   },
 ];

  const styles = StylesPackageTypes();
  const [loading, setLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [listProducts, setListProducts] = useState([]);
  const [productProperties, setProductProperties] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState({
     nombre:'',
     descripcion:''    
  });

  const handleChangeProduct = ({ target }) => {
     setProductData({
        ...productData,
        [target.name]: target.value,
     });      
  };

  useEffect(() => {
     handleGetAllProducts();
  }, []);

  const handleGetAllProducts = async() => {
     setLoading(true);
     await APISERVICE.getAllPackageTypes().then((res) => {
        console.log("LISTA DE PRODUCTOS", res);
        setListProducts(res);
        setLoading(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
  }

  const handleGetProductById = async(productId:any) => {
     setLoading(true);
     await APISERVICE.getPackageTypeById(productId).then((res) => {
        console.log("PRODUCTO__ID ", res);
        setProductProperties(res.packageType);
        setLoading(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
  }

  const handleCreateProduct = async() => {
     setLoading(true);
     await APISERVICE.createPackageType(productData).then((res) => {
        console.log("PRODUCTO_CREADO ", res);
        setListProducts(res);
        setLoading(false);
        handleGetAllProducts();
        setShowEditModal(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
  }

  const handleUpdatedProductById = async() => {
     setLoading(true);
     await APISERVICE.updatedPackageTypeById(productData, productId).then((res) => {
        console.log("PRODUCTO_ACTUALIZADO", res);
        setLoading(false);
        handleGetAllProducts();
        setShowEditModal(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
  }

   const handleDeleteProductById = async() => {
     setLoading(true);
     await APISERVICE.deletePackageTypeById(productId).then((res) => {
        console.log("PRODUCTO_ELIMINADO", res);
        setLoading(false);
        handleGetAllProducts();
        setShowDeleteModal(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
   }

   const handleProductModal =  (product:any) => {
     setShowProductModal(true);
     handleGetProductById(product.id);
   }

   const handleAddProductModal =  () => {
     setShowEditModal(true);
     setProductId(null);
     setProductData({
      nombre:'',
      descripcion:''   
     });
   }

   const handleEditProductModal =  (product:any) => {
     setShowEditModal(true);
     setProductId(product.id);
     handleGetProductById(product.id);
     
     productData.nombre = product.nombre;
     productData.descripcion = product.descripcion;
   }

   const handlePropertiesProductModal =  (product:any) => {
     handleGetProductById(product.id);
     setShowPropertiesModal(true);
   }

   const handleDeleteProductModal =  (product:any) => {
     handleGetProductById(product.id);
     setProductId(product.id);
     setShowDeleteModal(true);
   }

   const { register, handleSubmit, formState: {errors} } = useForm();

   const paginationComponentOptions = {
      rowsPerPageText: 'Filas por Página:', 
      rangeSeparatorText: 'de'
   }

  return (
   <div>
      <Div className={styles.DivTitle}>
         <Typography variant={"h4"} gutterBottom component="div" className={styles.TypographyTitle} >
               <BsBasket2Fill className={styles.TypographyTitleIcon} />
               Tipos de Paquete
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
                  Programación Envios
               </Link>
               <Link
                  underline="hover"
                  sx={{display:'flex',alignItems:'center',color:'white'}}
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
               >
                  <WhatshotIcon sx={{mr: 0.5}} fontSize="inherit"/>
                  Tipos Paquete
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
         <Typography variant={"h5"} gutterBottom component="div" className={styles.TypographyTitleTable} >
            <FaClipboardList className={styles.TypographyTitleTableIcon} />
            Lista de Tipos de Paquete
         </Typography>

         <div style={{margin:'10px 0px'}}>
            <Button variant="contained" className={styles.ButtonLogin} size="small" onClick={handleAddProductModal}>
               <IoMdAddCircle style={{fontSize:'16px'}} />
               &nbsp;Agregar
            </Button>
         </div>
         <DataTable
            //   title='Organización'
            columns={columnsProducts}
            data={listProducts}
            customStyles={customStyles}
            className={styles.DataTable}
            pagination={listProducts.length > 10 ? true : false}
            highlightOnHover
            pointerOnHover
            // progressComponent={loading ? 'Cargando Usuarios...' : false}
            // progressPending={true}
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent={loading ? <CircularProgress style={{color:'#024AC2'}} /> : false}
            striped
         />

         {/* SHOW PRODUCT MODAL */}
         <Dialog
            open={showProductModal}
            fullWidth={true}
            maxWidth="xs"
            onClose={() => setShowProductModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               Tipos de Paquete:&nbsp; 
               {loading ? 'Sin Nombre' : productProperties["nombre"]}
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
                           Detalles de Tipos de Paquete:&nbsp; 
                           {productProperties ? productProperties["nombre"] : 'Sin Nombre'}
                        </ListSubheader>
                        }
                     >
                        <ListItemButton>
                           <ListItemIcon>
                              <BsPersonVcardFill style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Producto:" secondary={productProperties["nombre"]} />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Lavoratorio:"  secondary={productProperties["descripcion"]}/>
                        </ListItemButton>                                                        
                     </List>
                  )
               }   
               {/* <DialogContentText id="alert-dialog-description">
               <FormGroup aria-label="position" row style={{justifyContent:'center',padding:'15px'}}>
                  <FormControlLabel
                  // value="start"
                  control={
                     <Switch color="primary" name="state" checked={stateUser.state===1 ? true : false} onChange={handleChangeProductStateUser} />
                  }
                  label="Estado de Usuario"
                  labelPlacement="start"
                  />
               </FormGroup>
               
               </DialogContentText>  */}
                              
            </DialogContent>
                     
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowProductModal(false)}>Cerrar</Button>
            </DialogActions>
         </Dialog>
                  
         {/* SHOW ADD OR EDIT MODAL PRODUCT*/}
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
                  productId ? (
                     <>
                        Modificar Tipos de Paquete:&nbsp; 
                        {loading ? 'Sin Nombre' : productProperties["nombre"]}
                     </>
                  ) : (
                     <>
                        Agregar Tipos de Paquete
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
                                 label="Tipo de Producto" 
                                 variant="outlined"
                                 name="nombre"
                                 value={productData.nombre}
                                 onChange={handleChangeProduct}
                              />
                           </Div>                           
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 id="outlined-basic" 
                                 label="Descripción" 
                                 variant="outlined"
                                 name="descripcion"
                                 value={productData.descripcion}
                                 onChange={handleChangeProduct}
                              />
                           </Div>                            
                        </div>
                     </>                                            
                  )
               }                                 
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowEditModal(false)}>Cancelar</Button>
               {/* <Button variant="contained" style={{backgroundColor:'#024AC2'}} size="small" onClick={handleUpdatedProductById}>Guardar</Button> */}
               <LoadingButton
                  variant="contained"   
                  loading={loading}                                     
                  size="small"      
                  className={styles.ButtonLogin}
                  onClick={productId ? handleUpdatedProductById : handleCreateProduct}
                  // disabled={isSubmitting}
               >
                  Guardar
               </LoadingButton>
            </DialogActions>
         </Dialog>

         {/* SHOW PRODUCTO PROPERTIES */}
         <Dialog
            open={showPropertiesModal}
            onClose={() => setShowPropertiesModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
                  Tipo de Paquete:&nbsp; 
                  {loading ? 'Sin Nombre' : productProperties["nombre"]}
            </DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowPropertiesModal(false)}>Cancelar</Button>
               {/* <Button onClick={() => setOpen(false)} autoFocus>
                  Agree
               </Button> */}
            </DialogActions>
         </Dialog>

         {/* SHOW DELETE PRODUCTO */}
         <Dialog
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               Eliminar Tipo de Paquete:&nbsp; 
               {loading ? 'Sin Nombre' : productProperties["nombre"]}
            </DialogTitle>
            <DialogContent style={{paddingBottom:'0px'}}>
               <DialogContentText id="alert-dialog-description">
                  ¿Desea eliminar el Tipo de Paquete?
               </DialogContentText> 
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
               {/* <Button variant="contained" style={{backgroundColor:'#024AC2'}} size="small" onClick={handleDeleteProductById}>Aceptar</Button> */}
               <LoadingButton
                  variant="contained"   
                  loading={loading}                                     
                  size="small"      
                  className={styles.ButtonLogin}
                  onClick={handleDeleteProductById}
                  // disabled={isSubmitting}
               >
                  Aceptar
               </LoadingButton>
            </DialogActions>
         </Dialog>

      </Div>
   </div>
  );
}

export default PackageTypes;