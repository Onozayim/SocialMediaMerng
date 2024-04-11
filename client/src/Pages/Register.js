import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      console.log(userData);
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
    addUser();
  };

  return (
    <React.Fragment>
      <div className="form-container">
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <h1 className="title">Register</h1>
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
            type="email"
            label="Email"
            placeholder="Email..."
            name="email"
            error={errors.email ? true : false}
            value={values.email}
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
          <Form.Input
            type="password"
            label="Confirm password"
            placeholder="Comfirm password..."
            name="confirmPassword"
            error={errors.confrimPassword ? true : false}
            value={values.confrimPassword}
            onChange={onChange}
          />
          <Button type="submit" primary className="btn">
            Register
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

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      token
      userName
      createdAt
    }
  }
`;

export default Register;
