import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CourseCard from './Card'

function Courses() {
    const [courses,setCourses] = useState([]);
    
    useEffect(()=>{
        axios.get("http://localhost:3000/admin/getCourses",{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(data => {
            setCourses(data.data.courses)
        });
    },[]);
    return (
        <div style={{
            minHeight:'90vh',
            border: 'solid 1px red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                courses.map(course =>{
                    return <CourseCard course={course}/>
                })
            }
        </div>
    )
}

export default Courses