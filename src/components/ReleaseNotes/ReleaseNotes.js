function ReleaseNotes({ header, content }) {
  return (
    <div
      style={{
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "0px 5px 0px 5px",
      }}
    >
      <div
        style={{
          borderRadius: "0px 5px 0px 0px",
          width: "100%",
          background:
            "no-repeat url('https://advancedwebtechnology.com/Portals/0/IMG_0126.JPG?ver=ozSsZP1htjLd8D26s08rDw%3d%3d&timestamp=1699046856143')",
          padding: "20px",
          margin: "0",
        }}
      ></div>
      <div
        style={{
          borderRadius: "0px 0px 0px 5px",
          width: "100%",
          background: "#fff",
          padding: "20px",
        }}
      >
        <h2>{header}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
}

export default ReleaseNotes;
