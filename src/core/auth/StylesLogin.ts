import { makeStyles } from '@material-ui/core/styles';

export const StylesLogin = makeStyles({

  ButtonLogin: {
    background: '#024AC2',
    transition: '0.3s',
    '&:hover': {
       background: '#0167D6',
    },
  },

  DivTitle: {
    // display: 'flex', 
    // justifyContent: 'space-between', 
    // alignItems: 'center', 
    marginBottom:'20px',
    //boxShadow: '0px 3px 3px -2px rgba(126,87,194,0.2), 0px 3px 4px 0px rgba(126,87,194,0.14), 0px 1px 8px 0px rgba(126,87,194,0.12)',
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
    "@media (min-width: 1400px)": {
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
    paddingBottom:'20px',
    marginBottom:'20px',
    width:'100%',
    overflow:'hidden',
  },

  DivPaperContent: {
    display:'grid', 
    gridTemplateColumns:'1fr',
    paddingTop:'5px',
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
      gridTemplateColumns:'1fr 1fr 1fr', 
    },
    "@media (min-width: 1200px)": {
      gridTemplateColumns:'1fr 1fr 1fr',
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
    // marginBottom:'0px',
    // paddingBottom:'0px'
  },

  DivDataTableLoading: {
    width:'100%', 
    height:'100%', 
    display:'flex',
    justifyContent:'center', 
    alignItems:'center'
  }

});