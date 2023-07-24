export default function Input({
  type = "text",
  isPrimary = false,
  placehoder,
  value,
  onChange,
  ...props
}) {
  const styles = {
    ...props,
    paddingLeft: "30px",
  };
  const classes = `${
    isPrimary ? "bg-[#d9d7ce] rounded-2xl border-orange-400 border-2 " : ""
  }`;

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={styles}
      placeholder={placehoder}
      className={classes}
    ></input>
  );
}
