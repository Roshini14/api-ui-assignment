function Button(props) {
  return (
    <div role="button" className="submit-button" style={{ cursor: "pointer" }} onClick={props.onClick}>
      {props.text}
    </div>
  );
}
export default Button;
