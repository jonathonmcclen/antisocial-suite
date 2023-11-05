import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Input,
  Modal,
  Panel,
  Stack,
  Table,
} from "rsuite";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FaFolderOpen } from "react-icons/fa";
import { supabaseClient as supabase } from "../../config/supabase-client";
const { Column, HeaderCell, Cell } = Table;

function Accounts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getLists = async function () {
      const { data, error } = await supabase.from("accounts").select("*");

      if (error) {
        console.warn(error);
      } else {
        setData(data);
        console.log(data);
      }
    };
    getLists();
  }, []);

  const addAccount = async function () {
    if (password == confPassword) {
      const { data, error } = await supabase
        .from("accounts")
        .insert({
          username: username,
          password: password,
        })
        .select();

      if (error) {
        console.warn(error);
      } else {
        location.reload();
      }
    } else {
      alert("Your passwords don't match");
    }
  };

  const deleteAccount = async function (id) {
    const { error } = await supabase.from("accounts").delete().eq("id", id);
    if (error) {
      console.warn(error);
    } else {
      location.reload();
    }
  };

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setConfPassword] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleting, setDeleting] = useState(false);

  const [deletingUser, setDeletingUser] = useState("");
  const [deletingUserid, setDeletingUserid] = useState(null);

  const handleOpenDeleting = (id, name) => {
    setDeleting(true);
    setDeletingUser(name);
    setDeletingUserid(id);
  };
  const handleCloseDeleting = () => setDeleting(false);
  return (
    <>
      <div style={{ margin: "50px" }}>
        <h1 style={{ float: "left" }}>Accounts</h1>{" "}
        <Stack style={{ float: "right" }} spacing={6}>
          <ButtonToolbar>
            <Button onClick={handleOpen} appearance="primary">
              {" "}
              Add Account
            </Button>
          </ButtonToolbar>
        </Stack>
        <Panel
          shaded
          style={{
            display: "inline-block",
            width: "100%",
          }}
        >
          <Table
            cellBordered
            bordered
            height={500}
            data={data}
            onRowClick={(rowData) => {
              console.log(rowData);
            }}
          >
            <Column flexGrow={1} fixed>
              <HeaderCell>Username</HeaderCell>
              <Cell dataKey="username" />
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Tags</HeaderCell>
              <Cell dataKey="tags" />
            </Column>

            <Column width={150} align="center" fixed="right">
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="status" />
            </Column>

            <Column width={150} align="center" fixed="right">
              <HeaderCell>Actions</HeaderCell>
              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <>
                    <Button
                      appearance="link"
                      as={NavLink}
                      to={`/accounts/edit/${rowData.id}`}
                    >
                      <AiFillEdit />
                    </Button>
                    <Button
                      appearance="link"
                      onClick={(e) => {
                        handleOpenDeleting(rowData.id, rowData.username);
                      }}
                    >
                      <AiFillDelete />
                    </Button>
                    <Button
                      appearance="link"
                      as={NavLink}
                      to={`/accounts/edit/${rowData.id}`}
                    >
                      <FaFolderOpen />
                    </Button>
                  </>
                )}
              </Cell>
            </Column>
          </Table>
        </Panel>
      </div>
      {/* ------- Popup ------- */}
      <Modal
        backdrop={"static"}
        keyboard={false}
        open={open}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Add Account</h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <label>Account Username</label>
          <Input
            placeholder="Username"
            value={username}
            onChange={setUsername}
          />
          <br />
          <br />
          <label>Password</label>
          <Input
            placeholder="Password"
            onChange={setPassword}
            value={password}
          />
          <br />
          <label>Confirm Password</label>
          <Input
            placeholder="Confirm Password"
            onChange={setConfPassword}
            value={confPassword}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={addAccount} appearance="primary">
            Add Account
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        backdrop={"static"}
        keyboard={false}
        open={deleting}
        onClose={handleClose}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Delete Account</h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Are you sure?</h4>
          <p>Please type the username to confirm. This is NOT reversible!</p>
          <h4>{deletingUser}</h4>
          <Input
            placeholder="Username"
            value={username}
            onChange={setUsername}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseDeleting} appearance="subtle">
            Cancel
          </Button>
          <Button
            onClick={() => deleteAccount(deletingUserid)}
            appearance="primary"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Accounts;
