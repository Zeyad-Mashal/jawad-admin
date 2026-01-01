import React, { useState, useEffect } from "react";
import GetSchool from "../../API/School/GetSchool";
import "./school.css"; // تأكد إن فيه CSS للمودال
import AddSchool from "../../API/School/AddSchool";
import CompleteSchool from "../../API/School/CompleteSchool";
import UpdateSchool from "../../API/School/UpdateSchool";
import DeleteSchool from "../../API/School/DeleteSchool";
import SchoolPercentage from "../../API/School/SchoolPercentage";
const School = () => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [allSchools, setAllSchools] = useState([]);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const [completionModal, setCompletionModal] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);

  const [arCity, setArCity] = useState("");
  const [enCity, setEnCity] = useState("");
  const [arRegion, setArRegion] = useState("");
  const [enRegion, setEnRegion] = useState("");
  const [arAddress, setArAddress] = useState("");
  const [enAddress, setEnAddress] = useState("");
  const [location, setLocation] = useState("");
  const [arDescription, setArDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [image, setImage] = useState(null);
  const [prices, setPrices] = useState([{ name: "", cost: "" }]);
  const [settingsModel, setSettingsModel] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editSchoolData, setEditSchoolData] = useState(null);
  const [schoolForSettings, setSchoolForSettings] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [percentageModel, setPercentageModel] = useState(false);
  const [percentageValue, setPercentageValue] = useState("");
  const [percentageSchoolId, setPercentageSchoolId] = useState(null);
  useEffect(() => {
    getAllSchools();
  }, []);

  const getAllSchools = () => {
    GetSchool(setloading, setError, setAllSchools);
  };

  const handleShowPrices = (prices) => {
    setSelectedPrices(Array.isArray(prices) ? prices : []);
    setShowModal(true);
  };

  const handleAddSchool = () => {
    if (
      arName === "" ||
      enName === "" ||
      email === "" ||
      password === "" ||
      phone === ""
    ) {
      alert("you must fill all fields first");
      return;
    }
    const data = {
      arName,
      enName,
      email,
      password,
      phone,
    };
    AddSchool(setloading, setError, data, getAllSchools);
  };

  const handleOpenCompletionModal = (id) => {
    setSelectedSchoolId(id);
    setCompletionModal(true);
  };
  const handleCompleteSchool = () => {
    const data = new FormData();
    data.append("image", image);
    data.append("arCity", arCity);
    data.append("enCity", enCity);
    data.append("arRegion", arRegion);
    data.append("enRegion", enRegion);
    data.append("arAddress", arAddress);
    data.append("enAddress", enAddress);
    data.append("location", location);
    data.append("enDescription", enDescription);
    data.append("arDescription", arDescription);
    prices.forEach((price, index) => {
      data.append(`price[${index}][name]`, price.name);
      data.append(`price[${index}][cost]`, price.cost);
    });

    CompleteSchool(
      setloading,
      setError,
      data,
      selectedSchoolId,
      setCompletionModal,
      getAllSchools
    );
  };
  const handleEditSchool = (school) => {
    setEditSchoolData({
      id: school._id,
      arName: school.name?.ar || "",
      enName: school.name?.en || "",
      email: school.email || "",
      phone: school.phone || "",
      arCity: school.city?.ar || "",
      enCity: school.city?.en || "",
      arRegion: school.region?.ar || "",
      enRegion: school.region?.en || "",
      arAddress: school.address?.ar || "",
      enAddress: school.address?.en || "",
      location: school.location || "",
      arDescription: school.description?.ar || "",
      enDescription: school.description?.en || "",
      prices: school.price || [{ name: "", cost: "" }],
      image: null,
    });
    setEditModal(true);
  };

  const handleUpdateSchool = () => {
    if (!editSchoolData) return;
    const data = new FormData();
    if (editSchoolData.image) {
      data.append("image", editSchoolData.image);
    }
    data.append("arName", editSchoolData.arName);
    data.append("enName", editSchoolData.enName);
    data.append("arCity", editSchoolData.arCity);
    data.append("enCity", editSchoolData.enCity);
    data.append("arRegion", editSchoolData.arRegion);
    data.append("enRegion", editSchoolData.enRegion);
    data.append("arAddress", editSchoolData.arAddress);
    data.append("enAddress", editSchoolData.enAddress);
    data.append("location", editSchoolData.location);
    data.append("arDescription", editSchoolData.arDescription);
    data.append("enDescription", editSchoolData.enDescription);
    data.append("email", editSchoolData.email);
    data.append("phone", editSchoolData.phone);
    editSchoolData.prices.forEach((price, index) => {
      data.append(`price[${index}][name]`, price.name);
      data.append(`price[${index}][cost]`, price.cost);
    });
    UpdateSchool(
      setloading,
      setError,
      data,
      editSchoolData.id,
      setEditModal,
      getAllSchools
    );
  };
  const handleDeleteSchool = () => {
    DeleteSchool(
      setloading,
      setError,
      schoolForSettings._id,
      setDeleteModal,
      getAllSchools
    );
  };

  const addSchoolPercentage = () => {
    if (!percentageValue.trim()) {
      setError("please enter the percentage");
      return;
    }
    const data = {
      profitPercentage: percentageValue,
    };

    // Store in localStorage
    localStorage.setItem(
      `school_percentage_${percentageSchoolId}`,
      percentageValue
    );

    SchoolPercentage(
      setloading,
      setError,
      data,
      percentageSchoolId,
      setPercentageModel,
      getAllSchools
    );
  };

  const openPercentageModal = (schoolId, currentPercentage = "") => {
    setPercentageSchoolId(schoolId);
    // Check localStorage if currentPercentage is empty
    const storedPercentage =
      currentPercentage ||
      localStorage.getItem(`school_percentage_${schoolId}`) ||
      "";
    setPercentageValue(storedPercentage);
    setPercentageModel(true);
    setError(null);
  };

  return (
    <div className="stable">
      <div className="stable_container">
        <div className="stable_header">
          <h1>Add School</h1>
          <p>Fill in the details below to add a new School.</p>
        </div>
        <div className="stable_content">
          <div className="stable_content_flex">
            <input
              type="text"
              placeholder="الاسم بالعربي"
              value={arName}
              onChange={(e) => setArName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
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
          <button onClick={handleAddSchool}>
            {loading ? "loading..." : "Add School"}
          </button>
        </div>

        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Arabic Name</th>
                <th>English Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>City</th>
                <th>Region</th>
                <th>Address</th>
                <th>Services</th>
                <th>Comleted ?</th>
                <th>Percentage</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              {allSchools.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.picUrl ? (
                      <img src={item.picUrl} alt="" className="school_image" />
                    ) : (
                      "no image yet"
                    )}
                  </td>
                  <td>{item.name.ar}</td>
                  <td>{item.name.en}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.city?.ar ? item.city?.ar : "____"}</td>
                  <td>{item.region?.ar ? item.region?.ar : "____"}</td>
                  <td>{item.address?.ar ? item.address?.ar : "____"}</td>
                  <td>
                    <button onClick={() => handleShowPrices(item.price)}>
                      Show
                    </button>
                  </td>
                  <td>
                    {item.completed ? (
                      <p className="completed">completed</p>
                    ) : (
                      <p
                        className="notcompleted"
                        onClick={() => handleOpenCompletionModal(item._id)}
                        style={{ cursor: "pointer" }}
                      >
                        not completed
                      </p>
                    )}
                  </td>
                  <td>
                    <div className="percentage_cell_wrapper">
                      {(item.profitPercentage ||
                        item.percentage ||
                        localStorage.getItem(
                          `school_percentage_${item._id}`
                        )) && (
                        <div className="percentage_display">
                          <span className="percentage_value">
                            {item.profitPercentage ||
                              item.percentage ||
                              localStorage.getItem(
                                `school_percentage_${item._id}`
                              )}
                            %
                          </span>
                        </div>
                      )}
                      <button
                        className="percentage_btn"
                        onClick={() =>
                          openPercentageModal(
                            item._id,
                            item.profitPercentage ||
                              item.percentage ||
                              localStorage.getItem(
                                `school_percentage_${item._id}`
                              ) ||
                              ""
                          )
                        }
                      >
                        {item.profitPercentage ||
                        item.percentage ||
                        localStorage.getItem(`school_percentage_${item._id}`)
                          ? "Update"
                          : "Add Percentage"}
                      </button>
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      setSettingsModel(true);
                      setSchoolForSettings(item);
                    }}
                  >
                    ⚙️
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>الخدمات والأسعار</h2>
            {selectedPrices && selectedPrices.length > 0 ? (
              <ul>
                {selectedPrices.map((service, idx) => (
                  <li key={idx}>
                    <strong>{service?.name || "N/A"}</strong>:{" "}
                    {service?.cost || "N/A"} جنيه
                  </li>
                ))}
              </ul>
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "var(--text-secondary)",
                  padding: "2rem",
                }}
              >
                لا توجد خدمات متاحة
              </p>
            )}
            <button
              className="close-prices-btn"
              onClick={() => setShowModal(false)}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
      {completionModal && (
        <div
          className="modal-overlay"
          onClick={() => setCompletionModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>استكمال بيانات المدرسة</h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />

            {image && (
              <div className="preview-container">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="image-preview"
                  style={{ width: 350 }}
                />
              </div>
            )}

            <div className="stable_content_flex">
              <input
                type="text"
                placeholder="المدينة بالعربي"
                value={arCity}
                onChange={(e) => setArCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="City (EN)"
                value={enCity}
                onChange={(e) => setEnCity(e.target.value)}
              />
            </div>
            <div className="stable_content_flex">
              <input
                type="text"
                placeholder="المنطقة بالعربي"
                value={arRegion}
                onChange={(e) => setArRegion(e.target.value)}
              />
              <input
                type="text"
                placeholder="Region (EN)"
                value={enRegion}
                onChange={(e) => setEnRegion(e.target.value)}
              />
            </div>
            <div className="stable_content_flex">
              <input
                type="text"
                placeholder="العنوان بالعربي"
                value={arAddress}
                onChange={(e) => setArAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address (EN)"
                value={enAddress}
                onChange={(e) => setEnAddress(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="الموقع الجغرافي (location)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <textarea
              placeholder="الوصف بالعربي"
              value={arDescription}
              onChange={(e) => setArDescription(e.target.value)}
            />
            <textarea
              placeholder="Description (EN)"
              value={enDescription}
              onChange={(e) => setEnDescription(e.target.value)}
            />

            <h4>الخدمات والأسعار:</h4>
            {prices.map((price, idx) => (
              <div key={idx} className="stable_content_flex">
                <input
                  type="text"
                  placeholder="اسم الخدمة"
                  value={price.name}
                  onChange={(e) => {
                    const newPrices = [...prices];
                    newPrices[idx].name = e.target.value;
                    setPrices(newPrices);
                  }}
                />
                <input
                  type="number"
                  placeholder="السعر"
                  value={price.cost}
                  onChange={(e) => {
                    const newPrices = [...prices];
                    newPrices[idx].cost = e.target.value;
                    setPrices(newPrices);
                  }}
                />
                <button
                  onClick={() => {
                    const newPrices = prices.filter((_, i) => i !== idx);
                    setPrices(newPrices);
                  }}
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              onClick={() => setPrices([...prices, { name: "", cost: "" }])}
              className="add_prices"
            >
              ➕ أضف خدمة
            </button>

            <br />
            {error}
            <button
              className="submit-completion-btn"
              onClick={handleCompleteSchool}
            >
              {loading ? "loading..." : "حفظ البيانات"}
            </button>
            <button
              className="close-prices-btn"
              onClick={() => setCompletionModal(false)}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
      {settingsModel && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setSettingsModel(false)}
          ></div>
          <div className="modal-content settings">
            <div className="settings_btns">
              <button
                onClick={() => {
                  handleEditSchool(schoolForSettings);
                  setSettingsModel(false);
                }}
              >
                Edit School
              </button>
              <button
                onClick={() => {
                  handleEditSchool(schoolForSettings);
                  setDeleteModal(true);
                  setSettingsModel(false);
                  setEditModal(false);
                }}
              >
                Delete School
              </button>
            </div>
          </div>
        </>
      )}
      {editModal && (
        <div className="modal-overlay" onClick={() => setEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>تعديل بيانات المدرسة</h2>

            <input
              type="file"
              onChange={(e) =>
                setEditSchoolData({
                  ...editSchoolData,
                  image: e.target.files[0],
                })
              }
            />

            {editSchoolData.image ? (
              <div className="preview-container">
                <img
                  src={URL.createObjectURL(editSchoolData.image)}
                  alt="preview"
                  className="image-preview"
                  style={{ width: 350 }}
                />
              </div>
            ) : schoolForSettings?.picUrl ? (
              <div className="preview-container">
                <img
                  src={schoolForSettings.picUrl}
                  alt="existing"
                  className="image-preview"
                  style={{ width: 350 }}
                />
              </div>
            ) : null}

            <input
              type="text"
              placeholder="اسم المدرسة (عربي)"
              value={editSchoolData.arName}
              onChange={(e) =>
                setEditSchoolData({
                  ...editSchoolData,
                  arName: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="School Name (EN)"
              value={editSchoolData.enName}
              onChange={(e) =>
                setEditSchoolData({ ...editSchoolData, enName: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="العنوان بالعربي"
              value={editSchoolData.arAddress}
              onChange={(e) =>
                setEditSchoolData({
                  ...editSchoolData,
                  arAddress: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Address (EN)"
              value={editSchoolData.enAddress}
              onChange={(e) =>
                setEditSchoolData({
                  ...editSchoolData,
                  enAddress: e.target.value,
                })
              }
            />

            <div className="stable_content_flex">
              <input
                type="text"
                placeholder="المدينة بالعربي"
                value={editSchoolData.arCity}
                onChange={(e) =>
                  setEditSchoolData({
                    ...editSchoolData,
                    arCity: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="City (EN)"
                value={editSchoolData.enCity}
                onChange={(e) =>
                  setEditSchoolData({
                    ...editSchoolData,
                    enCity: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="text"
              placeholder="phone"
              value={editSchoolData?.phone || ""}
              onChange={(e) =>
                setEditSchoolData({ ...editSchoolData, phone: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={editSchoolData?.email || ""}
              onChange={(e) =>
                setEditSchoolData({ ...editSchoolData, email: e.target.value })
              }
            />

            <textarea
              placeholder="وصف مختصر"
              value={editSchoolData.arDescription}
              onChange={(e) =>
                setEditSchoolData({
                  ...editSchoolData,
                  arDescription: e.target.value,
                })
              }
            />
            <textarea
              placeholder="وصف تفصيلي"
              value={editSchoolData.enDescription}
              onChange={(e) =>
                setEditSchoolData({
                  ...editSchoolData,
                  enDescription: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="رابط الخريطة (Google Maps)"
              value={editSchoolData.location}
              onChange={(e) =>
                setEditSchoolData({
                  ...editSchoolData,
                  location: e.target.value,
                })
              }
            />

            <h4>الخدمات والأسعار:</h4>
            {editSchoolData.prices.map((price, idx) => (
              <div key={idx} className="stable_content_flex">
                <input
                  type="text"
                  placeholder="اسم الخدمة"
                  value={price.name}
                  onChange={(e) => {
                    const newPrices = [...editSchoolData.prices];
                    newPrices[idx].name = e.target.value;
                    setEditSchoolData({ ...editSchoolData, prices: newPrices });
                  }}
                />
                <input
                  type="number"
                  placeholder="السعر"
                  value={price.cost}
                  onChange={(e) => {
                    const newPrices = [...editSchoolData.prices];
                    newPrices[idx].cost = e.target.value;
                    setEditSchoolData({ ...editSchoolData, prices: newPrices });
                  }}
                />
                <button
                  onClick={() => {
                    const newPrices = editSchoolData.prices.filter(
                      (_, i) => i !== idx
                    );
                    setEditSchoolData({ ...editSchoolData, prices: newPrices });
                  }}
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              onClick={() =>
                setEditSchoolData({
                  ...editSchoolData,
                  prices: [...editSchoolData.prices, { name: "", cost: "" }],
                })
              }
            >
              ➕ أضف خدمة
            </button>
            {error}
            <button
              className="submit-completion-btn"
              onClick={() => handleUpdateSchool()}
            >
              {loading ? "loading..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
      {deleteModal && (
        <>
          <div className="modal-overlay"></div>
          <div className="modal-content delete">
            <h2>Delete School</h2>
            <p>Are you sure you want to delete this school?</p>
            {error}
            <div className="delete_btns">
              <button onClick={() => setDeleteModal(false)}>Cancel</button>
              <button onClick={handleDeleteSchool}>
                {loading ? "Deleting..." : "Delete School"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* ======= PERCENTAGE POPUP ======= */}
      {percentageModel && (
        <>
          <div
            className="modal-overlay"
            onClick={() => {
              setPercentageModel(false);
              setPercentageValue("");
              setPercentageSchoolId(null);
              setError(null);
            }}
          />
          <div
            className="percentage_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="percentage_modal_header">
              <h3>📊 School Percentage</h3>
              <button
                className="percentage_close_btn"
                onClick={() => {
                  setPercentageModel(false);
                  setPercentageValue("");
                  setPercentageSchoolId(null);
                  setError(null);
                }}
              >
                ✕
              </button>
            </div>
            <div className="percentage_modal_body">
              <div className="percentage_info_card">
                <div className="percentage_info_label">School ID</div>
                <div className="percentage_info_value">
                  {percentageSchoolId || "N/A"}
                </div>
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
                  onClick={addSchoolPercentage}
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
                    setPercentageSchoolId(null);
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
  );
};

export default School;
