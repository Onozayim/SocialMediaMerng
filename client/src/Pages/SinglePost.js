import { gql } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { useParams } from "react-router";

import LikeButton from "../Components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../Components/DeleteButton";
import Comments from "./Comments";
import CommentForm from "../Components/CommentForm";

const SinglePost = (props) => {
  const context = useContext(AuthContext);

  const params = useParams();

  const { data: postData } = useQuery(FETCH_POST_QUERY, {
    variables: { postId: params.postId },
    skip: !params.postId,
  });

  let postMarkup;
  if (!postData) {
    postMarkup = <p>Loading post</p>;
  } else {
    const { id, body, userName, createdAt, commentCount, likeCount, likes } =
      postData.getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="rigth"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
                <hr />
                <Card.Content extra>
                  <LikeButton
                    user={context.user}
                    post={{ id, likeCount, likes }}
                  />
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log("Comment on post")}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                  <CommentForm
                    postId={postData.getPost.id}
                    mainPostId={postData.getPost.id}
                    user={postData.getPost.userName}
                    responding={postData.getPost.body}
                  />
                  {context && context.user.userName === userName && (
                    <DeleteButton postId={id} />
                  )}
                </Card.Content>
              </Card.Content>
            </Card>

            <Comments answeringId={params.postId} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
};

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      userName
      body
      createdAt
      id
      commentCount
      likeCount
      likes {
        userName
      }
      mainPost {
        id
        body
        userName
      }
    }
  }
`;

export default SinglePost;
