import { ListItemButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

export default function MessagePreview({ name, message, selectChat, index }) {
    const fullname = name.split(' ');
    return (
        <>
            <ListItemButton
                alignItems="flex-start"
                onClick={() => selectChat(index)}
            >
                <ListItemAvatar>
                    <Avatar alt={name} src="/static/images/avatar/1.jpg">
                        {fullname[0].charAt(0) +
                            (fullname.length > 1 ? fullname[1].charAt(0) : '')}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary={message} />
            </ListItemButton>
            <Divider variant="inset" component="li" />
        </>
    );
}
