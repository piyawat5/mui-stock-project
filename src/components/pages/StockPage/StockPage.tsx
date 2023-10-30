/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { httpClient } from "../../../utils/httpclient";
import { imageUrl, server } from "../../../Constants";
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
  const [rows, setRows] = useState<any[]>([]);
  const classes: { [key: string]: CSSProperties } = {
    dataGridBg: { backgroundColor: "#FFF" },
  };
  async function getData() {
    let res = await httpClient.get(server.PRODUCT_URL);
    setRows([...res.data]);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        autoHeight
        sx={classes.dataGridBg}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default StockPage;
