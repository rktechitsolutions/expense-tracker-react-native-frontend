import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material"
import DashboardMenuLinks from "../../components/DashboardMenuLinks"
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useEffect, useState } from "react";
import { fetchexpensecatlist, getexpensecategorywise } from "../../services/Apis";
import '../ExpenseListings/listings.css'
import { useNavigate } from "react-router-dom";
import Spiner from "../../components/Spiner/Spiner";

const Dashboard = () => {
    const [showspin, setShowSpin] = useState(true);
    const navigate = useNavigate();
    const items = JSON.parse(localStorage.getItem('auth'));

    const id = localStorage.getItem("auth") === null ? navigate('/login') : items.user.user_id;

    // const id = ;
    const [inputdata, setInputData] = useState([]);
    const [listdata, setListData] = useState([]);
    const chartSetting = {
        yAxis: [
            {
                label: 'total expenses (AED)',
            },
        ],
        width: 800,
        height: 300,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'rotate(-90deg) translate(0px, -10px)',
            },
        },
    };
    const valueFormatter = (value) => `${value}mm`;

    const expenseCatgeoryWiseAllFetch = async () => {
        const response = await getexpensecategorywise(id);
        // console.log(response.status);
        if (response.status === 200) {
            setInputData(response.data);
            // console.log(response);
        } else {
            console.log("error");
        }
    }

    const fetchCategory = async () => {
        const response = await fetchexpensecatlist(id);
        if (response.status === 200) {
            // console.log(response.data);
            setListData(response.data.singleexpensedata);
        } else {
            console.log("error for get user data");
        }
    }

    useEffect(() => {
        expenseCatgeoryWiseAllFetch();
        fetchCategory();
        setTimeout(() => {
            setShowSpin(false);
        }, 1200)
    }, [id])

    return (
        <>

            <div style={{ display: 'flex' }}>
                <DashboardMenuLinks active="dashboard" />
                <Card className="container-div">
                    <Card sx={{ minWidth: 275 }}>
                        <CardHeader
                            title="Welcome to Expense Calculator"
                            subheader="Here is where you can manage your daily expenses..."
                            className="dashboard-class-header"
                        />

                        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
                    </Card>
                    <Box mt={4.5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                                {
                                    showspin ? <Spiner /> :
                                        inputdata.length > 0 &&


                                        <BarChart
                                            dataset={inputdata}
                                            xAxis={[{ scaleType: 'band', dataKey: '_id' }]}
                                            series={
                                                listdata.length > 0 && listdata.map((cats) => {
                                                    return ({
                                                        dataKey: 'total',
                                                        label: 'total',
                                                        // valueFormatter
                                                    }

                                                    )
                                                })
                                            }
                                            {...chartSetting}
                                        />
                                }
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </div>
        </>
    )
}

export default Dashboard