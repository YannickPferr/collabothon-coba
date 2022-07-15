import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Divider, Tooltip } from '@mui/material';

export default function NetworkCard({
    name,
    email,
    skills,
    languages,
    chatId,
    showChatIcon,
}) {
    console.log(chatId);
    const router = useRouter();
    const fullname = name.split(' ');
    return (
        <Card sx={{ width: 250 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {fullname[0].charAt(0) +
                            (fullname.length > 1 ? fullname[1].charAt(0) : '')}
                    </Avatar>
                }
                action={
                    <Tooltip title="Verified since 2018!" placement='top' arrow>
                        <IconButton>
                            <VerifiedUserIcon />
                        </IconButton>
                    </Tooltip>
                }
                title={name}
                subheader={email}
            />
            <CardMedia
                component="img"
                height="194"
                image={`/${email}.jpeg`}
                alt="Paella dish"
            />
            <CardContent>
                <div style={{ display: 'flex', gap: '1em' }}>
                    <Typography variant="body2" color="text.secondary">
                        Skills
                        {skills && skills.map((skill) => <li>{skill}</li>)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Languages
                        {languages &&
                            languages.map((language) => <li>{language}</li>)}
                    </Typography>
                </div>
            </CardContent>
            {showChatIcon &&
                <>
                    <Divider />
                    <CardActions disableSpacing>
                        <IconButton
                            aria-label="go to chat"
                            onClick={() =>
                                router.push({ pathname: '/chat', query: { chatId } })
                            }
                        >
                            <SendIcon />
                        </IconButton>
                    </CardActions>
                </>
            }
        </Card>
    );
}
