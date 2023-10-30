/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CSSProperties, useEffect } from "react";
import { imageUrl } from "../../../Constants";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as stockActions from "../../../actions/stock.action";
import { useAppDispatch } from "../../..";
import { NumericFormat } from "react-number-format";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Moment from "react-moment";

// type StockPageProps = {
//   //
// };

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    renderCell: ({ value }: GridRenderCellParams) => (
      <Typography sx={{ marginLeft: 2 }} variant="body1">
        {value}
      </Typography>
    ),
  },

  {
    field: "image",
    headerName: "IMAGE",
    width: 150,
    renderCell: ({ value }: GridRenderCellParams) => (
      <img
        src={`${imageUrl}/images/${value}?dummy=${Math.random()}`}
        style={{ width: 100, height: 70, borderRadius: "5%" }}
      ></img>
    ),
  },
  {
    field: "name",
    headerName: "NAME",
    width: 150,
  },
  {
    field: "price",
    headerName: "PRICE",
    width: 150,

    renderCell: ({ value }: GridRenderCellParams) => (
      <Typography variant="body1">
        <NumericFormat
          value={value}
          displayType={"text"}
          thousandSeparator
          fixedDecimalScale
          prefix="฿ "
          decimalScale={2}
        ></NumericFormat>
      </Typography>
    ),
  },
  {
    field: "stock",
    headerName: "STOCK",
    width: 150,
    renderCell: ({ value }: GridRenderCellParams) => (
      <Typography variant="body1">
        <NumericFormat
          value={value}
          displayType={"text"}
          thousandSeparator
          fixedDecimalScale
          decimalScale={0}
        ></NumericFormat>
      </Typography>
    ),
  },

  {
    field: "createdAt",
    headerName: "CREATED",
    width: 250,
    renderCell: ({ value }: GridRenderCellParams) => (
      <Typography variant="body1">
        <Moment format="DD/MM/YYYY, h:mm a">{value}</Moment>
      </Typography>
    ),
  },
  {
    field: ".",
    headerName: "ACTION",
    width: 150,
    renderCell: ({ row }: GridRenderCellParams) => (
      <Stack direction={"row"}>
        <IconButton>
          <RemoveRedEyeIcon></RemoveRedEyeIcon>
        </IconButton>
        <IconButton>
          <EditIcon sx={{ color: "rgb(70, 70, 175)" }}></EditIcon>
        </IconButton>
        <IconButton>
          <DeleteForeverIcon
            sx={{ color: "rgb(201, 45, 45)" }}
          ></DeleteForeverIcon>
        </IconButton>
      </Stack>
    ),
  },
];

const StockPage: React.FC<any> = () => {
  const classes: { [key: string]: CSSProperties } = {
    dataGridBg: { backgroundColor: "#FFF" },
  };
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(stockActions.getStock());
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={classes.dataGridBg}
        loading={stockReducer.isFetching}
        rows={stockReducer.res}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default StockPage;
