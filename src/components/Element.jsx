import { useContext } from "react";
import { BuilderContext } from "../context/BuilderContext";
import styles from "./Element.module.css";

const Element = ({ element, showEditButton = true }) => {
  // Add showEditButton prop
  const { onEdit, onDelete, showPreview } = useContext(BuilderContext);

  // Apply alignment style
  const alignmentStyle = {
    textAlign: element.alignment || "left", // Default to left if alignment is not set
  };

  return (
    <div className={styles.elementContainer} style={alignmentStyle}>
      <div className={styles.elementContent}>
        {element.type === "text" && (
          <p
            style={{
              fontSize: element.fontSize,
              color: element.color,
              backgroundColor: element.backgroundColor,
            }}
          >
            {element.content}
          </p>
        )}
        {element.type === "image" && (
          <img
            src={element.imageUrl || "placeholder.jpg"}
            alt="Image"
            style={{ width: element.imageWidth, height: element.imageHeight }}
            className="img-fluid"
          />
        )}
        {element.type === "button" && (
          <button
            style={{
              backgroundColor: element.buttonColor,
              borderRadius: element.buttonBorderRadius,
            }}
            className="btn"
          >
            {element.buttonText}
          </button>
        )}
      </div>

      {/* Conditionally render Edit and Delete buttons */}
      {!showPreview &&
        showEditButton && ( // Hide Edit button in preview mode
          <div className={styles.iconsContainer}>
            {/* Edit Icon */}
            <span
              className={`bi bi-pencil ${styles.editIcon}`}
              onClick={() => onEdit(element)}
            ></span>

            {/* Delete Icon */}
            <span
              className={`bi bi-trash ${styles.deleteIcon}`}
              onClick={() => onDelete(element.id)}
            ></span>
          </div>
        )}
    </div>
  );
};

export default Element;
