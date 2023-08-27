import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { NavLink, useNavigate } from 'react-router-dom';
import loginbg from '../../assets/images/loginbg.jpeg';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';
import '../ForgotPassword/forgot.css';
import { resetpwdfunc } from '../../services/Apis';

const ResetPassword = () => {
    const { id } = useParams();
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const resetPwd = async () => {
        if (password === "") {
            toast.error('password is required');
        } else if (cpassword === "") {
            toast.error('repeat password is required');
        } else if (password !== cpassword) {
            toast.error('passwords dont match');
        } else {
            const data = new FormData();
            data.append("password", password);
            data.append("user_id", id);
            const response = await resetpwdfunc(data);
            if (response.status === 200) {
                setPassword("");
                setCPassword("");
                toast.success("Password Updated Successfully");
            } else {
                toast.error("Failed to update data");
            }
        }
    }
    return (
        <>
            <MDBContainer fluid className='h-custom bg-custom' >
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol col='12' className='m-3-10-em'>
                        <MDBCard className='card-registration card-registration-2' style={{ borderRadius: '15px' }}>
                            <MDBCardBody className='p-0'>
                                <MDBRow>
                                    <MDBCol md='6' className='p-5 bg-white b-right-true'>
                                        <h3 className="fw-normal mb-3 color-primary">Reset Password</h3>
                                        <h6 className='fw-normal mb-2'> <NavLink className='text-decoration-underline' to={'/login'}>Go Back</NavLink></h6>
                                        <MDBRow>
                                            <MDBCol md='12'>
                                                <MDBInput wrapperClass='mb-3' label='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} size='lg' id='form1' type='password' />
                                            </MDBCol>
                                            <MDBCol md='12'>
                                                <MDBInput wrapperClass='mb-3' label='Repeat Password' name='cpassword' value={cpassword} onChange={(e) => setCPassword(e.target.value)} size='lg' id='form1' type='password' />
                                            </MDBCol>
                                        </MDBRow>
                                        {/* <MDBRow>
                                        <Typography className='list-typo-custom'>Enter your email address. We will send you instructions to reset your password if the email exists in our database.</Typography>
                                    </MDBRow> */}
                                        <MDBBtn color='dark' size='lg' className='mb-1 bg-primary' onClick={resetPwd}>Reset Password</MDBBtn>
                                    </MDBCol>
                                    <MDBCol md='6' className='bg-white p-5 bg-login' style={{ backgroundImage: `url(${loginbg})` }}>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <ToastContainer position="top-right" />
            </MDBContainer>
        </>
    )
}

export default ResetPassword