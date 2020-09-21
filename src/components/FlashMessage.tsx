import { useState } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

type Props = {
  type: 'error' | 'warning' | 'info' | 'success',
  message: string
}

const FlashMessage = ({type, message}: Props) => {
  const [open, setOpen] = useState(true);
  return (
    <Collapse in={open}>
      <Alert
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  )
}

export default FlashMessage;