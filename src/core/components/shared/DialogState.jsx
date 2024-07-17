import React from 'react';
import { LoadingButton } from '@mui/lab';
import { 
   Button, 
   Dialog, 
   DialogActions, 
   DialogContent, 
   DialogContentText, 
   DialogTitle, 
   Typography 
} from '@mui/material';

const DialogState = (props) => {
  return (
   <div>
      <Dialog
         open={props.open}
         onClose={props.close}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
            <Typography
               variant="h4"
               component="h2"
               color="error"
               style={{ fontWeight:'600' }}
            >
               {props.title}          
            </Typography>
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               <Typography
                  variant="h5"
                  component="h2"
               >
                  {props.content}            
               </Typography>
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button 
               color="error"
               component="label" 
               variant="contained" 
               onClick={props.close}
               sx={{
                  padding: "7.9px 20px",
                  marginBottom:2,
                  marginRight: 1
               }}
            >
               Cancelar
            </Button>
            <LoadingButton
               color="success"
               size="medium"              
               loading={props.loading}
               variant="contained"
               onClick={props.confirm}
               sx={{mr: 2, mb:2, padding:"8px 20px"}}
            >
               Aceptar
            </LoadingButton>
         </DialogActions>
      </Dialog>
   </div>
   
  )
}

export default DialogState
