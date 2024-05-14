import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("Enter your password").required("Password is required"),
});

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

export const registerSchema = Yup.object().shape({
  firstName: Yup
    .string()
    .required("First name is required")
    .max(30, "First name should be maximum 30 characters"),
  lastName: Yup
    .string()
    .required("Last name is required")
    .max(30, "Last name should be maximum 30 characters"),
  email: Yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(
      /(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
      getCharacterValidationError("special symbol")
    )
    .required("Password is required"),
  passwordConf: Yup
    .string()
    .required("Please retype your password")
    .oneOf([Yup.ref("password")], "Your passwords do not match"),
});