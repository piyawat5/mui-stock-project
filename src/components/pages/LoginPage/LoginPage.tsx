import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import { Box, Card, CardContent, Typography } from "@mui/material";

type LoginPageProps = {
  //
};

type Account = {
  username?: string;
  password?: string;
};

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const initial: Account = {
    username: "",
    password: "",
  };

  const Form = ({
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
  }: FormikProps<Account>) => {
    return (
      <form
        action=""
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <label htmlFor="username">username</label>
          <input
            onChange={handleChange}
            value={values.username}
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <label htmlFor="password">password</label>
          <input
            onChange={handleChange}
            value={values.password}
            type="text"
            placeholder="Password"
            name="password"
            id="password"
            required
          />
        </div>
        <button disabled={isSubmitting} style={{ width: "100%" }} type="submit">
          SUBMIT
        </button>
      </form>
    );
  };

  return (
    <>
      <Box>
        <Card>
          <CardContent>
            <Typography>Login</Typography>
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

export default LoginPage;
