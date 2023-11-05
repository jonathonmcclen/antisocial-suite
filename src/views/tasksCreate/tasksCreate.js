import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Modal,
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

function TasksCreate() {
  // ERRORS MODAL
  const [errorModal, setErrorModal] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const handleOpen = () => setErrorModal(true);
  const handleClose = () => setErrorModal(false);

  const data = ["User", "Post"].map((item) => ({ label: item, value: item }));
  const { user } = useAuth();
  const { id } = useParams();

  // GENERAL ----------
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // TARGET ------------
  const [genlist, setGenlist] = useState(true);
  const handleGen = () => setGenlist(!genlist);
  const [list, setList] = useState("");
  const [target, setTarget] = useState("");
  const [targetType, setTargetType] = useState("");

  const targetTypes = [
    "User Followers",
    "User Following",
    "Post Likers",
    "Post Commenters",
  ].map((item) => ({
    label: item,
    value: item,
  }));

  const targets = ["User", "Post"].map((item) => ({
    label: item,
    value: item,
  }));

  // CONFIGURATION ----------
  const [allowFollow, setAllowFollow] = useState(true);
  const handleFollow = () => setAllowFollow(!allowFollow);
  const [followLimit, setFollowLimit] = useState(0);

  const [allowLike, setAllowLike] = useState(true);
  const handleLike = () => setAllowLike(!allowLike);
  const [likeLimit, setLikeLimit] = useState(0);

  const [allowComment, setAllowComment] = useState(true);
  const handleComment = () => setAllowComment(!allowComment);
  const [commentLimit, setCommentLimit] = useState(0);
  const [comments, setComments] = useState("");

  const [allowMessage, setAllowMessage] = useState(true);
  const handleMessage = () => setAllowMessage(!allowMessage);
  const [messageLimit, setMessageLimit] = useState(0);
  const [messages, setMessages] = useState("");

  const [drip, setDrip] = useState(30);
  const [dateTime, setDateTime] = useState();

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
    console.log("testing");

    if (errors.length <= 0) {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
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
          target_type: targetType,
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

    if (genlist && !targetType && !target) {
      errors.push(
        "Please supply a targetType & target to generate a list to target"
      );
    }

    if (!genlist && !list) {
      errors.push("Please supply a list of users");
    }

    if (allowFollow && !followLimit) {
      errors.push(
        "If following is enabled a valid number above 0 should be set for the limit"
      );
    }
    if (allowLike && !likeLimit) {
      errors.push(
        "If Liking is enabled a valid number above 0 should be set for the limit"
      );
    }
    if (allowComment && !commentLimit) {
      errors.push(
        "If Commenting is enabled a valid number above 0 should be set for the limit"
      );
    }
    if (allowMessage && !messageLimit) {
      errors.push(
        "If messaging is enabled, a valid number above 0 should be set for the limit"
      );
    }

    if (allowComment && !comments) {
      errors.push(
        "If Commenting is enabled a valid number of Comments above 0 should be set for the limit"
      );
    }

    if (allowMessage && !messages) {
      errors.push(
        "If messaging is enabled, a valid number Messages should be provided"
      );
    }

    if (errors.length <= 0) {
      setErrorList(errors);
      setErrorModal(false);
      return errors;
    } else {
      setErrorList(errors);
      setErrorModal(true);
      return errors;
    }
  };

  const cancelTask = async function () {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        status: "Canceled",
      })
      .select();
  };

  const saveAsDraft = async function () {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        name: name,
        acct_id: account,
        description: description,
        allow_follow: allowFollow,
        follow_limit: followLimit,
        allow_like: allowLike,
        like_limit: likeLimit,
        allow_comment: allowComment,
        comment_limit: commentLimit,
        comments: comments,
        allow_message: allowMessage,
        message_limit: messageLimit,
        messages: messages,
        drip: drip,
        scheduled: dateTime,
        gen_list: genlist,
        target_type: targetType,
        target: target,
        list: list,
        status: "Draft",
      })
      .select();

    if (error) {
      console.warn(error);
    } else {
      window.location.href = "/tasks";
    }
  };

  const updateTask = async function () {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        acct_id: account,
        name: name,
        description: description,
        allow_follow: allowFollow,
        follow_limit: followLimit,
        allow_like: allowLike,
        like_limit: likeLimit,
        allow_comment: allowComment,
        comment_limit: commentLimit,
        comments: comments,
        allow_message: allowMessage,
        message_limit: messageLimit,
        messages: messages,
        drip: drip,
        scheduled: dateTime,
        gen_list: genlist,
        target_type: targetType,
        target: target,
        list: list,
        status: "Draft",
      })
      .eq("id", id)
      .select();

    if (error) {
      console.warn(error);
    } else {
      console.log(data);
      window.location.href = "/tasks";
    }
  };

  const updateTaskAndRun = async function () {
    let errors = runValidations();

    if (errors.length <= 0) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          name: name,
          acct_id: account,
          description: description,
          allow_follow: allowFollow,
          follow_limit: followLimit,
          allow_like: allowLike,
          like_limit: likeLimit,
          allow_comment: allowComment,
          comment_limit: commentLimit,
          comments: comments,
          allow_message: allowMessage,
          message_limit: messageLimit,
          messages: messages,
          drip: drip,
          scheduled: dateTime,
          gen_list: genlist,
          target_type: targetType,
          target: target,
          list: list,
          status: "Scheduled",
        })
        .eq("id", id)
        .select();

      if (error) {
        console.warn(error);
      } else {
        console.log(data);
        window.location.href = "/tasks";
      }
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {" "}
        <h1>
          <BackButton path={"/tasks"} /> New Task
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
            <label>Task Name</label>
            <Input value={name} onChange={setName} placeholder="My Task" />
            <br />
            <label>Task Description</label>
            <Input
              value={description}
              onChange={setDescription}
              as="textarea"
              rows={3}
              placeholder="Go tell people I exist!"
            />
          </div>
        </Panel>
        <br />
        <Panel bordered>
          <h3>Target</h3>
          <hr />
          <h6>
            <Toggle
              style={{ marginRight: "20px" }}
              onClick={handleGen}
              value={genlist}
              checked={genlist}
            />
            generate List
          </h6>
          <br />
          {genlist ? (
            <>
              <label>List Type</label>
              <SelectPicker
                block
                value={targetType}
                onChange={setTargetType}
                searchable={false}
                data={targetTypes}
              />
              <br />
              <label>List Target</label>
              <Input
                placeholder={targetType.includes("User") ? "@Username" : "URL"}
                value={target}
                onChange={setTarget}
              />
              {/* <br />
              <label>List Length</label>
              <InputNumber value={likeLimit} onChange={setLikeLimit} /> */}
            </>
          ) : (
            <>
              <Input
                as="textarea"
                rows={3}
                placeholder="Target List"
                value={list}
                onChange={setList}
              />
            </>
          )}
          <br />
        </Panel>
        <br />
        <Panel bordered>
          <h3>Configuration</h3>
          <hr />
          <h6>
            <Toggle
              style={{ marginRight: "20px" }}
              onClick={handleFollow}
              checked={allowFollow}
              value={allowFollow}
            />
            Follow
          </h6>
          <br />
          <div style={{ width: 160 }}>
            <label>Follow Limit</label>
            <InputNumber value={followLimit} onChange={setFollowLimit} />
          </div>
          <br />

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

          <h6>
            <Toggle
              style={{ marginRight: "20px" }}
              onClick={handleMessage}
              value={allowMessage}
              checked={allowMessage}
            />{" "}
            Message
          </h6>
          <br />

          <div style={{ width: 160 }}>
            <label>Message Limit</label>
            <InputNumber value={messageLimit} onChange={setMessageLimit} />
          </div>
          <br />

          <label>Messages</label>
          <Input
            value={messages}
            onChange={setMessages}
            as="textarea"
            rows={3}
            placeholder="Messages"
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
            <Button appearance="primary" onClick={updateTask}>
              Save
            </Button>
          ) : (
            <Button appearance="primary" onClick={saveAsDraft}>
              Save as Draft
            </Button>
          )}
          {id ? (
            <Button appearance="primary" onClick={updateTaskAndRun}>
              Save and Run
            </Button>
          ) : (
            <Button appearance="primary" onClick={createTask}>
              Save and Run
            </Button>
          )}
        </Stack>
      </div>

      {/* --------------------- MODAL ------------------ */}
      <Modal open={errorModal} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>ERRORS</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-red-600 font-bold">
          {errorList?.map((item) => (
            <p>
              <span>*{item}</span>
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TasksCreate;
