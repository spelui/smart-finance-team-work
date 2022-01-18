import { createSlice } from "@reduxjs/toolkit";
//import { getContacts, addContact, deleteContact } from "./contactsOperations";
import {
  getIncome,
  addIncome,
  deleteIncom,
  getCategories,
  getExpense,
  addExpense,
  deleteExpense,
  getCategoriesExpense,
} from "./transactionsOperation";

const initialState = {
  items: [],
  itemsExpense: [],
  categories: [],
  categoriesExpense: [],

  // filter: "",
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getIncome.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addIncome.fulfilled, (state, action) => ({
        ...state,
        items: [action.payload, ...state.items],
      }))

      .addCase(getCategories.fulfilled, (state, action) => ({
        ...state,
        categories: [...action.payload.data],
      }))
      .addCase(deleteIncom.fulfilled, (state, { payload }) => {
        const idx = state.items.findIndex((contact) => contact.id === payload);
        state.items.splice(idx, 1);
      })
      //////////////////////////////////////////////////////////////
      .addCase(getExpense.fulfilled, (state, { payload }) => {
        state.itemsExpense = payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => ({
        ...state,
        itemsExpense: [action.payload, ...state.itemsExpense],
      }))

      .addCase(getCategoriesExpense.fulfilled, (state, action) => ({
        ...state,
        categoriesExpense: [...action.payload.data],
      }))
      .addCase(deleteExpense.fulfilled, (state, { payload }) => {
        const idx = state.items.findIndex((contact) => contact.id === payload);
        state.itemsExpense.splice(idx, 1);
      });
  },
});

export default transactionSlice.reducer;