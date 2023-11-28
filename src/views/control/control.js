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
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";

import { getAccounts } from "../../api/accounts";
import BackButton from "../../components/backButton";

function Control() {
  const { user } = useAuth();
  const { id } = useParams();

  // GENERAL ----------
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

  // CONFIGURATION ----------
  const [ignoreFollowers, setIgnoreFollowers] = useState(true);
  const handleIgnoreFollowers = () => setIgnoreFollowers(!ignoreFollowers);

  const [ignoreWhitelist, setIgnoreWhitelist] = useState(true);
  const handleIgnoreWhiteList = () => setIgnoreWhitelist(!ignoreWhitelist);

  const [drip, setDrip] = useState(30);
  const [dateTime, setDateTime] = useState();

  const [genlist, setGenlist] = useState(true);
  const handleGen = () => setGenlist(!genlist);

  const [list, setList] = useState("");
  const [listLength, setListLength] = useState(100);

  const [allowLike, setAllowLike] = useState(true);
  const handleLike = () => setAllowLike(!allowLike);
  const [likeLimit, setLikeLimit] = useState(0);

  const [allowComment, setAllowComment] = useState(true);
  const handleComment = () => setAllowComment(!allowComment);
  const [commentLimit, setCommentLimit] = useState(0);
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (id) {
      const getTask = async function () {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.warn(error);
        } else {
          setAccount(data.acct_id);
          setName(data.name);
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
          setDateTime(data.scheduled ? new Date(data.scheduled) : null);
          setDrip(data.drip);
          setGenlist(data.gen_list);
          setTargetType(data.target_type);
          setList(data.list);
          setTarget(data.target);
        }
      };
      getTask();
    }

    getAccounts().then((data) => {
      setAccounts(
        data.map((accnt) => ({
          label: accnt.username,
          value: accnt.id,
        }))
      );
    });
    console.log(accounts);
  }, []);

  const createTask = async function () {
    let errors = runValidations();

    if (!errors) {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          tsk_type: "Un",
          name: name,
          acct_id: account,
          description: description,
          allow_follow: allowFollow,
          follow_limit: followLimit,
          allow_like: allowLike,
          like_limit: likeLimit,
          allow_comment: allowComment,
          comment_limit: commentLimit,
          allow_message: allowMessage,
          message_limit: messageLimit,
          drip: drip,
          gen_list: genlist,
          target: target,
          list: list,
          status: "Scheduled",
        })
        .select();

      if (error) {
        console.warn(error);
      } else {
        window.location.href = "/tasks";
      }
    } else {
      alert(errors);
    }
  };

  const runValidations = function () {
    let errors = [];

    if (!account) {
      errors.push(
        "you must select an account to run this task or just save as a draft"
      );
    }

    if (!allowFollow && !allowComment && !allowLike && !allowMessage) {
      errors.push("At lease one interaction type needs to be enabled");
    }
    return errors.length <= 0 ? null : errors;
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {" "}
        <h1>
          <BackButton path={"/tasks"} /> New Control
        </h1>
        <Panel bordered>
          <div>
            <h3>General</h3>
            <hr />
            <label>Account</label>
            <SelectPicker
              block
              onChange={(e) => setAccount(e)}
              value={account}
              searchable={false}
              data={accounts}
            />
            <br />
          </div>
        </Panel>
        <br />
        <Panel bordered>
          <h3>Target</h3>
          <hr />
          <h6>
            <SelectPicker
              block
              onChange={(e) => setAccount(e)}
              value={account}
              searchable={false}
              data={accounts}
            />
          </h6>
          <br />
        </Panel>
        <br />
        <Panel bordered>
          <h3>Configuration</h3>
          <hr />
          <h6>
            <Toggle
              style={{ marginRight: "20px" }}
              onClick={handleLike}
              checked={allowLike}
              value={allowLike}
            />
            Like
          </h6>
          <br />

          <div style={{ width: 160 }}>
            <label>Like Limit</label>
            <InputNumber value={likeLimit} onChange={setLikeLimit} />
          </div>
          <br />
          <h6>
            <Toggle
              style={{ marginRight: "20px" }}
              onClick={handleComment}
              value={allowComment}
              checked={allowComment}
            />{" "}
            Comment
          </h6>
          <br />

          <div style={{ width: 160 }}>
            <label>Comment Limit</label>
            <InputNumber value={commentLimit} onChange={setCommentLimit} />
          </div>
          <br />

          <label>Comments</label>
          <Input
            value={comments}
            onChange={setComments}
            as="textarea"
            rows={3}
            placeholder="Comments"
          />

          <br />
        </Panel>
        <br />
        <Panel bordered>
          <h3>Drip</h3>
          <hr />
          <p>
            Drip refers to the minimum time interval necessary between
            interactions, such as following, liking, commenting, and messaging.
          </p>
          <InputNumber value={drip} onChange={setDrip} placeholder="20" />
        </Panel>
        <br />
        <Panel bordered>
          <h3>Schedule</h3>
          <hr />
          <p>
            Schedule this task for a later date and time. Leave blank to run
            Immediately
          </p>
          <DatePicker
            value={dateTime}
            onChange={setDateTime}
            format="yyyy-MM-dd HH:mm"
          />
        </Panel>
        <br />
        <Button appearance="subtle" as={NavLink} to={"/tasks"}>
          Discard
        </Button>
        <Stack style={{ float: "right" }} spacing={6}>
          {id ? (
            <Button appearance="primary">Save</Button>
          ) : (
            <Button appearance="primary">Save as Draft</Button>
          )}
          {id ? (
            <Button appearance="primary">Save and Run</Button>
          ) : (
            <Button appearance="primary">Save and Run</Button>
          )}
        </Stack>
      </div>
    </>
  );
}

export default Control;
