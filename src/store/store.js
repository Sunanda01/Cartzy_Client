import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from './admin/products-slice'
import shopProductsSlice from './product-slice/index'
import shopCartSlice from './cart-slice/index'
import addressSlice from './address-slice/index'
const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductsSlice,
        shopProducts:shopProductsSlice,
        shopCart:shopCartSlice,
        shopAddress:addressSlice
    },
})

export default store;