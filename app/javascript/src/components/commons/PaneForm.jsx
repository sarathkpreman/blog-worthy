import React, { useState } from "react";

import postsApi from "../../apis/posts";

const PaneForm = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await postsApi.create({ title, description });
      setLoading(false);
      onClose();
      onSuccess();
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              required
              className="mt-1 w-full border p-2"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              required
              className="mt-1 w-full border p-2"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              disabled={loading}
              type="submit"
            >
              {loading ? "Posting..." : "Create"}
            </button>
            <button
              className="rounded-lg bg-gray-300 px-4 py-2"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaneForm;
