import { useState } from "react";
import {
  Button,
  Input,
  InputNumber,
  Panel,
  SelectPicker,
  Stack,
  Toggle,
} from "rsuite";

function ControlCreate() {
  const data = [
    "Follow",
    "Like",
    "Comment",
    "Message",
    "Unfollow",
    "Unlike",
  ].map((item) => ({ label: item, value: item }));

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const [action, setAction] = useState();

  const createTask = async function () {
    console.log({
      user_id: user.id,
      name: name,
      description: description,
      type: listType,
      list: list,
    });

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          name: name,
          description: description,
          type: listType,
          list: list,
        },
      ])
      .select();

    if (error) {
      console.warn(error);
    } else {
    }
  };

  const saveAsDraft = async function () {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          name: name,
          description: description,
          type: listType,
          list: list,
        },
      ])
      .select();

    if (error) {
      console.warn(error);
    } else {
    }
  };

  return (
    <>
      <div style={{ margin: "50px" }}>
        {" "}
        <h1>New Action</h1>
        <Panel bordered>
          <div>
            <h3>General</h3>
            <hr />
            <Input placeholder="Task Name" />
            <br />
            <Input as="textarea" rows={3} placeholder="Task Description" />
          </div>
        </Panel>
        <br />
        <Panel bordered>
          <h3>Action</h3>
          <hr />
          <SelectPicker block searchable={false} data={data} />
          <br />
          <Input as="textarea" rows={3} placeholder="Messages" />
          <br />
          <Input as="textarea" rows={3} placeholder="Comments" />
          <br />
          <Input placeholder="Username" />
          <br />
          <Input placeholder="URL" />
          <div></div>
        </Panel>
        <br />
        <Button appearance="subtle">Discard</Button>
        <Stack style={{ float: "right" }} spacing={6}>
          <Button appearance="primary" onClick={saveAsDraft}>
            Save as Draft
          </Button>
          <Button appearance="primary" onClick={createTask}>
            Save and Run
          </Button>
        </Stack>
      </div>
    </>
  );
}

export default ControlCreate;
