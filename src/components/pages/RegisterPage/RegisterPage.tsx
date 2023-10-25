import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import axios from "axios";
import {
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

// type RegisterPageProps = {

// };

const RegisterPage: React.FC<any> = () => {
  const navigate = useNavigate();
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
          <Stack direction={"column-reverse"} spacing={2}>
            <Button
              onClick={() => navigate("/login")}
              variant="outlined"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              onSubmit={async (value, { setSubmitting }) => {
                const register = await axios.post(
                  "http://localhost:8085/api/v2/authen/register",
                  value
                );
                alert(
                  JSON.stringify(
                    register.data.result === "ok"
                      ? "Register successfully"
                      : "Opps somethings wrong , please try again."
                  )
                );

                setSubmitting(false);
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

export default RegisterPage;
