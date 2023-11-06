/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
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
import * as stockIdActions from "../../../actions/stockId.action";
import { useAppDispatch } from "../../..";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { imageUrl } from "../../../Constants";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../features/Pagination";
import { useState } from "react";
import Modal from "../../features/Modal";
import { ModalRoleEnum } from "../../features/Modal/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";

const ShoppingPage: React.FC<any> = () => {
  const xs = useMediaQuery("(max-width:500px)");

  //reducer
  const stockReducers = useSelector(
    (state: RootReducers) => state.stockReducer
  );
  const stockIdReducer = useSelector(
    (state: RootReducers) => state.stockIdReducer
  );

  //action
  const dispatch = useAppDispatch();

  //modal
  const [role, setRole] = useState<ModalRoleEnum>(ModalRoleEnum.confirm);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  //search
  // const [keyword, setKeyword] = useState<string>("");

  //Pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 12;
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
                setRole(ModalRoleEnum.confirm);
                dispatch(stockIdActions.getById(String(res.id)));
                toggle();
              }}
            >
              <CardMedia
                sx={{ height: xs ? 120 : 200 }}
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

      <Modal
        role={role}
        textConfirm="Add to cart"
        onSubmit={() => {}}
        isOpen={isOpen}
        onClose={toggle}
      >
        {stockIdReducer.isFetching ? (
          <>
            <Skeleton animation="wave"></Skeleton>
            <Skeleton animation="wave"></Skeleton>
            <Skeleton animation="wave"></Skeleton>
            <Box sx={{ my: 2 }}></Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h3>{stockIdReducer.res?.name}</h3>

              <Stack
                direction={"column"}
                justifyContent={"center"}
                px={"20px"}
                alignItems={"center"}
              >
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={`${imageUrl}/images/${stockIdReducer.res?.image}`}
                    style={{ height: xs ? "150px" : "250px" }}
                  ></img>
                </Box>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  width={"100%"}
                  maxWidth={xs ? "228px" : "375px"}
                >
                  <Box>Stock: {stockIdReducer.res?.stock}</Box>
                  <Box>฿ {stockIdReducer.res?.price}</Box>
                </Stack>
              </Stack>
            </Box>
          </>
        )}
      </Modal>
    </Box>
  );
};

export default ShoppingPage;
