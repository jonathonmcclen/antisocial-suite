import { supabaseClient as supabase } from "../config/supabase-client";

export const getAccounts = async function () {
  const { data, error } = await supabase.from("accounts").select("*");
  if (error) {
    console.warn(error);
  } else {
    return data;
  }
};
