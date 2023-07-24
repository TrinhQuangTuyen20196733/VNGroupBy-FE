export default function MessageAlert({ color, children, status }) {
  let statusColor;
  switch (status) {
    case "success":
      statusColor = "bg-[#4fd69c]";
      break;
    default:
      statusColor = " ";
      break;
  }
  const alertClassName =
    ` text-white text-lg rounded-lg fixed top-12 left-1/2 transform -translate-x-1/2 p-4 w-[30%] h-320 flex items-center justify-center font-semibold ` +
    statusColor;

  return <div className={alertClassName}>{children}</div>;
}
