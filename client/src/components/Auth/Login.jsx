import React from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Template from "../Layouts/Template";
import BaeFormControl from "../UI/BaeFormControl";
import { useDispatch, useSelector } from "../../hooks";
import {
  loginAction,
  resetLoginErrorAction,
} from "../../context/auth/auth.actions";

const Login = ({ history }) => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { authState } = useSelector();

  const loginState = authState.login;

  const [formError, setFormError] = React.useState({});

  React.useEffect(() => {
    if (loginState.errors && loginState.errors.validation) {
      setFormError(loginState.errors.validation);
    } else {
      setFormError({});
    }
  }, [loginState]);

  React.useEffect(() => {
    return () => {
      dispatch(resetLoginErrorAction());
    };
  }, []);

  const onChangeHandler = e => {
    const elId = e.target.id;
    const elValue = e.target.value;

    setValues(preVal => ({
      ...preVal,
      [elId]: elValue,
    }));

    setFormError(prevErr => ({
      ...prevErr,
      [elId]: null,
    }));
  };

  const submitLogin = event => {
    event.preventDefault();
    dispatch(loginAction(values)).then(res => {
      if (res) history.push("/");
    });
  };

  return (
    <Template fixed footer>
      <Container fluid className="h-100 ">
        <Row className=" h-100 align-items-center  ">
          <Col md={6} lg={5} className="mx-auto my-auto">
            <Card className="p-md-3">
              <Card.Body>
                {loginState.errors?.message && (
                  <Alert variant="danger" className="text-center">
                    {loginState.errors.message}
                  </Alert>
                )}
                <h5 className="mb-3 text-center">Login</h5>
                <Form onSubmit={submitLogin} noValidate>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <BaeFormControl
                      type="email"
                      placeholder="Enter email"
                      onChange={onChangeHandler}
                      value={values.email}
                      isInvalid={formError.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formError.email && formError.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <BaeFormControl
                      type="password"
                      placeholder="Password"
                      onChange={onChangeHandler}
                      value={values.password}
                      isInvalid={formError.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formError.password && formError.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mt-5 text-center">
                    <Button
                      className="text-light mx-auto rounded  px-5"
                      size="lg"
                      variant="primary"
                      type="submit"
                      block
                      disabled={loginState.loading}
                    >
                      {loginState.loading ? "processing..." : "Login"}
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
              Don't have an account? <Link to="signup">Sign up here</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Template>
  );
};

export default Login;
