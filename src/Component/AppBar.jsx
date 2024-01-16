import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";


function Header(){
    const navigate = useNavigate();
    const signin = () => navigate('/signup');
    const login = () => navigate('/login');
    const home = () => navigate('/');
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
                <Button color="inherit" onClick={login} sx={{marginLeft:'auto'}}>Login</Button>
                <Button color="inherit" onClick={signin}>Signup</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
// marginLeft : auto takes div to right end

export default Header;