import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Button, Input, Modal, Panel, Stack, Table } from "rsuite";
import { supabaseClient as supabase } from "../../config/supabase-client";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const { Column, HeaderCell, Cell } = Table;

function Lists() {
  const [data, setData] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [deletingUserid, setDeletingUserid] = useState(null);

  const handleOpenDeleting = (id) => {
    setDeleting(true);
    setDeletingUserid(id);
  };
  const handleCloseDeleting = () => setDeleting(false);

  useEffect(() => {
    const getLists = async function () {
      const { data, error } = await supabase.from("lists").select("*");

      if (error) {
        console.warn(error);
      } else {
        setData(data);
        console.log(data);
      }
    };
    getLists();
  }, []);

  const deleteList = async function (id) {
    const { error } = await supabase.from("lists").delete().eq("id", id);
    if (error) {
      console.warn(error);
    } else {
      location.reload();
    }
  };

  return (
    <>
      <div style={{ margin: "50px" }}>
        <h1 style={{ float: "left" }}>Lists</h1>
        <Stack style={{ float: "right" }} spacing={6}>
          <Button to={"/lists/new"} appearance="primary" as={NavLink}>
            Create List
          </Button>
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
            <Column width={280} fixed>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column width={100}>
              <HeaderCell>Type</HeaderCell>
              <Cell dataKey="type" />
            </Column>
            <Column width={150} align="center" fixed="right">
              <HeaderCell>Actions</HeaderCell>
              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <>
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-[10px] mx-auto ">
                      <Button
                        appearance="link"
                        as={NavLink}
                        to={`/lists/edit/${rowData.id}`}
                      >
                        <AiFillEdit />
                      </Button>
                      <Button
                        appearance="link"
                        onClick={(e) => {
                          handleOpenDeleting(rowData.id);
                        }}
                      >
                        <AiFillDelete />
                      </Button>
                    </div>
                  </>
                )}
              </Cell>
            </Column>
          </Table>
        </Panel>
      </div>

      <Modal
        backdrop={"static"}
        keyboard={false}
        open={deleting}
        onClose={handleCloseDeleting}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Delete List</h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h4>Are you sure?</h4>
          <p>This is NOT reversible!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseDeleting} appearance="subtle">
            Cancel
          </Button>
          <Button
            onClick={() => deleteList(deletingUserid)}
            appearance="primary"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Lists;
