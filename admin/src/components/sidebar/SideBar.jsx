import React from 'react';
import styled from "styled-components";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";

  const SideBarContainer= styled.div`
    flex: 1;
    background-color: rgb(251, 251, 255);
    position: sticky;
    top: 50px;
  `;
  const SideBarWrapper= styled.div`
    padding: 20px;
    color: #555;
  `;
  const SideBarMenu = styled.div`
    margin-bottom: 10px;
  `;
  const Title= styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186); 
  `;
  const SidebarList=styled.ul`
    list-style: none;
    padding: 5px;
  `;
  const SidebarListItem=styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;
    &:hover{
      background-color: rgb(240, 240, 255);
    }
  `;

 function SideBar() {
  return (
    <SideBarContainer>
    <SideBarWrapper>
      <SideBarMenu>
        <Title>Dashboard</Title>
        <SidebarList>
          <Link to="/" className="link">
          <SidebarListItem className='active'>
            <LineStyle className="sidebarIcon" />
            Home
          </SidebarListItem>
          </Link>
          <SidebarListItem>
            <Timeline className="sidebarIcon" />
            Analytics
          </SidebarListItem>
          <SidebarListItem>
            <TrendingUp className="sidebarIcon" />
            Sales
          </SidebarListItem>
        </SidebarList>
      </SideBarMenu>
      <SideBarMenu>
        <Title>Quick Menu</Title>
        <SidebarList>
          <Link to="/users" className="link">
            <SidebarListItem>
              <PermIdentity className="sidebarIcon" />
              Users
            </SidebarListItem>
          </Link>
          <Link to="/products" className="link">
            <SidebarListItem>
              <Storefront className="sidebarIcon" />
              Products
            </SidebarListItem>
          </Link>
          <SidebarListItem>
            <AttachMoney className="sidebarIcon" />
            Transactions
          </SidebarListItem>
          <SidebarListItem>
            <BarChart className="sidebarIcon" />
            Reports
          </SidebarListItem>
        </SidebarList>
      </SideBarMenu>
      <SideBarMenu>
        <Title>Notifications</Title>
        <SidebarList>
          <SidebarListItem>
            <MailOutline className="sidebarIcon" />
            Mail
          </SidebarListItem>
          <SidebarListItem>
            <DynamicFeed className="sidebarIcon" />
            Feedback
          </SidebarListItem>
          <SidebarListItem>
            <ChatBubbleOutline className="sidebarIcon" />
            Messages
          </SidebarListItem>
        </SidebarList>
      </SideBarMenu>
      <SideBarMenu>
        <Title>Staff</Title>
        <SidebarList>
          <SidebarListItem>
            <WorkOutline className="sidebarIcon" />
            Manage
          </SidebarListItem>
          <SidebarListItem>
            <Timeline className="sidebarIcon" />
            Analytics
          </SidebarListItem>
          <SidebarListItem>
            <Report className="sidebarIcon" />
            Reports
          </SidebarListItem>
        </SidebarList>
      </SideBarMenu>
    </SideBarWrapper>
  </SideBarContainer>
  )
}

export default SideBar;
