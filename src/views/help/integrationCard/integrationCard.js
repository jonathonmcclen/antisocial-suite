import { Panel } from "rsuite";

function IntegrationCard({ name, link, icon }) {
  return (
    <>
      <img src={icon} />
      <Panel bordered>{name}</Panel>
      <p>
        <a href={link} target="_blank">
          Learn More
        </a>
      </p>
    </>
  );
}

export default IntegrationCard;
