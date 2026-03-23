import React, { useState, useEffect } from "react";
import "./PhotoGrapher.css";
import GetPhotoGraphers from "../../API/PhotoGraphers/GetPhotoGraphers";
import AddPhotographer from "../../API/PhotoGraphers/AddPhotographer";
import DeletePhotographer from "../../API/PhotoGraphers/DeletePhotographer";
import CreateCoupon from "../../API/Coupon/CreateCoupon";
import UpdateCoupon from "../../API/Coupon/UpdateCoupon";
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
  const [couponData, setCouponData] = useState({
    coupon: "",
    discount: "",
    startingDate: "",
    expiryDate: "",
  });
  const [selectedCouponId, setSelectedCouponId] = useState(null);
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

  const handleCouponFieldChange = (field, value) => {
    setCouponData((prev) => ({ ...prev, [field]: value }));
  };

  const addPhotoCoupon = () => {
    if (
      !couponData.coupon.trim() ||
      !couponData.discount.toString().trim() ||
      !couponData.startingDate ||
      !couponData.expiryDate
    ) {
      setError("please fill all coupon fields");
      return;
    }

    const payload = {
      coupon: couponData.coupon,
      discount: Number(couponData.discount),
      startingDate: couponData.startingDate,
      expiryDate: couponData.expiryDate,
    };

    const onSuccess = () => {
      setPercentageModel(false);
      setCouponData({ coupon: "", discount: "", startingDate: "", expiryDate: "" });
      setSelectedCouponId(null);
      setPercentagePhotoId(null);
      getAllPhotographers();
    };

    if (selectedCouponId) {
      UpdateCoupon(setloading, setError, selectedCouponId, payload, onSuccess);
      return;
    }

    CreateCoupon(setloading, setError, "photographer", payload, onSuccess);
  };

  const openPercentageModal = (photoId, couponInfo = {}) => {
    setPercentagePhotoId(photoId);
    setSelectedCouponId(couponInfo?._id || null);
    setCouponData({
      coupon: couponInfo?.coupon || "",
      discount:
        couponInfo?.discount === 0 || couponInfo?.discount
          ? String(couponInfo.discount)
          : "",
      startingDate: couponInfo?.startingDate
        ? String(couponInfo.startingDate).slice(0, 10)
        : "",
      expiryDate: couponInfo?.expiryDate
        ? String(couponInfo.expiryDate).slice(0, 10)
        : "",
    });
    setPercentageModel(true);
    setError(null);
  };

  const extractCouponInfo = (item) => {
    if (item?.coupon && typeof item.coupon === "object") return item.coupon;
    if (item?.couponDetails && typeof item.couponDetails === "object") return item.couponDetails;
    if (item?.couponData && typeof item.couponData === "object") return item.couponData;
    return {};
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
                (() => {
                  const couponInfo = extractCouponInfo(item);
                  const couponLabel = couponInfo?.coupon || "";
                  return (
                <tr key={index}>
                  <td>{item.name?.ar}</td>
                  <td>{item.email}</td>
                  <td>{item.city?.ar ? item.city?.ar : "_____"}</td>
                  <td>{item.totalRating}</td>
                  <td>{item.completed ? "Completed" : "Not Completed"}</td>
                  <td>
                    <div className="percentage_cell_wrapper">
                      {(couponLabel || couponInfo?.discount) && (
                        <div className="percentage_display">
                          <span className="percentage_value">
                            {couponLabel || "Coupon"}{" "}
                            {couponInfo?.discount ? `(${couponInfo.discount}%)` : ""}
                          </span>
                        </div>
                      )}
                      <button
                        className="percentage_btn"
                        onClick={() =>
                          openPercentageModal(item._id, couponInfo)
                        }
                      >
                        {couponInfo?._id ? "Update Coupon" : "Add Coupon"}
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
                  );
                })()
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
                setCouponData({
                  coupon: "",
                  discount: "",
                  startingDate: "",
                  expiryDate: "",
                });
                setSelectedCouponId(null);
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
                    setCouponData({
                      coupon: "",
                      discount: "",
                      startingDate: "",
                      expiryDate: "",
                    });
                    setSelectedCouponId(null);
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
                  <label htmlFor="coupon-input">Coupon Code</label>
                  <div className="percentage_input_wrapper">
                    <input
                      id="coupon-input"
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponData.coupon}
                      onChange={(e) =>
                        handleCouponFieldChange("coupon", e.target.value)
                      }
                    />
                  </div>
                  <div className="percentage_input_wrapper" style={{ marginTop: "10px" }}>
                    <input
                      type="number"
                      placeholder="Discount (%)"
                      value={couponData.discount}
                      onChange={(e) =>
                        handleCouponFieldChange("discount", e.target.value)
                      }
                    />
                    <span className="percentage_symbol">%</span>
                  </div>
                  <div className="percentage_input_wrapper" style={{ marginTop: "10px" }}>
                    <input
                      type="date"
                      value={couponData.startingDate}
                      onChange={(e) =>
                        handleCouponFieldChange("startingDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="percentage_input_wrapper" style={{ marginTop: "10px" }}>
                    <input
                      type="date"
                      value={couponData.expiryDate}
                      onChange={(e) =>
                        handleCouponFieldChange("expiryDate", e.target.value)
                      }
                    />
                  </div>
                  {couponData.coupon && (
                    <div className="percentage_preview">
                      Current Coupon:{" "}
                      <strong>
                        {couponData.coupon} ({couponData.discount || 0}%)
                      </strong>
                    </div>
                  )}
                </div>
                {error && <div className="form_error">{error}</div>}
                <div className="percentage_modal_actions">
                  <button
                    className="percentage_save_btn"
                    onClick={addPhotoCoupon}
                    disabled={
                      loading ||
                      !couponData.coupon.trim() ||
                      !couponData.discount.toString().trim() ||
                      !couponData.startingDate ||
                      !couponData.expiryDate
                    }
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span> Saving...
                      </>
                    ) : selectedCouponId ? (
                      "✓ Update Coupon"
                    ) : (
                      "➕ Add Coupon"
                    )}
                  </button>
                  <button
                    className="percentage_cancel_btn"
                    onClick={() => {
                      setPercentageModel(false);
                      setCouponData({
                        coupon: "",
                        discount: "",
                        startingDate: "",
                        expiryDate: "",
                      });
                      setSelectedCouponId(null);
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
