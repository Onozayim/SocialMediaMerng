import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Grid, Image, Card, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import LikeButton from "../Components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../Components/DeleteButton";
import CommentForm from "../Components/CommentForm";
import { FETCH_COMMENTS_QUERY } from "../util/graphql";

const Comments = ({ answeringId }) => {
	const { data: dataComments } = useQuery(FETCH_COMMENTS_QUERY, {
		variables: { answeringId: answeringId },
	});
	const context = useContext(AuthContext);

	return (
		<React.Fragment>
			{dataComments?.getComments?.map((comment) => {
				return (
					<React.Fragment>
						<Card fluid key={comment.id}>
							<Card.Content>
								<Card.Header>{comment.userName}</Card.Header>
								<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
								<Card.Description>
									{comment.answeringTo.userName}: {comment.answeringTo.body}
								</Card.Description>
								<Card.Description>
									<b>{comment.body}</b>
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<LikeButton
									user={context.user}
									post={{
										id: comment.id,
										likes: comment.likes,
										likeCount: comment.likeCount,
									}}
								/>
								<CommentForm
									postId={comment.id}
									mainPostId={comment.mainPost.id}
									responding={comment.body}
									user={comment.userName}
								/>
								{context && context.user.userName === comment.userName && (
									<DeleteButton
										postId={comment.id}
										comment={true}
										mainPost={comment.mainPost.id}
									/>
								)}
							</Card.Content>
						</Card>
					</React.Fragment>
				);
			})}
		</React.Fragment>
	);
};

export default Comments;
