export function Tri({ width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      fill="none"
      viewBox="0 0 333 333"
    >
      <path fill="#fff" d="M0 0h333v333H0z" />
      <path fill="#000" d="M10 10h313v313H10z" />
      <path stroke="#fff" stroke-width="3" d="M19.5 19.5h294v294h-294z" />
      <path
        fill="#fff"
        d="M55.1 233H40v-12h43.8v12H68.7v58H55.1v-58Zm30.097 58v-51.1h9.5l2.5 5.4c2.666-3.6 6.033-5.4 10.1-5.4h3.9v13.4h-12.7V291h-13.3Zm31.736 0v-51.1h13.2V291h-13.2Zm0-70h13.2v13.5h-13.2V221Z"
      />
    </svg>
  );
}
