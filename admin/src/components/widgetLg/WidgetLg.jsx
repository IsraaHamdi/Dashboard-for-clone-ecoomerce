import axios from "axios";
import React, { useEffect, useState } from "react";
import {format} from "timeago.js"
import styled from "styled-components";

const WidgetLgContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;
const WidgetLgTitle = styled.h3``;
const WidgetLgTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`;
const WidgetLgTr = styled.tr``;
const WidgetLgTh = styled.th`
  text-align: left;
`;
const WidgetLgUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;
// const WidgetLgImg = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin-right: 10px;
// `;
const WidgetLgDate = styled.td`
  font-weight: 300;
`;
const WidgetLgAmount = styled.td`
  font-weight: 300;
`;
const WidgetLgButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
`;
const WidgetLgName = styled.span``;
const WidgetLgStatus = styled.td``;

function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const Token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser.accessToken;

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get(`/api/v1/order/`, {
        cancelToken: cancelTokenSource.token,
        headers: { token: `Bearer ${Token}` },
      })
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error, "erge");
      });

    return () => cancelTokenSource.cancel();
  }, [Token]);

  const Button = ({ type }) => {
    return <WidgetLgButton className={type}>{type}</WidgetLgButton>;
  };
  return (
    <WidgetLgContainer>
      <WidgetLgTitle>Latest transactions</WidgetLgTitle>
      <WidgetLgTable>
        <thead>
        <WidgetLgTr>
          <WidgetLgTh>Customer</WidgetLgTh>
          <WidgetLgTh>Date</WidgetLgTh>
          <WidgetLgTh>Amount</WidgetLgTh>
          <WidgetLgTh>Status</WidgetLgTh>
        </WidgetLgTr>
        </thead>
        <tbody>
        {orders.map((order) => (
          <WidgetLgTr key={order._id}>
            <WidgetLgUser>
              <WidgetLgName>{order.userId}</WidgetLgName>
            </WidgetLgUser>
            <WidgetLgDate>{format(order.createdAt)}</WidgetLgDate>
            <WidgetLgAmount>$${order.amount}</WidgetLgAmount>
            <WidgetLgStatus>
              <Button type={order.status} />
            </WidgetLgStatus>
          </WidgetLgTr>
        ))}
        </tbody>
      </WidgetLgTable>
    </WidgetLgContainer>
  );
}

export default WidgetLg;
