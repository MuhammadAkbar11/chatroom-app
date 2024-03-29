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
  signUpAction,
  resetSignUpErrorAction,
} from "../../context/auth/auth.actions";

const SignUp = ({ history }) => {
  const [formError, setFormError] = React.useState({});
  const [alert, setAlert] = React.useState({
    show: false,
    variant: "success",
    message: "",
  });
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const { authState } = useSelector();
  const dispatch = useDispatch();

  const signUp = authState.signup;

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
    if (signUp.errors && signUp.errors.validation) {
      setFormError(signUp.errors.validation);
    } else {
      setFormError({});
    }
  }, [signUp]);

  React.useEffect(() => {
    return dispatch(resetSignUpErrorAction());
  }, []);

  const submitSignUp = async event => {
    event.preventDefault();
    // onSignUp(values);
    dispatch(signUpAction(values)).then(res => {
      console.log(res, "nicee");
      if (res === true) {
        setAlert({
          show: true,
          variant: "success",
          message: "Registrasi berhasil silahkan login!",
        });
        setValues({
          name: "",
          email: "",
          password: "",
        });
      }
    });
  };

  console.log(signUp);

  return (
    <Template footer>
      <Container fluid className="h-100 ">
        <Row className=" h-100 align-items-center  ">
          <Col md={6} lg={5} className="mx-auto my-auto">
            <Card className="p-md-3">
              <Card.Body>
                {signUp.errors?.message && (
                  <Alert variant="danger">{signUp.errors.message}</Alert>
                )}
                {alert.show && (
                  <Alert
                    variant={alert.variant}
                    onClose={() =>
                      setAlert({ show: false, message: "", variant: "success" })
                    }
                    dismissible
                  >
                    <p>{alert.message}</p>
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
                      disabled={signUp.loading}
                    >
                      {signUp.loading ? "proccessing..." : "Sing up "}
                    </Button>
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
