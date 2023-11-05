import { supabaseClient as supabase } from "../config/supabase-client";

export const getTasks = async function () {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .neq("archived", true)
    .order("id", { ascending: false });

  if (error) {
    alert(error);
  } else {
    return data;
    console.log(data);
  }
};

export const getArchivedTasks = async function () {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("archived", true)
    .order("id", { ascending: false });

  if (error) {
    alert(error);
  } else {
    return data;
    console.log(data);
  }
};

export const archiveTask = async function (id) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      archived: true,
    })
    .eq("id", id)
    .select();

  if (error) {
    alert(error);
  } else {
    window.location.href = "/tasks";
    console.log(data);
  }
};
