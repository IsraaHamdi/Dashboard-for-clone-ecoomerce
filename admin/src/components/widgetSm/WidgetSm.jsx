import React from 'react';
import { Visibility } from "@material-ui/icons";
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const WidgetSmContainer = styled.div`
    flex: 1;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 20px;
    margin-right: 20px;
`;
const WidgetSmTitle = styled.span`
    font-size: 22px;
    font-weight: 600;
`;
const WidgetSmList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;
const WidgetSmListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px;
`;

const WidgetSmImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;
const WidgetSmUser = styled.div`
    display: flex;
    flex-direction: column;
`;
const WidgetSmUsername = styled.span`
    font-weight: 600;
`;
const WidgetSmButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 7px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
`;

 function WidgetSm() {
  const [users, setUsers] = useState([]);
  const Token =JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken

  useEffect(()=> {
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get( `/api/v1/user/?new=true`, {
        cancelToken: cancelTokenSource.token,
        headers: { token: `Bearer ${Token}`}
      })
      .then(({ data }) => {
        setUsers(data)
      })
      .catch((error) => {
        console.log(error,'erge');
      });
    return () => cancelTokenSource.cancel();
    
  },[Token]);
  return (
    <WidgetSmContainer>
    <WidgetSmTitle>New Join Members</WidgetSmTitle>
    <WidgetSmList>
      {users.map((user) => {  
     return  <WidgetSmListItem key={user._id}>
        <WidgetSmImg
          src={user.image}
          alt="user-image"
        />
        <WidgetSmUser>
          <WidgetSmUsername>{user.username}</WidgetSmUsername>
        </WidgetSmUser>
        <WidgetSmButton>
          <Visibility className="widgetSmIcon" />
          Display
        </WidgetSmButton>
      </WidgetSmListItem>})}
   
    </WidgetSmList>
  </WidgetSmContainer>
  )
}

export default WidgetSm;
