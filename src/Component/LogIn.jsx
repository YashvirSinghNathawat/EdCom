import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useState } from "react";

function LogIn(){
    const [username,setUsername]  = useState('');
    const [password,setPassword]  = useState('');
    const logInHandler = ()=>{
        fetch('http://localhost:3000/admin/login',{
            method:'POST',
            headers:{
                "Content-type":"application/json",
                "username":username,
                "password":password
            },
        }).then(response => response.json())
        .then(data => {
            localStorage.setItem("token",data.token)
        });
    };
    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} backgroundColor={"#F3F8FF"} height="100%">
            <Typography variant="h6" component="h6"gutterBottom="true">LogIn</Typography>
            <FormControl sx={{ border:'1px solid #524A4E',padding :'2rem',borderRadius : '0.25rem' }}>
                <TextField label="Username" fullWidth variant="outlined" margin="normal" value={username} onChange={e => setUsername(e.target.value)}></TextField>
                <TextField label="Password" fullWidth type="password" variant="outlined" margin="normal" value={password} onChange={e => setPassword(e.target.value)}  ></TextField>
                <Button variant="outlined" size="large" sx={{marginTop : '1rem',marginRight:'3rem',marginLeft:'3rem'}} onClick={logInHandler}>Submit</Button>
            </FormControl>
        </Box>
    )
}

export default LogIn;