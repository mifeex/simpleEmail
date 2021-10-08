import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import CompleteRegistration from "./components/CompleteRegistration";
import SucessPage from "./components/SucessPage";
import ReferalPage from "./components/ReferalPage";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Row>
            <Col>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route path="/goto" component={CompleteRegistration} />
              <Route exact path="/success" component={SucessPage} />
              <Route path="/link/referal" component={ReferalPage} />
            </Col>
          </Row>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
