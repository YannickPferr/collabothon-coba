import { TextField, Typography, Grid } from "@mui/material"
import React from "react";


function Description() {
    const [description, setDescription] = React.useState("");

    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                Image
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h2" align="center">
                    Tell us a bit about yourself
                </Typography>
                <TextField
                    fullWidth
                    label="Description"
                    style={{height: "30vh"}}
                    value={description}
                    onChange={(e) => handleChangeDescription(e)}
                />
            </Grid>
        </Grid>
       
    )
}

export default Description;