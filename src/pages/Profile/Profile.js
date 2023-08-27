import React, { useEffect, useState } from 'react'
import "./profile.css"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"

import Spiner from '../../components/Spiner/Spiner';
import { useParams } from 'react-router-dom';

import { getsingleuserprofile } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';

import moment from "moment"

const Profile = () => {

  const [showspin, setShowSpin] = useState(true);
  const [userdata, setUserData] = useState({});

  const { id } = useParams();
  // console.log(id);
  const userProfileGet = async () => {
    const response = await getsingleuserprofile(id);
    if(response.status === 200){
      setUserData(response.data);
    }
    else{
      console.log("error");
    }
    // console.log(response);
  }

  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200)
  }, [id])

  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats profile_div d-flex justify-content-center">
                    <img src={`${BASE_URL}/uploads/${userdata.profile}`} alt='' />
                  </div>
                </div>
              </Row>
              <div className='text-center'>
                <h3>{userdata.fname + userdata.lname}</h3>
                <h4><i className="fa fa-envelope email" aria-hidden="true"></i>&nbsp;:- <span>{userdata.email}</span></h4>
                <h5><i className="fa fa-mobile" aria-hidden="true"></i>&nbsp;:- <span>{userdata.mobile}</span></h5>
                <h4><i className="fa fa-person" aria-hidden="true"></i>&nbsp;:- <span>{userdata.gender}</span></h4>
                <h4><i className="fa fa-map-marker location" aria-hidden="true"></i>&nbsp;:- <span>{userdata.location}</span></h4>
                <h4>Status&nbsp;:- <span>{userdata.status}</span></h4>
                <h5><i className="fa fa-calendar-days calendar" aria-hidden="true"></i> Date Created&nbsp;:- <span>{moment(userdata.datecreated).format("DD-MM-YYYY")}</span></h5>
                <h5><i className="fa fa-calendar-days calendar" aria-hidden="true"></i> Date Updated&nbsp;:- <span>{userdata.dateUpdated}</span></h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      }
    </>
  )
}

export default Profile