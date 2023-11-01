import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Form, { Formik, FormikProps, Field } from "formik";
import * as React from "react";
import { CSSProperties } from "react";
import { FormData } from "../../types/stock.type";
import { TextField } from "formik-material-ui";

type StockCreatePageProps = {
  //
};

const StockCreatePage: React.FC<any> = () => {
  const classes: { [key: string]: CSSProperties } = {
    root: { display: "flex", justifyContent: "center" },
    card: { padding: "8px", width: 300 },
    buttons: { marginTop: 2 },
  };

  //   const Form = ({
  // values,setFieldValue
  //   }: FormikProps<FormData>) => {

  //     return (
  //       <Form>
  // <Card>
  //  <CardContent>
  //   <Field
  //  component={TextField}
  //   ></Field>
  //  </CardContent>
  // </Card>
  //       </Form>
  //     );
  //   };

  return (
    <>
      {/* <Box sx={classes.root}>
        <Card sx={classes.card}>
          <CardContent>
            <Typography fontSize={20} marginBottom={4}>
              Create Stock
            </Typography>
            <Formik
              onSubmit={(value) => {
                dispatch(
                  authenActions.authen("LOGIN", (path) => navigate(path), value)
                );
              }}
              initialValues={initial}
            >
              {(props) => Form(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box> */}
    </>
  );
};

export default StockCreatePage;
