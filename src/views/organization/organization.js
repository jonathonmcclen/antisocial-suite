import { NavLink } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Col,
  Input,
  Nav,
  Panel,
  Row,
  Stack,
} from "rsuite";
import { useAuth } from "../../hooks/Auth";
import { supabaseClient as supabase } from "../../config/supabase-client";
import { useEffect, useState } from "react";

const CustomNav = ({ active, onSelect, ...props }) => {
  return (
    <Nav
      {...props}
      vertical
      activeKey={active}
      onSelect={onSelect}
      style={{ width: 100 }}
    >
      <Nav.Item eventKey="General">General</Nav.Item>
      <Nav.Item eventKey="Personal">Personal</Nav.Item>
      <Nav.Item eventKey="Business">Business</Nav.Item>
      <Nav.Item eventKey="Integrations">Integrations</Nav.Item>
      <Nav.Item eventKey="Admin">Admin</Nav.Item>
    </Nav>
  );
};

function Organization() {
  const { user } = useAuth();
  const { signOut } = useAuth();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();

  const [businessName, setBusinessName] = useState();
  const [businessAddress, setBusinessAddress] = useState();
  const [businessCity, setBusinessCity] = useState();
  const [businessState, setBusinessState] = useState();
  const [businessZip, setBusinessZip] = useState();

  const [active, setActive] = useState("General");

  useEffect(() => {
    const getInfo = async function () {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn(error);
      } else {
        setName(data.name);
        // setEmail(data.description);
        setPhone(data.phone);
        setAddress(data.address);
        setCity(data.city);
        setState(data.allow_like);
        setZip(data.zip);

        setBusinessName(data.business_name);
        setBusinessAddress(data.business_address);
        setBusinessCity(data.business_city);
        setBusinessState(data.business_state);
        setBusinessZip(data.business_zip);
        console.log(data);
      }
    };
    getInfo();
  }, []);

  const updateInfo = async function () {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        name: name,
        email: email,
        phone: phone,
        address: address,
        city: city,
        state: state,
        zip: zip,
        business_name: businessName,
        business_address: businessAddress,
        business_city: businessCity,
        business_state: businessState,
        business_zip: businessZip,
      })
      .eq("id", user.id)
      .select();

    if (error) {
      console.warn(error);
    } else {
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto my-[50px]">
        <h1>Profile</h1>
        <Panel
          bordered
          className=" bg-cover bg-[url('https://advancedwebtechnology.com/Portals/0/IMG_0126.JPG?ver=ozSsZP1htjLd8D26s08rDw%3d%3d&timestamp=1699046856143')]"
        >
          <h1>{name}</h1>
          <h3>{"(" + user?.email + ")"}</h3>
        </Panel>
        <br />
        <div className="flex">
          <div class="flex-initial">
            <CustomNav appearance="tabs" active={active} onSelect={setActive} />
          </div>
          <div class="flex-1 px-[20px]">
            <Panel bordered>
              <div>
                <h3>Personal</h3>
                <hr />
                <label>Name</label>
                <Input value={name} onChange={setName} placeholder="Name" />
                <label>Email</label>
                <Input
                  value={email}
                  onChange={setEmail}
                  placeholder="My Task"
                />
                <label>Phone</label>
                <Input
                  value={phone}
                  onChange={setPhone}
                  placeholder="My Task"
                />
                <br />
                <label>Address</label>
                <Input
                  value={address}
                  onChange={setAddress}
                  placeholder="My Task"
                />
                <label>City</label>
                <Input value={city} onChange={setCity} placeholder="My Task" />
                <label>State</label>
                <Input
                  value={state}
                  onChange={setState}
                  placeholder="My Task"
                />
                <label>Zip</label>
                <Input value={zip} onChange={setZip} placeholder="My Task" />
              </div>
            </Panel>
            <br />
            <Panel bordered>
              <div>
                <h3>Business</h3>
                <hr />
                <label>Business Name</label>
                <Input
                  value={businessName}
                  onChange={setBusinessName}
                  placeholder="My Task"
                />
                <label>Address</label>
                <Input
                  value={businessAddress}
                  onChange={setBusinessAddress}
                  placeholder="My Task"
                />
                <label>City</label>
                <Input
                  value={businessCity}
                  onChange={setBusinessCity}
                  placeholder="My Task"
                />
                <label>State</label>
                <Input
                  value={businessState}
                  onChange={setBusinessState}
                  placeholder="My Task"
                />
                <label>Zip</label>
                <Input
                  value={businessZip}
                  onChange={setBusinessZip}
                  placeholder="My Task"
                />
              </div>
            </Panel>
          </div>
        </div>
        <br />
        <br />
        <Button appearance="subtle" as={NavLink} to={"/tasks"}>
          Discard
        </Button>
        <Stack style={{ float: "right" }} spacing={6}>
          <Button onClick={updateInfo} appearance="primary">
            Save
          </Button>
        </Stack>
      </div>
    </>
  );
}

export default Organization;
