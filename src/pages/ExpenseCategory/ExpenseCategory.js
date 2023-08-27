import { Box, Button, Card, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
// import DashboardMenuLinks from "../../components/DashboardMenuLinks";
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToastContainer, toast } from "react-toastify"
import moment from "moment";
import Alert from 'react-bootstrap/Alert';
// import { addExpense } from "../../components/context/ContextProvider";
// import { expenseaddfunc } from "../../services/Apis";
import '../ExpenseListings/listings.css';

import 'react-toastify/dist/ReactToastify.css';
import DashboardMenuLinks from "../../components/DashboardMenuLinks";
import { categoryaddfunc, expensecategorydeletefunc, fetchexpensecatlist } from "../../services/Apis";
import Spiner from "../../components/Spiner/Spiner";
import Tables from "../../components/TablesCategory/Tables";
import { updateExpenseCategoryData } from "../../components/context/ContextProvider";
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const ExpenseCategory = () => {
    const { updateexpcategory, setUpdateExpCategory } = useContext(updateExpenseCategoryData);
    const [listData, setListData] = useState([]);
    const [value, setValue] = useState(0);
    const [categoryad, setCategoryadd] = useState("");
    const [delte, setDelet] = useState("");
    const navigate = useNavigate();
    const [showspin, setShowSpin] = useState(true);
    const [inputdata, setInputData] = useState({
        name: ""
    });
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value })
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const categoryAdd = async (e) => {
        e.preventDefault();
        const items = JSON.parse(localStorage.getItem('auth'));
        const { name } = inputdata;
        if (name === "") {
            toast.error("Category Name is required!");
        } else if (items.user.user_id === "") {
            toast.error("Session Expired! Please login!");
            navigate("/login")
        } else {
            const data = new FormData();
            data.append("name", name);
            data.append("user_id", items.user.user_id);
            const response = await categoryaddfunc(data);
            if (response.status === 200) {
                setInputData({
                    ...inputdata,
                    name: ""
                });
                setCategoryadd(response.data);
            } else {
                toast.error("Failed to save data");
                toast.error(response.response.data);
            }
        }
    }
    const deleteCategoryExpense = async (id) => {
        const response = await expensecategorydeletefunc(id);
        if (response.status === 200) {
            fetchCategoryExpData();
            setDelet(response.data);
        } else {
            toast.error("error");
        }
    }
    const fetchCategoryExpData = async () => {
        const items = JSON.parse(localStorage.getItem('auth'));
        const user_id = items.user.user_id;
        const response = await fetchexpensecatlist(user_id);
        if (response.status === 200) {
            // console.log(response.data);
            setListData(response.data.singleexpensedata);
        } else {
            console.log("error for get user data");
        }
    }
    useEffect(() => {
        fetchCategoryExpData();
        setTimeout(() => {
            setShowSpin(false);
        }, 1200)
    })
    return (
        <>
            {
                updateexpcategory ?
                    <Alert variant="primary" onClose={() => setUpdateExpCategory("")} dismissible>
                        {updateexpcategory.name.toUpperCase()} Successfully updated
                    </Alert> : ""
            }
            {
                delte ?
                    <Alert variant="primary" onClose={() => setDelet("")} dismissible>
                        {delte.name.toUpperCase()} Successfully deleted
                    </Alert> : ""
            }
            {
                categoryad ?
                    <Alert variant="primary" onClose={() => setCategoryadd("")} dismissible>
                        {categoryad.name.toUpperCase()} Successfully added
                    </Alert> : ""
            }
            <div style={{ display: 'flex' }}>
                <DashboardMenuLinks active="expensecategory" />
                <Card className="container-div">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Expense Addition" style={{ color: '#b79a6d' }} {...a11yProps(0)} />
                                <Tab label="View/Edit" style={{ color: '#b79a6d' }} {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Form className='mt-3'>
                                <Row className='mt-3'>
                                    <Form.Group className="mb-3 col-lg-12" controlId="formBasicEmail">
                                        <Form.Label>Category Name</Form.Label>
                                        <Form.Control type="text" name='name' value={inputdata.name} onChange={setInputValue} placeholder='Category Name' />
                                    </Form.Group>
                                    <Form.Group className="mb-3 col-lg-12" >
                                        <Button variant="primary" type="submit" className="btn-custom-add" onClick={categoryAdd} >
                                            Add Category
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Form className='mt-3'>
                                {
                                    showspin ? <Spiner /> : <Tables
                                        listData={listData}
                                        deleteCategoryExpense={deleteCategoryExpense}
                                        fetchExpData={fetchCategoryExpData}
                                        handlePrevious=""
                                        handleNext=""
                                        page=""
                                        pageCount=""
                                        setPage=""
                                    />
                                }
                            </Form>
                        </CustomTabPanel>
                    </Box>
                </Card><ToastContainer position="top-right" />
            </div>
        </>
    )
}

export default ExpenseCategory