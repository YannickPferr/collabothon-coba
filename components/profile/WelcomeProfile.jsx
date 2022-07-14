import { Typography, Grid } from "@mui/material"



function Welcome() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                Image
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h2" align="center">
                    Thank you for your iniciative in helping people!
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Welcome