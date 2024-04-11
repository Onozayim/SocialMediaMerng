import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, Button, Label, Modal, Header, Icon } from "semantic-ui-react";

import { FETCH_COMMENTS_QUERY } from "../util/graphql";
import React from "react";
const CommentForm = ({ postId, mainPostId, user, responding }) => {
	const [body, setBody] = useState("");
	const [createComment, { error }] = useMutation(CREATE_COMMENT_MUTATION, {
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_COMMENTS_QUERY,

				variables: {
					answeringId: mainPostId,
				},
			});
			console.log(data);

			proxy.writeQuery({
				query: FETCH_COMMENTS_QUERY,
				data: {
					getComments: [result.data.createComment, ...data.getComments],
				},
				variables: {
					answeringId: mainPostId,
				},
			});
		},
		variables: {
			postId: postId,
			mainPostId: mainPostId,
			body: body,
		},
	});

	const [show, setShow] = useState(false);

	console.log(postId);

	const onChange = (event) => {
		setBody(event.target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();

		createComment().catch((e) => {
			return;
		});
		setShow(false);
	};

	return (
		<React.Fragment>
			<Modal
				trigger={
					<Button basic color="blue" as="div">
						<Icon name="comment alternate" style={{ margin: 0 }} />
					</Button>
				}
				open={show}
				onClose={() => setShow(false)}
				onOpen={() => setShow(true)}
			>
				<Modal.Header>
					<Header as="h1">Responding to: {user}</Header>
					<Header as="h2">
						<b> - {`"${responding}"`}</b>
					</Header>
				</Modal.Header>
				<Modal.Content>
					<Form onSubmit={onSubmit}>
						<Form.Field>
							<Form.Input
								placeholder="Create a comment..."
								name="body"
								value={body}
								onChange={onChange}
								error={error ? true : false}
							/>

							<Button type="submit" color="violet">
								Submit
							</Button>
						</Form.Field>
						{error && (
							<div className="ui error message" style={{ marginBottom: 10 }}>
								<ul className="list">
									<li>{error.graphQLErrors[0].message}</li>
								</ul>
							</div>
						)}
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button color="red" onClick={() => setShow(false)}>
						<Icon name="remove" /> Cancel
					</Button>
				</Modal.Actions>
			</Modal>
		</React.Fragment>
	);
};

const CREATE_COMMENT_MUTATION = gql`
	mutation createComment($postId: ID!, $body: String!, $mainPostId: ID!) {
		createComment(postId: $postId, body: $body, mainPostID: $mainPostId) {
			id
			body
			mainPost {
				id
				body
			}
			createdAt
			userName
			likes {
				createdAt
				userName
				id
			}
			likeCount
			commentCount
		}
	}
`;

export default CommentForm;
