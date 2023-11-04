/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik, Field, FormikErrors, FormikValues } from "formik";
import * as React from "react";
import { useState } from "react";
import { Product } from "../../types/stock.type";
import { TextField } from "formik-material-ui";
import { useMatch, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../..";
import * as stockIdActions from "../../../actions/stockId.action";
import { imageUrl } from "../../../Constants";

const StockEditPage: React.FC<any> = () => {
  const match = useMatch("/stock/edit/:id");
  const navigate = useNavigate();
  const stockIdReducers = useSelector(
    (state: RootReducers) => state.stockIdReducer
  );
  const stockReducers = useSelector(
    (state: RootReducers) => state.stockReducer
  );
  const dispatch = useAppDispatch();
  const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
  const showPreviewImage = (values: any) => {
    if (selectedImageURL) {
      return <img src={selectedImageURL} style={{ height: 100 }}></img>;
    } else {
      return (
        <img
          src={`${imageUrl}/images/${values.image}`}
          style={{ height: 100 }}
        ></img>
      );
    }
  };

  React.useEffect(() => {
    match?.params.id && dispatch(stockIdActions.getById(match?.params.id));
  }, []);

  const initialValues: Product = { name: "Loading...", stock: 0, price: 0 };

  return (
    <>
      <Box>
        <Formik
          enableReinitialize
          validate={(values: FormikValues) => {
            let errors: FormikErrors<FormikValues> = {};
            if (!values.name) errors.name = "Enter name";
            if (values.price < 1)
              errors.price = "Min price is not lower than 1";
            if (values.stock < 1)
              errors.stock = "Min stock is not lower than 1";
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("id", String(values.id));
            formData.append("name", values.name);
            formData.append("price", String(values.price));
            formData.append("stock", String(values.stock));
            if (values.file) {
              formData.append("image", values.file);
            }
            dispatch(
              stockIdActions.putStock(formData, (path) => {
                navigate(path);
              })
            );
            setSubmitting(false);
          }}
          initialValues={
            stockIdReducers.res ? stockIdReducers.res : initialValues
          }
        >
          {(props) => (
            <Form>
              <Card>
                <CardContent
                  sx={{
                    px: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography>Edit Stock</Typography>
                  <Field
                    style={{ marginTop: 16 }}
                    fullWidth
                    component={TextField}
                    name="name"
                    type="text"
                    label="Name"
                  ></Field>
                  <Field
                    style={{ marginTop: 16 }}
                    fullWidth
                    component={TextField}
                    name="price"
                    type="number"
                    label="Price"
                  ></Field>
                  <Field
                    style={{ marginTop: 16 }}
                    fullWidth
                    component={TextField}
                    name="stock"
                    type="number"
                    label="Stock"
                  ></Field>
                  <Stack
                    spacing={2}
                    sx={{ my: 3 }}
                    direction={"row"}
                    alignItems={"center"}
                  >
                    {props.values.image ? (
                      <div style={{ margin: 16 }}>
                        {showPreviewImage(props.values)}
                      </div>
                    ) : (
                      <img
                        src={`${process.env.PUBLIC_URL}/images/camera.png`}
                        style={{ width: 60, height: 60 }}
                      ></img>
                    )}
                    <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                      Add Picture
                    </span>
                    <input
                      type="file"
                      value={stockIdReducers.res?.file as any}
                      onChange={(e: React.ChangeEvent<any>) => {
                        e.preventDefault();
                        props.setFieldValue("file", e.target.files[0]);
                        if (e.target.files.length !== 0) {
                          setSelectedImageURL(
                            URL.createObjectURL(e.target.files[0])
                          );
                        } else {
                          setSelectedImageURL(null);
                        }
                      }}
                      name="image"
                      click-type="type1"
                      multiple
                      accept="image/*"
                      id="files"
                    ></input>
                  </Stack>
                  <Stack direction={"column-reverse"} spacing={2}>
                    <Button
                      onClick={() => {
                        navigate("/stock");
                      }}
                      variant="outlined"
                      disabled={stockReducers.isFetching}
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
                      disabled={stockReducers.isFetching}
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Edit
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default StockEditPage;
