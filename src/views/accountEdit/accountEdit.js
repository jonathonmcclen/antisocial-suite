import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Input,
  InputNumber,
  Modal,
  Panel,
  Stack,
  Toggle,
} from "rsuite";
import { supabaseClient as supabase } from "../../config/supabase-client";
import BackButton from "../../components/backButton";

function AccountEdit() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [description, setDescription] = useState(null);
  const [tags, setTags] = useState(null);

  const [genlist, setGenlist] = useState(true);
  const handleGen = () => setGenlist(!genlist);

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
  const [whiteList, setWhiteList] = useState("");
  const [blackList, setBlackList] = useState("");

  const [account, setAccount] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getLists = async function () {
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.warn(error);
      } else {
        setUsername(data.username);
        setDescription(data.description);
        setTags(data.tags);
        setAllowFollow(data.allow_follow);
        setFollowLimit(data.limit_follow);
        setAllowLike(data.allow_like);
        setLikeLimit(data.limit_like);
        setAllowComment(data.allow_comment);
        setCommentLimit(data.limit_comment);
        setComments(data.def_comments);
        setAllowMessage(data.allow_message);
        setMessageLimit(data.limit_message);
        setMessages(data.def_messages);
        setDrip(data.drip);
        setWhiteList(data.white_list);
        setBlackList(data.black_list);
      }
    };
    getLists();
  }, []);

  const updateAccount = async function () {
    const { data, error } = await supabase
      .from("accounts")
      .update({
        username: username,
        description: description,
        tags: tags,
        acct_tags: tags,
        allow_follow: allowFollow,
        limit_follow: followLimit,
        allow_like: allowLike,
        limit_like: likeLimit,
        allow_comment: allowComment,
        limit_comment: commentLimit,
        def_comments: comments,
        allow_message: allowMessage,
        limit_message: messageLimit,
        def_messages: messages,
        drip: drip,
        white_list: whiteList,
        black_list: blackList,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.warn(error);
    } else {
      console.log(data);
      window.location.href = "/accounts";
    }
  };

  const updatePassword = async function () {
    const { data, error } = await supabase
      .from("accounts")
      .update({
        status: "Awaiting Confirmation",
        password: newPassword,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.warn(error);
    } else {
      console.log(data);
      window.location.href = "/accounts";
    }
  };

  return (
    <>
      <iframe
        width="320"
        height="440"
        src={`https://www.instagram.com/${username}/embed/`}
        frameborder="0"
      ></iframe>

      <div style={{ margin: "50px" }}>
        <h1>
          <BackButton path={"/accounts"} /> Account
        </h1>
        <br />
        <Panel bordered>
          <h3>Credentials</h3>
          <hr />
          <p>Username</p>
          <Input
            value={username}
            onChange={setUsername}
            placeholder="Task Description"
          />
          <br />
          <Button onClick={handleOpen}>Update Password</Button>
        </Panel>
        <br />
        <Panel bordered>
          <h3>General</h3>
          <hr />
          <p>Description</p>
          <Input
            as="textarea"
            value={description}
            onChange={setDescription}
            rows={3}
            placeholder="Account Description"
          />
          <br />
          <p>Tags</p>
          <Input
            as="textarea"
            value={tags}
            onChange={setTags}
            rows={3}
            placeholder="Account Tags"
          />
        </Panel>
        <br />
        <Panel bordered>
          <h3>Defaults</h3>
          <p>
            Account defaults represent the predetermined configurations applied
            when generating a new task via the 'tsk' functionality. These
            settings, while initially established by default, can be altered to
            suit specific requirements during the creation of a new task.
          </p>
          <hr />
          <h6>
            <Toggle
              style={{ marginRight: "20px" }}
              onClick={handleFollow}
              checked={allowFollow}
            />{" "}
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
            />{" "}
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

          <label>Default Comments</label>
          <Input
            as="textarea"
            rows={3}
            value={comments}
            onChange={setComments}
            placeholder="Separate Comments with semicolon"
          />

          <br />

          <h6>
            <Toggle
              style={{ marginRight: "20px" }}
              onClick={handleMessage}
              checked={allowMessage}
            />
            Message
          </h6>
          <br />

          <div style={{ width: 160 }}>
            <label>Message Limit</label>
            <InputNumber value={messageLimit} onChange={setMessageLimit} />
          </div>
          <br />

          <label>Default Messages</label>
          <Input
            as="textarea"
            value={messages}
            onChange={setMessages}
            rows={3}
            placeholder="Separate messages with semicolon"
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
          <h3>White List</h3>
          <hr />
          <p>
            White List is a list of users that you wish to never take NEGATIVE
            action against. ie un-follow or Block.
          </p>
          <Input
            as="textarea"
            value={whiteList}
            onChange={setWhiteList}
            rows={3}
            placeholder="Separate users with semicolon"
          />
        </Panel>
        <br />
        <Panel bordered>
          <h3>Black List</h3>
          <hr />
          <p>
            Black list is a list of users that you wish to never take positive
            action against. ie follow, message, like or coment on any content by
            these users
          </p>
          <Input
            as="textarea"
            value={blackList}
            onChange={setBlackList}
            rows={3}
            placeholder="Separate users with semicolon"
          />
        </Panel>
        <br />
        <Button appearance="subtle" as={NavLink} to={"/accounts"}>
          Discard
        </Button>
        <Stack style={{ float: "right" }} spacing={6}>
          <Button appearance="primary" onClick={updateAccount}>
            Save
          </Button>
        </Stack>
      </div>

      {/* CHANGE PASSWORD MODAL */}

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>New Password</label>
          <Input
            onChange={setNewPassword}
            value={newPassword}
            placeholder="New password"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AccountEdit;
