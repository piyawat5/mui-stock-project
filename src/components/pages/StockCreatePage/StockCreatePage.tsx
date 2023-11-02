/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps, Field } from "formik";
import * as React from "react";
import { CSSProperties, useRef, useState } from "react";
import { Product } from "../../types/stock.type";
import { TextField } from "formik-material-ui";
import { ThemeContext } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../..";
import * as stockActions from "../../../actions/stock.action";

type StockCreatePageProps = {
  //
};

const StockCreatePage: React.FC<any> = () => {
  const navigate = useNavigate();
  const stockReducers = useSelector(
    (state: RootReducers) => state.stockReducer
  );
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImageURL, setSelectedImageURL] = useState<string | null>(null);
  const showPreviewImage = (values: any) => {
    if (selectedImageURL) {
      return <img src={selectedImageURL} style={{ height: 100 }}></img>;
    }
  };
  const initial = {
    name: "",
    price: 0,
    stock: 0,
  } as Product;

  return (
    <>
      <Box>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            let formData = new FormData();
            formData.append("name", values.name);
            formData.append("price", String(values.price));
            formData.append("stock", String(values.stock));
            formData.append("image", values.file as Blob);
            dispatch(
              stockActions.postStock(formData, (path) => {
                navigate(path);
              })
            );
            setSubmitting(false);
          }}
          initialValues={initial}
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
                  <Typography>Create Stock</Typography>
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
                    <div style={{ margin: 16 }}>
                      {showPreviewImage(props.values)}
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/camera.png`}
                      style={{ width: 60, height: 60 }}
                    ></img>
                    <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                      Add Picture
                    </span>
                    <input
                      type="file"
                      onChange={(e: React.ChangeEvent<any>) => {
                        e.preventDefault();
                        props.setFieldValue("file", e.target.files[0]);
                        if (e.target.files.length !== 0) {
                          props.setFieldValue(
                            "file_obj",
                            URL.createObjectURL(e.target.files[0])
                          );
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
                      style={{ padding: "20px 0 0 20px" }}
                      ref={fileInputRef}
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
                      CREATE
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

export default StockCreatePage;
