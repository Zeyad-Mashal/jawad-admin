import React, { useState, useEffect } from "react";
import "./Horse.css";
import GetHorse from "../../API/Horse/GetHorse";
import AddHorse from "../../API/Horse/AddHorse";
import { useLocation } from "react-router-dom";
import UpdateHorse from "../../API/Horse/UpdateHorse";
import DeleteHorse from "../../API/Horse/DeleteHorse";
const Horse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stableId = queryParams.get("stableId");
  useEffect(() => {
    getAllHorses();
  }, []);

  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [allHorses, setAllHorses] = useState([]);
  const [addModel, setAddModel] = useState(false);

  // Horse fields
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [arDescription, setArDescription] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [arGender, setArGender] = useState("");
  const [enGender, setEnGender] = useState("");
  const [arPrice, setArPrice] = useState("");
  const [enPrice, setEnPrice] = useState("");
  const [arLevel, setArLevel] = useState("");
  const [enLevel, setENLevel] = useState("");
  const [arType, setArType] = useState("");
  const [enType, setEnType] = useState("");
  const [arFeature, setArFeature] = useState("");
  const [enFeature, setEnFeature] = useState("");
  const [color, setColor] = useState("");

  // Image states
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  // Add state for modals and selected horse
  const [selectedHorse, setSelectedHorse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Handle open modals
  const handleEdit = (horse) => {
    setSelectedHorse(horse);
    setShowEditModal(true);
  };

  const handleDelete = (horse) => {
    setSelectedHorse(horse);
    setShowDeleteModal(true);
  };

  const getAllHorses = () => {
    GetHorse(setloading, setError, setAllHorses, stableId);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);

    if (index === 1) {
      setImage1(file);
      setPreviewImages((prev) => [previewURL, prev[1]]);
    } else {
      setImage2(file);
      setPreviewImages((prev) => [prev[0], previewURL]);
    }
  };

  const addHorseData = () => {
    const data = new FormData();
    const imagesArray = [image1, image2];
    imagesArray.forEach((img) => {
      data.append("image", img);
    });
    data.append("enName", enName);
    data.append("arName", arName);
    data.append("arDescription", arDescription);
    data.append("enDescription", enDescription);
    data.append("arGender", arGender);
    data.append("enGender", enGender);
    data.append("arPrice", arPrice);
    data.append("enPrice", enPrice);
    data.append("arLevel", arLevel);
    data.append("enLevel", enLevel);
    data.append("arType", arType);
    data.append("enType", enType);
    data.append("arFeature", arFeature);
    data.append("enFeature", enFeature);
    data.append("color", color);
    AddHorse(setloading, setError, data, getAllHorses, stableId, setAddModel);
  };

  const handleEditHorse = () => {
    const data = new FormData();
    const imagesArray = [image1, image2];
    imagesArray.forEach((img) => {
      data.append("image", img);
    });
    data.append("enName", selectedHorse.name.en);
    data.append("arName", selectedHorse.name.ar);
    data.append("enDescription", selectedHorse.description?.en || "");
    data.append("arDescription", selectedHorse.description?.ar || "");
    data.append("enGender", selectedHorse.gender?.en || "");
    data.append("arGender", selectedHorse.gender?.ar || "");
    data.append("enPrice", selectedHorse.price?.en || "");
    data.append("arPrice", selectedHorse.price?.ar || "");
    data.append("enLevel", selectedHorse.level?.en || "");
    data.append("arLevel", selectedHorse.level?.ar || "");
    data.append("enType", selectedHorse.type?.en || "");
    data.append("arType", selectedHorse.type?.ar || "");
    data.append("enFeature", selectedHorse.feature?.en || "");
    data.append("arFeature", selectedHorse.feature?.ar || "");
    data.append("color", selectedHorse.color || "");

    UpdateHorse(
      setloading,
      setError,
      data,
      getAllHorses,
      selectedHorse._id,
      setShowEditModal
    );
  };

  const handleDeleteHorse = () => {
    DeleteHorse(
      setloading,
      setError,
      selectedHorse._id,
      setShowDeleteModal,
      getAllHorses
    );
  };

  return (
    <div className="horse">
      <div className="horse_container">
        <button onClick={() => setAddModel(true)}>Add Horse</button>
        <div className="horse_table_container">
          <table className="horse_table">
            <thead>
              <tr>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>EGP Price</th>
                <th>Dollar Price</th>
                <th>النوع</th>
                <th>المستوى</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              {allHorses.length > 0
                ? allHorses.map((horse, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={horse.picUrls[0]}
                            alt={horse.name.ar}
                            className="horse_img"
                          />
                        </td>
                        <td>{horse.name.ar}</td>
                        <td>{horse.price.ar}EGP</td>
                        <td>{horse.price.en}$</td>
                        <td>{horse.type.ar}</td>
                        <td>{horse.level.ar}</td>
                        <td>
                          <button onClick={() => handleEdit(horse)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(horse)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : "No Horses Found"}
            </tbody>
          </table>
        </div>

        {addModel && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add New Horse</h2>
              <div className="modal-content">
                <label>Image 1:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 1)}
                />

                <label>Image 2:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 2)}
                />

                {/* Preview Section */}
                <div className="image-preview">
                  {previewImages[0] && (
                    <img src={previewImages[0]} alt="Horse Preview 1" />
                  )}
                  {previewImages[1] && (
                    <img src={previewImages[1]} alt="Horse Preview 2" />
                  )}
                </div>

                {/* Text Inputs */}
                <label>Horse Name (Arabic):</label>
                <input
                  type="text"
                  placeholder="e.g. الحصان الأسود"
                  value={arName}
                  onChange={(e) => setArName(e.target.value)}
                />

                <label>Horse Name (English):</label>
                <input
                  type="text"
                  placeholder="e.g. Black Horse"
                  value={enName}
                  onChange={(e) => setEnName(e.target.value)}
                />

                <label>Description (Arabic):</label>
                <textarea
                  placeholder="وصف الحصان هنا"
                  value={arDescription}
                  onChange={(e) => setArDescription(e.target.value)}
                />

                <label>Description (English):</label>
                <textarea
                  placeholder="Horse description here"
                  value={enDescription}
                  onChange={(e) => setEnDescription(e.target.value)}
                />

                <label>Gender (Arabic):</label>
                <select
                  value={arGender}
                  onChange={(e) => setArGender(e.target.value)}
                >
                  <option value="">choose gender</option>
                  <option value="أنثى">أنثى</option>
                  <option value="ذكر">ذكر</option>
                </select>

                <label>Gender (English):</label>
                <select
                  value={enGender}
                  onChange={(e) => setEnGender(e.target.value)}
                >
                  <option value="">choose gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>

                <label>Price (USD):</label>
                <input
                  type="number"
                  placeholder="e.g. 100$"
                  value={enPrice}
                  onChange={(e) => setEnPrice(e.target.value)}
                />

                <label>Price (EGP):</label>
                <input
                  type="number"
                  placeholder="e.g. 5000EGP"
                  value={arPrice}
                  onChange={(e) => setArPrice(e.target.value)}
                />

                <label>Level (Arabic):</label>
                <select
                  value={arLevel}
                  onChange={(e) => setArLevel(e.target.value)}
                >
                  <option value="">choose level</option>
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                </select>

                <label>Level (English):</label>
                <select
                  value={enLevel}
                  onChange={(e) => setENLevel(e.target.value)}
                >
                  <option value="">choose level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Professional">Professional</option>
                </select>

                <label>Type (Arabic):</label>
                <select
                  value={arType}
                  onChange={(e) => setArType(e.target.value)}
                >
                  <option value="">choose horse type</option>
                  <option value="عربي">عربي</option>
                  <option value="آخري">آخري</option>
                </select>

                <label>Type (English):</label>
                <select
                  value={enType}
                  onChange={(e) => setEnType(e.target.value)}
                >
                  <option value="">choose horse type</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Other">Other</option>
                </select>

                <label>Main Feature (Arabic):</label>
                <select
                  value={arFeature}
                  onChange={(e) => setArFeature(e.target.value)}
                >
                  <option value="">choose horse feature</option>
                  <option value="جري">جري</option>
                  <option value="دب و رقص">دب و رقص</option>
                </select>

                <label>Main Feature (English):</label>
                <select
                  value={enFeature}
                  onChange={(e) => setEnFeature(e.target.value)}
                >
                  <option value="">choose horse feature</option>
                  <option value="Running">Running</option>
                  <option value="Dancing">Dancing</option>
                </select>

                <label>Color:</label>
                <input
                  type="text"
                  placeholder="e.g. Black, White"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                {error}
                <div className="modal-actions">
                  <button onClick={() => setAddModel(false)}>Cancel</button>
                  <button onClick={addHorseData}>
                    {loading ? "loading..." : "Add Horse"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showEditModal && selectedHorse && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Edit Horse</h2>
              <div className="modal-content">
                {/* === الصور === */}
                <label>Image 1:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 1)}
                />

                <label>Image 2:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 2)}
                />

                <div className="image-preview">
                  {selectedHorse.picUrls?.[0] && (
                    <img src={selectedHorse.picUrls[0]} alt="Horse Preview 1" />
                  )}
                  {selectedHorse.picUrls?.[1] && (
                    <img src={selectedHorse.picUrls[1]} alt="Horse Preview 2" />
                  )}
                </div>

                {/* === الاسم === */}
                <label>Horse Name (Arabic):</label>
                <input
                  type="text"
                  value={selectedHorse.name.ar}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      name: { ...selectedHorse.name, ar: e.target.value },
                    })
                  }
                />

                <label>Horse Name (English):</label>
                <input
                  type="text"
                  value={selectedHorse.name.en}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      name: { ...selectedHorse.name, en: e.target.value },
                    })
                  }
                />

                {/* === الوصف === */}
                <label>Description (Arabic):</label>
                <textarea
                  value={selectedHorse.description?.ar || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      description: {
                        ...selectedHorse.description,
                        ar: e.target.value,
                      },
                    })
                  }
                />

                <label>Description (English):</label>
                <textarea
                  value={selectedHorse.description?.en || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      description: {
                        ...selectedHorse.description,
                        en: e.target.value,
                      },
                    })
                  }
                />

                {/* === الجنس === */}
                <label>Gender (Arabic):</label>
                <select
                  value={selectedHorse.gender?.ar || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      gender: { ...selectedHorse.gender, ar: e.target.value },
                    })
                  }
                >
                  <option value="">choose gender</option>
                  <option value="أنثى">أنثى</option>
                  <option value="ذكر">ذكر</option>
                </select>

                <label>Gender (English):</label>
                <select
                  value={selectedHorse.gender?.en || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      gender: { ...selectedHorse.gender, en: e.target.value },
                    })
                  }
                >
                  <option value="">choose gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>

                {/* === السعر === */}
                <label>Price (USD):</label>
                <input
                  type="number"
                  value={selectedHorse.price?.en || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      price: { ...selectedHorse.price, en: e.target.value },
                    })
                  }
                />

                <label>Price (EGP):</label>
                <input
                  type="number"
                  value={selectedHorse.price?.ar || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      price: { ...selectedHorse.price, ar: e.target.value },
                    })
                  }
                />

                {/* === المستوى === */}
                <label>Level (Arabic):</label>
                <select
                  value={selectedHorse.level?.ar || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      level: { ...selectedHorse.level, ar: e.target.value },
                    })
                  }
                >
                  <option value="">choose level</option>
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                </select>

                <label>Level (English):</label>
                <select
                  value={selectedHorse.level?.en || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      level: { ...selectedHorse.level, en: e.target.value },
                    })
                  }
                >
                  <option value="">choose level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Professional">Professional</option>
                </select>

                {/* === النوع === */}
                <label>Type (Arabic):</label>
                <select
                  value={selectedHorse.type?.ar || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      type: { ...selectedHorse.type, ar: e.target.value },
                    })
                  }
                >
                  <option value="">choose horse type</option>
                  <option value="عربي">عربي</option>
                  <option value="آخري">آخري</option>
                </select>

                <label>Type (English):</label>
                <select
                  value={selectedHorse.type?.en || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      type: { ...selectedHorse.type, en: e.target.value },
                    })
                  }
                >
                  <option value="">choose horse type</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Other">Other</option>
                </select>

                {/* === الميزة === */}
                <label>Main Feature (Arabic):</label>
                <select
                  value={selectedHorse.feature?.ar || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      feature: { ...selectedHorse.feature, ar: e.target.value },
                    })
                  }
                >
                  <option value="">choose horse feature</option>
                  <option value="جري">جري</option>
                  <option value="دب و رقص">دب و رقص</option>
                </select>

                <label>Main Feature (English):</label>
                <select
                  value={selectedHorse.feature?.en || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      feature: { ...selectedHorse.feature, en: e.target.value },
                    })
                  }
                >
                  <option value="">choose horse feature</option>
                  <option value="Running">Running</option>
                  <option value="Dancing">Dancing</option>
                </select>

                {/* === اللون === */}
                <label>Color:</label>
                <input
                  type="text"
                  value={selectedHorse.color || ""}
                  onChange={(e) =>
                    setSelectedHorse({
                      ...selectedHorse,
                      color: e.target.value,
                    })
                  }
                />

                {error}
                <div className="modal-actions">
                  <button onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  <button onClick={handleEditHorse}>
                    {loading ? "loading ..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && selectedHorse && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete {selectedHorse.name.ar}?</p>
              {error}
              <div className="modal-actions">
                <button onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button onClick={handleDeleteHorse}>
                  {loading ? "loading..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Horse;
