import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "../util/graphql";

const PostForm = () => {
  const [values, setValues] = useState({ body: "" });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      console.log(result);

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    variables: values,
  });

  const onSubmit = (event) => {
    console.log(values.body);
    event.preventDefault();
    createPost().catch((e) => {
      return;
    });
  };

  return (
    <React.Fragment>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            placeholder="hi World"
            name="body"
            value={values.body}
            onChange={onChange}
            error={error ? true : false}
          />

          <Button type="submit" color="violet">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 10 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      userName
      original
      likeCount
      likes {
        createdAt
        userName
        id
      }
    }
  }
`;

export default PostForm;
