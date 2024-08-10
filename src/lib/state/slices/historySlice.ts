import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryState, TestResult } from "../../types/historySlice.types";

const dataFromLS = localStorage.getItem('history')

const initialState: HistoryState = dataFromLS ? JSON.parse(dataFromLS) : []

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<TestResult>) => {
      state.push(action.payload)
    }
  }
})

export const { addResult } = historySlice.actions

export default historySlice.reducer
