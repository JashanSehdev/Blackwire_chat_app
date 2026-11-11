import { Button, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";


interface CreateChatProp {
    username : string,
    handleClose : () => void
    onSuccess : () => void
}
export default function AlertCreateChat ({
    username,
    handleClose,
    onSuccess
} : CreateChatProp) {

    const handleSubmit = () => {
        onSuccess()
        handleClose()
    }
    return (
        <Card>
            <CardHeader
            title = "Create Chat"

            />
            <CardContent>   
                <Stack spacing={2}>
                    <Typography>
                        Do You Want to create Chat with {username}
                    </Typography>
                    <Stack direction={'row'} spacing={1}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Create Chat
                        </Button>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}