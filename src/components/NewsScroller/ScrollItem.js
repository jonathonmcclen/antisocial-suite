function ScrollItem({ inner }) {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: inner }}
      style={{ marginRight: "100px", fontSize: 15, letterSpacing: 3 }}
    ></p>
  );
}

export default ScrollItem;
