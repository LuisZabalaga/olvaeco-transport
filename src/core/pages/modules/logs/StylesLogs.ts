import { makeStyles } from '@material-ui/core/styles';

export const StylesLogs = makeStyles({

  DivTitle: {
    // display: 'flex', 
    // justifyContent: 'space-between', 
    // alignItems: 'center',
    marginBottom:'20px',
    boxShadow:'0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)',
  },

  TypographyTitle: {
    color: '#7352C7',
    padding: '15px 15px 15px 15px',
    display: 'flex',
    fontWeight: 600,
  },

  TypographyTitleIcon: {
    fontSize: 15, 
    marginRight: '8px'
  },

  DivBody: {
    display:'grid',
    gridTemplateColumns:'35% 1fr',
    gap:'10px',
    width: '100%',

    "@media (min-width: 0px)": {
      gridTemplateColumns:'1fr',
      width: '100%'
    },
    "@media (min-width: 768px)": {
      gridTemplateColumns:'30% 1fr',
      gap:'10px',
      width: '100%'
    },
    "@media (min-width: 992px)": {
      gridTemplateColumns:'30% 1fr',
      gap:'10px',
      width: '100%'
    },
    "@media (min-width: 1200px)": {
      gridTemplateColumns:'25% 1fr',
      gap:'10px',
      width: '100%'
    },
    "@media (min-width: 1300px)": {
      gridTemplateColumns:'27% 1fr',
      gap:'10px',
      width: '100%'
    },
    "@media (min-width: 1400px)": {
      gridTemplateColumns:'26% 1fr',
      gap:'10px',
      width: '100%'
    },
    "@media (min-width: 1450px)": {
      gridTemplateColumns:'18% 1fr',
      gap:'10px',
      width: '100%'
    }
  },

  TypographyFilter: {
    color: '#475259', 
    fontWeight: 600,
    textAlign:'center',
    padding: '0px 0px 0px 0px'
  },

  DivPaperFilter: {
    boxShadow:'0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)',
    padding:'20px',
    paddingBottom:'0px',
    marginBottom:'20px',
    width:'100%',
    height:'fit-content',
    overflow:'hidden',
  },

  DivPaperTable: {
    boxShadow:'0 0.5rem 1.25rem rgba(115, 82, 199, 0.175)',
    padding:'20px',
    paddingBottom:'0px',
    marginBottom:'20px',
    width:'100%',
    overflow:'hidden',
  },

  DivPaperContent: {
    display:'grid', 
    gridTemplateColumns:'1fr', 
    gap:'15px',

    "@media (min-width: 0px)": {
      gridTemplateColumns:'1fr',
    },
    "@media (min-width: 576px)": {
      gridTemplateColumns:'1fr',
    },
    "@media (min-width: 650px)": {
      gridTemplateColumns:'1fr',
    },
    "@media (min-width: 768px)": {
      gridTemplateColumns:'1fr', 
    },
    "@media (min-width: 992px)": {
      gridTemplateColumns:'1fr', 
    },
    "@media (min-width: 1200px)": {
      gridTemplateColumns:'1fr',
      gap:'15px',
    },
    "@media (min-width: 1400px)": {
      gap:'15px',
    }
  },

  PaperButton: {
    marginBottom:'10px',
    width:'100% !important',

    "@media (min-width: 0px)": {
      width: '100%',
    },
    "@media (min-width: 576px)": {
      width: '100%',
    },
  },

  PaperButtonIcon: {
    color:'white',
    fontSize:'18px', 
    marginRight:'5px'
  },  

  TypographyTitleTable: {
    color:' #475259', 
    fontWeight: 600, 
    padding: '14px 10px 9px 10px', 
    display: 'flex', 
    alignItems: 'center'
  },

  TypographyTitleTableIcon: {
    fill:'#475259', 
    fontSize:'21px', 
    marginRight:'7px'
  },

  DataTable: {
    marginTop:'5px',
  },

  DialogButtonIcon: {
    color:'#475259',
    fontSize:'20px', 
    marginRight:'7px'
  },

  DivLoading: {
    width:'100%', 
    height:'100%', 
    display:'flex',
    justifyContent:'center', 
    alignItems:'center',
  },

  DialogTitle: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'center', 
    marginTop:'10px',
    paddingBottom:'0px',
  },

  DivTimePicker: {
    width:'100%', display:'grid', 
    gridTemplateColumns:'1fr 1fr', 
    gap:'0px 12px',
  },

  
  
});