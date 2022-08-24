import React from "react";
import Typography from "@mui/material/Typography";
const PercentBar = ({ percent, scored, missed, total }) => {
  const containerStyle = {
    height: 20,
    width: "60%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: "0 auto",
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
  const headingText = {
    fontFamily: "Russo One",
  };
  const spanText = {
    fontFamily: "Mitr",
    fontWeight: "100",
  };

  return (
    <>
      <Typography variant="h6" component="h4" sx={headingText}>
        Scored: <span style={spanText}>{scored}</span>
      </Typography>
      <Typography variant="h6" component="h4" sx={headingText}>
        Missed: <span style={spanText}>{missed}</span>
      </Typography>
      <Typography variant="h6" component="h4" sx={headingText}>
        Total: <span style={spanText}>{total}</span>
      </Typography>
      <div style={containerStyle}>
        <div style={fillerStyle}>
          <span style={labelStyle}>{`${percent}`}</span>
        </div>
      </div>
    </>
  );
};

export default PercentBar;
