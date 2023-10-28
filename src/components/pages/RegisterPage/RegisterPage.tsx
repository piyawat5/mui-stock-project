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
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import { CSSProperties } from "react";
// import MyDatepicker from "../../features/MyDatepicker";
import { Account } from "../../types/account.type";

import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as actions from "../../../actions/register.action";
import { useAppDispatch } from "../../..";

// type RegisterPageProps = {

// };

const RegisterPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const registerReducer = useSelector(
    (state: RootReducers) => state.registerReducer
  );
  const dispatch = useAppDispatch();
  const initial: Account = {
    username: "",
    password: "",
    // information: {
    //   birth: null,
    //   address: "",
    //   email: "",
    //   gender: Gender.Female,
    // },
  };
  const classes: { [key: string]: CSSProperties } = {
    root: { display: "flex", justifyContent: "center", alignItems: "center" },
    card: { padding: "8px", width: 300 },
    buttons: { marginTop: 2 },
  };

  const Form = ({
    handleSubmit,
    handleChange,
    setFieldValue,
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
            variant="outlined"
            fullWidth
            required
          ></TextField>
          {/* <MyDatepicker
            value={values?.information?.birth}
            handleDate={(date) => setFieldValue("information.birth", date)}
          ></MyDatepicker>
          <TextField
            onChange={handleChange}
            value={values?.information?.address}
            id="information.address"
            label="address"
            variant="outlined"
            required
            fullWidth
          ></TextField>
          <TextField
            onChange={handleChange}
            value={values.information?.email}
            id="information.email"
            label="email"
            variant="outlined"
            type="email"
            fullWidth
            required
          ></TextField>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              name="information.gender"
              value={values.information?.gender}
              onChange={handleChange}
            >
              {Object.keys(Gender).map((key) => (
                <FormControlLabel
                  key={key}
                  value={Gender[key as keyof typeof Gender]}
                  control={
                    <Field
                      as={Radio}
                      name="information.gender"
                      value={Gender[key as keyof typeof Gender]}
                    />
                  }
                  label={key}
                />
              ))}
            </RadioGroup>
          </FormControl> */}

          {registerReducer.isFail && (
            <Alert severity="error">
              Duplicate username , please try again
            </Alert>
          )}
          <Stack direction={"column-reverse"} spacing={2}>
            <Button
              variant="outlined"
              disabled={registerReducer.isFetching}
              color="primary"
              type="button"
              fullWidth
            >
              LOGIN
            </Button>
            <Button
              sx={{
                color: "#fff",
              }}
              variant="contained"
              disabled={registerReducer.isFetching}
              color="primary"
              type="submit"
              fullWidth
            >
              SUBMIT
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
              Register
            </Typography>
            <Formik
              initialValues={initial}
              onSubmit={async (value, { setSubmitting }) => {
                dispatch(
                  actions.register(value, (path) => navigate(path)) as any
                );
                setSubmitting(false);
              }}
            >
              {(props) => Form(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default RegisterPage;
