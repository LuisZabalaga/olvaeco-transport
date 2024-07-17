import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { 
  IconButton, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { MenuItem, TextField } from "@mui/material";
import LogsService from '../../../helpers/HttpInstance';
import LoadingButton from "@mui/lab/LoadingButton";
import DataTable from 'react-data-table-component';
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { FaSearch } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import { RiFileExcel2Fill } from "react-icons/ri";
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { StylesLogs } from './StylesLogs';
import { VscFilePdf } from 'react-icons/vsc';
import { utils, writeFileXLSX } from 'xlsx';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import { format } from "date-fns";


const Logs = () => {

  const styles = StylesLogs();

  const customStylesAuditory = {
    headRow: {
      style: {
        backgroundColor: '#F7F7F7',	
      },
    },
    headCells: {
      style: {
        color: 'white',
        fontSize: '10.5px',
        textTransform: 'uppercase',
        backgroundColor:'#3BD2A2'
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        outline: '1px solid #FFFFFF',
      },
      style: {
        position:"relative" 
      },
    },
    pagination: {
      style: {
        // border: 'none',
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: row => row.cc !== '0',
      style: {
        backgroundColor: 'rgba(223, 0, 17, 0.4)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.rc !== '0',
      style: {
        backgroundColor: 'rgba(223, 0, 17, 0.4)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

  const conditionalRowStylesLog = [
    {
      when: row => row.cState.String === '1',
      style: {
        backgroundColor: 'rgba(223, 0, 17, 0.4)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];
  

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#F7F7F7',	
      },
    },
    headCells: {
      style: {
        color: 'white',
        fontSize: '10.5px',
        textTransform: 'uppercase',
        backgroundColor:'#3BD2A2'
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
        position:"relative"
        
      }
    },
    pagination: {
      style: {
      },
    },
  };

  const columns = [
    {
      name: 'ID Log',
      selector: row => row.pnLogID,
      sortable: true,
      // grow: 2,
      width: '90px',
      style: {
        // color: '#202124',
        color: '#475259',
        fontSize: '14px',
        fontWeight: 500,
      },
    },
    {
      name: 'Tipo Query',
      selector: row => row.fcQueryType,
      sortable: true,
      width: '110px',
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Fecha Registro',
      selector: row => row.ddQueryDate,
      sortable: true,
      width: '190px',
      style: {
        color: '#475259',
      },
    },
    {
      name: 'Empleado',
      selector: row => row.dceName,
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'DNI Consultante',
      selector: row => row.rDocument,
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Organizacion',
      selector: row => row.orgName,
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Departamento',
      selector: row => row.dcName,
      sortable: true,
      style: {
        color: '#475259',
      },	
    }, 
    {
      name: 'CC',
      selector: row => row.cc,
      sortable: true,
      width: '80px',
      style: {
        color: '#475259',
      },
    },
    {
      name: 'RC',
      selector: row => row.rc,
      sortable: true,
      width: '80px',
      style: {
        color: '#475259',
      },
    },
    {
      name: 'DNI Consultado',
      selector: row => row.cDocument,
      sortable: true,
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'IP Consultor',
      selector: row => row.cIp.String !== "" ? row.cIp.String : 'Sin IP',
      sortable: true,
      style: {
        color: '#475259',
      },	
    },    
    {
      name: 'Detalles',
      cell: row =>
        <div>
          <Tooltip title="Ver Detalles" arrow TransitionComponent={Zoom}>
            <IconButton aria-label="Sites" size="small" onClick={()=>handleLogDetails(row)}>
              <BsFillEyeFill style={{fontSize:'25px', color:'#5E3BB7', padding:'2px', boxSizing:'content-box'}} />
            </IconButton>
          </Tooltip>          
        </div>,
      allowOverflow: true,
      button: true,
      width: '120px',
    },
  ];

  const columnsLogDetails = [
    {
      name: 'N°',
      selector: (row, index) => index+1,
      sortable: true,
      // grow: 2,
      width: '80px',
      style: {
        // color: '#202124',
        color: '#475259',
        fontSize: '14px',
        // fontWeight: 500,
      },
    },
    // {
    //   name: 'Código Operación',
    //   selector: row => row.guidOperation,
    //   sortable: true,
    //   width: '220px',
    //   style: {
    //     color: '#475259',
    //   },	
    // },
    {
      name: 'Sesión',
      selector: row => row.dcSession.String,
      sortable: true,
      width: '420px',
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Acción',
      selector: row => row.actDescription,
      sortable: true,
      // width: '190px',
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Cc',
      selector: row => row.cc,
      sortable: true,
      width: '70px',
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Rc',
      selector: row => row.rc,
      sortable: true,
      width: '70px',
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Query',
      selector: row => row.query.String,
      sortable: true,
      width: '120px',
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Estado',
      selector: row => row.status === 1 ? 
        <p style={{color:'#E73145',fontWeight:'500',backgroundColor:'rgba(231, 49, 69, 0.2)',padding:'3px 6px',borderRadius:'5px'}}>Fallido</p> : 
        <p style={{color:'#14537A',fontWeight:'500',backgroundColor:'rgba(20, 83, 122, 0.2)',padding:'3px 6px',borderRadius:'5px'}}>Exitoso</p>,
      sortable: true,
      width: '100px',
      style: {
        color: '#475259',
      },	
    },
    {
      name: 'Fecha',
      selector: row => row.timeStamp,
      sortable: true,
      width: '190px',
      style: {
        color: '#475259',
      },
    },    
  ];

  const date = format(new Date(), "yyyy-MM-dd");

  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());
  
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);

  const [ listEmployee, setListEmployee ] = useState([]);
  const [ listDepartment, setListDepartment ] = useState([]);
  const [ listLogs, setListLogs ] = useState([]);
  const [ parametersLog, setParametersLog ] = useState({
    user: '0',
    company: '0',
    dni: '',
    id_log:'',
    f_initial: startDate,
    f_final: endDate,
    h_initial: new Date().toLocaleTimeString(),
    h_final: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    getAllEmployee()
    getAllDepartment()
  }, [])

  const getAllEmployee = () => {
    // LogsService.getAllEmployee().then((res) => {
    //   setListEmployee(res);      
    // })
    // .catch((err) => {
    //   console.log("Error", err);
    // })
  }

  const getAllDepartment = () => {
    // LogsService.getAllOrganizations().then((res) => {
    //   setListDepartment(res);
    // })
    // .catch((err) => {
    //   console.log("Error", err);
    // })
  }

  const handleChangeStart = (newValue: any) => {
    setStartDate(format(new Date(newValue), "yyyy-MM-dd"));
    setParametersLog({
      ...parametersLog,
      "f_initial": format(new Date(newValue), "yyyy-MM-dd")
    })
  };

  const handleChangeEnd = (newValue: any) => {
    setEndDate(format(new Date(newValue), "yyyy-MM-dd"));
    setParametersLog({
      ...parametersLog,
      "f_final": format(new Date(newValue), "yyyy-MM-dd")
    })
  };

  const handleChangeHourStart = (newValue: any) => {
    setStartHour(new Date(newValue))
    // console.log("HORA INICIAL", new Date(newValue).toLocaleTimeString('es-ES'));
    setParametersLog({
      ...parametersLog,
      "h_initial": (new Date(newValue).toLocaleTimeString('es-ES'))
    })
  }

  const handleChangeHourEnd = (newValue: any) => {
    setEndHour(new Date(newValue));
    // console.log("HORA FINAL", new Date(newValue).toLocaleTimeString('es-ES'));
    setParametersLog({
      ...parametersLog,
      "h_final": (new Date(newValue).toLocaleTimeString('es-ES'))
    })
  }

  const handleChange = ({ target }) => {
    setParametersLog({
      ...parametersLog,
      [target.name]: target.value,
    });
  };

  const [ loading, setLoading ] = useState(false);

  const handleOperationLog = async () => {
    setListLogs([])
    setLoading(true);
    // await LogsService.getOperationLogByParameter(parametersLog).then((res) => {
    //   setListLogs(res);
    //   // console.log("LOGS ", res);
    // })
    // .catch((err) => {
    //   console.log("Error", err);
    // })
    setLoading(false);
  }

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por Página:', 
    rangeSeparatorText: 'de'
  }

  // const timeout = setTimeout(() => {
  //   setRows(listLogs);
  //   setPending(false);
  // }, 2000); 16874761084965123875D9168435EB9F0945814B655BC D8F7C07EEA1B44CC8F8C67E841381546
  
  const [ listLogDetails, setListLogDetails ] = useState([]);
  const [ showLogDetails, setShowLogDetails ] = useState(false);
  const [ codeSession, setCodeSession ] = useState("");

  const handleLogDetails = async (parms: any) => {
    // console.log("OPERATION", parms.cGuidOperation.String);
    // await LogsService.getOperationLogDetails(parms.cGuidOperation.String, parms.cSession.String).then((res) => {
    //   setListLogDetails(res);      
    //   setCodeSession(parms.cSession.String)
    // })
    // .catch((err) => {
    //   console.log("Error", err);
    // })
    setShowLogDetails(true)
  }

  const [ lastLoading, setLastLoading ] = useState(false);
  const [ lastLoadingXmml, setLastLoadingXmml ] = useState(false);
  const handleExportToXML = () => {
    setLastLoadingXmml(true);
    listLogs.forEach(currentItem => {
      delete currentItem.dcDepCode;
      delete currentItem.cGuidOperation;
      delete currentItem.cSession;
      delete currentItem.dceName;
      delete currentItem.orgName;
    });

    if (listLogs.length < 1) {
      toast.error("Error, No hay datos en la tabla para exportar.", { theme: "colored", className:"toast-message" });
    } else {
      const ws = utils.json_to_sheet(listLogs);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "People");
      writeFileXLSX(wb, 'Report_Log.xlsx');
    }
    setTimeout(function(){      
      setLastLoadingXmml(false);
    }, 2000);                                                                                            
  }

  const handleExportToPDF = () => {
    setLastLoading(true);
    if (listLogs.length < 1) {
      toast.error("Error, No hay datos en la tabla para exportar.", { theme: "colored", className:"toast-message" });
    } else {      
      // console.log("Todo correcto para Exportar PDF");
      // const doc = new jsPDF('l', 'mm', 'a4');
      const doc = new jsPDF('p', 'pt', 'A4');
      const createHeaders = (keys) => {
        const result = [];

        for (let key of keys) {
          result.push({
            id: key,
            name: key,
            prompt: key,
          });
        }
        return result;
      };
    
      const head = createHeaders ([
        'logID', 
        'fcQuery', 
        'ddQueryDate',
        // 'logID',
        'employeeID',
        'rDocument',
        // 'dceName',
        // 'dcDepCode',
        'dcName',
        'cc',
        'rc',
        'cDocument',
        // 'dcIp'
      ]);

      const data = listLogs.map((row) => ({
        ...row,
        logID: row.pnLogID.toString(),
        fcQuery: row.fcQueryType.toString(),
        ddQueryDate: row.ddQueryDate.toString(),
        // logID: row.logID.toString(),
        employeeID: row.pnEmployeeID.toString(),
        rDocument: row.rDocument.toString(),
        // dceName: row.dceName.toString(),
        // dcDepCode: row.dcDepCode.toString(),
        dcName: row.dcName.toString(),
        cc: row.cc.toString(),
        rc: row.rc.toString(),
        cDocument: row.cDocument.toString(), 
        // dcIp: row.dcIp.toString(),

      }));

      // autoTable(doc, {
      //     head: head,
      //     body: data,
      //     didDrawCell: (data) => { },
      // });
      doc.addFont('Calibri.ttf', 'Calibri', 'normal');
      doc.setFont('Calibri');
      doc.setFontSize(5);
      doc.table(20, 20, data, head, { autoSize: true });
      doc.save('Reporte_Log.pdf');
    }
    setTimeout(function(){      
      setLastLoading(false);
    }, 2000); 
    // setLastLoading(false);
  }

  return (
    <div>
      <Paper className={styles.DivTitle} >
        <Typography variant={"h5"} gutterBottom component="div" className={styles.TypographyTitle} >
          <ErrorIcon sx={{fontSize: 20, marginRight:'5px'}}/>
          Logs
        </Typography>
      </Paper>
      <Div className={styles.DivBody}> 
          <Paper className={styles.DivPaperFilter} elevation={3}>
            <Typography variant={"h5"} gutterBottom component="div" className={styles.TypographyFilter} >
              Filtros:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className={styles.DivPaperContent}>                
                <Div>
                  <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label="Organización"
                      name="company"
                      value={parametersLog.company}
                      onChange={handleChange}
                      style={{textAlign: 'left'}}              
                  >
                      <MenuItem value="0"> -- Todos -- </MenuItem>            
                      {
                        listDepartment ? listDepartment.map((org) => (
                          <MenuItem key={org.dcOrgCode} value={org.dcName}>
                            {org.dcName}
                          </MenuItem>
                        )) : (<MenuItem value="">Cargando Organizaciones...</MenuItem>)
                      }
                  </TextField>
                </Div>
                <Div>
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Usuario"
                    name="user"
                    value={parametersLog.user}
                    onChange={handleChange}
                    style={{textAlign: 'left'}}                    
                    // helperText="Seleccione Organización"
                  > 
                    <MenuItem value="0"> -- Todos -- </MenuItem>      
                    {
                      listEmployee ? listEmployee.map((emp) => (
                        <MenuItem key={emp.id} value={emp.name}>
                          {emp.name}
                        </MenuItem>
                      )) : (<MenuItem value="">Cargando Empleados...</MenuItem>)
                    }
                  </TextField>
                </Div>
                <Div>
                  <TextField
                      fullWidth
                      id="outlined-select-currency"
                      label="DNI"
                      name="dni"
                      value={parametersLog.dni}
                      onChange={handleChange}
                      style={{textAlign: 'left'}}                    
                  />
                </Div>
                <Div>
                  <TextField
                      fullWidth
                      id="outlined-select-currency"
                      label="Codigo Log"
                      name="id_log"
                      value={parametersLog.id_log}
                      onChange={handleChange}
                      style={{textAlign: 'left'}}                    
                  />
                </Div>
                <Div>
                  <DesktopDatePicker
                      label="Fecha Inicial"
                      inputFormat="YYYY-MM-DD"
                      value={startDate}
                      // views={["year", "month", "day"]}
                      onChange={handleChangeStart}
                      renderInput={(props) => <TextField {...props} fullWidth />}
                  />
                </Div>
                <Div style={{width:'100%'}}>
                  <DesktopDatePicker                      
                      label="Fecha Final"
                      inputFormat="YYYY-MM-DD"
                      value={endDate}
                      // views={['year', 'month', 'day']}
                      onChange={handleChangeEnd}
                      renderInput={(props) => <TextField {...props} fullWidth />}
                  />
                </Div>
                <Div className={styles.DivTimePicker} >
                  <TimePicker
                      label="Hora Inicial"
                      value={startHour}
                      onChange={handleChangeHourStart}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                  <TimePicker
                      label="Hora Final"
                      value={endHour}
                      onChange={handleChangeHourEnd}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Div>
                {/* <TextField
                    id="time"
                    fullWidth
                    label="Hora Inicial"
                    type="time"
                    defaultValue={endHour}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    // sx={{width: 150}}
                /> */}
                
              </div>
            </LocalizationProvider>
            <Div sx={{mt:4, mb:2}}>
              <LoadingButton 
                variant="contained" 
                fullWidth
                size="large"
                loading={loading}
                className={styles.PaperButton}
                onClick={handleOperationLog}
              >
                <FaSearch className={styles.PaperButtonIcon} />
                Buscar
              </LoadingButton>

              <LoadingButton 
                variant="contained" 
                fullWidth
                size="large"
                color="success"
                loading={lastLoadingXmml}
                className={styles.PaperButton}
                onClick={handleExportToXML}
              >
                <RiFileExcel2Fill className={styles.PaperButtonIcon} />
                Excel
              </LoadingButton>

              <LoadingButton 
                variant="contained" 
                fullWidth
                size="large"
                color="error"
                loading={lastLoading}
                className={styles.PaperButton}
                onClick={handleExportToPDF}
              >
                <VscFilePdf className={styles.PaperButtonIcon} />
                PDF
              </LoadingButton>
            </Div>            
          </Paper>
          <Paper className={styles.DivPaperTable} elevation={3}>
            <DataTable
              // title='Organización'
              columns={columns}
              data={listLogs}
              customStyles={customStyles}
              className={styles.DataTable}
              pagination={listLogs.length > 10 ? true : false}
              highlightOnHover
              pointerOnHover
              // progressComponent={<CircularProgress color="success" />}
              // progressPending={pending}
              paginationComponentOptions={paginationComponentOptions}
              // noDataComponent={false}
              conditionalRowStyles={conditionalRowStylesLog}
              noDataComponent={loading ? null : "No hay registros para mostrar"}
              striped
            />
            {
              loading ? (
                <div className={styles.DivLoading} >
                  <CircularProgress />
                </div>
              ) : (
                null
                // <div style={{width:'100%', height:'100%', display:'flex',justifyContent:'center', alignItems:'center' }}>
                //   <Typography variant="subtitle2" gutterBottom component="div">No hay registros para mostrar</Typography>
                // </div>
              )
            }            
          </Paper>

      </Div>

      {/* Modal Campos Detalles Log */}
      <Dialog
          fullWidth={true}
          maxWidth="xl"
          open={showLogDetails}
          keepMounted
          onClose={() => setShowLogDetails(false)}
          aria-describedby="alert-dialog-slide-description"
      >
          <DialogTitle className={styles.DialogTitle} >
            <div style={{display:'flex', justifyContent:'center'}}>
              <ErrorIcon className={styles.DialogButtonIcon} />
              <Typography variant={"h5"} gutterBottom component="div" className={styles.TypographyFilter} >
                DETALLES DE LOG
              </Typography>
            </div>
            <div style={{display:'flex', justifyContent:'start', marginTop:'15px', marginBottom:'0px', paddingBottom:'0px'}}>
              <Typography variant="body2" gutterBottom>
                {"Sesión: " + codeSession}
              </Typography>
            </div>            
          </DialogTitle>
          <DialogContent>
            <DataTable
              columns={columnsLogDetails}
              data={listLogDetails}
              customStyles={customStylesAuditory}
              className={styles.DataTable}
              pagination={listLogDetails.length > 10 ? true : false}
              highlightOnHover
              pointerOnHover
              paginationComponentOptions={paginationComponentOptions}
              noDataComponent={listLogDetails.length > 0 ? null : "No hay registros para mostrar"}
              striped
              conditionalRowStyles={conditionalRowStyles}
            />
          </DialogContent>
          <DialogActions>
            <LoadingButton variant="contained" color="error" onClick={() => setShowLogDetails(false)} >Cerrar</LoadingButton>
          </DialogActions>
      </Dialog>
      
    </div>
  )

}

export default Logs