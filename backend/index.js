const express = require("express");
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const USER_SECRET = "user";
const ADMIN_SECRET = "admin";
app.use(express.json());
app.use(cors());

//Middlewares
const authenticateUser = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,USER_SECRET,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            console.log(user);
            req.user = user;
            next();
        });
    }
    else{
        res.sendStatus(401);
    }
}
const authenticateAdmin = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,ADMIN_SECRET,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else{
        res.sendStatus(401);
    }
}

//Schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId,ref: 'Course' }]
});

const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

const adminSchema = mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User',userSchema);
const Course = mongoose.model('Course',courseSchema);
const Admin = mongoose.model('Admin',adminSchema);

//Connect to database
mongoose.connect('mongodb+srv://ecommerce:KIqb8ZD7wl0vlTGk@cluster0.cp27dqp.mongodb.net/edcom');

// Admin
app.post('/admin/signup',async (req,res)=>{
    const {username,password} = req.body;
    console.log(username,password)
    const user = await Admin.findOne({username});
    if(!user){
        const obj = {username,password};
        const newAdmin = new Admin(obj);
        await newAdmin.save();
        const token = jwt.sign({ username, role: 'admin' }, ADMIN_SECRET, { expiresIn: '1h' });
        res.send({message: 'Admin created successfully!!',token});
    }
    else{
        res.status(404).send({message: 'Admin already exist!'});
    }
});

app.post('/admin/login', async (req,res)=>{
    const {username,password} = req.headers;
    const user = await Admin.findOne({username,password});
    if(user){
        const token = jwt.sign({ username, role: 'admin' }, ADMIN_SECRET, { expiresIn: '1h' });
        res.send({message: 'LogIn successfully!!',token});
    }
    else{
        res.status(404).send({message: 'Admin does not exist!'});
    }
});

app.post('/admin/addCourse',authenticateAdmin , async (req,res)=>{
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course created successfully', courseId: course.id });
});

app.put('/admin/updateCourse/:courseId',authenticateAdmin, async (req,res)=>{
    const course = await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
    if(course){
        res.send({message : "Course Updated Successfully"});
    }
    else{
        res.status(404).send("Course does not exist!");
    }
});

app.get('/admin/getCourses',authenticateAdmin,async (req,res)=>{
    const courses = await Course.find();
    res.send({courses});
});

app.get('/admin/me',authenticateAdmin,async (req,res)=>{
    const admin = await Admin.findOne({username : req.user.username});
    if(!admin){
        res.status(403).json({message:"Admin doesnt exist!"});
        return;
    }
    res.json({
        username: req.user.username
    })
})



// User
app.post('/user/signup',async (req,res)=>{
    const {username,password} = req.body;
    
    const user = await User.findOne({username});
    if(!user){
        const obj = {username,password};
        const newUser = new User(obj);
        await newUser.save();
        const token = jwt.sign({ username, role: 'user' }, USER_SECRET, { expiresIn: '1h' });
        res.send({message: 'User created successfully!!',token});
    }
    else{
        res.status(404).send({message: 'User already exist!'});
    }

});
app.post('/user/login',async (req,res)=>{
    const {username,password} = req.headers;
    const user = await User.findOne({username,password});
    if(user){
        const token = jwt.sign({ username, role: 'user' }, USER_SECRET, { expiresIn: '1h' });
        res.send({message: 'LogIn successfully!!',token});
    }
    else{
        res.status(404).send({message: 'User does not exist!'});
    }

});
app.post('/user/courses/:courseId',authenticateUser,async (req,res)=>{
    const course = await Course.findById(req.params.courseId);
    if(course){
        const user = await User.findOne({username: req.user.username});
        if(user){
            user.purchasedCourses.push(course);
            await user.save();
            res.send('Course purchased successfully!!');
        }   
        else{
            res.status(403).send({message : 'User Not found!'});
        }
    }
    else{
        res.status(404).send({message : 'Course not found!!'});
    }
});
app.get('/user/courses',authenticateUser,async (req,res)=>{
    const courses = await Course.find({});
    res.send({courses});
});
app.get('/user/purchasedCourses',authenticateUser,async (req,res)=>{
    const user = await User.findOne({username : req.user.username}).populate('purchasedCourses');
    if(user){
        res.send({courses : user.purchasedCourses || []})
    }
    else{
        res.status(403).send({message : 'User Not found!'});
    }
});



app.listen(3000,()=>{
    console.log('App is running on port 3000');
});