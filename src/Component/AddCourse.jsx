import { Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";


function AddCourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(0);
    return <div style={{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
        backgroundColor: '#F3F8FF'
    }}>
        <Card sx={{
            padding: "0.5vw 3vw",
            width: "30vw",
            
        }}>
            <CardHeader
                title="Add Course"
                sx={{textAlign : 'center'}}
            />
            <CardContent sx={{
                display:'flex',
                flexDirection:'column',
            }}>
                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setImage(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                />

                <TextField
                    style={{marginBottom: 10}}
                    onChange={(e) => {
                        setPrice(e.target.value)
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                />

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={async ()=>{
                        await axios.post("http://localhost:3000/admin/addCourse",{
                            title,
                            description,
                            imageLink: image,
                            published: true,
                            price
                        },{
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem('token')
                            }
                        });
                        alert("Course Added!");
                    }}
                > Add course</Button>
            </CardContent>
        </Card>
    </div>
}

export default AddCourse;