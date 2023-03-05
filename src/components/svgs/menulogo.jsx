export default function MenuLogo(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="#000"
      className={"icon " + props.className + " line-color"}
      data-name="Line Color"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="#2CA9BC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 9h8m-8 3h8m-8 3h8"
      ></path>
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></circle>
    </svg>
  );
}
