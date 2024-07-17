import { useState, useEffect, useRef, useContext } from "react";
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

import {Breadcrumbs, Link} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";

import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { parseISO, format } from "date-fns";

import { IoMdAddCircle } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { VscFilePdf } from "react-icons/vsc";
import { RiFileExcel2Fill } from "react-icons/ri";

import { MdCancel } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTruckLoading } from "react-icons/fa";

import { FaMinusCircle } from "react-icons/fa";

import { StylesShipments } from './StylesShipments';
import AuthenticationContext from '../../../auth/AuthenticationContext';

const Shipments = () => {

   
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
 
 const columnsShipments = [
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
     width: '50px',
     // grow: 2,
     style: {
       // color: '#202124',
       color: '#475259',
       // fontWeight: 500,
     },
   },
   {
     name: 'Código',
     selector: row => row.codigoEnvio,
     sortable: true,
     width: '70px',
     wrap: true,
     reorder: true,
     style: {
       // color: '#202124',
       color: '#475259',
       // fontWeight: 500,
     },
   },
   {
      name: 'Comentarios',
      selector: row => row.comentario,
      sortable: true,
      wrap: true,
      reorder: true,
      style: {
        // color: '#202124',
        color: '#475259',
        // fontWeight: 500,
      },
    },
    {
      name: 'Cliente',
      selector: row => row.nombreCliente +" "+ row.apellidoCliente,
      sortable: true,
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
    },
   {
     name: 'Fecha Recojo',
     selector: row => row.fechaHoraRecojoProgramado,
     sortable: true,
     wrap: true,
     reorder: true,
     style: {
       color: '#475259',
     },	
   },
   {
      name: 'Distrito Recojo',
      selector: row => row.distritoRecojo,
      sortable: true,
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
   },
   {
      name: 'Dirección Recojo',
      selector: row => row.direccionRecojo,
      sortable: true,
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
   },    
   {
      name: 'Distrito Entrega',
      selector: row => row.distritoEntrega,
      sortable: true,
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
   },
   {
      name: 'Dirección Entrega',
      selector: row => row.direccionEntrega,
      sortable: true,
      wrap: true,
      reorder: true,
      style: {
        color: '#475259',
      },	
   },
   //  {
   //    name: 'Local',
   //    selector: row => row.idLocal > 0 ? (<div style={{background:'#28A745',padding:'2px 12px',color:'white',borderRadius:'3px'}}>{row.stock}</div>) : (<div style={{background:'#DC3545',padding:'2px 12px',color:'white',borderRadius:'3px'}}>{row.stock}</div>),
   //    sortable: true,
   //    style: {
   //      color: '#475259',
   //    },	
   //  },
   {
      name: 'Estado Envio',
      selector: row => <div style={{backgroundColor: row.estadoEnvio==='CREADO' ? '#0CB7F2' : row.estadoEnvio==='RECOGIDO' ? '#EBB206' : row.estadoEnvio==='ANULADO' ? '#F71920' : '#07EF07', padding:'3px', borderRadius:'4px',color:'white'}}>{row.estadoEnvio}</div>,
      sortable: true,
      width: '100px',
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
         {
            role === 1 ? (
               <>
                  <Tooltip title="Iniciar Envio" arrow TransitionComponent={Zoom} >
                     <IconButton aria-label="Sites" size="small" onClick={() => handleStartShipmentById(row.id)} >
                        <TbTruckDelivery style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Finalizar Envio" arrow TransitionComponent={Zoom} >
                     <IconButton aria-label="Sites" size="small" onClick={() => handleFinishShipmentById(row.id)} >
                        <FaTruckLoading style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
                     </IconButton>
                  </Tooltip>
               </> 
            ) : null
         }
         {
            role === 0 ? (
               <>
                  <Tooltip title="Anular Envio" arrow TransitionComponent={Zoom} >
                     <IconButton aria-label="Sites" size="small" onClick={() => {handleCancelShipmentById(row.id)}} >
                        <MdCancel style={{fontSize:'20px', color:'#475259', padding:'2px', boxSizing:'content-box'}}/>
                     </IconButton>
                  </Tooltip>
               </>
            ) : null            
         }
       </>,
     allowOverflow: true,
     button: true,
     width: '140px',
   },
 ];

  const {actualizar, claims} = useContext(AuthenticationContext);
  const styles = StylesShipments();
  const [loading, setLoading] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);

  const [listShipments, setListShipments] = useState([]);
  const [listPackages, setListPackages] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [productProperties, setProductProperties] = useState([]);
  const [shipmentId, setShipmentId] = useState(null);

   const [shipmentData, setShipmentData] = useState({
      envio:{
         fechaHoraRecojoProgramado: startDate,
         comentario: ''
      },
      direccionRecojo: {
         direccion: '',
         distrito:'',
         latitud:'',
         longitud:''
      },
      direccionEntrega: {
         direccion: '',
         distrito:'',
         latitud:'',
         longitud:''
      },
      paquetes: [
         {
            descripcion:'',
            peso:1,
            contenidoPaquete:'',
            comentario:''
         },
         {
            descripcion:'',
            peso:3,
            contenidoPaquete:'',
            comentario:''
         }
      ],
   });

//   console.log("DETECTANDO LOS CAMBIOS EN EL JSON ", shipmentData);

//   const handleChangeEnvio = (e) => {
//      const { name, value, dataset } = e.target;

//      setShipmentData((prevState) => {
//       if (name in prevState.envio) {
//         return {
//           ...prevState,
//           envio: {
//             ...prevState.envio,
//             [name]: value,
//           },
//         };
//       } else if (name in prevState.direccionRecojo) {
//         return {
//           ...prevState,
//           direccionRecojo: {
//             ...prevState.direccionRecojo,
//             [name]: value,
//           },
//         };
//       } else if (name in prevState.direccionEntrega) {
//         return {
//           ...prevState,
//           direccionEntrega: {
//             ...prevState.direccionEntrega,
//             [name]: value,
//           },
//         };
//       } else if (dataset.index) {
//          const paquetes = [...prevState.paquetes];
//          paquetes[dataset.index] = {
//              ...paquetes[dataset.index],
//              [name]: value,
//          };
//          return {
//              ...prevState,
//              paquetes,
//          };
//       }
//       return prevState;
//     });     
//   };

   const handleChangeEnvio = (e) => {
      const { name, value } = e.target;
      setShipmentData((prevState) => ({
      ...prevState,
      envio: {
         ...prevState.envio,
         [name]: value,
      },
      }));
   };

   const handleChangeDireccionRecojo = (e) => {
      const { name, value } = e.target;
      setShipmentData((prevState) => ({
        ...prevState,
        direccionRecojo: {
          ...prevState.direccionRecojo,
          [name]: value,
        },
      }));
   };

   const handleChangeDireccionEntrega = (e) => {
      const { name, value } = e.target;
      setShipmentData((prevState) => ({
        ...prevState,
        direccionEntrega: {
          ...prevState.direccionEntrega,
          [name]: value,
        },
      }));
   };

   const handleChangePaquete = (index, e) => {
      const { name, value } = e.target;
      setShipmentData((prevState) => {
        const newPaquetes = [...prevState.paquetes];
        newPaquetes[index] = {
          ...newPaquetes[index],
          [name]: value,
        };
        return {
          ...prevState,
          paquetes: newPaquetes,
        };
      });
   };
   
   const handleChangeStart = (newValue: any) => {
      setStartDate(format(new Date(newValue), "yyyy-MM-dd'T'HH:mm:ss"));
      setShipmentData((prevState) => ({
      ...prevState,
      envio: {
         ...prevState.envio, 
         fechaHoraRecojoProgramado: format(new Date(newValue), "yyyy-MM-dd'T'HH:mm:ss")
         },
      }))
   };

   const [countPackage, setCountPackage] = useState(0);

   const addNewPackage = () => {
      setCountPackage(countPackage+1);
      setShipmentData((prevState) => ({
         ...prevState,
         paquetes: [
            ...prevState.paquetes,
            {
                  descripcion: '',
                  peso: 1,
                  contenidoPaquete: '',
                  comentario: ''
            }
         ]
      }));
   };

   const removePackage = () => {
      setShipmentData((prevState) => {
        const newPaquetes = [...prevState.paquetes];
        newPaquetes.splice(countPackage, 1);
        return {
          ...prevState,
          paquetes: newPaquetes,
        };
      });
      setCountPackage(countPackage-1);
   };

  useEffect(() => {
     handleGetAllShipments();
     handleGetAllPackages();
     handleGetAllUsers();
  }, []);

   //OBTENIENDO LOS REOLES MEDIANTE EL TOKEN   
   let role;
   if (claims[1]) {
      role = claims[1].value;
      // console.log(role);
   }

  const handleGetAllShipments = async() => {
     setLoading(true);
     if(role === 0) {
         await APISERVICE.getAllShipmentsByCustomer().then((res) => {
            console.log("LISTA DE ENVIOS TODOS", res);
            setListShipments(res);
            setLoading(false);
         })
         .catch((err) => {
            console.log("Error", err);
            setLoading(false);
         })
     } else {
         await APISERVICE.getAllShipments().then((res) => {
            console.log("LISTA DE ENVIOS POR CLIENTE", res);
            setListShipments(res);
            setLoading(false);
         })
         .catch((err) => {
            console.log("Error", err);
            setLoading(false);
         })
     }    
     
  }

  const handleGetAllPackages = async() => {
      await APISERVICE.getAllPackages().then((res) => {
         console.log("LISTA DE PAQUETES", res);
         setListPackages(res);
      })
      .catch((err) => {
         console.log("Error", err);
      })
  }

  const handleGetAllUsers = async() => {
      await APISERVICE.getAllUsers().then((res) => {
         console.log("LISTA DE USUARIOS", res);
         setListUsers(res);
      })
      .catch((err) => {
         console.log("Error", err);
      })
   }

  const handleGetShipmentById = async(shipmentId:any) => {
     setLoading(true);
     await APISERVICE.getShipmentById(shipmentId).then((res) => {
        console.log("ENVIO__ID ", res);
        setProductProperties(res.shipment);
        setLoading(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
  }

  const handleCreateShipment = async() => {
     setLoading(true);
     await APISERVICE.createShipment(shipmentData).then((res) => {
        console.log("ENVIO_CREADO ", res);
        setListShipments(res);
        setLoading(false);
        handleGetAllShipments();
        setShowEditModal(false);
        toast.success(`Envio registrado correctamente!!!`, { theme: "colored", className:"toast-message" });
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
  }

  const handleUpdatedShipmentById = async() => {
     setLoading(true);
     await APISERVICE.updatedShipmentById(shipmentData, shipmentId).then((res) => {
        console.log("ENVIO_ACTUALIZADO", res);
        setLoading(false);
        handleGetAllShipments();
        setShowEditModal(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
  }

   const handleDeleteShipmentById = async() => {
     setLoading(true);
     await APISERVICE.deleteShipmentById(shipmentId).then((res) => {
        console.log("ENVIO_ELIMINADO", res);
        setLoading(false);
        handleGetAllShipments();
        setShowDeleteModal(false);
     })
     .catch((err) => {
        console.log("Error", err);
        setLoading(false);
     })
   }

   // FUNCIONES DE ENVIOS
   const handleCancelShipmentById = async(shipmentId:any) => {
      setLoading(true);
      await APISERVICE.anularShipmentById(shipmentId).then((res) => {
         console.log("ENVIO_ANULADO", res);
         setLoading(false);
         handleGetAllShipments();
         // setShowDeleteModal(false);
         toast.success(`Envio se anulo correctamente!!!`, { theme: "colored", className:"toast-message" });
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
      handleGetAllShipments();
    }

    const handleStartShipmentById = async(shipmentId:any) => {
      setLoading(true);
      await APISERVICE.iniciarShipmentById(shipmentId).then((res) => {
         console.log("ENVIO_INICIADO", res);
         setLoading(false);
         handleGetAllShipments();
         // setShowDeleteModal(false);
         toast.success(`El empleado recogio el paquete!!!`, { theme: "colored", className:"toast-message" });
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
      handleGetAllShipments();
    }

    const handleFinishShipmentById = async(shipmentId:any) => {
      setLoading(true);
      await APISERVICE.finalizarShipmentById(shipmentId).then((res) => {
         console.log("ENVIO_FINALIZADO", res);
         setLoading(false);
         handleGetAllShipments();
         // setShowDeleteModal(false);
         toast.success(`El empleado entrego el paquete al destinatario!!!`, { theme: "colored", className:"toast-message" });
      })
      .catch((err) => {
         console.log("Error", err);
         setLoading(false);
      })
      handleGetAllShipments();
    }

   const handleShipmentsModal =  (product:any) => {
     setShowProductModal(true);
     handleGetShipmentById(product.id);
   }

   const handleAddShipmentModal =  () => {
     setShowEditModal(true);
     setShipmentId(null);
     setShipmentData({
         envio:{
            fechaHoraRecojoProgramado: startDate,
            comentario: ''
         },
         direccionRecojo: {
            direccion: '',
            distrito:'',
            latitud:'',
            longitud:''
         },
         direccionEntrega: {
            direccion: '',
            distrito:'',
            latitud:'',
            longitud:''
         },
         paquetes: [
            {
               descripcion:'',
               peso:1,
               contenidoPaquete:'',
               comentario:''
            }
         ],
      });
   }

   const handleEditShipmentModal =  (product:any) => {
     setShowEditModal(true);
     setShipmentId(product.id);
     handleGetShipmentById(product.id);
     
   //   shipmentData.codigoEnvio = product.codigoEnvio;
   //   shipmentData.fechaHoraEnvio = product.fechaHoraEnvio;
   //   shipmentData.fechaHoraEntrega = product.fechaHoraEntrega;
   //   shipmentData.idEstadoEnvio = product.idEstadoEnvio;
   //   shipmentData.idPersonalEntrega = product.idPersonalEntrega;
   //   shipmentData.idCliente = product.idCliente;
   //   shipmentData.tipoEntrega = product.tipoEntrega;
   //   shipmentData.observacion = product.observacion;
   //   shipmentData.idRuta = product.idRuta;
   //   shipmentData.idLocal = product.idLocal;

     setStartDate(product.fechaHoraEnvio);
     setEndDate(product.fechaHoraEntrega);
   }

   const handlePropertiesShipmentModal =  (product:any) => {
     handleGetShipmentById(product.id);
     setShowPropertiesModal(true);
   }

   const handleDeleteShipmentModal =  (product:any) => {
     handleGetShipmentById(product.id);
     setShipmentId(product.id);
     setShowDeleteModal(true);
   }

   const { register, handleSubmit, formState: {errors} } = useForm();

   const subHeaderComponent = (
      <div style={{display: 'flex',width:'100%',justifyContent:'space-between'}}>
         <div style={{margin:'0px', display:'flex',alignItems:'center'}}>
            <Button variant="contained" className={styles.ButtonLogin} size="medium" onClick={handleAddShipmentModal}>
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
   

  return (
   <div>
      <Div className={styles.DivTitle}>
         <Typography variant={"h4"} gutterBottom component="div" className={styles.TypographyTitle} >
               <BsBasket2Fill className={styles.TypographyTitleIcon} />
               Envios
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
                  Envios
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
            Lista de Envios
         </Typography>

         {/* <div style={{margin:'10px 0px'}}>
            <Button variant="contained" className={styles.ButtonLogin} size="small" onClick={handleAddShipmentModal}>
               <IoMdAddCircle style={{fontSize:'16px'}} />
               &nbsp;Agregar
            </Button>
         </div> */}

         <DataTable
            //   title='Organización'
            columns={columnsShipments}
            data={listShipments}
            customStyles={customStyles}
            className={styles.DataTable}
            pagination={listShipments.length > 10 ? true : false}
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
               Envio:&nbsp; 
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
                           Detalles de Envio:&nbsp; 
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
                     <Switch color="primary" name="state" checked={stateUser.state===1 ? true : false} onChange={handleChangeShipmentStateUser} />
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
                  shipmentId ? (
                     <>
                        Modificar Envio:&nbsp; 
                        {loading ? 'Sin Nombre' : productProperties["product"]}
                     </>
                  ) : (
                     <>
                        Agregar Envio
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
                        <LocalizationProvider  dateAdapter={AdapterDateFns}>
                           <div>Envio</div>
                           <div className={styles.DivPaperContent}>
                              <Div>
                                 {/* <TextField
                                    fullWidth
                                    size="small"
                                    id="outlined-select-currency"
                                    // select
                                    label="Comentario"
                                    name="comentario"
                                    value={shipmentData.envio.comentario}
                                    onChange={handleChangeShipment}
                                    style={{textAlign: 'left'}}                    
                                    // helperText="Seleccione Organización"
                                    > 
                                    <MenuItem value="0"> -- Paquetes -- </MenuItem>      
                                    {
                                       listPackages ? listPackages.map((pack) => (
                                          <MenuItem key={pack.id} value={pack.id}>
                                             {pack.contenidoPaquete}
                                          </MenuItem>
                                       )) : (<MenuItem value="">Cargando Paquetes...</MenuItem>)
                                    }
                                 </TextField> */}
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Comentario" 
                                    variant="outlined"
                                    name="comentario"
                                    value={shipmentData.envio.comentario}
                                    onChange={handleChangeEnvio}
                                 />
                              </Div>                           
                              <Div>
                                 <DateTimePicker
                                    label="Fecha Envio"
                                    inputFormat="yyyy-MM-dd HH:mm:ss"
                                    value={startDate}
                                    // views={["year", "month", "day"]}
                                    onChange={handleChangeStart}
                                    renderInput={(props) => <TextField {...props} size="small" fullWidth />}
                                 />
                              </Div> 
                           </div>
                           <Divider style={{margin:'13px 0px'}} />
                           <div>Dirección Recojo</div>
                           <div className={styles.DivPaperPackage}>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Distrito Recojo" 
                                    variant="outlined"
                                    name="distrito"
                                    value={shipmentData.direccionRecojo.distrito}
                                    onChange={handleChangeDireccionRecojo}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Dirección Recojo" 
                                    variant="outlined"
                                    name="direccion"
                                    value={shipmentData.direccionRecojo.direccion}
                                    onChange={handleChangeDireccionRecojo}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Latitud Recojo" 
                                    variant="outlined"
                                    name="latitud"
                                    value={shipmentData.direccionRecojo.latitud}
                                    onChange={handleChangeDireccionRecojo}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Longitud Recojo" 
                                    variant="outlined"
                                    name="longitud"
                                    value={shipmentData.direccionRecojo.longitud}
                                    onChange={handleChangeDireccionRecojo}
                                 />
                              </Div>
                           </div>
                           <Divider style={{margin:'13px 0px'}} />
                           <div>Dirección Entrega</div>
                           <div className={styles.DivPaperPackage}>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Distrito Entrega" 
                                    variant="outlined"
                                    name="distrito"
                                    value={shipmentData.direccionEntrega.distrito}
                                    onChange={handleChangeDireccionEntrega}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Dirección Entrega" 
                                    variant="outlined"
                                    name="direccion"
                                    value={shipmentData.direccionEntrega.direccion}
                                    onChange={handleChangeDireccionEntrega}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Latitud Entrega" 
                                    variant="outlined"
                                    name="latitud"
                                    value={shipmentData.direccionEntrega.latitud}
                                    onChange={handleChangeDireccionEntrega}
                                 />
                              </Div>
                              <Div>
                                 <TextField 
                                    fullWidth
                                    size="small"
                                    // type="number"
                                    id="outlined-basic" 
                                    label="Longitud Entrega" 
                                    variant="outlined"
                                    name="longitud"
                                    value={shipmentData.direccionEntrega.longitud}
                                    onChange={handleChangeDireccionEntrega}
                                 />
                              </Div>
                           </div>
                           <Divider style={{margin:'13px 0px'}} />
                           <div>Paquetes</div>
                           <div> 
                              {shipmentData.paquetes.map((paquete, index) => (
                                 <div key={index} className={styles.DivPaperPackage} >
                                    <Div>
                                       <TextField
                                          fullWidth
                                          size="small"
                                          label="Descripción"
                                          variant="outlined"
                                          name="descripcion"
                                          value={paquete.descripcion}
                                          onChange={(e) => handleChangePaquete(index, e)}
                                          // inputProps={{ 'data-index': index }}
                                       />
                                    </Div>
                                    <Div>
                                       <TextField
                                          fullWidth
                                          type="number"
                                          size="small"
                                          label="Peso"
                                          variant="outlined"
                                          name="peso"
                                          value={paquete.peso}
                                          onChange={(e) => handleChangePaquete(index, e)}
                                          // inputProps={{ 'data-index': index }}
                                       />
                                    </Div>
                                    <Div>
                                       <TextField
                                          fullWidth
                                          size="small"
                                          label="Contenido"
                                          variant="outlined"
                                          name="contenidoPaquete"
                                          value={paquete.contenidoPaquete}
                                          onChange={(e) => handleChangePaquete(index, e)}
                                          // inputProps={{ 'data-index': index }}
                                       />
                                    </Div>
                                    <Div>
                                       <TextField
                                          fullWidth
                                          size="small"
                                          label="Comentario"
                                          variant="outlined"
                                          name="comentario"
                                          value={paquete.comentario}
                                          onChange={(e) => handleChangePaquete(index, e)}
                                          // inputProps={{ 'data-index': index }}
                                       />
                                    </Div>
                                 </div>
                                 // <Button variant="contained" size="small" onClick={() => removePackage(index)}>
                                 //    <FaMinusCircle style={{fontSize:'16px'}} />
                                 // </Button>
                                 
                              ))}

                              <div style={{margin:'10px 0px'}}>
                                 <Tooltip title="Agregar Paquete" arrow TransitionComponent={Zoom}>
                                    <IconButton aria-label="Sites" size="small" onClick={addNewPackage}>
                                       <IoMdAddCircle style={{fontSize:'27px', color:'#024AC2'}}/>
                                    </IconButton>
                                 </Tooltip>
                                 <Tooltip title="Quitar Paquete" arrow TransitionComponent={Zoom}>
                                    <IconButton aria-label="Sites" size="small" onClick={() => removePackage()}>
                                       <FaMinusCircle style={{fontSize:'24px', color:'#F71920'}}/>
                                    </IconButton>
                                 </Tooltip>
                              </div>
                              
                              {/* <button onClick={addNewPackage}>Añadir Paquete</button> */}
                           </div>
                        </LocalizationProvider>
                     </>                                            
                  )
               }                                 
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowEditModal(false)}>Cancelar</Button>
               {/* <Button variant="contained" style={{backgroundColor:'#024AC2'}} size="small" onClick={handleUpdatedShipmentById}>Guardar</Button> */}
               <LoadingButton
                  variant="contained"   
                  loading={loading}                                     
                  size="small"      
                  className={styles.ButtonLogin}
                  onClick={shipmentId ? handleUpdatedShipmentById : handleCreateShipment}
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
                  Envio:&nbsp; 
                  {loading ? 'Sin Nombre' : productProperties["product"]}
            </DialogTitle>
            <DialogContent>
               {/* <DataTable
                  //   title='Organización'
                  // columns={columnsShipmentsProperties}
                  data={propertiesUser}
                  customStyles={customStyles}
                  className={styles.DataTable}
                  // pagination={listShipments.length > 10 ? true : false}
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
               Eliminar Envio:&nbsp; 
               {loading ? 'Sin Nombre' : productProperties["product"]}
            </DialogTitle>
            <DialogContent style={{paddingBottom:'0px'}}>
               <DialogContentText id="alert-dialog-description">
                  ¿Desea eliminar el Envio?
               </DialogContentText> 
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" size="small" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
               {/* <Button variant="contained" style={{backgroundColor:'#024AC2'}} size="small" onClick={handleDeleteShipmentById}>Aceptar</Button> */}
               <LoadingButton
                  variant="contained"   
                  loading={loading}                                     
                  size="small"      
                  className={styles.ButtonLogin}
                  onClick={handleDeleteShipmentById}
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

export default Shipments;