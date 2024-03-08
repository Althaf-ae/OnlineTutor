import { useCallback, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const GOOGLE_CLIENT_ID =
    "57619033321-n0pnjp17n9up4tj5bil84lvlddtuarcn.apps.googleusercontent.com";
  const [method, setMethod] = useState("email");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const auth = await Login(values);
        auth &&
          dispatch({ type: "user_login", payload: auth }).then(navigate("/"));
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: "100px",
          width: "100%",
        }}
      >
        <div>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? &nbsp;
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#1976D2" }}
                className="link"
              >
                Register
              </Link>
            </Typography>
          </Stack>
          <Tabs onChange={()=>{}} sx={{ mb: 3 }} value={method}>
            <Tab label="Email" value="email" />
            <Tab label="Phone Number" value="phoneNumber" />
          </Tabs>
          {method === "email" && (
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>

              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Typography sx={{ mt: 3 }} color="text.secondary" variant="body2">
                Forgot your Password ? &nbsp;
                <Link
                  to="/resetPassword"
                  style={{ textDecoration: "none", color: "#1976D2" }}
                  className="link"
                >
                  Reset Password
                </Link>
              </Typography>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                onClick={() => navigate("/")}
              >
                Skip authentication
              </Button>

              <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                <div>
                  You can use <b>demo@tutor.io</b> and password{" "}
                  <b>password123!</b>
                </div>
              </Alert>
            </form>
          )}
          {/* {method === "phoneNumber" && <MobileLogin />} */}
        </div>
      </Box>
    </Box>
  );
};

export default Login;