import { Tooltip, Whisper } from "rsuite";

function ToolTip({ text }) {
  return (
    <>
      <Whisper
        placement="top"
        controlId="control-id-focus"
        trigger="hover"
        speaker={<Tooltip>{text}</Tooltip>}
      ></Whisper>
    </>
  );
}

export default ToolTip;
