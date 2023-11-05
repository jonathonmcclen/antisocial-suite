import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Panel,
  Radio,
  RadioGroup,
  Stack,
  Toggle,
} from "rsuite";

import { supabaseClient as supabase } from "../../../config/supabase-client";
import { useAuth } from "../../../hooks/Auth";

function ConfigEstimates() {
  const { user } = useAuth();

  const [expiration, setExpiration] = useState(false);

  function handleExpiration() {
    setExpiration(!expiration);
  }

  const [estimateNumber, setEstimateNumber] = useState(false);

  function handleEstimateNumber() {
    setEstimateNumber(!estimateNumber);
  }

  const [backDating, setBackDating] = useState(false);

  function handleBackDating() {
    setBackDating(!backDating);
  }

  const [defaultTitle, setDefaultTitle] = useState(false);

  function handleDefaultTitle() {
    setDefaultTitle(!defaultTitle);
  }

  const [emailEstimates, setEmailEstimates] = useState(false);

  function handleEmailEstimates() {
    setEmailEstimates(!emailEstimates);
  }

  const [termsEnabled, setTermsEnabled] = useState(false);

  function handleTermsEnabled() {
    setTermsEnabled(!termsEnabled);
  }

  const [notesEnabled, setNotesEnabled] = useState(false);

  function handleNotesEnabled() {
    setNotesEnabled(!notesEnabled);
  }

  const [takePayments, setTakePayments] = useState(false);

  function handlePayments() {
    setTakePayments(!takePayments);
  }

  const [estConfig, setEstConfig] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getEstConfig() {
      setLoading(true);

      let { data, error } = await supabase
        .from("estimate_configs ")
        .select("*")
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setEstConfig(data);
        console.log(estConfig);
      }

      setLoading(false);
    }

    getEstConfig();
  }, []);

  async function saveConfig() {
    setLoading(true);

    let config = {
      expiration_enabled: expiration,
      custom_est_num: estimateNumber,
      back_dating: backDating,
      default_title: defaultTitle,
      estimate_emails: emailEstimates,
      terms_enabled: termsEnabled,
      notes_enabled: notesEnabled,
      take_payments: takePayments,
    };

    const { data, error } = await supabase
      .from("estimate_configs")
      .update(config)
      .eq("some_column", "someValue")
      .select();

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <>
      <div style={{ margin: "50px" }}>
        <h1>Estimate Configuration</h1>
        <Panel bordered style={{ minWidth: "500px" }}>
          <h6>
            <Toggle
              checked={expiration}
              onClick={handleExpiration}
              style={{ marginRight: "20px" }}
            />{" "}
            Enable Expiration
          </h6>
          {expiration && (
            <>
              <br />
              <Checkbox> Allow Estimate Author to Edit</Checkbox>
              <Input placeholder="Default Days" />
            </>
          )}
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>
              <Toggle
                checked={estimateNumber}
                onClick={handleEstimateNumber}
                style={{ marginRight: "20px" }}
              />
              Customize Estimate Number
            </h6>
            {estimateNumber && (
              <>
                <br />
                <RadioGroup name="radioList">
                  <Radio value="A">Auto Generate Number</Radio>
                  <Radio value="B">Enter Manualy</Radio>
                </RadioGroup>
                <Checkbox> Allow Estimate Author to Edit</Checkbox>
                <Input placeholder="Start From" />
                <Input placeholder="Digits" />
                <Input placeholder="Prefix" />
                <Input placeholder="Suffix" />
              </>
            )}
          </div>
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>
              <Toggle
                checked={backDating}
                onClick={handleBackDating}
                style={{ marginRight: "20px" }}
              />
              Allow Back Dating
            </h6>
            {backDating && (
              <>
                <br />
                <Checkbox> Allow Estimate Author to Edit</Checkbox>
                <Input placeholder="Number of Days" />
              </>
            )}
          </div>
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>
              <Toggle
                checked={defaultTitle}
                onClick={handleDefaultTitle}
                style={{ marginRight: "20px" }}
              />
              Default Title
            </h6>
            {defaultTitle && (
              <>
                <br />
                <Checkbox> Allow Estimate Author to Edit</Checkbox>
                <Input placeholder="Title" />
              </>
            )}
          </div>
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>
              <Toggle
                checked={emailEstimates}
                onClick={handleEmailEstimates}
                style={{ marginRight: "20px" }}
              />
              Send Estimates Via Email
            </h6>
            {emailEstimates && (
              <>
                <br />
                <Checkbox> Allow Estimate Author to Edit</Checkbox>
                <Input placeholder="Title" />
              </>
            )}
          </div>
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>
              <Toggle
                checked={termsEnabled}
                onClick={handleTermsEnabled}
                style={{ marginRight: "20px" }}
              />
              Terms and Conditions
            </h6>
            {termsEnabled && (
              <>
                <br />
                <Input as="textarea" rows={3} placeholder="Textarea" />
                <Checkbox> Display as Link</Checkbox>
                <Checkbox> Allow Author to Edit</Checkbox>
              </>
            )}
          </div>
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>
              <Toggle
                checked={notesEnabled}
                onClick={handleNotesEnabled}
                style={{ marginRight: "20px" }}
              />
              Estimate Notes
            </h6>
            {notesEnabled && (
              <>
                <br />
                <Input as="textarea" rows={3} placeholder="Textarea" />
                <Checkbox> Display as Link</Checkbox>
                <Checkbox> Allow Author to Edit</Checkbox>
              </>
            )}
          </div>
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>
              <Toggle
                checked={takePayments}
                onClick={handlePayments}
                style={{ marginRight: "20px" }}
              />
              Take Payments
            </h6>
            {takePayments && (
              <>
                <br />
                <Input as="textarea" rows={3} placeholder="Textarea" />
                <Checkbox> Display as Link</Checkbox>
                <Checkbox> Allow Author to Edit</Checkbox>
              </>
            )}
          </div>
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>Appearance</h6>
            <Checkbox> Display Recipient Billing Address</Checkbox>
            <Checkbox> Display Recipient Shipping Address</Checkbox>
            <Checkbox> Display Render Billing Address</Checkbox>
            <Checkbox> Show Logo on Estimate</Checkbox>
            <Input placeholder="Custom or default logo" />
            {/* Drag and drop area */}
          </div>
        </Panel>
        <br />
        <Panel bordered style={{ minWidth: "500px" }}>
          <div>
            <h6>Date And time Settings</h6>
            <Input placeholder="Date Format" />
            <Input placeholder="Time Zone" />
          </div>
        </Panel>
        <br />
        <Button appearance="subtle">Discard</Button>
        <Stack style={{ float: "right" }} spacing={6}>
          <Button appearance="primary">Save</Button>
        </Stack>
      </div>
    </>
  );
}

export default ConfigEstimates;
