import { NavLink } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Drawer,
  Dropdown,
  IconButton,
  Nav,
  Navbar,
  Panel,
  Placeholder,
  Tag,
} from "rsuite";
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
import { useState } from "react";
import { Tri } from "./Icons/Tri";

import { BsFillGrid3X3GapFill } from "react-icons/bs";

function MainNavigation() {
  const { user } = useAuth();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);

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
          <Nav.Item to={"/tasks"} as={NavLink}>
            Tasks
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          {user ? (
            <ButtonToolbar>
              <Dropdown
                className="inline-block order-first"
                noCaret
                icon={<AdminIcon />}
                title={user?.email.split("@")[0]}
              >
                <Dropdown.Item
                  className="w-[190px]"
                  to={"/org"}
                  as={NavLink}
                  icon={<AdminIcon />}
                >
                  Settings
                </Dropdown.Item>
                <hr className="my-[7px]" />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                <Dropdown.Item to={"/info"} as={NavLink}>
                  Help
                </Dropdown.Item>
              </Dropdown>
              <Nav.Item
                style={{ padding: "0px" }}
                onClick={() => setOpen(true)}
              >
                <BsFillGrid3X3GapFill className="w-[60px] text-lg" />
              </Nav.Item>
            </ButtonToolbar>
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
        </Nav>
      </Navbar>
      <>
        <Drawer size="xs" open={open} onClose={() => setOpen(false)}>
          <Drawer.Body>
            <>
              <br />

              <br />
              <div className="flex flex-row">
                <div className="basis-1/4">
                  <Act width="90px" />
                </div>
                <div className="basis-3/4">
                  <p>
                    Complete simple actions on a given account instantly or at a
                    scheduled time
                  </p>
                  <p>
                    <Nav>
                      {" "}
                      <Nav.Item
                        onClick={() => setOpen(false)}
                        style={{ padding: "0px" }}
                        to={"/control"}
                        as={NavLink}
                      >
                        New
                      </Nav.Item>{" "}
                      |{" "}
                      <Nav.Item
                        onClick={() => setOpen(false)}
                        style={{ padding: "0px" }}
                        to={"/tasks"}
                        as={NavLink}
                      >
                        Open
                      </Nav.Item>
                    </Nav>
                  </p>
                </div>
              </div>
              <br />
              <div className="flex flex-row">
                <div className="basis-1/4">
                  <Tsk width="90px" />
                </div>
                <div className="basis-3/4">
                  <p>
                    Complete mass actions on a list of users from a given
                    account instantly or at a scheduled time
                  </p>
                  <p>
                    <Nav>
                      <Nav.Item
                        onClick={() => setOpen(false)}
                        style={{ padding: "0px" }}
                        to={"/tasks/new"}
                        as={NavLink}
                      >
                        New
                      </Nav.Item>{" "}
                      |{" "}
                      <Nav.Item
                        onClick={() => setOpen(false)}
                        style={{ padding: "0px" }}
                        to={"/tasks"}
                        as={NavLink}
                      >
                        Open
                      </Nav.Item>
                    </Nav>
                  </p>
                </div>
              </div>
              <br />
              <div className="flex flex-row">
                <div className="basis-1/4">
                  <Spree width="90px" />
                </div>
                <div className="basis-3/4">
                  <p>
                    Complete mass actions aginst a given account instantly or at
                    a scheduled time
                  </p>
                  <p>
                    <Nav>
                      <Nav.Item
                        onClick={() => setOpen(false)}
                        style={{ padding: "0px" }}
                        to={"/spree"}
                        as={NavLink}
                      >
                        New
                      </Nav.Item>{" "}
                      |{" "}
                      <Nav.Item
                        onClick={() => setOpen(false)}
                        style={{ padding: "0px" }}
                        to={"/tasks"}
                        as={NavLink}
                      >
                        Open
                      </Nav.Item>
                    </Nav>
                  </p>
                </div>
              </div>
              <br />
              <div className="flex flex-row">
                <div className="basis-1/4">
                  <Un width="90px" />
                </div>
                <div className="basis-3/4">
                  <p>Un-follow based on configuration and list</p>
                  <p>
                    <Nav>
                      <Nav.Item
                        onClick={() => setOpen(false)}
                        style={{ padding: "0px" }}
                        to={"/Unfollow"}
                        as={NavLink}
                      >
                        New
                      </Nav.Item>{" "}
                      |{" "}
                      <Nav.Item
                        onClick={() => setOpen(false)}
                        style={{ padding: "0px" }}
                        to={"/tasks"}
                        as={NavLink}
                      >
                        Open
                      </Nav.Item>
                    </Nav>
                  </p>
                </div>
              </div>
              <br />
              {/* <Panel bordered>
                <Nav.Item
                  onClick={() => setOpen(false)}
                  style={{ padding: "0px" }}
                  to={"/comingSoon"}
                  as={NavLink}
                >
                  <Tri width="50px" />
                  <p>
                    Create scenarios that will trigger tasks from other apps
                  </p>
                </Nav.Item>
              </Panel>
              <br />
              <Panel bordered>
                <Nav.Item
                  onClick={() => setOpen(false)}
                  style={{ padding: "0px" }}
                  to={"/comingSoon"}
                  as={NavLink}
                >
                  <Psc width="50px" />
                  <p>Schedule Posts for a given account</p>
                </Nav.Item>
              </Panel> */}
              <br />
            </>
          </Drawer.Body>
        </Drawer>
      </>
    </>
  );
}

export default MainNavigation;
