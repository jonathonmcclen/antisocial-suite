import { Badge, Panel, Stack } from "rsuite";
import Packages from "../views/packages";
import { useEffect, useState } from "react";
import { supabaseClient as supabase } from "../config/supabase-client";
import ReleaseNotes from "../components/ReleaseNotes";

function WelcomePage() {
  const [serviceStatus, setServiceStatus] = useState({});
  const [time, setTime] = useState("");
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(false);

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

    async function getReleases() {
      setLoading(true);

      let { data, error } = await supabase
        .from("release_notes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn(error);
      } else if (data) {
        setReleases(data);
      }
      setLoading(false);
    }

    getReleases();
  }, []);

  return (
    <>
      <div style={{ margin: "50px" }}>
        <h1>Antisocial Suite</h1>
        <p>by Advanced Web Technology</p>

        <br />
        {/* <Packages /> */}
        <Panel
          shaded
          className=" bg-cover bg-[url('https://advancedwebtechnology.com/Portals/0/IMG_0126.JPG?ver=ozSsZP1htjLd8D26s08rDw%3d%3d&timestamp=1699046856143')]"
        >
          <h1>{time}</h1>
        </Panel>
        <br />
        <Panel bordered>
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
              <p>{serviceStatus["follow_desc"]}</p>
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
              <p>{serviceStatus["like_desc"]}</p>
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
              <p>{serviceStatus["comment_desc"]}</p>
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
              <p>{serviceStatus["message_desc"]}</p>
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
              <p>{serviceStatus["unfollow_desc"]}</p>
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
              <p>{serviceStatus["posting_desc"]}</p>
            </Panel>
          </div>
        </Panel>
        <br />
        {releases.map((note) => (
          <>
            <ReleaseNotes header={note["header"]} content={note["content"]} />
            <br />
          </>
        ))}
        {/* <Panel bordered>
          <h3>Trigger Status</h3>
          <hr />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[10px] mx-auto ">
            <Panel bordered shaded>
              <h4>
                Messages <span>Status</span>
              </h4>
            </Panel>
            <Panel bordered shaded>
              <h4>Follows</h4>
            </Panel>
            <Panel bordered shaded>
              <h4>Likes</h4>
            </Panel>
            <Panel bordered shaded>
              <h4>Comments</h4>
            </Panel>
            <Panel bordered shaded>
              <h4>Messages</h4>
            </Panel>
            <Panel bordered shaded>
              <h4>Posts</h4>
            </Panel>
          </div>
        </Panel> */}
      </div>
    </>
  );
}

export default WelcomePage;
