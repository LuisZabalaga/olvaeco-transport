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

import { BiPackage } from "react-icons/bi";

import { MdEmail } from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import { RiFileExcel2Fill } from "react-icons/ri";

import CurrencyFormat from 'react-currency-format';

import { StylesPackages } from './StylesPackages';

const Packages = () => {

   
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
 
 const columnsProducts = [
   {
     cell: () => <BiPackage style={{ fill:'#475259', fontSize:'16px' }} />,
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
       // fontWeight: 500,
     },
   },
   {
      name: 'Paquete',
      selector: row => row.contenidoPaquete,
      sortable: true,
      style: {
        color: '#475259',
      },	
   },
   {
     name: 'Descripcion',
     selector: row => row.descripcion,
     sortable: true,
     style: {
       color: '#475259',
     },	
   },
   {
      name: 'Comentarios',
      selector: row => row.comentario,
      sortable: true,
      style: {
        color: '#475259',
      },	
   },
   {
     name: 'Peso',
     selector: row => <CurrencyFormat value={row.peso} displayType={'text'} thousandSeparator={true} suffix={'Kg'} fixedDecimalScale={true} decimalScale={2} />,
     sortable: true,
     width: '60px',
     style: {
       color: '#475259',
     },	
   },
   {
     name: 'Código Envio',
     selector: row => row.envio.codigoEnvio,
     sortable: true,
     style: {
       color: '#475259',
     },	
   },
   {
      name: 'Cliente',
      selector: row => row.envio.cliente.nombre + " " + row.envio.cliente.apellidos,
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Estado',
      selector: row => <div style={{backgroundColor: row.envio.estadoEnvio.nombre==='CREADO' ? '#0CB7F2' : row.envio.estadoEnvio.nombre==='RECOGIDO' ? '#EBB206' : row.envio.estadoEnvio.nombre==='ANULADO' ? '#F71920' : '#07EF07', padding:'3px', borderRadius:'4px',color:'white'}}>{row.envio.estadoEnvio.nombre}</div>,
      sortable: true,
      width: '100px',
      style: {
        color: '#475259',
      },	
    },      
   {
     name: 'Acciones',
     cell: row =>
       <>
         <Tooltip title="Modificar Paquete" arrow TransitionComponent={Zoom}>
           <IconButton aria-label="Sites" size="small" onClick={() => handleEditProductModal(row)}>
             <RiEdit2Fill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
           </IconButton>
         </Tooltip>
         <Tooltip title="Eliminar Paquete" arrow TransitionComponent={Zoom}>
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

  const styles = StylesPackages();
  const [loading, setLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [listProducts, setListProducts] = useState([]);
  const [listPackagesType, setListPackagesType] = useState([]);
  const [productProperties, setProductProperties] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState({
      idEnvio:'',
      descripcion:'',
      peso:'',
      fragil:'',
      tipoPaquete:'0',
      idTipoEmbalaje:'',
      contenidoPaquete:'',
      observacion:''
  });

  const handleChangeProduct = ({ target }) => {
     setProductData({
        ...productData,
        [target.name]: target.value,
     });      
  };

  useEffect(() => {
     handleGetAllProducts();
     handleGetAllPackages();
  }, []);

  const handleGetAllProducts = async() => {
     setLoading(true);
     await APISERVICE.getAllPackages().then((res) => {
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
     await APISERVICE.getPackageById(productId).then((res) => {
        console.log("PRODUCTO__ID ", res);
        setProductProperties(res.package);
        setLoading(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
  }

  const handleCreateProduct = async() => {
     setLoading(true);
     await APISERVICE.createPackage(productData).then((res) => {
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
     await APISERVICE.updatedPackageById(productData, productId).then((res) => {
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
     await APISERVICE.deletePackageById(productId).then((res) => {
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

   const handleGetAllPackages = async() => {
      await APISERVICE.getAllPackageTypes().then((res) => {
         console.log("LISTA DE TIPOS PAQUETE", res);
         setListPackagesType(res);
         // setLoading(false);
      })
      .catch((err) => {
         console.log("Error", err);
         // setLoading(false);
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
      idEnvio:'',
      descripcion:'',
      peso:'',
      fragil:'',
      tipoPaquete:'',
      idTipoEmbalaje:'',
      contenidoPaquete:'',
      observacion:''
     });
   }

   const handleEditProductModal =  (product:any) => {
     setShowEditModal(true);
     setProductId(product.id);
     handleGetProductById(product.id);
     
     productData.idEnvio = product.idEnvio;
     productData.descripcion = product.descripcion;
     productData.fragil = product.fragil;
     productData.peso = product.peso;
     productData.tipoPaquete = product.tipoPaquete;
     productData.idTipoEmbalaje = product.idTipoEmbalaje;
     productData.contenidoPaquete = product.contenidoPaquete;
     productData.observacion = product.observacion;
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

   const subHeaderComponent = (
      <div>
         {/* <div style={{margin:'0px', display:'flex',alignItems:'center'}}>
            <Button variant="contained" className={styles.ButtonLogin} size="medium" onClick={handleAddShipmentModal}>
               <IoMdAddCircle style={{fontSize:'16px'}} />
               &nbsp;Agregar
            </Button>
         </div> */}
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

  return (
   <div>
      <Div className={styles.DivTitle}>
         <Typography variant={"h4"} gutterBottom component="div" className={styles.TypographyTitle} >
               <BiPackage className={styles.TypographyTitleIcon} />
               Paquetes
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
                  Programación
               </Link>
               <Link
                  underline="hover"
                  sx={{display:'flex',alignItems:'center',color:'white'}}
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
               >
                  <WhatshotIcon sx={{mr: 0.5}} fontSize="inherit"/>
                  Paquetes
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
            Lista de Paquetes
         </Typography>

         {/* <div style={{margin:'10px 0px'}}>
            <Button variant="contained" className={styles.ButtonLogin} size="small" onClick={handleAddProductModal}>
               <IoMdAddCircle style={{fontSize:'16px'}} />
               &nbsp;Agregar
            </Button>
         </div> */}

         <DataTable
            //   title='Organización'
            columns={columnsProducts}
            data={listProducts}
            customStyles={customStyles}
            className={styles.DataTable}
            pagination={listProducts.length > 10 ? true : false}
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
               Paquete:&nbsp; 
               {loading ? 'Sin Nombre' : productProperties["contenidoPaquete"]}
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
                           Detalles de Paquete:&nbsp; 
                           {productProperties ? productProperties["contenidoPaquete"] : 'Sin Nombre'}
                        </ListSubheader>
                        }
                     >
                        <ListItemButton>
                           <ListItemIcon>
                              <BsPersonVcardFill style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Producto:" secondary={productProperties["contenidoPaquete"]} />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Lavoratorio:"  secondary={productProperties["peso"]}/>
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="R. Sanitario:"  secondary={productProperties["fragil"]}/>
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Stock:"  secondary={productProperties["descripcion"]}/>
                        </ListItemButton>
                        {/* <Divider variant="inset" component="li" /> */}                                      
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
            maxWidth="md"
            onClose={() => setShowEditModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               {
                  productId ? (
                     <>
                        Modificar Paquete:&nbsp; 
                        {loading ? 'Sin Nombre' : productProperties["contenidoPaquete"]}
                     </>
                  ) : (
                     <>
                        Agregar Paquete
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
                                 label="Codigo Envio" 
                                 variant="outlined"
                                 name="idEnvio"
                                 value={productData.idEnvio}
                                 onChange={handleChangeProduct}
                              />
                           </Div>                           
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 id="outlined-basic" 
                                 label="Descripcion" 
                                 variant="outlined"
                                 name="descripcion"
                                 value={productData.descripcion}
                                 onChange={handleChangeProduct}
                              />
                           </Div> 
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 // type="number"
                                 id="outlined-basic" 
                                 label="Peso" 
                                 variant="outlined"
                                 name="peso"
                                 value={productData.peso}
                                 onChange={handleChangeProduct}
                              />                             
                           </Div>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 id="outlined-basic" 
                                 label="Fragil" 
                                 variant="outlined"
                                 name="fragil"
                                 value={productData.fragil}
                                 onChange={handleChangeProduct}
                              />
                           </Div>
                           <Div>
                              <TextField
                                 fullWidth
                                 size="small"
                                 id="outlined-select-currency"
                                 select
                                 label="Tipo Paquete"
                                 name="tipoPaquete"
                                 value={productData.tipoPaquete}
                                 onChange={handleChangeProduct}
                                 style={{textAlign: 'left'}}                    
                                 // helperText="Seleccione Organización"
                                 > 
                                 <MenuItem value="0"> -- Tipos Paquete -- </MenuItem>      
                                 {
                                    listPackagesType ? listPackagesType.map((type) => (
                                       <MenuItem key={type.id} value={type.id}>
                                          {type.nombre}
                                       </MenuItem>
                                    )) : (<MenuItem value="">Cargando Tipos Paquete...</MenuItem>)
                                 }
                              </TextField>
                           </Div>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 type="number"
                                 id="outlined-basic" 
                                 label="Tipo Embalaje" 
                                 variant="outlined"
                                 name="idTipoEmbalaje"
                                 value={productData.idTipoEmbalaje}
                                 onChange={handleChangeProduct}
                              />
                           </Div>                      
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 type="number"
                                 id="outlined-basic" 
                                 label="Tipo Embalaje" 
                                 variant="outlined"
                                 name="idTipoEmbalaje"
                                 value={productData.idTipoEmbalaje}
                                 onChange={handleChangeProduct}
                              />
                           </Div>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"                 
                                 id="outlined-basic" 
                                 label="Contenido Paquete" 
                                 variant="outlined"
                                 name="contenidoPaquete"
                                 value={productData.contenidoPaquete}
                                 onChange={handleChangeProduct}
                              />
                           </Div>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"             
                                 id="outlined-basic" 
                                 label="Observaciones" 
                                 variant="outlined"
                                 name="observacion"
                                 value={productData.observacion}
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
               Paquete:&nbsp; 
               {loading ? 'Sin Nombre' : productProperties["contenidoPaquete"]}
            </DialogTitle>
            <DialogContent>
               {/* <DataTable
                  //   title='Organización'
                  // columns={columnsProductsProperties}
                  data={propertiesUser}
                  customStyles={customStyles}
                  className={styles.DataTable}
                  // pagination={listProducts.length > 10 ? true : false}
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

         {/* SHOW DELETE PRODUCTO */}
         <Dialog
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title" style={{fontSize:'18px', fontWeight:'500', textAlign:'center',margin:'0px'}}>
               Eliminar Paquete:&nbsp; 
               {loading ? 'Sin Nombre' : productProperties["contenidoPaquete"]}
            </DialogTitle>
            <DialogContent style={{paddingBottom:'0px'}}>
               <DialogContentText id="alert-dialog-description">
                  ¿Desea eliminar el Paquete?
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

export default Packages;