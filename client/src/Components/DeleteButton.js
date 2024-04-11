import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Button, Icon, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { FETCH_COMMENTS_QUERY } from "../util/graphql";

const DeleteButton = ({ postId, comment, mainPost }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      if (comment === true) {
        setConfirmOpen(false);
        const data = proxy.readQuery({
          query: FETCH_COMMENTS_QUERY,
          variables: {
            answeringId: mainPost,
          },
        });
        proxy.writeQuery({
          query: FETCH_COMMENTS_QUERY,
          variables: {
            answeringId: mainPost,
          },
          data: {
            getComments: data.getComments.filter((p) => p.id !== postId),
          },
        });
      } else {
        setConfirmOpen(false);
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        });
      }
    },
    variables: {
      postId,
    },
  });

  return (
    <React.Fragment>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </React.Fragment>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletPost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
