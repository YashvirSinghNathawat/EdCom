import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

function SignIn(){
    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} backgroundColor={"#F3F8FF"} height="100%">
            <Typography variant="h6" component="h6"gutterBottom="true">SignIn</Typography>
            <FormControl sx={{ border:'1px solid #524A4E',padding :'2rem',borderRadius : '0.25rem' }}>
                <TextField label="Email" fullWidth variant="outlined" margin="normal"></TextField>
                <TextField label="Password" fullWidth variant="outlined" margin="normal" ></TextField>
                <Button variant="outlined" size="large" sx={{marginTop : '1rem',marginRight:'3rem',marginLeft:'3rem'}}>Submit</Button>
            </FormControl>
            
        </Box>
    )
}

export default SignIn;