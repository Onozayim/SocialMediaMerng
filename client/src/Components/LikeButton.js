import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Icon, Label } from "semantic-ui-react";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  useEffect(() => {
    if (user && likes.find((like) => like.userName === user.userName)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const LikeButton = liked ? (
    <Button color="violet">
      <Icon name="heart" />
    </Button>
  ) : (
    <Button color="violet" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {LikeButton}
      <Label basic color="violet" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      likes {
        userName
      }
    }
  }
`;

export default LikeButton;
