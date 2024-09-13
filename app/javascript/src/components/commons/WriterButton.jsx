import React, { useState } from "react";

import PaneForm from "./PaneForm";

const WriterButton = ({ onSuccess }) => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const handleFormSuccess = () => {
    setIsPaneOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="flex justify-center">
      <button className="flex items-center" onClick={() => setIsPaneOpen(true)}>
        <i className="ri-quill-pen-fill mr-1 text-lg" />
        <p className="text-sm">Create Post</p>
      </button>
      {isPaneOpen && (
        <PaneForm
          onClose={() => setIsPaneOpen(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default WriterButton;
