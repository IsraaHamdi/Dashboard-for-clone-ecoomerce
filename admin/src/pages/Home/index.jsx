import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { userData } from "../../dummyData";

const Container= styled.div`
    flex:4;
`;
const HomeWidgets = styled.div`
    display: flex;
    margin: 20px;
`;

 function Home() {
  const [userAnalytics, setUserAnalytics] = useState([]);
  const Token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser.accessToken;
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get(`/api/v1/user/status`, {
        cancelToken: cancelTokenSource.token,
        headers: { token: `Bearer ${Token}` },
      })
      .then(({ data }) => {
        data.map((item) =>
        setUserAnalytics((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], "Active User": item.total },
        ])
      );
      })
      .catch((error) => {
        console.log(error, "erge");
      });

    return () => cancelTokenSource.cancel();
  }, [Token, MONTHS]);
  return (
    <Container>
        <FeaturedInfo />
        <Chart data={userAnalytics} title="User Analytics" grid dataKey="Active User" />
        <HomeWidgets>
          <WidgetSm/>
          <WidgetLg/>
      </HomeWidgets>
    </Container>
  )
}

export default Home;
