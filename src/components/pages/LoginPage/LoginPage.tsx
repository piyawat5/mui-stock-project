import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CSSProperties } from "react";
import { Account } from "../../types/account.type";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../..";
import * as authenActions from "../../../actions/authen.action";

// type LoginProps = {

// };

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const authenReducer = useSelector(
    (state: RootReducers) => state.authenReducer
  );
  const dispatch = useAppDispatch();
  const initial: Account = {
    username: "",
    password: "",
  };
  const classes: { [key: string]: CSSProperties } = {
    root: { display: "flex", justifyContent: "center" },
    card: { padding: "8px", width: 300 },
    buttons: { marginTop: 2 },
  };

  const Form = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  }: FormikProps<Account>) => {
    return (
      <form action="" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={4}>
          <TextField
            onChange={handleChange}
            value={values.username}
            id="username"
            label="Username"
            variant="outlined"
            autoFocus
            required
            fullWidth
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values.password}
            id="password"
            label="password"
            type="password"
            variant="outlined"
            fullWidth
            required
          ></TextField>
          {authenReducer.isFail && (
            <Alert severity="error">Incorrect username</Alert>
          )}
          <Stack direction={"column-reverse"} spacing={2}>
            <Button
              onClick={() => navigate("/register")}
              variant="outlined"
              disabled={authenReducer.isFetching}
              color="primary"
              type="button"
              fullWidth
            >
              REGISTER
            </Button>
            <Button
              sx={{
                color: "#fff",
              }}
              variant="contained"
              disabled={authenReducer.isFetching}
              color="primary"
              type="submit"
              fullWidth
            >
              LOGIN
            </Button>
          </Stack>
        </Stack>
      </form>
    );
  };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={classes.card}>
          <CardContent>
            <Typography fontSize={20} marginBottom={4}>
              Login
            </Typography>
            <Formik
              onSubmit={(value) => {
                dispatch(
                  authenActions.authen(
                    "LOGIN",
                    (path) => navigate(path),
                    value
                  ) as any
                );
              }}
              initialValues={initial}
            >
              {(props) => Form(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
