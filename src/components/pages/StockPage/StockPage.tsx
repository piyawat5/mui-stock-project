/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { CSSProperties, useEffect } from "react";
import { imageUrl } from "../../../Constants";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import * as stockActions from "../../../actions/stock.action";
import { useAppDispatch } from "../../..";
type StockPageProps = {
  //
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "image",
    headerName: "IMAGE",
    width: 100,
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
  },
  {
    field: "stock",
    headerName: "STOCK",
    width: 150,
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
