const express = require("express");
const app = express();

// Admin
app.post('/admin/signup',(req,res)=>{
    res.send('Admin SignUp');
});

app.post('/admin/login',(req,res)=>{
    res.send('Admin LogIn');
});

app.post('/admin/addCourse',(req,res)=>{
    res.send('Add Course');
});

app.get('/admin/getCourse',(req,res)=>{
    res.send('Get all courses');
});

// User





app.listen(3000,()=>{
    console.log('App is running on port 3000');
});