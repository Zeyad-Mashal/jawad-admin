import React, { useState, useEffect } from "react";
import "./PhotoGrapher.css";
import GetPhotoGraphers from "../../API/PhotoGraphers/GetPhotoGraphers";
import AddPhotographer from "../../API/PhotoGraphers/AddPhotographer";
import DeletePhotographer from "../../API/PhotoGraphers/DeletePhotographer";
import PhotoPercentage from "../../API/PhotoGraphers/PhotoPercentage";
const PhotoGrapher = () => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [allPhotoGraphers, setAllPhotoGraphers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPhotographerId, setSelectedPhotographerId] = useState(null);
  const [percentageModel, setPercentageModel] = useState(false);
  const [percentageValue, setPercentageValue] = useState("");
  const [percentagePhotoId, setPercentagePhotoId] = useState(null);

  useEffect(() => {
    getAllPhotographers();
  }, []);

  const getAllPhotographers = () => {
    GetPhotoGraphers(setloading, setError, setAllPhotoGraphers);
  };

  const openModal = (images) => {
    setSelectedImages(images);
    setModalOpen(true);
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedPhotographerId(id);
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImages([]);
  };

  const handleAddPhotographer = () => {
    const data = {
      arName,
      enName,
      email,
      password,
      phone,
    };
    AddPhotographer(setloading, setError, data, getAllPhotographers);
  };

  const confirmDeletePhotographer = () => {
    DeletePhotographer(
      setloading,
      setError,
      selectedPhotographerId,
      setDeleteModalOpen,
      getAllPhotographers
    );
  };

  const addPhotoPercentage = () => {
    if (!percentageValue.trim()) {
      setError("please enter the percentage");
      return;
    }
    const data = {
      profitPercentage: percentageValue,
    };

    // Store in localStorage
    localStorage.setItem(`photographer_percentage_${percentagePhotoId}`, percentageValue);

    PhotoPercentage(
      setloading,
      setError,
      data,
      percentagePhotoId,
      setPercentageModel,
      getAllPhotographers
    );
  };

  const openPercentageModal = (photoId, currentPercentage = "") => {
    setPercentagePhotoId(photoId);
    // Check localStorage if currentPercentage is empty
    const storedPercentage = currentPercentage || localStorage.getItem(`photographer_percentage_${photoId}`) || "";
    setPercentageValue(storedPercentage);
    setPercentageModel(true);
    setError(null);
  };

  return (
    <div className="stable">
      <div className="stable_container">
        <div className="stable_header">
          <h1>Add PhotoGrapher</h1>
          <p>Fill in the details below to add a new stable.</p>
        </div>

        <div className="stable_content">
          <div className="stable_content_flex">
            <input
              type="text"
              placeholder="arName"
              value={arName}
              onChange={(e) => setArName(e.target.value)}
            />
            <input
              type="text"
              placeholder="enName"
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
            />
          </div>
          <div className="stable_content_flex">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error}
          <button onClick={handleAddPhotographer}>
            {loading ? "loading..." : "Add New PhotoGrapher"}
          </button>
        </div>

        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Total Rating</th>
                <th>Is Completed?</th>
                <th>Percentage</th>
                <th>Images</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allPhotoGraphers.map((item, index) => (
                <tr key={index}>
                  <td>{item.name?.ar}</td>
                  <td>{item.email}</td>
                  <td>{item.city?.ar ? item.city?.ar : "_____"}</td>
                  <td>{item.totalRating}</td>
                  <td>{item.completed ? "Completed" : "Not Completed"}</td>
                  <td>
                    <div className="percentage_cell_wrapper">
                      {(item.profitPercentage || item.percentage || localStorage.getItem(`photographer_percentage_${item._id}`)) && (
                        <div className="percentage_display">
                          <span className="percentage_value">
                            {item.profitPercentage || item.percentage || localStorage.getItem(`photographer_percentage_${item._id}`)}%
                          </span>
                        </div>
                      )}
                      <button
                        className="percentage_btn"
                        onClick={() =>
                          openPercentageModal(
                            item._id,
                            item.profitPercentage || item.percentage || localStorage.getItem(`photographer_percentage_${item._id}`) || ""
                          )
                        }
                      >
                        {item.profitPercentage || item.percentage || localStorage.getItem(`photographer_percentage_${item._id}`)
                          ? "Update"
                          : "Add Percentage"}
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="show-images-btn"
                      onClick={() => openModal(item.picUrls)}
                    >
                      Show All Images
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleOpenDeleteModal(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
              <div className="images-grid">
                {selectedImages.map((img, idx) => (
                  <img key={idx} src={img} alt={`img-${idx}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {deleteModalOpen && (
          <div
            className="modal-overlay"
            onClick={() => setDeleteModalOpen(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Are you sure you want to delete this photographer?</h3>
              {error}
              <div className="modal-actions">
                <button
                  onClick={confirmDeletePhotographer}
                  className="confirm-btn"
                >
                  {loading ? "loading..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======= PERCENTAGE POPUP ======= */}
        {percentageModel && (
          <>
            <div
              className="modal-overlay"
              onClick={() => {
                setPercentageModel(false);
                setPercentageValue("");
                setPercentagePhotoId(null);
                setError(null);
              }}
            />
            <div className="percentage_modal" onClick={(e) => e.stopPropagation()}>
              <div className="percentage_modal_header">
                <h3>📊 Photographer Percentage</h3>
                <button
                  className="percentage_close_btn"
                  onClick={() => {
                    setPercentageModel(false);
                    setPercentageValue("");
                    setPercentagePhotoId(null);
                    setError(null);
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="percentage_modal_body">
                <div className="percentage_info_card">
                  <div className="percentage_info_label">Photographer ID</div>
                  <div className="percentage_info_value">{percentagePhotoId || "N/A"}</div>
                </div>
                <div className="percentage_input_group">
                  <label htmlFor="percentage-input">Percentage (%)</label>
                  <div className="percentage_input_wrapper">
                    <input
                      id="percentage-input"
                      type="number"
                      placeholder="Enter percentage"
                      value={percentageValue}
                      onChange={(e) => setPercentageValue(e.target.value)}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <span className="percentage_symbol">%</span>
                  </div>
                  {percentageValue && (
                    <div className="percentage_preview">
                      Current Value: <strong>{percentageValue}%</strong>
                    </div>
                  )}
                </div>
                {error && <div className="form_error">{error}</div>}
                <div className="percentage_modal_actions">
                  <button
                    className="percentage_save_btn"
                    onClick={addPhotoPercentage}
                    disabled={loading || !percentageValue.trim()}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span> Saving...
                      </>
                    ) : percentageValue ? (
                      "✓ Update Percentage"
                    ) : (
                      "➕ Add Percentage"
                    )}
                  </button>
                  <button
                    className="percentage_cancel_btn"
                    onClick={() => {
                      setPercentageModel(false);
                      setPercentageValue("");
                      setPercentagePhotoId(null);
                      setError(null);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PhotoGrapher;
