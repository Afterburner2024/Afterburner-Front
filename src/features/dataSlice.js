import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import fetchAllData from "../actions/dataActions";

// 시간 조건 설정 (예: 3시간)
const DATA_FETCH_INTERVAL = 2 * 60 * 60 * 1000;

// 초기 상태 및 리듀서 정의
const dataSlice = createSlice({
  name: "data",
  initialState: {
    afterburner: [],
    functions: [],
    introduction: [],
    main: [],
    reviews: [],
    contributor: [],
    status: "idle",
    error: null,
    timestamp: null,
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
        state.contributor = action.payload.contributor || [];
        state.timestamp = Date.now();
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// 상태에서 필요한 데이터를 선택하는 기본 선택자
const selectDataState = (state) => state.data;

// timestamp와 데이터를 확인하는 함수 추가
export const shouldFetchData = createSelector(
  [selectDataState],
  (dataState) => {
    const currentTime = Date.now();
    const lastFetched = dataState.timestamp;

    // lastFetched가 없거나 (데이터가 처음 로드되었거나) 일정 시간이 지났으면 true 반환
    return !lastFetched || currentTime - lastFetched > DATA_FETCH_INTERVAL;
  },
);

// selectAllData 선택자를 메모리제이션하여 반환
export const selectAllData = createSelector([selectDataState], (dataState) => ({
  afterburner: dataState.afterburner,
  functions: dataState.functions,
  introduction: dataState.introduction,
  main: dataState.main,
  reviews: dataState.reviews,
  contributor: dataState.contributor,
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
