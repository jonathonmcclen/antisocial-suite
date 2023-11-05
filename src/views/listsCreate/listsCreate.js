import { useEffect, useState } from "react";
import { Button, Input, Panel, SelectPicker, Stack } from "rsuite";
import { useAuth } from "../../hooks/Auth";
import { supabaseClient as supabase } from "../../config/supabase-client";
import { NavLink, useParams } from "react-router-dom";
import BackButton from "../../components/backButton";

function ListsCreate() {
  const { id } = useParams();
  const disabledTypes = ["Response"];
  const [listType, setListType] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [list, setList] = useState(null);

  const { user } = useAuth();

  const data = ["User", "Comment", "Message", "Response"].map((item) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    if (id) {
      const getList = async function () {
        const { data, error } = await supabase
          .from("lists")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.warn(error);
        } else {
          setListType(data.type);
          setName(data.name);
          setDescription(data.description);
          setList(data.list);
          console.log(data);
        }
      };
      getList();
    }
  }, [user]);

  const updateList = async function () {
    const { data, error } = await supabase
      .from("lists")
      .update({
        name: name,
        description: description,
        type: listType,
        list: list,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.warn(error);
    } else {
      console.log(data);
      window.location.href = "/lists";
    }
  };

  const saveList = async function () {
    console.log({
      user_id: user.id,
      name: name,
      description: description,
      type: listType,
      list: list,
    });

    const { data, error } = await supabase
      .from("lists")
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
      window.location.href = "/lists";
    }
  };

  return (
    <>
      <div style={{ margin: "50px" }}>
        <h1>
          <BackButton path={"/lists"} /> New List
        </h1>
        <Panel bordered>
          <div>
            <h3>General</h3>
            <br />
            <label>List Type</label>
            <SelectPicker
              disabledItemValues={disabledTypes}
              searchable={false}
              data={data}
              block
              onChange={setListType}
              value={listType}
            />
            <br />
            <label>List Name</label>
            <Input placeholder="My List" onChange={setName} value={name} />
            <br />
            <label>List Description</label>
            <Input
              as="textarea"
              rows={3}
              placeholder="List Description"
              onChange={setDescription}
              value={description}
            />
          </div>
        </Panel>
        <br />
        {listType && (
          <>
            {" "}
            <Panel bordered>
              <h3>{listType}s</h3>
              <br />
              <label>List</label>
              <Input
                as="textarea"
                rows={15}
                placeholder={
                  listType + "_1; " + listType + "_2; " + listType + "_3; "
                }
                onChange={setList}
                value={list}
              />
            </Panel>
            <br />
            <Button appearance="subtle" as={NavLink} to={"/lists"}>
              Discard
            </Button>
            <Stack style={{ float: "right" }} spacing={6}>
              {id ? (
                <Button appearance="primary" onClick={updateList}>
                  Save
                </Button>
              ) : (
                <Button appearance="primary" onClick={saveList}>
                  Save
                </Button>
              )}
            </Stack>
          </>
        )}
      </div>
    </>
  );
}

export default ListsCreate;
