import React, { useState, useEffect } from "react";
import GetSchool from "../../API/School/GetSchool";
import "./school.css"; // تأكد إن فيه CSS للمودال
import AddSchool from "../../API/School/AddSchool";
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

  useEffect(() => {
    getAllSchools();
  }, []);

  const getAllSchools = () => {
    GetSchool(setloading, setError, setAllSchools);
  };

  const handleShowPrices = (prices) => {
    setSelectedPrices(prices);
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
                      <p className="notcompleted">not completed</p>
                    )}
                  </td>
                  <td>⚙️</td>
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
            <ul>
              {selectedPrices.map((service, idx) => (
                <li key={idx}>
                  <strong>{service.name}</strong>: {service.cost} جنيه
                </li>
              ))}
            </ul>
            <button
              className="close-prices-btn"
              onClick={() => setShowModal(false)}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default School;
