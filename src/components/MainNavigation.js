import { NavLink } from "react-router-dom";
import { IconButton, Nav, Navbar, Tag } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import { useAuth } from "../hooks/Auth";
import OffRoundIcon from "@rsuite/icons/OffRound";
import AdminIcon from "@rsuite/icons/Admin";
import { AiFillQuestionCircle } from "react-icons/ai";
import NewsScroller from "./NewsScroller";
import { Tsk } from "./Icons/Tsk";
import { Act } from "./Icons/Act";
import { Spree } from "./Icons/Spree";
import { Un } from "./Icons/Un";
import { Psc } from "./Icons/Psc";
import { AntisocialIcon } from "./Icons/AntisocialIcon";

function MainNavigation() {
  const { user } = useAuth();
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <NewsScroller />
      <Navbar>
        <Nav>
          <Nav.Item to={"/"} as={NavLink}>
            <AntisocialIcon width="50px" />
          </Nav.Item>
          <Nav.Item to={"/accounts"} as={NavLink}>
            Accounts
          </Nav.Item>
          <Nav.Item to={"/lists"} as={NavLink}>
            Lists
          </Nav.Item>
          {user ? (
            <Nav.Item as={NavLink} to="#">
              <IconButton
                size="sm"
                onClick={handleLogout}
                appearance="primary"
                icon={<OffRoundIcon />}
              >
                Logout
              </IconButton>
            </Nav.Item>
          ) : (
            <Nav.Item as={NavLink} to="/login">
              <Tag color="red">Not Logged In</Tag>
            </Nav.Item>
          )}
        </Nav>
        <Nav pullRight>
          {/* <Nav.Item style={{ padding: "0px" }} to={"/control"} as={NavLink}>
            <Act width={"50px"} />
          </Nav.Item> */}
          <Nav.Item style={{ padding: "0px" }} to={"/tasks"} as={NavLink}>
            <Tsk width="50px" />
          </Nav.Item>
          {/* <Nav.Item style={{ padding: "0px" }} to={"/tasks"} as={NavLink}>
            <Spree width="50px" />
          </Nav.Item> */}
          {/* <Nav.Item style={{ padding: "0px" }} to={"/unfollow"} as={NavLink}>
            <Un width={"50px"} />
          </Nav.Item> */}
          {/* <Nav.Item to={"/tasks"} as={NavLink}>
            <Psc width={"50px"} />
          </Nav.Item> */}
          {user ? (
            <Nav.Item to={"/org"} as={NavLink} icon={<AdminIcon />}>
              <p>{user?.email.split("@")[0]}</p>
            </Nav.Item>
          ) : (
            <>
              <Nav.Item to={"/login"} as={NavLink}>
                login
              </Nav.Item>
              <Nav.Item to={"/signup"} as={NavLink}>
                Signup
              </Nav.Item>
            </>
          )}
          <Nav.Item to={"/tasks"} as={NavLink}>
            <AiFillQuestionCircle />
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
}

export default MainNavigation;
