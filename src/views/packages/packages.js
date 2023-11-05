import { Panel, Placeholder, Row, Col, Button } from "rsuite";

function Packages() {
  return (
    <>
      <div>
        <h2>Packages</h2>
        <hr />
        <section className="px-[250px]">
          <Row>
            <Col md={6} sm={12}>
              <Panel bordered header={<h3>Starter</h3>}>
                <h5>$49 / month</h5>
                <ul>
                  <li>1 user</li>
                  <li>1 social account</li>
                  <li>100 Tasks</li>
                  <li>5 Triggers</li>
                  <li>90 Posts</li>
                </ul>
                <form action="/create-checkout-session" method="POST">
                  {/* Add a hidden field with the lookup_key of your Price */}
                  <input
                    type="hidden"
                    name="lookup_key"
                    value="{{PRICE_LOOKUP_KEY}}"
                  />
                  <hr />
                  <Button
                    block
                    appearance="primary"
                    id="checkout-and-portal-button"
                    type="submit"
                  >
                    Subscribe
                  </Button>
                </form>
              </Panel>
            </Col>
            <Col md={6} sm={12}>
              <Panel bordered header={<h3>Influencer</h3>}>
                <h5>$99 / month</h5>
                <ul>
                  <li>2 users</li>
                  <li>5 social accounts</li>
                  <li>200 Tasks</li>
                  <li>10 Triggers</li>
                  <li>200 Posts</li>
                </ul>
                <form action="/create-checkout-session" method="POST">
                  {/* Add a hidden field with the lookup_key of your Price */}
                  <input
                    type="hidden"
                    name="lookup_key"
                    value="{{PRICE_LOOKUP_KEY}}"
                  />
                  <hr />
                  <Button
                    block
                    appearance="primary"
                    id="checkout-and-portal-button"
                    type="submit"
                  >
                    Subscribe
                  </Button>
                </form>
              </Panel>
            </Col>
            <Col md={6} sm={12}>
              <Panel bordered header={<h3>PR</h3>}>
                <h5>$149.00 / month</h5>
                <ul>
                  <li>5 users</li>
                  <li>15 social accounts</li>
                  <li>500 Tasks</li>
                  <li>30 Triggers</li>
                  <li>400 Posts</li>
                </ul>
                <form action="/create-checkout-session" method="POST">
                  {/* Add a hidden field with the lookup_key of your Price */}
                  <input
                    type="hidden"
                    name="lookup_key"
                    value="{{PRICE_LOOKUP_KEY}}"
                  />
                  <hr />
                  <Button
                    block
                    appearance="primary"
                    id="checkout-and-portal-button"
                    type="submit"
                  >
                    Subscribe
                  </Button>
                </form>
              </Panel>
            </Col>
            <Col md={6} sm={12}>
              <Panel bordered header={<h3>Enterprise</h3>}>
                <h5>$250+ / month</h5>
                <ul>
                  <li>10+ users</li>
                  <li>25+ social accounts</li>
                  <li>500+ Tasks</li>
                  <li>50+ Triggers</li>
                  <li>500+ Posts</li>
                </ul>
                <form action="/create-checkout-session" method="POST">
                  {/* Add a hidden field with the lookup_key of your Price */}
                  <input
                    type="hidden"
                    name="lookup_key"
                    value="{{PRICE_LOOKUP_KEY}}"
                  />
                  <hr />
                  <Button
                    block
                    appearance="primary"
                    id="checkout-and-portal-button"
                    type="submit"
                  >
                    Contact Us
                  </Button>
                </form>
              </Panel>
            </Col>
          </Row>
        </section>
        <hr />
      </div>
    </>
  );
}

export default Packages;
