import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import fetchAllData from "../actions/dataActions";

// 초기 상태 및 리듀서 정의
const dataSlice = createSlice({
  name: "data",
  initialState: {
    afterburner: [],
    functions: [],
    introduction: [],
    main: [],
    reviews: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.afterburner = action.payload.afterburner || [];
        state.functions = action.payload.functions || [];
        state.introduction = action.payload.introduction || [];
        state.main = action.payload.main || [];
        state.reviews = action.payload.reviews || [];
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// 상태에서 필요한 데이터를 선택하는 기본 선택자
const selectDataState = (state) => state.data;

// selectAllData 선택자를 메모이제이션하여 반환
export const selectAllData = createSelector([selectDataState], (dataState) => ({
  afterburner: dataState.afterburner,
  functions: dataState.functions,
  introduction: dataState.introduction,
  main: dataState.main,
  reviews: dataState.reviews,
}));

// 다른 상태 선택자들
export const selectStatus = createSelector(
  [selectDataState],
  (dataState) => dataState.status,
);

export const selectError = createSelector(
  [selectDataState],
  (dataState) => dataState.error,
);

export default dataSlice.reducer;
