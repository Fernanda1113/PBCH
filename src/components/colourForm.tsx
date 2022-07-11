import { React } from "../../deps.ts";

const ColourForm = () => {
  return (
    <form action="/" method="post" style={{ width: "25rem" }}>
      <div className="input-group my-4">
        <input
          type="text"
          name="color"
          className="form-control"
          placeholder="Introduce un color en inglés"
        />
        <button className="btn btn-outline-primary" type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ColourForm;