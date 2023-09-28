import "./Card.css";
function Card(props) {
  return (
    <div>
      <div className="card-header">{props.header}</div>
      <div className="card-body">{props.comp}</div>
    </div>
  );
}

export default Card;
