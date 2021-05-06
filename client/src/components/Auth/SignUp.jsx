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
import { useAuth, useAuthDispatch } from "../../context/auth/auth.context";

const SignUp = ({ history }) => {
  const [loading, setLoading] = React.useState(false);

  const [formError, setFormError] = React.useState({});
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const { currentUser, authSignUp } = useAuth();
  const { onSignUp, onResetSingUpError } = useAuthDispatch();

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

  React.useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (authSignUp.errors && authSignUp.errors.validation) {
      setFormError(authSignUp.errors.validation);
    } else {
      setFormError({});
    }
  }, [authSignUp]);

  React.useEffect(() => {
    return onResetSingUpError();
  }, []);

  const submitSignUp = async event => {
    event.preventDefault();
    onSignUp(values);
  };

  return (
    <Template footer>
      <Container fluid className="h-100 ">
        <Row className=" h-100 align-items-center  ">
          <Col md={6} lg={5} className="mx-auto my-auto">
            <Card className="p-md-3">
              <Card.Body>
                {authSignUp.errors?.message && (
                  <Alert
                    variant="danger"
                    // onClose={() => setAlert(prev => ({ ...prev, show: false }))}
                    // dismissible
                  >
                    {authSignUp.errors.message}
                  </Alert>
                )}
                <h5 className="mb-3 text-center">Sign up</h5>
                <Form onSubmit={submitSignUp} noValidate>
                  <Form.Group controlId="name">
                    <Form.Label>Username</Form.Label>
                    <BaeFormControl
                      type="text"
                      placeholder="Enter username"
                      onChange={onChangeHandler}
                      value={values.name}
                      isInvalid={formError.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formError.name && formError.name}
                    </Form.Control.Feedback>
                  </Form.Group>

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
                      disabled={authSignUp.loading}
                    >
                      {authSignUp.loading ? "proccessing..." : "Sing up "}
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
