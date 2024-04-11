import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const PostCard = ({
  post: {
    body,
    createdAt,
    id,
    userName,
    likeCount,
    commentCount,
    likes,
    original,
  },
}) => {
  const context = useContext(AuthContext);

  const commentPost = () => {
    console.log("comment");
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{userName}</Card.Header>
          <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton post={{ id, likeCount, likes }} user={context.user} />
          <Link to={`/posts/${id}`}>
            <Button as="div" labelPosition="right" onClick={commentPost}>
              <Button color="violet" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="violet" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </Link>
          {context.user.userName === userName && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </React.Fragment>
  );
};

export default PostCard;
