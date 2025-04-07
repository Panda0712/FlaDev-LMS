import ReactStars from "react-stars";

const Star = ({
  count = 5,
  value = 1,
  size = 24,
  edit = false,
  color1 = "#cbd5e1",
  color2 = "#ffd700",
}) => {
  return (
    <ReactStars
      count={count}
      value={value}
      edit={edit}
      size={size}
      color1={color1}
      color2={color2}
    />
  );
};

export default Star;
