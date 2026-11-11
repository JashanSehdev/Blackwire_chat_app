
import { Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import BlockIcon from '@mui/icons-material/Block';
import styles from './block-alert.module.css'
import WarningIcon from '@mui/icons-material/Warning';
import { useAppDispatch } from '@/features/store';


type BlockAlertProp = {
    onSuccess : () => void
    username : string
    action :'block' | 'unblock',
    handleClose : ()=> void
}
const BlockAlert = ({
    onSuccess,
    username,
    action = 'block',
    handleClose
} : BlockAlertProp) => {
    
  const handleSubmit =() => {
    onSuccess()
    handleClose()
  }
    
  return (
    <Card className={styles.container}>
        <CardHeader 
            title="Alert"
            subheader="blockUser"
            avatar={<WarningIcon/>}
        />
        <CardContent>
            <Stack spacing={2}>
            <Typography align='center'>
                You are Blocking {username}
            </Typography>

            <Button variant='contained' size='small' startIcon={<BlockIcon/>} onClick={handleSubmit}>
                {action}
            </Button>
            <Button variant='outlined' size='small' onClick={handleClose}>
                Cancel
            </Button>
        </Stack>
        </CardContent>
        
    </Card>
  )
}

export default BlockAlert