import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({course}) => {
    const navigate = useNavigate();
  return (
    <Box width={"300px"}>
        <Card sx={{
            ":hover":{
                boxShadow: "0 0.5em 0.5em -0.4em",
                transform: "translateY(-0.25em)"
            }
        }}>
            <CardMedia 
                component='img'
                height='140'
                image={course.imageLink}
            />
            <CardContent>
                <Typography variant='h5' component='div' gutterBottom>{course.title}</Typography>
                <Typography variant='body2' color='test.secondary'>{course.description}</Typography>
            </CardContent>
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem'
            }}>
                <Button variant='contained'  size='small' onClick={()=>{
                    navigate("/course/" + course._id);
                }}>Purchase</Button>
                <Button variant='contained' size='small'>Edit</Button>
            </CardActions>
        </Card>
    </Box>
  )
}

export default CourseCard