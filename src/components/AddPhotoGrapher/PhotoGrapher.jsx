import React from "react";
import "./PhotoGrapher.css";
const PhotoGrapher = () => {
  return (
    <div className="stable">
      <div className="stable_container">
        <div className="stable_header">
          <h1>Add PhotoGrapher</h1>
          <p>Fill in the details below to add a new stable.</p>
        </div>
        <div className="stable_content">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <button>Add New PhotoGrapher</button>
        </div>
        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Name">John</td>
                <td data-label="Email">john@example.com</td>
                <td data-label="Password">12345</td>
              </tr>
              <tr>
                <td data-label="Name">Aisha</td>
                <td data-label="Email">aisha@example.com</td>
                <td data-label="Password">abc123</td>
              </tr>
              <tr>
                <td data-label="Name">Hiroshi</td>
                <td data-label="Email">hiroshi@example.com</td>
                <td data-label="Password">pass789</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhotoGrapher;
