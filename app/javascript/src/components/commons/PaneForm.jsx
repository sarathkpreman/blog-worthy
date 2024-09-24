import React, { useEffect, useState } from "react";

import postsApi from "../../apis/posts";

const PaneForm = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
      setLoading(false);
      onSuccess();
      onClose();
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onClose}
      />
      <div className="z-50 w-full max-w-xl transform rounded-lg bg-white p-8 shadow-2xl transition-all duration-300 ease-in-out">
        <h2
          className="mb-8 text-center text-3xl font-bold"
          style={{ color: "#484848" }}
        >
          Drop Your Ink and Let It Flow!
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-semibold"
              style={{ color: "#484848" }}
            >
              What’s on Your Mind?
            </label>
            <input
              required
              className="mt-2 w-full rounded-lg border border-gray-300 p-4 shadow-sm transition duration-300 ease-in-out"
              placeholder="What brilliant idea do you want to share?"
              style={{ color: "#484848" }}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-semibold"
              style={{ color: "#484848" }}
            >
              Tell Us More! Dive into the Details…
            </label>
            <textarea
              required
              className="mt-2 w-full rounded-lg border border-gray-300 p-4 shadow-sm transition duration-300 ease-in-out"
              placeholder="Feel free to elaborate! Share your insights, experiences, or stories…"
              rows="4"
              style={{ color: "#484848" }}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:outline-none flex transform items-center space-x-2 rounded-lg px-4 py-2 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl focus:ring-2"
              disabled={loading}
              style={{ backgroundColor: "#00A699" }}
              type="submit"
            >
              <i className="ri-send-plane-fill text-lg" />
              <span>{loading ? "Splashing..." : "Ink It!"}</span>
            </button>
            <button
              className="focus:outline-none flex transform items-center space-x-2 rounded-lg px-4 py-2 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl focus:ring-2"
              style={{ backgroundColor: "#FF5A5F" }}
              type="button"
              onClick={onClose}
            >
              <i className="ri-close-fill text-lg" />
              <span>Maybe Later?</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaneForm;
