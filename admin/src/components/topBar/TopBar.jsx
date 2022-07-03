import React from "react";
import styled from "styled-components";
import { Badge } from "@material-ui/core";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useSelector } from "react-redux";

const Topbar = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const TopbarWrapper = styled.div`
  height: 100%;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopLeft = styled.div``;

const Logo = styled.span`
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  cursor: pointer;
`;
const TopRight = styled.div`
  display: flex;
  align-items: center;
`;
const MenuItem = styled.div`
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

function TopBar() {
  const {data} = useSelector((state)=> state.user.currentUser)
  return (
    <Topbar>
      <TopbarWrapper>
        <TopLeft>
          <Logo>lamaadmin</Logo>
        </TopLeft>
        <TopRight>
          <MenuItem>
            <Badge badgeContent={2} color="primary">
              <NotificationsNone />
            </Badge>
          </MenuItem>
          <MenuItem>
            <Badge badgeContent={2} color="primary">
              <Language />
            </Badge>
          </MenuItem>
          <MenuItem>
            <Badge badgeContent={2} color="primary">
              <Settings />
            </Badge>
          </MenuItem>
          <MenuItem>
             <span>{data.username}</span>
            <Image
              src={data?.image}
              alt={data?.username}
            />
          </MenuItem>
        </TopRight>
      </TopbarWrapper>
    </Topbar>
  );
}

export default TopBar;
