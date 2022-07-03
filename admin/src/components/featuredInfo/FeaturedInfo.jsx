import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Featured = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const FeaturedItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const FeaturedMoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;
const FeaturedInfoTitle = styled.span`
  font-size: 20px;
`;
const FeaturedMoney = styled.span`
    font-size: 30px;
    font-weight: 600;
`;
const FeaturedMoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
`;
const FeaturedSub = styled.span`
    font-size: 15px;
    color: gray;
`;

function FeaturedInfo() {
  const [income, setIncomes] = useState([]);
  const [perc, setPerc] = useState(0);
  const Token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser.accessToken;

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get(`/api/v1/order/income`, {
        cancelToken: cancelTokenSource.token,
        headers: { token: `Bearer ${Token}` },
      })
      .then(({ data }) => {
        setIncomes(data);
        setPerc((data[1].total * 100) / data[0].total - 100);
      })
      .catch((error) => {
        console.log(error, "erge");
      });

    return () => cancelTokenSource.cancel();
  }, [Token]);
  return (
    <Featured>
      <FeaturedItem>
        <FeaturedInfoTitle>Revanue</FeaturedInfoTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>${income[1]?.total}</FeaturedMoney>
          <FeaturedMoneyRate>
          %{Math.floor(perc)}
          {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedInfoTitle>Sales</FeaturedInfoTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$4,415</FeaturedMoney>
          <FeaturedMoneyRate>
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedInfoTitle>Cost</FeaturedInfoTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$2,225</FeaturedMoney>
          <FeaturedMoneyRate>
            +2.4 <ArrowUpward className="featuredIcon" />
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
    </Featured>
  );
}

export default FeaturedInfo;
