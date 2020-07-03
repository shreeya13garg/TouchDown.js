import React from "react";
import "./Model.css";

function Startpage() {
  return (
    <div className="text-box">
      <div className="heading">INSTRUCTION</div>
      <div className="text-box2">
        <p style={{ color: "#fafafa" }}>
          Your aim is to reach your destination from the
          <strong>shortest path</strong>. The initial position of your robot
          will be fixed. First you'll choose a destination where you wanna
          reach. Then, You'll the algorithm you want to follow. After you choose
          and click on "start", your robot will move in that shortest path
          calculated via that algorithm.
        </p>
      </div>
      <div className="text-box3">
        <label style={{ color: "white" }}>
          <strong>Select Algorithm</strong>
        </label>
        <select
          style={{
            padding: "3px",
            backgroundColor: "#59cbff",
            fontSize: "15px",
            fontFamily: "Raleway",
          }}
        >
          <option value="Algorith-1">Algorithm1</option>
          <option
            style={{ padding: "3px", backgroundColor: "white" }}
            value="Algorith-2"
          >
            Algorithm2
          </option>
          <option
            style={{ padding: "3px", backgroundColor: "white" }}
            value="Algorith-3"
          >
            Algorithm3
          </option>
          <option
            style={{ padding: "3px", backgroundColor: "white" }}
            value="Algorith-4"
          >
            Algorithm4
          </option>
        </select>
      </div>
      <div className="button-wrapper">
        <div className="button">START</div>
      </div>
    </div>
  );
}

export default Startpage;
