import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Panel,
  SelectPicker,
  Stack,
  Toggle,
} from "rsuite";
import { supabaseClient as supabase } from "../../config/supabase-client";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import BackButton from "../../components/backButton";

function Task() {
  const data = ["User", "Post"].map((item) => ({ label: item, value: item }));
  const { user } = useAuth();
  const { id } = useParams();

  // GENERAL ----------
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [created, setCreated] = useState("");
  const [scheduled, setScheduled] = useState("");

  // TARGET ------------
  const [genlist, setGenlist] = useState(true);
  const handleGen = () => setGenlist(!genlist);
  const [targetList, setTargetList] = useState("");
  const [target, setTarget] = useState("");
  const [targetType, setTargetType] = useState("");
  // URL or TargetUser
  const [url, setUrl] = useState("");
  const [targetUser, setTargetUser] = useState("");

  // CONFIGURATION ----------
  const [allowFollow, setAllowFollow] = useState(true);
  const handleFollow = () => setAllowFollow(!allowFollow);
  const [followLimit, setFollowLimit] = useState(0);
  const [followsSent, setFollowsSent] = useState(0);

  const [allowLike, setAllowLike] = useState(true);
  const handleLike = () => setAllowLike(!allowLike);
  const [likeLimit, setLikeLimit] = useState(0);
  const [likesSent, setLikesSent] = useState(0);

  const [allowComment, setAllowComment] = useState(true);
  const handleComment = () => setAllowComment(!allowComment);
  const [commentLimit, setCommentLimit] = useState(0);
  const [comments, setComments] = useState("");
  const [commentsSent, setCommentsSent] = useState(0);

  const [allowMessage, setAllowMessage] = useState(true);
  const handleMessage = () => setAllowMessage(!allowMessage);
  const [messageLimit, setMessageLimit] = useState(0);
  const [messagesSent, setMessagesSent] = useState(0);
  const [messages, setMessages] = useState("");

  const [log, setLog] = useState([]);
  const [list, setList] = useState([]);

  const [drip, setDrip] = useState(30);

  const getTask = async function () {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.warn(error);
    } else {
      setAccount(data.account);
      setName(data.name);
      setStatus(data.status);
      setDescription(data.description);
      setAllowFollow(data.allow_follow);
      setFollowLimit(data.follow_limit);
      setAllowLike(data.allow_like);
      setLikeLimit(data.like_limit);
      setAllowComment(data.allow_comment);
      setCommentLimit(data.comment_limit);
      setComments(data.comments);
      setAllowMessage(data.allow_message);
      setMessageLimit(data.message_limit);
      setMessages(data.messages);
      setCreated(data.created_at);
      setScheduled(data.scheduled);
      setDrip(data.drip);
      setFollowsSent(data.follows_sent);
      setLikesSent(data.likes_sent);
      setCommentsSent(data.comments_sent);
      setMessagesSent(data.messages_sent);
      setLog(data.log);
      setList(data.list.split(";"));
      console.log(typeof created);
    }
  };

  useEffect(() => {
    getTask();
    if (status === "In_Progress") {
      const tasks = supabase
        .channel("custom-filter-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
            filter: `id=eq.${id}`,
          },
          (payload) => {
            getTask();
            console.log("Change received!", payload);
          }
        )
        .subscribe();
    }
  }, [status]);

  return (
    <>
      <div style={{ margin: "50px" }}>
        {" "}
        <h1>
          <BackButton path={"/tasks"} /> Task {"(" + name + ")"}{" "}
        </h1>
        <Panel bordered>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-[10px] mx-auto ">
            <Panel bordered shaded>
              <h6>Status</h6>
              <p>{status}</p>
            </Panel>
            <Panel bordered shaded>
              <h6>Description</h6>
              <p>{description}</p>
            </Panel>
            <Panel bordered shaded>
              <h6>Account</h6>
              <p>description of status</p>
            </Panel>
            <Panel bordered shaded>
              <h6>Created</h6>
              <p>{created}</p>
            </Panel>
            <Panel bordered shaded>
              <h6>Scheduled</h6>
              <p>{scheduled ? scheduled : created}</p>
            </Panel>
            <Panel bordered shaded>
              <h6>Completed</h6>
              <p>description of status</p>
            </Panel>
          </div>
          <br />
          <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-[10px] mx-auto ">
            <Panel bordered shaded>
              <h6>Follows</h6>
              <h2>
                {followsSent} / {followLimit}
              </h2>
            </Panel>
            <Panel bordered shaded>
              <h6>Likes</h6>
              <h2>
                {likesSent} / {likeLimit}
              </h2>
            </Panel>
            <Panel bordered shaded>
              <h6>Comments</h6>
              <h2>
                {commentsSent} / {commentLimit}
              </h2>
            </Panel>
            <Panel bordered shaded>
              <h6>Messages</h6>
              <h2>
                {messagesSent} / {messageLimit}
              </h2>
            </Panel>
          </div>
        </Panel>
        <br />
        <Panel bordered>
          <h3>Log {"(" + log?.length + ")"}</h3>
          <hr />
          <div className="h-[500px] shadow-inner bg-[#fafafa] text-[#000] overflow-auto p-[25px]">
            <p>--------------------------------------------------------</p>
            {log?.map((item) => (
              <p>{item}</p>
            ))}
            <p>--------------------------------------------------------</p>
          </div>
        </Panel>
        <br />
        <Panel bordered>
          <h3>List {"(" + list?.length + ")"}</h3>
          <hr />
          <div className="relative h-[250px] shadow-inner bg-[#fafafa] text-[#000] overflow-auto p-[25px]">
            <Button
              appearance="primary"
              className="absolute"
              style={{ position: "absolute", top: "20px", right: "20px" }}
              onClick={() => {
                navigator.clipboard.writeText(list);
              }}
            >
              Copy List
            </Button>
            <p>--------------------------------------------------------</p>
            {list?.map((item) => (
              <p>
                <a href={"http://instagram.com/" + item} target="_blank">
                  <span>{item}</span>
                </a>
              </p>
            ))}
            <p>--------------------------------------------------------</p>
          </div>
        </Panel>
        <br />
        <Button appearance="subtle">Discard</Button>
        <Stack style={{ float: "right" }} spacing={6}>
          <Button appearance="primary">Rerun</Button>
          <Button appearance="primary">Cancel</Button>
          <Button appearance="primary">Abort</Button>
        </Stack>
      </div>
    </>
  );
}

export default Task;
