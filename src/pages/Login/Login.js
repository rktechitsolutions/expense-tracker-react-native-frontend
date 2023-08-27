import React, { useContext, useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
// import corner01 from '../../assets/images/corner01.png';
// import corner02 from '../../assets/images/corner02.png';
import loginbg from '../../assets/images/loginbg.jpeg';
import { NavLink, useNavigate } from 'react-router-dom';
import { authData } from '../../components/context/ContextProvider';
import './companylogin.css';
import { ToastContainer, toast } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';
import { userloginfunc } from '../../services/Apis';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useContext(authData);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            if (email === '') {
                toast.error('email is required');
            }
            else if (password === '') {
                toast.error('email is required');
            }
            else if (!email.includes('@')) {
                toast.error('Enter valid mail');
            }
            else {
                const data = new FormData();
                data.append("email", email);
                data.append("password", password);

                const res = await userloginfunc(data);
                if (res.data.success) {
                    toast.success(res.data.message);
                    setAuth({
                        ...auth,
                        user: res.data.user,
                        token: res.data.token,
                    })
                    localStorage.setItem('auth', JSON.stringify(res.data));
                    navigate('/dashboard');
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
        <>
            <MDBContainer fluid className='h-custom bg-custom' >
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol col='12' className='m-3-10-em'>
                        <MDBCard className='card-registration card-registration-2' style={{ borderRadius: '15px' }}>
                            <MDBCardBody className='p-0'>
                                <MDBRow>
                                    <MDBCol md='6' className='p-5 bg-white b-right-true'>
                                        <h3 className="fw-normal mb-3 color-primary">Welcome! Sign In</h3>
                                        <h6 className='fw-normal mb-2'>New to Expense Calculator? <NavLink className='text-decoration-underline' to={'/register'}>Create an account</NavLink></h6>
                                        <MDBRow>
                                            <MDBCol md='12'>
                                                <MDBInput wrapperClass='mb-3' value={email} onChange={(e) => setEmail(e.target.value)} label='name@company.com' size='lg' id='form1' type='text' />
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBInput wrapperClass='mb-3' value={password} onChange={(e) => setPassword(e.target.value)} label='Password' size='lg' id='form3' type='password' />
                                        {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' labelClass='mb-4' label='Remember Me' /> */}
                                        <MDBRow className='mb-2'>
                                            <span>
                                                <NavLink className='color-seconday' to={'/forgotpassword'}>Forgot your Password?</NavLink>
                                            </span>
                                        </MDBRow>
                                        <MDBBtn color='dark' size='lg' className='mb-1 bg-primary' onClick={handleSubmit}>Sign In</MDBBtn>
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

export default Login