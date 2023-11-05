import { NavLink } from "react-router-dom";
import { Button, ButtonGroup } from "rsuite";
import { useAuth } from "../../hooks/Auth";
import { supabaseClient as supabase } from "../../config/supabase-client";

function Account() {
  const { user } = useAuth();
  const { signOut } = useAuth();

  useEffect(() => {
    console.log(user);

    const getLists = async function () {
      const { data, error } = await supabase
        .from("profiles")
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

        console.log(data);
      }
    };
    getLists();
  }, []);

  return (
    <>
      <div style={{ margin: "50px" }}>
        <ButtonGroup>
          <Button>Estimates</Button>
          <Button>Invoices</Button>
          <Button>Account</Button>
        </ButtonGroup>
        <h1>Account {user?.email}</h1>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Business Name</p>

        <p>Address:</p>
        <p>address</p>
        <p>City</p>
        <p>State</p>
        <p>Zip</p>

        <p>Email</p>
        <p>phone #</p>
        <p>cell #</p>
        <ButtonGroup>
          <Button to={"/estimates/settings"} as={NavLink}>
            Estimate Config
          </Button>
          <Button>Invoice Config</Button>
          <Button>Edit Account Info</Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default Account;
