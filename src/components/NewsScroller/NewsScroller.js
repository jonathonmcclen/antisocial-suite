import Marquee from "react-fast-marquee";
import ScrollItem from "./ScrollItem";

function NewsScroller() {
  return (
    <Marquee speed={25} style={{ height: "30px" }} pauseOnHover>
      <ScrollItem inner={"12:00am - 4:00am is reserved for Maintenance"} />
      <ScrollItem
        inner={
          "To avoid account flags, don't be too consitant with interaction numbers or speed."
        }
      />
      <ScrollItem
        inner={
          "Did you know you can save generated lists from Tasks to re-target later?"
        }
      />
      <ScrollItem inner={"Other social platforms are coming soon"} />
    </Marquee>
  );
}

export default NewsScroller;
