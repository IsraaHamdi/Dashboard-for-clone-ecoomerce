import React from "react";
import SideBar from "./components/sidebar/SideBar";
import TopBar from "./components/topBar/TopBar";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import "./app.css";
import Home from "./pages/Home";
import UserList from "./pages/userList";
import User from "./pages/user";
import NewUser from "./pages/newUser";
import Product from "./pages/product";
import NewProduct from "./pages/newProduct";
import ProductList from "./pages/productList";
import Login from "./pages/login";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

function App() {
  const {data : {isAdmin}} = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route path="/login">
        {isAdmin ? <Redirect to="/" /> : <Login />}
        </Route>
  {isAdmin && (
          <>
          <TopBar />
          <Container>
            <SideBar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newProduct">
              <NewProduct />
            </Route>
          </Container>
        </>
  )}
      </Switch>
    </Router>
  );
}

export default App;
