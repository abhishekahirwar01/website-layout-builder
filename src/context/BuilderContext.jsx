import { createContext, useState } from "react";

export const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [previewElements, setPreviewElements] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const onAddElement = (type) => {
    const newElement = {
      id: `element-${elements.length}`,
      type,
      content: type === "text" ? "New Text" : "",
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
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const onEdit = (element) => {
    setSelectedElement(element);
    setShowPreview(false);
  };

  const onUpdate = (updatedElement) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === updatedElement.id ? updatedElement : el
      )
    );
    setSelectedElement(null);
    setPreviewElements([]);
    setShowPreview(false);
  };

  const onDelete = (elementId) => {
    setElements((prevElements) =>
      prevElements.filter((el) => el.id !== elementId)
    );
    setSelectedElement(null);
  };

  // Add this function to handle Save All
  const onSaveAll = () => {
    setPreviewElements([...elements]); // Set previewElements to all elements
    setShowPreview(true); // Show preview
  };

  return (
    <BuilderContext.Provider
      value={{
        elements,
        selectedElement,
        previewElements,
        showPreview,
        onAddElement,
        onEdit,
        onUpdate,
        onDelete,
        onSaveAll, // Add onSaveAll to context
        setElements,
        setSelectedElement,
        setPreviewElements,
        setShowPreview,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
