import React, { useState, useEffect, useMemo } from "react";
import "./AddStable.css";
import AddStable from "../../API/AddStable/AddStable";
import GetStable from "../../API/AddStable/GetStable";
import CompleteStable from "../../API/AddStable/CompleteStable";
import UpdateStable from "../../API/AddStable/UpdateStable";
import DeleteStable from "../../API/AddStable/DeleteStable";
import Disable from "../../API/AddStable/Disable";
import { Link } from "react-router-dom";
import CreateCoupon from "../../API/Coupon/CreateCoupon";
import UpdateCoupon from "../../API/Coupon/UpdateCoupon";
const Stable = () => {
  useEffect(() => {
    getAllStables();
  }, []);

  // ======= Local state =======
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");

  const [arTypeStable, setArTypeStable] = useState([]);
  const [enTypeStable, setEnTypeStable] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [allStables, setAllStables] = useState([]);
  const [model, setModel] = useState(false);
  const [completeModel, setCompleteModel] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedStable, setSelectedStable] = useState(null);
  const [completeStableId, setCompleteStableId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [arCity, setArCity] = useState("");
  const [enCity, setEnCity] = useState("");
  const [arRegion, setArRegion] = useState("");
  const [enRegion, setEnRegion] = useState("");
  const [arAddress, setArAddress] = useState("");
  const [enAddress, setEnAddress] = useState("");
  const [location, setLocation] = useState("");
  const [sessionRate, setSessionRate] = useState("");
  const [descAr, setDescAr] = useState("");
  const [descEn, setDescEn] = useState("");

  const [editModel, setEditModel] = useState(false);
  const [editingStableId, setEditingStableId] = useState(null);
  const [DeleteStableId, setDeleteStableId] = useState(null);
  const [deleteModel, setDeleteModel] = useState("");
  const [stableId, setStableId] = useState(null);
  const [percentageModel, setPercentageModel] = useState(false);
  const [couponData, setCouponData] = useState({
    coupon: "",
    discount: "",
    startingDate: "",
    expiryDate: "",
  });
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [percentageStableId, setPercentageStableId] = useState(null);

  // kept from your code (multi-select for a separate stable-type list used in Complete modal)
  const [selectedOptions, setSelectedOptions] = useState([]);
  const addArStableType = (value) => {
    if (!value) return;
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // ======= Options (can be moved to constants file or fetched later) =======
  const AR_STABLE_TYPES = useMemo(
    () => [
      "اختر النوع",
      "عربي",
      "جمل",
      "قفز",
      "تعليم",
      "تأجير",
      "جديد",
      "أخرى",
    ],
    []
  );

  const EN_STABLE_TYPES = useMemo(
    () => [
      "Choose type",
      "Arabian",
      "Camel",
      "Show Jumping",
      "Training",
      "Rental",
      "New",
      "Other",
    ],
    []
  );

  // ======= API helpers =======
  const addStableApi = () => {
    if (!arName.trim() || !enName.trim()) {
      setError("من فضلك اكتب الاسم بالعربي والإنجليزي");
      return;
    }
    const data = {
      arName,
      enName,
      arType: "null",
      enType: "null",
      email,
      password,
      phone,
    };

    setError(null);
    AddStable(setloading, setError, data, () => {
      // reset only the create form fields on success
      setArName("");
      setEnName("");
      setEmail("");
      setPassword("");
      setPhone("");
      getAllStables();
    });
  };

  const getAllStables = () => {
    GetStable(setloading, setError, setAllStables);
  };

  const completeStableData = () => {
    if (
      !image ||
      !arCity.trim() ||
      !enCity.trim() ||
      !arRegion.trim() ||
      !enRegion.trim() ||
      !arAddress.trim() ||
      !enAddress.trim() ||
      !location.trim() ||
      !sessionRate.trim() ||
      !descAr.trim() ||
      !descEn.trim()
    ) {
      setError("من فضلك املأ جميع الحقول");
      return;
    }

    const data = new FormData();
    data.append("image", image);
    data.append("arCity", arCity);
    data.append("enCity", enCity);
    data.append("arRegion", arRegion);
    data.append("enRegion", enRegion);
    data.append("arAddress", arAddress);
    data.append("enAddress", enAddress);
    data.append("location", location);
    data.append("sessionPercentage", sessionRate);
    data.append("descAr", descAr);
    data.append("descEn", descEn);
    arTypeStable.forEach((element) => {
      data.append("arVehicles[]", element);
    });

    enTypeStable.forEach((element) => {
      data.append("enVehicles[]", element);
    });

    CompleteStable(
      setloading,
      setError,
      data,
      completeStableId,
      setCompleteModel,
      getAllStables
    );
  };

  const updateStableData = () => {
    const data = new FormData();
    if (image) data.append("image", image);
    data.append("arCity", arCity);
    data.append("enCity", enCity);
    data.append("arRegion", arRegion);
    data.append("enRegion", enRegion);
    data.append("arAddress", arAddress);
    data.append("enAddress", enAddress);
    data.append("location", location);
    data.append("sessionPercentage", sessionRate);
    data.append("descAr", descAr);
    data.append("descEn", descEn);
    arTypeStable.forEach((element) => {
      data.append("arVehicles[]", element);
    });

    enTypeStable.forEach((element) => {
      data.append("enVehicles[]", element);
    });

    UpdateStable(
      setloading,
      setError,
      data,
      editingStableId,
      setEditModel,
      getAllStables
    );
  };

  const RemoveStable = () => {
    DeleteStable(
      setloading,
      setError,
      DeleteStableId,
      setDeleteModel,
      getAllStables
    );
  };

  const toggleArType = (value) => {
    setArTypeStable((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleEnType = (value) => {
    setEnTypeStable((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const DisableStable = (stableId) => {
    Disable(setloading, setError, stableId, getAllStables, setModel);
  };

  const handleCouponFieldChange = (field, value) => {
    setCouponData((prev) => ({ ...prev, [field]: value }));
  };

  const addStableCoupon = () => {
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
      setPercentageStableId(null);
      getAllStables();
    };

    if (selectedCouponId) {
      UpdateCoupon(setloading, setError, selectedCouponId, payload, onSuccess);
      return;
    }

    CreateCoupon(setloading, setError, "stable", payload, onSuccess);
  };

  const openPercentageModal = (stableId, couponInfo = {}) => {
    setPercentageStableId(stableId);
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
          <h1>Add Stable</h1>
          <p>Fill in the details below to add a new stable.</p>
        </div>

        {/* ======= CREATE FORM ======= */}
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
              type="email"
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
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {error && <div className="form_error">{error}</div>}

          <button onClick={addStableApi} disabled={loading}>
            {loading ? "loading ..." : "Add New Stable"}
          </button>
        </div>

        {/* ======= TABLE ======= */}
        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <th>Arabic Name</th>
                <th>English Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>completed</th>
                <th>Percentage</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              {allStables.map((item, index) => (
                (() => {
                  const couponInfo = extractCouponInfo(item);
                  const couponLabel = couponInfo?.coupon || "";
                  return (
                <tr key={index}>
                  <td>{item.name?.ar}</td>
                  <td>{item.name?.en}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.completed ? (
                      <p className="completed">Completed</p>
                    ) : (
                      <p
                        className="notcompleted"
                        onClick={() => {
                          setCompleteStableId(item._id);
                          setDescAr("");
                          setDescEn("");
                          setCompleteModel(true);
                        }}
                      >
                        Not Completed
                      </p>
                    )}
                  </td>
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
                  <td
                    onClick={() => {
                      setModel(true);
                      setSelectedStable(item);
                      setStableId(item._id);
                    }}
                  >
                    ⚙️
                  </td>
                </tr>
                  );
                })()
              ))}
            </tbody>
          </table>
        </div>

        {/* ======= SETTINGS POPUP ======= */}
        {model && (
          <>
            <div className="settings_wrapper" onClick={() => setModel(false)} />
            <div className="settings_popup">
              <h3>Stable Settings</h3>
              <div className="settings_flex">
                <button>
                  <Link to={`/add-horse?stableId=${stableId}`}>add horse</Link>
                </button>
                <button
                  onClick={() => {
                    if (selectedStable) {
                      setEditModel(true);
                      setModel(false);
                      setEditingStableId(selectedStable._id);
                      // prefill data
                      setArCity(selectedStable.city?.ar || "");
                      setEnCity(selectedStable.city?.en || "");
                      setArRegion(selectedStable.region?.ar || "");
                      setEnRegion(selectedStable.region?.en || "");
                      setArAddress(selectedStable.address?.ar || "");
                      setEnAddress(selectedStable.address?.en || "");
                      setLocation(selectedStable.location || "");
                      setSessionRate(selectedStable.sessionPercentage || "");
                      setDescAr(
                        selectedStable.descAr ||
                          selectedStable.description?.ar ||
                          ""
                      );
                      setDescEn(
                        selectedStable.descEn ||
                          selectedStable.description?.en ||
                          ""
                      );
                      setPreviewImage(selectedStable.image);
                    }
                  }}
                >
                  update stable
                </button>
                <button
                  onClick={() => {
                    setModel(false);
                    setDeleteModel(true);
                    setDeleteStableId(selectedStable._id);
                  }}
                >
                  Delete Stable
                </button>
                <button onClick={() => DisableStable(selectedStable._id)}>
                  {loading ? "loading..." : "Disable Stable"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======= COMPLETE POPUP ======= */}
        {completeModel && (
          <>
            <div
              className="settings_wrapper"
              onClick={() => setCompleteModel(false)}
            />
            <div className="settings_popup completed">
              <h3>Complete Stable</h3>
              <div className="update_form">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImage(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewImage && (
                  <div className="preview_image_wrapper">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="preview_image"
                    />
                  </div>
                )}
                <div className="completed_flex">
                  <select
                    onChange={(e) => toggleArType(e.target.value)}
                    value=""
                  >
                    <option value="">اختر نوع الإسطبل</option>
                    <option value="عربي">
                      {arTypeStable.includes("عربي") ? "✔️ عربي" : "عربي"}
                    </option>
                    <option value="اخري">
                      {arTypeStable.includes("اخري") ? "✔️ أخرى" : "أخرى"}
                    </option>
                    <option value="جمال">
                      {arTypeStable.includes("جمال") ? "✔️ جمل" : "جمل"}
                    </option>
                    <option value="مركبات">
                      {arTypeStable.includes("مركبات") ? "✔️ مركبات" : "مركبات"}
                    </option>
                  </select>

                  <select
                    onChange={(e) => toggleEnType(e.target.value)}
                    value=""
                  >
                    <option value="">Choose Stable Type</option>
                    <option value="arabic">
                      {enTypeStable.includes("arabic") ? "✔️ Arabic" : "Arabic"}
                    </option>
                    <option value="other">
                      {enTypeStable.includes("other") ? "✔️ Other" : "Other"}
                    </option>
                    <option value="camel">
                      {enTypeStable.includes("camel") ? "✔️ Camel" : "Camel"}
                    </option>
                    <option value="vehicle">
                      {enTypeStable.includes("vehicle")
                        ? "✔️ Vehicle"
                        : "Vehicle"}
                    </option>
                    <option value="carets">
                      {enTypeStable.includes("carets") ? "✔️ carets" : "carets"}
                    </option>
                  </select>
                </div>

                <div className="completed_flex">
                  <input
                    type="text"
                    placeholder="المدينة بالعربي"
                    value={arCity}
                    onChange={(e) => setArCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={enCity}
                    onChange={(e) => setEnCity(e.target.value)}
                  />
                </div>
                <div className="completed_flex">
                  <input
                    type="text"
                    placeholder="المنطقة بالعربي"
                    value={arRegion}
                    onChange={(e) => setArRegion(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Region"
                    value={enRegion}
                    onChange={(e) => setEnRegion(e.target.value)}
                  />
                </div>
                <div className="completed_flex">
                  <input
                    type="text"
                    placeholder="العنوان بالعربي"
                    value={arAddress}
                    onChange={(e) => setArAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={enAddress}
                    onChange={(e) => setEnAddress(e.target.value)}
                  />
                </div>
                <div className="completed_flex">
                  <input
                    type="text"
                    placeholder="الموقع"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="نسبة الجلسة"
                    value={sessionRate}
                    onChange={(e) => setSessionRate(e.target.value)}
                  />
                </div>
                <div className="completed_flex stable_desc_row">
                  <textarea
                    placeholder="الوصف بالعربي"
                    value={descAr}
                    onChange={(e) => setDescAr(e.target.value)}
                    rows={3}
                  />
                  <textarea
                    placeholder="Description (EN)"
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    rows={3}
                  />
                </div>
                {error}
                <button onClick={completeStableData} disabled={loading}>
                  {loading ? "loading..." : "Complete Stable"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======= EDIT POPUP ======= */}
        {editModel && (
          <>
            <div
              className="settings_wrapper"
              onClick={() => setEditModel(false)}
            />
            <div className="settings_popup completed">
              <h3>Update Stable</h3>
              <div className="update_form">
                <div className="form-completed_flex">
                  <label>صورة الإسطبل</label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                  {(image || previewImage) && (
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : image
                          ? URL.createObjectURL(image)
                          : previewImage
                      }
                      alt="stable"
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>

                <div className="completed_flex">
                  <select
                    onChange={(e) => toggleArType(e.target.value)}
                    value=""
                  >
                    <option value="">اختر نوع الإسطبل</option>
                    <option value="عربي">
                      {arTypeStable.includes("عربي") ? "✔️ عربي" : "عربي"}
                    </option>
                    <option value="اخري">
                      {arTypeStable.includes("اخري") ? "✔️ أخرى" : "أخرى"}
                    </option>
                    <option value="جمال">
                      {arTypeStable.includes("جمال") ? "✔️ جمل" : "جمل"}
                    </option>
                    <option value="مركبات">
                      {arTypeStable.includes("مركبات") ? "✔️ مركبات" : "مركبات"}
                    </option>
                  </select>
                  <select
                    onChange={(e) => toggleEnType(e.target.value)}
                    value=""
                  >
                    <option value="">Choose Stable Type</option>
                    <option value="arabic">
                      {enTypeStable.includes("arabic") ? "✔️ Arabic" : "Arabic"}
                    </option>
                    <option value="other">
                      {enTypeStable.includes("other") ? "✔️ Other" : "Other"}
                    </option>
                    <option value="camel">
                      {enTypeStable.includes("camel") ? "✔️ Camel" : "Camel"}
                    </option>
                    <option value="vehicle">
                      {enTypeStable.includes("vehicle")
                        ? "✔️ Vehicle"
                        : "Vehicle"}
                    </option>
                  </select>
                </div>

                <div className="completed_flex">
                  <input
                    type="text"
                    value={arCity}
                    onChange={(e) => setArCity(e.target.value)}
                  />
                  <input
                    type="text"
                    value={enCity}
                    onChange={(e) => setEnCity(e.target.value)}
                  />
                </div>
                <div className="completed_flex">
                  <input
                    type="text"
                    value={arRegion}
                    onChange={(e) => setArRegion(e.target.value)}
                  />
                  <input
                    type="text"
                    value={enRegion}
                    onChange={(e) => setEnRegion(e.target.value)}
                  />
                </div>

                <div className="completed_flex">
                  <input
                    type="text"
                    value={arAddress}
                    onChange={(e) => setArAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    value={enAddress}
                    onChange={(e) => setEnAddress(e.target.value)}
                  />
                </div>

                <div className="completed_flex">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <input
                    type="number"
                    value={sessionRate}
                    onChange={(e) => setSessionRate(e.target.value)}
                  />
                </div>
                <div className="completed_flex stable_desc_row">
                  <textarea
                    placeholder="الوصف بالعربي"
                    value={descAr}
                    onChange={(e) => setDescAr(e.target.value)}
                    rows={3}
                  />
                  <textarea
                    placeholder="Description (EN)"
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    rows={3}
                  />
                </div>
                {error}
                <button onClick={updateStableData} disabled={loading}>
                  {loading ? "جاري التحديث..." : "Update Stable"}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ======= DELETE POPUP ======= */}
        {deleteModel && (
          <>
            <div
              className="settings_wrapper"
              onClick={() => setDeleteModel(false)}
            />
            <div className="settings_popup">
              <h3>Delete Stable</h3>
              <div className="settings_flex">
                {error}
                <button onClick={RemoveStable} disabled={loading}>
                  {loading ? "Deleting..." : "Delete"}
                </button>
                <button onClick={() => setDeleteModel(false)}>Close</button>
              </div>
            </div>
          </>
        )}

        {/* ======= PERCENTAGE POPUP ======= */}
        {percentageModel && (
          <>
            <div
              className="settings_wrapper"
              onClick={() => {
                setPercentageModel(false);
                setCouponData({
                  coupon: "",
                  discount: "",
                  startingDate: "",
                  expiryDate: "",
                });
                setSelectedCouponId(null);
                setPercentageStableId(null);
                setError(null);
              }}
            />
            <div className="percentage_modal">
              <div className="percentage_modal_header">
                <h3>📊 Stable Percentage</h3>
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
                    setPercentageStableId(null);
                    setError(null);
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="percentage_modal_body">
                <div className="percentage_info_card">
                  <div className="percentage_info_label">Stable ID</div>
                  <div className="percentage_info_value">
                    {percentageStableId || "N/A"}
                  </div>
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
                    onClick={addStableCoupon}
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
                      setPercentageStableId(null);
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

export default Stable;
