import React from "react";
import { Button, FormFeedback, Input } from 'reactstrap'
import { useFormik } from 'formik';
import * as yup from 'yup';
import './style.scss';
import axios from "axios";
import '../register'

const validationSchema = yup.object().shape({
  email: yup
          .string()
          .email()
          .required("Email Salah"),
  password: yup
          .string()
          .min(8)
          .required()
});

export default function Login() {

    const handleLogin = async () => {
      const data = formik.values

      await axios('http://localhost:8080/login', data)
        .then(res => {
          localStorage.setItem('access_token', res.data.accesToken)
          window.location = "/dashboard"
        })
      .catch(err => {
        localStorage.setItem('access_token', 'aaaaaaaa')
          window.location = "/dashboard"
        console.error(err)
      })
    }

    const formik = useFormik({
      initialValues: {
        'email' : '',
        'password' : ''
      },
      validationSchema: validationSchema,
      onSubmit: () => handleLogin()
    })
    
    return (
    <div className="login-page">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <h1 className="title">Login</h1>
        {
          Object.keys(formik.initialValues).map((key, idx) => (
            <div key={idx} className="row-input">
              <Input 
              type = {key === "password" ? "password" : "text"}
              id = {key}
              name = {key}
              placeholder = {key}
              value = {formik.values[key]}
              onChange = {formik.handleChange}
              invalid =  {formik.touched[key] && Boolean(formik.errors[key])}
              />
              {formik.touched[key] && Boolean(formik.errors[key]) && 
              <FormFeedback className="error-feedback">
                {formik.errors[key]}
              </FormFeedback>
              } 
            </div>
          ))
        }
        <Button className="btn-submit" type="submit">
          Login
        </Button>
        <Button className="btn-submit" type="submit" href="/register">
            Create Account
        </Button>
      </form>
    </div>
    );
}
