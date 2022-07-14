import { ListItemButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

export default function MessagePreview({ name, message, selectChat, index }) {
    return (
        <>
            <ListItemButton
                alignItems="flex-start"
                onClick={() => selectChat(index)}
            >
                <ListItemAvatar>
                    <Avatar alt={name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText primary={name} secondary={message} />
            </ListItemButton>
            <Divider variant="inset" component="li" />
        </>
    );
}
