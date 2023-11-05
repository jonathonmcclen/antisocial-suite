import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Panel, Stack, Table, Tooltip, Whisper } from "rsuite";
import { GiCancel } from "react-icons/gi";
import {
  BiSolidCopy,
  BiSolidCommentDetail,
  BiSolidUserMinus,
  BiSolidUserPlus,
} from "react-icons/bi";
import { BsFillArchiveFill } from "react-icons/bs";
import { supabaseClient as supabase } from "../../config/supabase-client";
import {
  AiFillEdit,
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiFillEye,
  AiFillHeart,
  AiFillMail,
  AiOutlineComment,
} from "react-icons/ai";
import ToolTip from "../../components/toolTip";
const { Column, HeaderCell, Cell } = Table;
import { getArchivedTasks, archiveTask, getTasks } from "../../api/tasks";

function Tasks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let data = getTasks().then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  const cancelTask = async function (id) {
    const { data, error } = await supabase
      .from("tasks")
      .update({
        status: "Canceled",
      })
      .eq("id", id)
      .select();

    window.location.href = "/tasks";
  };

  return (
    <>
      <div style={{ margin: "50px" }}>
        {" "}
        <h1 style={{ float: "left" }}>Tasks</h1>
        <Stack style={{ float: "right" }} spacing={6}>
          <Button appearance="primary" to={"/tasks/new"} as={NavLink}>
            Create Task
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
            <Column flexGrow={1} fixed>
              <HeaderCell>Name</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column flexGrow={2}>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column width={100}>
              <HeaderCell>Type</HeaderCell>
              <Cell dataKey="created" />
            </Column>
            <Column width={100} align="center" fixed="right">
              <HeaderCell>Status</HeaderCell>
              <Cell dataKey="status" />
            </Column>

            <Column width={100} align="center" fixed="right">
              <HeaderCell>Config</HeaderCell>
              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <>
                    {rowData.allow_follow && (
                      <BiSolidUserPlus
                        style={{ display: "inline", fontSize: "1.5em" }}
                      />
                    )}
                    {/* <Button
                      style={{ padding: "1px" }}
                      appearance="link"
                      as={NavLink}
                      to={`/tasks/edit/${rowData.id}`}
                    >
                      <BiSolidUserMinus style={{ fontSize: "1.5em" }} />
                    </Button> */}
                    {rowData.allow_like && (
                      <AiFillHeart
                        style={{ display: "inline", fontSize: "1em" }}
                      />
                    )}
                    {rowData.allow_message && (
                      <AiFillMail
                        style={{ display: "inline", fontSize: "1em" }}
                      />
                    )}
                    {rowData.allow_comment && (
                      <BiSolidCommentDetail
                        style={{ display: "inline", fontSize: "1em" }}
                      />
                    )}
                  </>
                )}
              </Cell>
            </Column>

            <Column width={180} align="right" fixed="right">
              <HeaderCell>Actions</HeaderCell>
              <Cell style={{ padding: "6px" }}>
                {(rowData) => (
                  <>
                    {rowData.status != "Draft" && (
                      <Button
                        style={{ padding: "8px" }}
                        appearance="link"
                        as={NavLink}
                        to={`/task/${rowData.id}`}
                      >
                        <AiFillEye style={{ fontSize: "1em" }} />
                      </Button>
                    )}
                    {rowData.status != "In_Progress" &&
                      rowData.status != "Failed" && (
                        <Whisper
                          placement="top"
                          controlId="control-id-focus"
                          trigger="hover"
                          speaker={<Tooltip>Edit Task</Tooltip>}
                        >
                          <Button
                            style={{ padding: "8px" }}
                            appearance="link"
                            as={NavLink}
                            to={`/tasks/edit/${rowData.id}`}
                          >
                            <AiFillEdit />
                          </Button>
                        </Whisper>
                      )}
                    {/* <Whisper
                      placement="top"
                      controlId="control-id-focus"
                      trigger="hover"
                      speaker={<Tooltip>Copy Task</Tooltip>}
                    >
                      <Button
                        style={{ padding: "8px" }}
                        appearance="link"
                        as={NavLink}
                        to={`/tasks/edit/${rowData.id}`}
                      >
                        <BiSolidCopy />
                      </Button>
                    </Whisper> */}
                    <Whisper
                      placement="top"
                      controlId="control-id-focus"
                      trigger="hover"
                      speaker={<Tooltip>Archive Task</Tooltip>}
                    >
                      <Button
                        style={{ padding: "8px" }}
                        appearance="link"
                        onClick={(e) => {
                          archiveTask(rowData.id);
                        }}
                      >
                        <BsFillArchiveFill />
                      </Button>
                    </Whisper>
                    <Whisper
                      placement="top"
                      controlId="control-id-focus"
                      trigger="hover"
                      speaker={<Tooltip>Cancel Task</Tooltip>}
                    >
                      <Button
                        style={{ padding: "8px" }}
                        onClick={() => cancelTask(rowData.id)}
                        appearance="link"
                      >
                        <GiCancel />
                      </Button>
                    </Whisper>
                  </>
                )}
              </Cell>
            </Column>
          </Table>
        </Panel>
      </div>
    </>
  );
}

export default Tasks;
