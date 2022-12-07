import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import api from "../api"
import { useNavigate } from 'react-router-dom';
function Signup() {

   const [email, setemail] = useState('');
   const [password, setpassword] = useState('');
   const [confirmpassword, setconfirmpassword] = useState('');
   const [user, setuser] = useState('');
   const [loader, setloader] = useState(false);
   const navigate = useNavigate();

   async function handleSubmit(e) {
      e.preventDefault();
      setloader(true);
      const resp = await api.post("/signup", {
         user: user,
         email: email,
         password: password,
         confirm_password: confirmpassword,
      }, {
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         }
      })
      if (resp.data.token) {
         const token = resp.data.token;
         localStorage.setItem("Authorization", "Bearer " + token);
         setloader(false);
      } else {
         toast.error(resp.message || resp.data.message);
         setloader(false);
      }
   }

   return (
      <Form className='container mt-5'>
         <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Your Username" value={user} onChange={(e) => setuser(e.target.value)} />

         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setemail(e.target.value)} />
            <Form.Text className="text-muted">
               We'll never share your email with anyone else.
            </Form.Text>
         </Form.Group>

         <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
         </Form.Group>
         <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
         </Button>
      </Form>
   );
}

export default Signup;