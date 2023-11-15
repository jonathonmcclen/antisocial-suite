import { useEffect, useState } from "react";
import { Badge, List, Nav, Panel } from "rsuite";
import { supabaseClient as supabase } from "../../config/supabase-client";
import HomeIcon from "@rsuite/icons/legacy/Home";

const Navbar = ({ active, onSelect, ...props }) => {
  return (
    <Nav
      {...props}
      activeKey={active}
      onSelect={onSelect}
      style={{ marginBottom: 50 }}
    >
      <Nav.Item eventKey="status">Status</Nav.Item>
      <Nav.Item eventKey="news">Integrations</Nav.Item>
      <Nav.Item eventKey="solutions">FAQ</Nav.Item>
      <Nav.Item eventKey="products">Contact</Nav.Item>
      <Nav.Item eventKey="about">About</Nav.Item>
    </Nav>
  );
};

function Help() {
  const [serviceStatus, setServiceStatus] = useState({});
  const [time, setTime] = useState("");
  const [active, setActive] = useState("status");

  function getTime() {
    const now = new Date();
    let day = now.getDay();

    console.log(day);

    switch (day) {
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tues";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thurs";
        break;
      case 5:
        day = "Fri";
        break;
      case 6:
        day = "Sat";
        break;
      case 0:
        day = "Sun";
        break;
    }

    const time = now.getHours();
    const mins = now.getMinutes();
    setTime(`${day} ${time}:${mins}`);
  }

  setInterval(getTime, 60000);

  useEffect(() => {
    const sellItem = async () => {
      let { data: service_status, error } = await supabase
        .from("service_status")
        .select("*")
        .single();

      if (!error) {
        setServiceStatus(service_status);
        console.log(serviceStatus);
      }
    };
    sellItem();
    getTime();
  }, []);

  return (
    <>
      <br />
      <List bordered>
        <Panel bordered>
          <Navbar appearance="tabs" active={active} onSelect={setActive} />
          <h3>Service Status </h3>
          <hr />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[10px] mx-auto ">
            <Panel bordered shaded>
              <Badge
                color={
                  serviceStatus["insta_follow"] === "Online" ? "green" : "red"
                }
              >
                <h4 className="leading-none">
                  Following <span>Status</span>
                </h4>
              </Badge>
              <br />
              {serviceStatus["insta_follow"]}
              <p>description of status</p>
            </Panel>
            <Panel bordered shaded>
              <Badge
                color={
                  serviceStatus["insta_like"] === "Online" ? "green" : "red"
                }
              >
                <h4 className="leading-none">
                  Liking <span>Status</span>
                </h4>
              </Badge>
              <br />
              {serviceStatus["insta_like"]}
              <p>description of status</p>
            </Panel>
            <Panel bordered shaded>
              <Badge
                color={
                  serviceStatus["insta_comment"] === "Online" ? "green" : "red"
                }
              >
                <h4 className="leading-none">
                  Commenting <span>Status</span>
                </h4>
              </Badge>
              <br />
              {serviceStatus["insta_comment"]}
              <p>description of status</p>
            </Panel>
            <Panel bordered shaded>
              <Badge
                color={
                  serviceStatus["insta_message"] === "Online" ? "green" : "red"
                }
              >
                <h4 className="leading-none">
                  Messaging <span>Status</span>
                </h4>
              </Badge>
              <br />
              {serviceStatus["insta_message"]}
              <p>description of status</p>
            </Panel>
            <Panel bordered shaded>
              <Badge
                color={
                  serviceStatus["insta_unfollow"] === "Online" ? "green" : "red"
                }
              >
                <h4 className="leading-none">
                  Un-Following <span>Status</span>
                </h4>
              </Badge>
              <br />
              {serviceStatus["insta_unfollow"]}
              <p>description of status</p>
            </Panel>
            <Panel bordered shaded>
              <Badge
                color={
                  serviceStatus["insta_posting"] === "Online" ? "green" : "red"
                }
              >
                <h4 className="leading-none">
                  Posting <span>Status</span>
                </h4>
              </Badge>
              <br />
              {serviceStatus["insta_posting"]}
              <p>description of status</p>
            </Panel>
          </div>
        </Panel>
      </List>
    </>
  );
}

export default Help;
