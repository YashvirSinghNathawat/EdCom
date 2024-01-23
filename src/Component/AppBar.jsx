import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Header(){
    const navigate = useNavigate();
    const [username,setUserName] = useState(null);
    const signin = () => navigate('/signup');
    const login = () => navigate('/login');
    const home = () => navigate('/');
    const logOut = ()=>{
        localStorage.setItem('token','');
        window.location = "/";
    }
    useEffect(()=>{
        fetch('http://localhost:3000/admin/me',{
            method: 'GET',
            headers:{
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
        }).then(response => response.json())
        .then(data=>{
            setUserName(data.username);
        });
    },[]);
    return (
        <Box>
            <AppBar position="static" sx={{background: '#040D12',display:'flex',justifyContent:'space-between'}}>
                <Toolbar>
                <Typography variant="h6" component={"h6"} >EdCom</Typography>
                <Tabs textColor="inhirit">
                    <Tab label="Home" onClick={home}></Tab>
                    <Tab label="Contact Us"></Tab>
                    <Tab label="About Us"></Tab>       
                </Tabs>
                {username===null?
                    <div style={{marginLeft:'auto', width:'20vw'}} >
                        <Button variant="contained"  onClick={login} sx={{ backgroundColor:'white',color:'black',":hover":{backgroundColor:'#F3F8FF'}, width:'40%'}}>Login</Button>
                        <Button variant="contained" color="inherit" sx={{ marginLeft:'1rem',backgroundColor:'white',color:'black',width:'40%', ":hover":{backgroundColor:'#F3F8FF'}}} onClick={signin}>Signup</Button>
                    </div>
                :
                    <div style={{marginLeft :  "auto"}}>
                        <Typography variant="subtitle1" component="span" >{username}</Typography>
                        <Button variant="contained" onClick={logOut}  sx={{marginLeft : '3rem', backgroundColor:'white',color:'black',":hover":{backgroundColor:'#F3F8FF'}}}>LogOut</Button>
                    </div>
                }        
                
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;