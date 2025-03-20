import { useContext } from "react";
import { BuilderContext } from "../context/BuilderContext";
import Element from "./Element";
import styles from "./DropArea.module.css";

const DropArea = () => {
  const {
    elements,
    setElements,
    previewElements,
    showPreview,
    setShowPreview,
  } = useContext(BuilderContext);

  const handleDragStart = (event, element) => {
    event.dataTransfer.setData("elementId", element.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const elementType = event.dataTransfer.getData("elementType");
    const elementId = event.dataTransfer.getData("elementId");

    if (elementType) {
      // New element from Sidebar
      const newElement = {
        id: `element-${elements.length}`,
        type: elementType,
        content: elementType === "text" ? "New Text" : "",
        fontSize: "16px",
        color: "#000000",
        backgroundColor: "#ffffff",
        imageUrl: "",
        imageWidth: "100px",
        imageHeight: "100px",
        buttonText: "Button",
        buttonColor: "#007bff",
        buttonBorderRadius: "4px",
        alignment: "left",
      };
      setElements((prevElements) => [...prevElements, newElement]); // Use previous state
    } else if (elementId) {
      // Existing element being dragged within DropArea
      const draggedElement = elements.find((el) => el.id === elementId);
      const updatedElements = elements.filter((el) => el.id !== elementId);

      // Calculate the drop position
      const dropY = event.clientY;
      const dropIndex = findDropIndex(updatedElements, dropY);

      // Insert the dragged element at the new position
      updatedElements.splice(dropIndex, 0, draggedElement);
      setElements(updatedElements);
    }
  };

  // Helper function to find the index where the element should be dropped
  const findDropIndex = (elements, dropY) => {
    for (let i = 0; i < elements.length; i++) {
      const element = document.getElementById(elements[i].id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (dropY < rect.top + rect.height / 2) {
          return i;
        }
      }
    }
    return elements.length; // If dropped at the end
  };

  // Function to close the preview and clear DropArea
  const handleSaveAndClose = () => {
    setShowPreview(false); // Close preview
    setElements([]); // Clear DropArea
  };

  return (
    <div
      className={`${styles.dropArea} flex-grow-1 p-4 `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          id={element.id}
          draggable
          onDragStart={(event) => handleDragStart(event, element)}
          className={`${styles.element} p-3 mb-2 bg-white border rounded`}
        >
          <Element element={element} />
        </div>
      ))}
      {/* Display Preview Elements if showPreview is true */}
      {showPreview && previewElements.length > 0 && (
        <div className={styles.previewContainer}>
          <div className={styles.previewHeader}>
            <h4>Preview of All Elements:</h4>
            <button
              onClick={() => setShowPreview(false)}
              className={styles.closePreviewButton}
            >
              Close Preview
            </button>
          </div>
          {previewElements.map((element) => (
            <div key={element.id} className={styles.previewElement}>
              <Element element={element} showEditButton={false} />{" "}
              {/* Hide Edit button */}
            </div>
          ))}
          {/* Add Save button at the bottom center */}
          <div className={styles.saveButtonContainer}>
            <button onClick={handleSaveAndClose} className={styles.saveButton}>
              Save All
            </button>
          </div>
        </div>
      )}
      {elements.length === 0 && !showPreview && (
        <p className={styles.dropAreaText}>Drop Item Here</p>
      )}
    </div>
  );
};

export default DropArea;
