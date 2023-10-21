import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// type RegisterPageProps = {

// };

type Information = {
  age: number;
  address: string;
  email: string;
  gender: string;
};

type Account = {
  username?: string;
  password?: string;
  information?: Information;
};

const RegisterPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const initial: Account = {
    username: "",
    password: "",
    information: {
      age: 0,
      address: "",
      email: "",
      gender: "",
    },
  };

  const Form = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  }: FormikProps<Account>) => {
    return (
      <form action="" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
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
          <Stack direction={"row"} spacing={2}>
            <Button
              variant="outlined"
              disabled={isSubmitting}
              color="primary"
              type="button"
              fullWidth
            >
              CANCEL
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
      <Box>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography marginBottom={4}>Register</Typography>
            <Formik
              onSubmit={(value, { setSubmitting }) => {
                alert(JSON.stringify(value));

                setTimeout(() => {
                  setSubmitting(false);
                }, 1500);
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
