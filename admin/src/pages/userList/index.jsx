import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserListContainer = styled.div`
  flex: 4;
`;

const UserListUser = styled.div`
  display: flex;
  align-items: center;
`;

const UserListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const UserListEdit = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

function UserList() {
  const [data, setData] = useState(userRows);

  // const [users, setUsers] = useState([]);
  // const Token =JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken

  // useEffect(()=> {
  //   const cancelTokenSource = axios.CancelToken.source();
  //   axios
  //     .get( `/api/v1/user/`, {
  //       cancelToken: cancelTokenSource.token,
  //       headers: { token: `Bearer ${Token}`}
  //     })
  //     .then(({ data }) => {
  //       console.log(data,'dlknerjkgn')
  //       setUsers(data)
  //     })
  //     .catch((error) => {
  //       console.log(error,'erge');
  //     });

  //   return () => cancelTokenSource.cancel();
  // },[Token]);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <UserListUser>
            <UserListImg src={params.row.avatar} alt="userImage" />
            {params.row.username}
          </UserListUser>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row.id}`}>
              <UserListEdit>Edit</UserListEdit>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <UserListContainer>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </UserListContainer>
  );
}

export default UserList;
