import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";

const Login = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      try {
        setErrors(err.graphQLErrors[0].extensions.errors);
      } catch (error) {
        return;
      }
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <React.Fragment>
      <div className="form-container">
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1>LOGIN</h1>
          <Form.Input
            type="text"
            label="Username"
            placeholder="Username..."
            name="userName"
            value={values.userName}
            error={errors.userName ? true : false}
            onChange={onChange}
          />

          <Form.Input
            type="password"
            label="Password"
            placeholder="Password..."
            name="password"
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />

          <Button type="submit" primary>
            LOGIN
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const LOGIN_USER = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      email
      userName
      token
      createdAt
    }
  }
`;

export default Login;
