import { makeStyles } from '@material-ui/core/styles';

export const StylesCustomers = makeStyles({

  DivTitle: {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#024AC2'
  },

  TypographyTitle: {
    color: 'white',
    padding: '14px 15px 9px 15px',
    display: 'flex',
    alignItems: 'center'
  },

  TypographyTitleIcon: {
    fontSize: 18, 
    marginRight: '8px'
  },

  DivBody: {
    bgcolor: 'background.paper', 
    alignItems: 'center',
    width: '60%', 
    padding: '20px 15px',
    margin: '0px auto',

    "@media (min-width: 0px)": {
      width: '100%',
      padding: '25px 15px',
    },
    "@media (min-width: 768px)": {
      width: '100%'
    },
    "@media (min-width: 992px)": {
      padding: '20px 15px',
      width: '100%'
    },
    "@media (min-width: 1200px)": {
      padding: '20px 15px',
      width: '100%'
    },
    "@media (min-width: 1400px)": {
      width: '100%'
    }
  },

  TypographyTitleFilter: {
    color: '#3BD2A2', 
    fontWeight: 600,
    padding: '20px 0px 5px 0px'
  },

  DivPaper: {
    padding: '20px', 
    marginBottom:'20px',
  },

  DivPaperContent: {
    display:'grid', 
    gridTemplateColumns:'1fr 1fr 1fr 1fr', 
    gap:'10px',
    marginTop:'10px',

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
      gap:'10x',
    },
    "@media (min-width: 1200px)": {
      gridTemplateColumns:'1fr 1fr 1fr',
      gap:'20px',
    },
    "@media (min-width: 1400px)": {
      gridTemplateColumns:'1fr 1fr 1fr',
      gap:'20px',
    }
  },

  PaperButton: {
    "@media (min-width: 0px)": {
      width: '100%',
    },
    "@media (min-width: 576px)": {
      width: 'auto',
    },
  },

  TypographyTitleTable: {
    color:' #475259', 
    fontWeight: 600, 
    padding: '0px', 
    display: 'flex', 
    alignItems: 'center'
  },

  TypographyTitleTableIcon: {
    fill:'#475259', 
    fontSize:'16px', 
    marginRight:'7px'
  },

  DataTable: {
    marginTop: '5px'
  },

  ButtonLogin: {
    background:'#024AC2',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    lineHeight:'1.5',
    transition:'0.3s',
    // paddingTop:'5px',
    '&:hover': {
       background:'#0167D6',
    },
  },

  ButtomOptionTable: {
    '&:hover': {
       cursor:'pointer',
    },
  },

});