import React, { useState, useEffect } from "react";
import "./PhotoGrapher.css";
import GetPhotoGraphers from "../../API/PhotoGraphers/GetPhotoGraphers";
import AddPhotographer from "../../API/PhotoGraphers/AddPhotographer";
import DeletePhotographer from "../../API/PhotoGraphers/DeletePhotographer";
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
      </div>
    </div>
  );
};

export default PhotoGrapher;
