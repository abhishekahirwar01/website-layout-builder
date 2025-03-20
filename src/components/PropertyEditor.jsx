import { useState, useContext, useEffect } from "react";
import styles from "./PropertyEditor.module.css";
import { BuilderContext } from "../context/BuilderContext";

const PropertyEditor = () => {
  const {
    elements,
    selectedElement,
    previewElements,
    showPreview,
    onUpdate,
    setSelectedElement,
    setPreviewElements,
    setShowPreview,
  } = useContext(BuilderContext);

  // State for input fields
  const [content, setContent] = useState("");
  const [fontSize, setFontSize] = useState("16px");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [imageUrl, setImageUrl] = useState("");
  const [imageWidth, setImageWidth] = useState("100px");
  const [imageHeight, setImageHeight] = useState("100px");
  const [buttonText, setButtonText] = useState("Button");
  const [buttonColor, setButtonColor] = useState("#007bff");
  const [buttonBorderRadius, setButtonBorderRadius] = useState("4px");
  const [alignment, setAlignment] = useState("left");

  // Reset input fields when selectedElement changes
  useEffect(() => {
    if (selectedElement) {
      setContent(selectedElement.content || "");
      setFontSize(selectedElement.fontSize || "16px");
      setColor(selectedElement.color || "#000000");
      setBackgroundColor(selectedElement.backgroundColor || "#ffffff");
      setImageUrl(selectedElement.imageUrl || "");
      setImageWidth(selectedElement.imageWidth || "100px");
      setImageHeight(selectedElement.imageHeight || "100px");
      setButtonText(selectedElement.buttonText || "Button");
      setButtonColor(selectedElement.buttonColor || "#007bff");
      setButtonBorderRadius(selectedElement.buttonBorderRadius || "4px");
      setAlignment(selectedElement.alignment || "left");
    } else {
      // Reset all fields if no element is selected
      setContent("");
      setFontSize("16px");
      setColor("#000000");
      setBackgroundColor("#ffffff");
      setImageUrl("");
      setImageWidth("100px");
      setImageHeight("100px");
      setButtonText("Button");
      setButtonColor("#007bff");
      setButtonBorderRadius("4px");
      setAlignment("left");
    }
  }, [selectedElement]);

  const handleSave = () => {
    const updatedElement = { ...selectedElement };
    if (selectedElement.type === "text") {
      updatedElement.content = content;
      updatedElement.fontSize = fontSize;
      updatedElement.color = color;
      updatedElement.backgroundColor = backgroundColor;
    } else if (selectedElement.type === "image") {
      updatedElement.imageUrl = imageUrl;
      updatedElement.imageWidth = imageWidth;
      updatedElement.imageHeight = imageHeight;
    } else if (selectedElement.type === "button") {
      updatedElement.buttonText = buttonText;
      updatedElement.buttonColor = buttonColor;
      updatedElement.buttonBorderRadius = buttonBorderRadius;
    }
    updatedElement.alignment = alignment;
    onUpdate(updatedElement);
    setSelectedElement(null); // Clear selected element
  };

  const handlePreviewAll = () => {
    setPreviewElements([...elements]);
    setShowPreview(true);
  };

  if (!selectedElement) {
    return null;
  }

  return (
    <div className={styles.propertyEditor}>
      <h3>Edit Properties</h3>
      {selectedElement && (
        <div className={styles.propertiesContainer}>
          {/* Alignment Control */}
          <div className={styles.propertyField}>
            <label>Alignment:</label>
            <select
              value={alignment}
              onChange={(e) => setAlignment(e.target.value)}
              className={styles.inputField}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          {selectedElement.type === "text" && (
            <>
              <div className={styles.propertyField}>
                <label>Content:</label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.propertyField}>
                <label>Font Size:</label>
                <input
                  type="text"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.propertyField}>
                <label>Text Color:</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.propertyField}>
                <label>Background Color:</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className={styles.inputField}
                />
              </div>
            </>
          )}
          {selectedElement.type === "image" && (
            <>
              <div className={styles.propertyField}>
                <label>Image URL:</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.propertyField}>
                <label>Image Width:</label>
                <input
                  type="text"
                  value={imageWidth}
                  onChange={(e) => setImageWidth(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.propertyField}>
                <label>Image Height:</label>
                <input
                  type="text"
                  value={imageHeight}
                  onChange={(e) => setImageHeight(e.target.value)}
                  className={styles.inputField}
                />
              </div>
            </>
          )}
          {selectedElement.type === "button" && (
            <>
              <div className={styles.propertyField}>
                <label>Button Text:</label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.propertyField}>
                <label>Button Color:</label>
                <input
                  type="color"
                  value={buttonColor}
                  onChange={(e) => setButtonColor(e.target.value)}
                  className={styles.inputField}
                />
              </div>
              <div className={styles.propertyField}>
                <label>Button Border Radius:</label>
                <input
                  type="text"
                  value={buttonBorderRadius}
                  onChange={(e) => setButtonBorderRadius(e.target.value)}
                  className={styles.inputField}
                />
              </div>
            </>
          )}
          <div className={styles.buttonContainer}>
            <button onClick={handlePreviewAll} className={styles.previewButton}>
              Preview All
            </button>
            <button onClick={handleSave} className={styles.saveButton}>
              Save Element
            </button>
            <button
              onClick={() => setSelectedElement(null)}
              className={styles.closeButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyEditor;
