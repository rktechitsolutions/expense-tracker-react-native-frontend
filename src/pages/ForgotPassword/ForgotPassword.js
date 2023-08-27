import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { NavLink, useNavigate } from 'react-router-dom';
import loginbg from '../../assets/images/loginbg.jpeg';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';
import './forgot.css';
import { sendemailviabe, sendpasswordresetlink } from '../../services/Apis';
import { BASE_URL, REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_PUBLIC_KEY } from '../../services/helper';
import emailjs from '@emailjs/browser';
// import { SMTPClient } from 'emailjs';
// import { SMTPClient } from 'emailjs'

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const sendEmail = async (mail, id) => {
        var hf = BASE_URL + '/resetpassword/' + id;
        var message = "We received a request to reset your password. If you didn't make this request, simply ignore this email. <a href='" + hf + "'>Click Here </a>";
        const data = new FormData();
        data.append("mail", mail);
        data.append("id", id);
        data.append("message", message);
        const response = await sendemailviabe(data);
        if (response.status === 200) {
            setEmail("");
        }
        // console.log(response);
        // emailjs.sendForm(REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, message, REACT_APP_PUBLIC_KEY)
        // const client = new SMTPClient({
        //     user: 'reshkhan14@gmail.com',
        //     password: 'bvtvnjnrnlewtaqk',
        //     host: 'smtp.reshkhan14@gmail.com',
        //     ssl: true,
        // });
        // client.send(
        //     {
        //         text: message,
        //         from: 'Codeguru <reshkhan14@gmail.com>',
        //         to: mail,
        //         // cc: 'else <else@your-email.com>',
        //         subject: 'Password Reset Link CG Expense Tracker',
        //     },
        //     (err, message) => {
        //         console.log(err || message);
        //     }
        // );
    }
    const handleClick = async () => {
        try {
            if (email === '') {
                toast.error('email is required');
            } else if (!email.includes('@')) {
                toast.error('Enter valid mail');
            } else {
                const data = new FormData();
                data.append("email", email);

                const res = await sendpasswordresetlink(data);

                if (res.status === 200) {
                    toast.success('An email will be send shortly');
                    sendEmail(res.data.user.email, res.data.user._id);
                    // navigate('/dashboard');
                } else {
                    toast.error(res.data.message);
                }
            }
        } catch (error) {
            toast.error("Something went wrong!");
            // console.log(error);
        }
    }
    return (
        <><MDBContainer fluid className='h-custom bg-custom' >
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol col='12' className='m-3-10-em'>
                    <MDBCard className='card-registration card-registration-2' style={{ borderRadius: '15px' }}>
                        <MDBCardBody className='p-0'>
                            <MDBRow>
                                <MDBCol md='6' className='p-5 bg-white b-right-true'>
                                    <h3 className="fw-normal mb-3 color-primary">Forgot Password</h3>
                                    <h6 className='fw-normal mb-2'> <NavLink className='text-decoration-underline' to={'/login'}>Go Back</NavLink></h6>
                                    <MDBRow>
                                        <MDBCol md='12'>
                                            <MDBInput wrapperClass='mb-3' label='name@company.com' name='email' value={email} onChange={(e) => setEmail(e.target.value)} size='lg' id='form1' type='text' />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <Typography className='list-typo-custom'>Enter your email address. We will send you instructions to reset your password if the email exists in our database.</Typography>
                                    </MDBRow>
                                    <MDBBtn color='dark' size='lg' className='mb-1 bg-primary' onClick={handleClick}>Send Password Reset Link</MDBBtn>
                                </MDBCol>
                                <MDBCol md='6' className='bg-white p-5 bg-login' style={{ backgroundImage: `url(${loginbg})` }}>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <ToastContainer position="top-right" />
        </MDBContainer></>
    )
}

export default ForgotPassword