import React from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Template from "../Layouts/Template";
import BaeFormControl from "../UI/BaeFormControl";

const SignUp = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = e => {
    const elId = e.target.id;
    const elValue = e.target.value;

    setValues(preVal => ({
      ...preVal,
      [elId]: elValue,
    }));
  };

  const submitSignUp = event => {
    event.preventDefault();

    console.log(values);
  };

  return (
    <Template footer>
      <Container fluid className="h-100 ">
        <Row className=" h-100 align-items-center  ">
          <Col md={6} lg={5} className="mx-auto my-auto">
            <Card className="p-md-3">
              <Card.Body>
                <h5 className="mb-3 text-center">Sign up</h5>
                <Form onSubmit={submitSignUp} noValidate>
                  <Form.Group controlId="name">
                    <Form.Label>Username</Form.Label>
                    <BaeFormControl
                      type="text"
                      placeholder="Enter username"
                      onChange={onChangeHandler}
                      value={values.name}
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <BaeFormControl
                      type="email"
                      placeholder="Enter email"
                      onChange={onChangeHandler}
                      value={values.email}
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <BaeFormControl
                      type="password"
                      placeholder="Password"
                      onChange={onChangeHandler}
                      value={values.password}
                    />
                  </Form.Group>

                  <Form.Group className="mt-5 text-center">
                    <Button
                      className="text-light mx-auto rounded  px-5"
                      size="lg"
                      variant="primary"
                      type="submit"
                      block
                    >
                      Sign up
                    </Button>
                    <div className="mt-3">
                      Forgot your password?{" "}
                      <Link to="forgot-password">Click here</Link>
                    </div>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
            <div className="mt-3 text-center">
              Have an account? <Link to="login">login now</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Template>
  );
};

export default SignUp;
