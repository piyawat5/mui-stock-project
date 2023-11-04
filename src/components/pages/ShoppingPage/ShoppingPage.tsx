import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import * as stockActions from "../../../actions/stock.action";
import { useAppDispatch } from "../../..";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { imageUrl } from "../../../Constants";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../features/Pagination";
import { useState } from "react";

type ShoppingPageProps = {
  //
};

const ShoppingPage: React.FC<any> = () => {
  let [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const dispatch = useAppDispatch();
  const stockReducers = useSelector(
    (state: RootReducers) => state.stockReducer
  );
  const count = Math.ceil(stockReducers.res.length / PER_PAGE);
  const _DATA = usePagination(stockReducers.res, PER_PAGE);

  const handleChange = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  React.useEffect(() => {
    dispatch(stockActions.getStock());
  }, []);
  return (
    <Box>
      <Typography marginBottom={3} gutterBottom variant="h4">
        Shopping
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: "16px" }}>
        <Pagination
          count={count}
          size="large"
          page={page}
          shape="rounded"
          onChange={handleChange}
        />
      </Box>

      {stockReducers.isFetching && (
        <>
          <Skeleton
            variant="text"
            width={"100%"}
            height={80}
            animation="wave"
          ></Skeleton>
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={300}
            animation="wave"
          ></Skeleton>
        </>
      )}
      <Grid container spacing={3}>
        {_DATA.currentData().map((res) => (
          <Grid key={res.id} item xs={6} sm={4} md={3} lg={2}>
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => {
                alert(res.id);
              }}
            >
              <CardMedia
                sx={{ height: 120 }}
                image={`${imageUrl}/images/${res.image}`}
                title="green iguana"
              />
              <CardContent>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography
                    noWrap
                    gutterBottom
                    variant="body1"
                    component="div"
                  >
                    {res.name}
                  </Typography>
                  <Typography
                    noWrap
                    gutterBottom
                    variant="body1"
                    component="div"
                  >
                    ฿ {res.price}
                  </Typography>
                </Stack>
                <Typography noWrap sx={{ fontSize: "12px" }} component="div">
                  Stock: {res.stock}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShoppingPage;
