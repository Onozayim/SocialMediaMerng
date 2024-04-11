import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../Components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../Components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
	const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

	const context = useContext(AuthContext);

	if (context) {
		console.log(context);
	} else {
		console.log("no hay contenxt");
	}

	if (error) {
		console.log(error);
	}

	return (
		<React.Fragment>
			<Grid columns={3}>
				<Grid.Row className="page-title">
					<h1>Recent Posts</h1>
				</Grid.Row>

				{context.user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}

				{loading ? (
					<h1>Loading posts </h1>
				) : (
					<Transition.Group>
						{data.getPosts &&
							data.getPosts.map((post) => {
								if (post.original === true) {
									return (
										<Grid.Column key={post.id}>
											<PostCard post={post} />
										</Grid.Column>
									);
								} else {
									return null;
								}
							})}
					</Transition.Group>
				)}
			</Grid>
		</React.Fragment>
	);
};

export default Home;
