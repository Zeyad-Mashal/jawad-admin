import React, { useState, useEffect } from "react";
import "./AddStable.css";
import AddStable from "../../API/AddStable/AddStable";
import GetStable from "../../API/AddStable/GetStable";
import CompleteStable from "../../API/AddStable/CompleteStable";
import UpdateStable from "../../API/AddStable/UpdateStable";
import DeleteStable from "../../API/AddStable/DeleteStable";
import { Link } from "react-router-dom";
const Stable = () => {
  useEffect(() => {
    getAllStables();
  }, []);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [arType, setArType] = useState("");
  const [enType, setEnType] = useState("");
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
  const [editModel, setEditModel] = useState(false);
  const [editingStableId, setEditingStableId] = useState(null);
  const [DeleteStableId, setDeleteStableId] = useState(null);
  const [deleteModel, setDeleteModel] = useState("");
  const [stableId, setStableId] = useState(null);
  const addStableApi = () => {
    const data = {
      arName,
      enName,
      arType,
      enType,
      email,
      password,
      phone,
    };
    console.log(data);

    AddStable(setloading, setError, data, getAllStables);
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
      !sessionRate.trim()
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
    data.append("image", image);
    data.append("arCity", arCity);
    data.append("enCity", enCity);
    data.append("arRegion", arRegion);
    data.append("enRegion", enRegion);
    data.append("arAddress", arAddress);
    data.append("enAddress", enAddress);
    data.append("location", location);
    data.append("sessionPercentage", sessionRate);

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

  return (
    <div className="stable">
      <div className="stable_container">
        <div className="stable_header">
          <h1>Add Stable</h1>
          <p>Fill in the details below to add a new stable.</p>
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
              placeholder="النوع"
              value={arType}
              onChange={(e) => setArType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Type"
              value={enType}
              onChange={(e) => setEnType(e.target.value)}
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
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={addStableApi}>
            {loading ? "loading ..." : "Add New Stable"}
          </button>
        </div>
        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <th>Arabic Name</th>
                <th>English Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>completed</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              {allStables.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name.ar}</td>
                    <td>{item.name.en}</td>
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
                            setCompleteModel(true);
                          }}
                        >
                          Not Completed
                        </p>
                      )}
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
              })}
            </tbody>
          </table>
        </div>
        {model && (
          <>
            <div
              className="settings_wrapper"
              onClick={() => setModel(false)}
            ></div>
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
                      // املأ البيانات في الحقول
                      setArCity(selectedStable.city?.ar || "");
                      setEnCity(selectedStable.city?.en || "");
                      setArRegion(selectedStable.region?.ar || "");
                      setEnRegion(selectedStable.region?.en || "");
                      setArAddress(selectedStable.address?.ar || "");
                      setEnAddress(selectedStable.address?.en || "");
                      setLocation(selectedStable.location || "");
                      setSessionRate(selectedStable.sessionPercentage || "");
                      setPreviewImage(selectedStable.image); // لو عندك لينك للصورة
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
              </div>
            </div>
          </>
        )}

        {completeModel && (
          <>
            <div
              className="settings_wrapper"
              onClick={() => setCompleteModel(false)}
            ></div>
            <div className="settings_popup completed">
              <h3>Complete Stable</h3>
              <div className="update_form">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImage(file);
                      setPreviewImage(URL.createObjectURL(file)); // <== عرض المعاينة
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
                {error}
                <button onClick={completeStableData}>
                  {loading ? "loading..." : "Complete Stable"}
                </button>
              </div>
            </div>
          </>
        )}

        {editModel && (
          <>
            <div
              className="settings_wrapper"
              onClick={() => setEditModel(false)}
            ></div>
            <div className="settings_popup completed">
              <h3>Update Stable</h3>
              <div className="update_form">
                <div className="form-completed_flex">
                  <label>صورة الإسطبل</label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {image && (
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
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
                {error}
                <button onClick={updateStableData}>
                  {loading ? "جاري التحديث..." : "Update Stable"}
                </button>
              </div>
            </div>
          </>
        )}

        {deleteModel && (
          <>
            <div
              className="settings_wrapper"
              onClick={() => setDeleteModel(false)}
            ></div>
            <div className="settings_popup">
              <h3>Delete Stable</h3>
              <div className="settings_flex">
                {error}
                <button onClick={RemoveStable}>
                  {loading ? "Deleting..." : "Delete"}
                </button>
                <button onClick={() => setDeleteModel(false)}>Close</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Stable;
