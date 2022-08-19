import React from "react";

const PercentBar = ({ percent }) => {
  const containerStyle = {
    height: 20,
    width: "80%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };
  const fillerStyle = {
    height: "100%",
    width: `${percent}`,
    backgroundColor: "green",
    borderRadius: "inherit",
    textAlign: "right",
  };
  const labelStyle = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <>
      <h4>Penalty Rate</h4>
      <div style={containerStyle}>
        <div style={fillerStyle}>
          <span style={labelStyle}>{`${percent}`}</span>
        </div>
      </div>
    </>
  );
};

export default PercentBar;
