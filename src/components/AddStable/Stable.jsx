import React, { useState, useEffect } from "react";
import "./AddStable.css";
import AddStable from "../../API/AddStable/AddStable";
import GetStable from "../../API/AddStable/GetStable";
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

    AddStable(setloading, setError, data);
  };
  const getAllStables = () => {
    GetStable(setloading, setError, setAllStables);
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stable;
