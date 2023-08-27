import React, { useContext, useEffect, useState } from 'react'
import "./register.css"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Select from "react-select"
import { registerfunc } from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import Spiner from '../../components/Spiner/Spiner';
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { addData } from '../../components/context/ContextProvider'

const Register = () => {
    //to get the value of form fields created 3 states as below
    const [inputdata, setInputData] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: "",
        password: "",
        cpassword: ""
    });
    // console.log(inputdata);
    const [status, setStatus] = useState("Active");
    const [image, setImage] = useState("");
    const [preview, setPreviewImage] = useState("");

    const [showspin, setShowSpin] = useState(true);

    const { useradd, setUseradd } = useContext(addData);

    const navigate = useNavigate();

    //to get value for above 3 states, needs to create 3 diff functions
    // setInput Value
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value })
    }

    // status set
    // we used react select so to get the value we can't call e.target.value like above for setInputValue so wrote separate fn
    const setStatusValue = (e) => {
        // no need for e.target as the onchange returns the target itself
        setStatus(e.value)
    }

    const setProfile = (e) => {
        setImage(e.target.files[0])
    }
    // below useeffect triggers when an [image] chosen
    useEffect(() => {
        if (image) {
            setPreviewImage(URL.createObjectURL(image))
        }
        setTimeout(() => {
            setShowSpin(false);
        }, 1200)
    }, [image])

    const submitUserData = async (e) => {
        e.preventDefault();
        const { fname, lname, email, mobile, gender, location, password, cpassword } = inputdata;
        if (fname === "") {
            toast.error("Fname is required!");
        } else if (lname === "") {
            toast.error("Lname is required!");
        }
        else if (email === "") {
            toast.error("email is required!");
        }
        else if (!email.includes('@')) {
            toast.error("enter valid email!");
        }
        else if (mobile === "") {
            toast.error("mobile is required!");
        }
        else if (mobile.length > 10) {
            toast.error("Enter Valid mobile!");
        }
        else if (gender === "") {
            toast.error("gender is required!");
        }
        else if (location === "") {
            toast.error("location is required!");
        }
        else if (status === "") {
            toast.error("status is required!");
        }
        else if (password === "") {
            toast.error("Password is required!");
        }
        else if (cpassword === "") {
            toast.error("Repeat Password is required!");
        }
        else if (password !== cpassword) {
            toast.error("Passwords do not match!");
        }
        else if (image === "") {
            toast.error("image is required!");
        } else {
            const data = new FormData();
            data.append("fname", fname);
            data.append("lname", lname);
            data.append("email", email);
            data.append("mobile", mobile);
            data.append("gender", gender);
            data.append("location", location);
            data.append("status", status);
            data.append("user_profile", image);
            data.append("password", password);

            const config = {
                "Content-Type": "multipart/form-data"
            }

            const response = await registerfunc(data, config);

            if (response.status === 200) {
                setInputData({
                    ...inputdata,
                    fname: "",
                    lname: "",
                    email: "",
                    mobile: "",
                    gender: "",
                    location: "",
                    password: "",
                    cpassword: ""
                });
                setStatus("");
                setImage("");
                setUseradd(response.data);
                navigate("/login")
            } else {
                toast.error("Failed to save data");
                toast.error(response.response.data);
            }
        }
    }

    // status options
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'InActive', label: 'Inactive' }
    ];

    return (
        <>
            {
                showspin ? <Spiner /> : <div className="container">
                    <h2 className='text-center mt-1'>Register your details</h2>
                    <Card className='shadow mt-3 p-3 mb-4'>
                        <div className='profile_div text-center'>
                            <img src={preview ? preview : '/avatar.webp'} alt='img' />
                        </div>
                        <Form className='mt-3'>
                            <Row className='mt-3'>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name='fname' value={inputdata.fname} onChange={setInputValue} placeholder='Enter your Firstname' />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setInputValue} placeholder='Enter your Lastname' />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} placeholder='Enter Mobile' />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Select your Gender</Form.Label>
                                    <Form.Check type={'radio'} label={`Male`} name='gender' onChange={setInputValue} value={'Male'} />
                                    <Form.Check type={'radio'} label={`Female`} name='gender' onChange={setInputValue} value={'Female'} />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Select your Status</Form.Label>
                                    <Select options={options} onChange={setStatusValue} />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Select your Profile</Form.Label>
                                    <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select your Profile' />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Enter your Location</Form.Label>
                                    <Form.Control type="text" name='location' value={inputdata.location} onChange={setInputValue} placeholder='Enter your Location' />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name='password' value={inputdata.password} onChange={setInputValue} placeholder='Enter your Password' />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name='cpassword' value={inputdata.cpassword} onChange={setInputValue} placeholder='Repeat your Password' />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={submitUserData}>
                                    Submit
                                </Button>
                            </Row>
                        </Form>
                    </Card>
                    <ToastContainer position="top-right" />
                </div>
            }
        </>
    )
}

export default Register