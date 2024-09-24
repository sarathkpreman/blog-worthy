import React, { useState } from "react";

import PaneForm from "./PaneForm";

const WriterButton = ({ onSuccess }) => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);

  const handleFormSuccess = () => {
    setIsPaneOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="flex justify-center" style={{ color: "#484848" }}>
      <div
        className="rounded-full border p-3"
        style={{ borderColor: "#767676" }}
      >
        <button
          className="flex items-center"
          onClick={() => setIsPaneOpen(true)}
        >
          <i className="ri-quill-pen-fill text-xl" />
          <p className="text-lg">Inkdrop..</p>
        </button>
      </div>
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
