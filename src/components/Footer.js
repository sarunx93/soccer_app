import React from "react";
import { styled } from "@mui/material/styles";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Typography from "@mui/material/Typography";
const LayoutContainer = styled("div")(({ theme }) => ({
  display: "block",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",

  background: "black",
  height: "auto",
  padding: "0.25rem",
}));
const LeftContainer = styled("div")(({ theme }) => ({}));
const RightContainer = styled("div")(({ theme }) => ({}));
const Footer = () => {
  return (
    <LayoutContainer>
      <LeftContainer>
        <Typography
          variant="h6"
          component="h6"
          sx={{ color: "white", fontFamily: "Mitr" }}
        >
          <span style={{ fontFamily: "Russo One" }}>Built and Designed by</span>{" "}
          Sarun P.
        </Typography>

        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/sarun-p/"
            target="_blank"
            className="icon"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/sarunx93"
            target="_blank"
            className="icon"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </LeftContainer>
      <RightContainer>
        {" "}
        <Typography
          variant="h6"
          component="h6"
          sx={{ color: "white", fontFamily: "Mitr" }}
        >
          <span style={{ fontFamily: "Russo One" }}>Data from</span>{" "}
          <a
            href="https://rapidapi.com/api-sports/api/api-football/"
            target="_blank"
            style={{ color: "white", fontFamily: "Mitr" }}
            rel="noreferrer"
          >
            API-FOOTBALL
          </a>
        </Typography>
      </RightContainer>
    </LayoutContainer>
  );
};

export default Footer;
