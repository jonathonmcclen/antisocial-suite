import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, IconButton } from "rsuite";

function BackButton({ path }) {
  let history = useNavigate();
  return (
    <IconButton
      className="my-auto"
      appearance="primary"
      as={NavLink}
      to={path}
      icon={<IoIosArrowBack />}
      circle
      size="lg"
    />
  );
}

export default BackButton;
