import { useEffect } from "react";
import { useFormik } from "formik";
import useAuth from "../hooks/use-auth";
import { registerSchema } from "../util/validationSchema";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { loading, error, actType, register, resetUI } = useAuth();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConf: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: registerSchema,
    onSubmit: (values, formikHelper) => {
      const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails")) || [];
      const registeredPasswords = JSON.parse(localStorage.getItem("registeredPasswords")) || [];
      const { email, password } = values;
      const isEmailRegistered = registeredEmails.includes(email);
      const isPasswordRegistered = registeredPasswords.includes(password);
      if (isEmailRegistered) {
        formikHelper.setFieldError("email", "This email is already registered");
      } else if (isPasswordRegistered) {
        formikHelper.setFieldError("password", "This password is already registered");
      } else {
        register(values);
        navigate("/login");
      }
    },
  });

  useEffect(() => {
    return () => {
      resetUI()
      localStorage.removeItem("registeredEmails");
      localStorage.removeItem("registeredpasswords");
    };
  }, [resetUI]);

  return (
    <Row className="justify-content-md-center">
      <Col xs={6} span={3}>
        <h2 className="mt-3 mb-3">Register</h2>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              isInvalid={formik.touched.firstName && formik.errors.firstName}
              isValid={formik.touched.firstName && !formik.errors.firstName}
              autoComplete="off"
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              isValid={formik.touched.lastName && !formik.errors.lastName}
              isInvalid={formik.touched.lastName && formik.errors.lastName}
              autoComplete="off"
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isValid={formik.touched.email && !formik.errors.email}
              isInvalid={formik.touched.email && formik.errors.email}
              autoComplete="off"
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isValid={formik.touched.password && !formik.errors.password}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="passwordConf">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordConf"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConf}
              isValid={formik.touched.passwordConf && !formik.errors.passwordConf}
              isInvalid={
                formik.touched.passwordConf && formik.errors.passwordConf
              }
            />
            <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {formik.errors.passwordConf}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={actType === "register" && loading}
          >
            {actType === "register" && loading ? "Loading" : "Submit"}
          </Button>
          {actType === "register" && error ? (
            <div className="invalid-feedback d-block mt-4">{error}</div>
          ) : null}
        </Form>
      </Col>
    </Row>
  );
};

export default Register;