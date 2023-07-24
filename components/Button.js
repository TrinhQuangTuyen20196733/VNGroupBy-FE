import Link from "next/link";
export default function Button({
  children,
  color,
  href,
  to,
  hover,
  className,
  text = false,
  primaryColor = false,
  onClick,
  ...passProps
}) {
  const props = {
    ...passProps,
  };
  let Comp = "button";
  if (to) {
    props.href = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes =
    `${primaryColor ? " bg-primary-color" : ""}` +
    `${hover ? " hover:bg-black hover:text-white " : ""}` +
    className;
  const styles = {
    onClick,
    ...props,
  };
  const childrenStyle = {
    color,
  };
  return (
    <Comp className={classes} style={styles} onClick={onClick}>
      <span style={childrenStyle}>{children}</span>
    </Comp>
  );
}
