/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
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
import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Link } from "react-router-dom";
import { useDebounce } from "@react-hook/debounce";

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
    dataGridBg: {
      backgroundColor: "#FFF",
      borderRadius: "0 0 4px 4px",
      borderTop: "none",
    },
  };
  const stockReducer = useSelector((state: RootReducers) => state.stockReducer);
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (keyword !== "") {
      const getData = setTimeout(() => {
        dispatch(stockActions.getStock(keyword));
      }, 1000);

      return () => clearTimeout(getData);
    } else {
      dispatch(stockActions.getStock());
    }
  }, [keyword]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "4px 4px 0 0",
          display: "flex",
          px: 4,
          py: 2,
        }}
      >
        <TextField
          label="Search"
          variant="standard"
          sx={{ height: "20px" }}
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setKeyword(e.target.value);
          }}
        ></TextField>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Fab
          to="/stock/create"
          component={Link}
          sx={{ color: "white" }}
          color="primary"
          aria-label="add"
        >
          <Add />
        </Fab>
      </Box>
      <Box sx={{ height: "60vh", width: "100%" }}>
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
    </Box>
  );
};

export default StockPage;
