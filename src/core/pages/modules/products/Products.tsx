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

import { StylesProducts } from './StylesProducts';

const Products = () => {

   
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
     name: 'Producto',
     selector: row => row.product,
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
     name: 'Laboratorio',
     selector: row => row.laboratory,
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
     name: 'Factor',
     selector: row => row.factor,
     sortable: true,
     style: {
       color: '#475259',
     },	
   },
   {
     name: 'R. Sanitario',
     selector: row => row.sanitary,
     sortable: true,
     style: {
       color: '#475259',
     },	
   },
   {
      name: 'P. Compra',
      selector: row => row.buys,
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'P. Venta',
      selector: row => row.sale,
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Stock',
      selector: row => row.stock > 0 ? (<div style={{background:'#28A745',padding:'2px 12px',color:'white',borderRadius:'3px'}}>{row.stock}</div>) : (<div style={{background:'#DC3545',padding:'2px 12px',color:'white',borderRadius:'3px'}}>{row.stock}</div>),
      sortable: true,
      style: {
        color: '#475259',
      },	
    },    
   {
     name: 'Acciones',
     cell: row =>
       <>
         <Tooltip title="Ver Producto" arrow TransitionComponent={Zoom}>
           <IconButton aria-label="Sites" size="small" onClick={() => handleProductModal(row)}>
             <FaUserCircle style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
           </IconButton>
         </Tooltip>
         <Tooltip title="Modificar Producto" arrow TransitionComponent={Zoom}>
           <IconButton aria-label="Sites" size="small" onClick={() => handleEditProductModal(row)}>
             <RiEdit2Fill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
           </IconButton>
         </Tooltip>          
         {/* <Tooltip title="Propiedades" arrow TransitionComponent={Zoom}>
           <IconButton aria-label="Sites" size="small" onClick={() => {handlePropertiesProductModal(row)}}>
             <BsGearFill style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
           </IconButton>
         </Tooltip> */}
         <Tooltip title="Eliminar Producto" arrow TransitionComponent={Zoom}>
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

  const styles = StylesProducts();
  const [loading, setLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [listProducts, setListProducts] = useState([]);
  const [productProperties, setProductProperties] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productData, setProductData] = useState({
     product:'',
     laboratory:'',
     factor:'',
     sanitary:'',
     buys:'',
     sale:'',
     stock:'',
     state:'',
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
   //   await APISERVICE.getAllProducts().then((res) => {
   //      console.log("LISTA DE PRODUCTOS", res);
   //      setListProducts(res);
   //      setLoading(false);
   //   })
   //   .catch((err) => {
   //      console.log("Error", err);
   //      setLoading(false);
   //   })
  }

  const handleGetProductById = async(productId:any) => {
     setLoading(true);
   //   await APISERVICE.getProductById(productId).then((res) => {
   //      console.log("PRODUCTO__ID ", res);
   //      setProductProperties(res.product);
   //      setLoading(false);
   //   })
   //   .catch((err) => {
   //      console.log("Error", err);
   //      setLoading(false);
   //   })
  }

  const handleCreateProduct = async() => {
     setLoading(true);
   //   await APISERVICE.createProduct(productData).then((res) => {
   //      console.log("PRODUCTO_CREADO ", res);
   //      setListProducts(res);
   //      setLoading(false);
   //      handleGetAllProducts();
   //      setShowEditModal(false);
   //   })
   //   .catch((err) => {
   //      console.log("Error", err);
   //      setLoading(false);
   //   })
  }

  const handleUpdatedProductById = async() => {
     setLoading(true);
   //   await APISERVICE.updatedProductById(productData, productId).then((res) => {
   //      console.log("PRODUCTO_ACTUALIZADO", res);
   //      setLoading(false);
   //      handleGetAllProducts();
   //      setShowEditModal(false);
   //   })
   //   .catch((err) => {
   //      console.log("Error", err);
   //      setLoading(false);
   //   })
  }

   const handleDeleteProductById = async() => {
     setLoading(true);
   //   await APISERVICE.deleteProductById(productId).then((res) => {
   //      console.log("PRODUCTO_ELIMINADO", res);
   //      setLoading(false);
   //      handleGetAllProducts();
   //      setShowDeleteModal(false);
   //   })
   //   .catch((err) => {
   //      console.log("Error", err);
   //      setLoading(false);
   //   })
   }

   const handleProductModal =  (product:any) => {
     setShowProductModal(true);
     handleGetProductById(product.id);
   }

   const handleAddProductModal =  () => {
     setShowEditModal(true);
     setProductId(null);
     setProductData({
      product:'',
      laboratory:'',
      factor:'',
      sanitary:'',
      buys:'',
      sale:'',
      stock:'',
      state:'',
     });
   }

   const handleEditProductModal =  (product:any) => {
     setShowEditModal(true);
     setProductId(product.id);
     handleGetProductById(product.id);
     
     productData.product = product.product;
     productData.laboratory = product.laboratory;
     productData.factor = product.factor;
     productData.sanitary = product.sanitary;
     productData.buys = product.buys;
     productData.sale = product.sale;
     productData.stock = product.stock;
     productData.state = product.state;
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
               Productos
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
                  Inventario
               </Link>
               <Link
                  underline="hover"
                  sx={{display:'flex',alignItems:'center',color:'white'}}
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
               >
                  <WhatshotIcon sx={{mr: 0.5}} fontSize="inherit"/>
                  Productos
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
            Lista de Productos
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
               Producto:&nbsp; 
               {loading ? 'Sin Nombre' : productProperties["product"]}
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
                           Detalles de Producto:&nbsp; 
                           {productProperties ? productProperties["product"] : 'Sin Nombre'}
                        </ListSubheader>
                        }
                     >
                        <ListItemButton>
                           <ListItemIcon>
                              <BsPersonVcardFill style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Producto:" secondary={productProperties["product"]} />
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Lavoratorio:"  secondary={productProperties["laboratory"]}/>
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="R. Sanitario:"  secondary={productProperties["sanitary"]}/>
                        </ListItemButton>
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                           <ListItemIcon>
                              <FaUser style={{color:'#024AC2',fontSize:'25px'}} />
                           </ListItemIcon>
                           <ListItemText primary="Stock:"  secondary={productProperties["stock"]}/>
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
                        Modificar Producto:&nbsp; 
                        {loading ? 'Sin Nombre' : productProperties["product"]}
                     </>
                  ) : (
                     <>
                        Agregar Producto
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
                                 label="Producto" 
                                 variant="outlined"
                                 name="product"
                                 value={productData.product}
                                 onChange={handleChangeProduct}
                              />
                           </Div>                           
                           <Div>
                              {/* <TextField
                                 fullWidth
                                 size="small"
                                 id="outlined-select-currency"
                                 select
                                 label="Laboratorio"
                                 name="laboratory"
                                 value={productData.laboratory}
                                 onChange={handleChangeProduct}
                                 style={{textAlign: 'left'}}                  
                              >             
                                 <MenuItem value="0">Selecciona Laboratorio</MenuItem>
                                 <MenuItem value="1">PHARMA CHECK</MenuItem>     
                                 <MenuItem value="2">ANSOLAT</MenuItem>
                                 <MenuItem value="3">PORTUGAL</MenuItem>
                              </TextField> */}
                              <TextField 
                                 fullWidth
                                 size="small"
                                 id="outlined-basic" 
                                 label="Laboratorio" 
                                 variant="outlined"
                                 name="laboratory"
                                 value={productData.laboratory}
                                 onChange={handleChangeProduct}
                              />
                           </Div> 
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 type="number"
                                 id="outlined-basic" 
                                 label="Factor" 
                                 variant="outlined"
                                 name="factor"
                                 value={productData.factor}
                                 onChange={handleChangeProduct}
                              />                             
                           </Div>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 id="outlined-basic" 
                                 label="Sanidad" 
                                 variant="outlined"
                                 name="sanitary"
                                 value={productData.sanitary}
                                 onChange={handleChangeProduct}
                              />
                           </Div>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 type="number"
                                 id="outlined-basic"
                                 label="Valor Compra" 
                                 variant="outlined"
                                 name="buys"
                                 value={productData.buys}
                                 onChange={handleChangeProduct}
                              />
                           </Div>
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 type="number"
                                 id="outlined-basic" 
                                 label="Valor Venta" 
                                 variant="outlined"
                                 name="sale"
                                 value={productData.sale}
                                 onChange={handleChangeProduct}
                              />
                           </Div>                      
                           <Div>
                              <TextField 
                                 fullWidth
                                 size="small"
                                 type="number"
                                 id="outlined-basic" 
                                 label="Stock" 
                                 variant="outlined"
                                 name="stock"
                                 value={productData.stock}
                                 onChange={handleChangeProduct}
                              />
                           </Div>
                           <Div>
                              <TextField
                                 fullWidth
                                 size="small"
                                 id="outlined-select-currency"
                                 select
                                 label="Estado"
                                 name="state"
                                 value={productData.state}
                                 onChange={handleChangeProduct}
                                 style={{textAlign: 'left'}}                    
                                 // helperText="Seleccione Organización"
                              >
                                 <MenuItem value="2">Selecciona Estado</MenuItem>
                                 <MenuItem value="1">Activo</MenuItem>
                                 <MenuItem value="0">Inactivo</MenuItem>
                              </TextField>
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
                  Producto:&nbsp; 
                  {loading ? 'Sin Nombre' : productProperties["product"]}
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
               Eliminar Producto:&nbsp; 
               {loading ? 'Sin Nombre' : productProperties["product"]}
            </DialogTitle>
            <DialogContent style={{paddingBottom:'0px'}}>
               <DialogContentText id="alert-dialog-description">
                  ¿Desea eliminar el Producto?
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

export default Products;