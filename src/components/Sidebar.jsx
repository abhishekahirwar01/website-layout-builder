import styles from "./Sidebar.module.css";
import { useContext } from "react";
import { BuilderContext } from "../context/BuilderContext";

const Sidebar = () => {
  const { onAddElement } = useContext(BuilderContext);

  const handleDragStart = (event, type) => {
    event.dataTransfer.setData("elementType", type);
  };

  return (
    <div className={`${styles.sidebar} bg-light p-3`}>
      <h3>Elements</h3>
      <div
        draggable
        onDragStart={(event) => handleDragStart(event, "text")}
        className={`${styles.elementButton} btn btn-primary w-100 mb-2`}
      >
        Add Text
      </div>
      <div
        draggable
        onDragStart={(event) => handleDragStart(event, "image")}
        className={`${styles.elementButton} btn btn-primary w-100 mb-2`}
      >
        Add Image
      </div>
      <div
        draggable
        onDragStart={(event) => handleDragStart(event, "button")}
        className={`${styles.elementButton} btn btn-primary w-100 mb-2`}
      >
        Add Button
      </div>
    </div>
  );
};

export default Sidebar;
