import { Order } from '@/app/Types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(state.orders));
      localStorage.removeItem('cartItems');
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      localStorage.setItem('orders', JSON.stringify(state.orders));
      localStorage.removeItem('cartItems');
    },
    getOrderItems: (state) => {
      const orders = localStorage.getItem('orders');
      state.orders = orders ? JSON.parse(orders) : [];
    },
  },
});

export const { addOrder, setOrders, getOrderItems } = orderSlice.actions;
export default orderSlice.reducer;