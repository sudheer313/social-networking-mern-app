import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("email is required"),
  password: Yup.string().required("password is required").min(10),
});

const Login = () => {
  return (
    <div>
      <div className="text-center pt-4 flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl pb-12">Social Networking App</h1>
        <h3 className="text-2xl pb-2">Login</h3>
        <p className="text-gray-500 pb-4">
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline text-blue-700">
            Signup
          </Link>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-4">
            <Field
              type="email"
              name="email"
              placeholder="Email *"
              className="border p-3 rounded-lg w-80"
            />
            <ErrorMessage name="email" />
            <Field
              type="password"
              name="password"
              placeholder="Password *"
              className="border p-3 rounded-lg w-80"
            />
            <ErrorMessage name="password">
              {(errorMsg) => <div>{errorMsg}</div>}
            </ErrorMessage>
            <button
              type="submit"
              className="border p-3 rounded-lg bg-blue-600 text-white w-80"
            >
              LOGIN
            </button>
          </Form>
        </Formik>
        <p className="pt-4">Copyright © 2022</p>
      </div>
    </div>
  );
};

export default Login;
