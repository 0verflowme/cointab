import React from 'react';
import api from "../api";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

   const [profile, setprofile] = useState({});
   const navigate = useNavigate();

   function handleLogout() {
      localStorage.removeItem('Authorization');
      navigate('/');
   }

   useEffect(() => {
      const getProfile = async () => {
         const resp = await api.get("/dashboard", {
            headers: {
               "Authorization": localStorage.getItem("Authorization")
            }
         });
         const data = resp.data.dashboard;
         setprofile(data);
      }
      getProfile();
   }, []);
   return (
      <div className='container mt-3'>
         <Card bg='dark' text='light' border="primary" >
            <Card.Header>Your Profile Page</Card.Header>
            <Card.Body>
               <Card.Title>Username: {profile.user}</Card.Title>
               <Card.Text>
                  Email: {profile.email}
               </Card.Text>
               <Card.Text>
                  Password Hash: {profile.password}
               </Card.Text>
               <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </Card.Body>
         </Card>
         <br />
      </div>
   );
}

export default Dashboard;
