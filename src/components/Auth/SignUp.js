import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { handleAlert } from "../../features/teamSlice";
import { useDispatch, useSelector } from "react-redux";
const SignUp = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      dispatch(
        handleAlert({
          open: true,
          message: "Passwords do not match.",
          type: "error",
        })
      );
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      dispatch(
        handleAlert({
          open: true,
          message: `Sign up successful!. Welcome ${result.user.email}`,
          type: "success",
        })
      );
      handleClose();
    } catch (error) {
      dispatch(
        handleAlert({
          open: true,
          message: error.message,
          type: "error",
        })
      );
      handleClose();
    }
  };
  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        varaint="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        varaint="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        varaint="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "gold" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
