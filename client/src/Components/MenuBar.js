import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
	const context = useContext(AuthContext);
	const pathname = window.location.pathname;

	const path = pathname === "/" ? "home" : pathname.substr(1);
	const [activeItem, setActiveItem] = useState(path);

	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<React.Fragment>
			{context.user ? (
				<Menu pointing secondary color="violet">
					<Link to="/">
						<Menu.Item
							name={context.user.userName}
							active
							onClick={handleItemClick}
						/>
					</Link>

					<Menu.Menu position="right">
						<Menu.Item color="violet" name="Logout" onClick={context.logout} />
					</Menu.Menu>
				</Menu>
			) : (
				<Menu pointing secondary color="violet">
					<Menu.Menu position="right">
						<Link to="/login">
							<Menu.Item
								color="violet"
								name="login"
								active={activeItem === "login" || activeItem === "home"}
								onClick={handleItemClick}
							/>
						</Link>
						<Link to="/register">
							<Menu.Item
								color="violet"
								name="register"
								active={activeItem === "register"}
								onClick={handleItemClick}
							/>
						</Link>
					</Menu.Menu>
				</Menu>
			)}
		</React.Fragment>
	);
}

export default MenuBar;
