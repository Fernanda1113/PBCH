import { React } from "../../deps.ts";

const List = ({ list }: { list: string[] }) => {
  return (
    <ul style={{ textAlign: "left" }}>
      {list.map((color, index) => (
        <li key={index} style={{ color, fontSize: "1.5rem" }}>
          {color}
        </li>
      ))}
    </ul>
  );
};

export default List;