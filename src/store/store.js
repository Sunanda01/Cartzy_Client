import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from './admin/products-slice'
import shopProductsSlice from './product-slice/index'
import shopCartSlice from './cart-slice/index'
import addressSlice from './address-slice/index'
import shoppingOrderSlice from './order-slice/index'
import adminOrderSlice from './admin/orders-slice/index'
import searchSlice from './search-slice/index'
import reviewSlice from './review-slice/index'
const store=configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductsSlice,
        shopProducts:shopProductsSlice,
        shopCart:shopCartSlice,
        shopAddress:addressSlice,
        shopOrder:shoppingOrderSlice,
        adminOrder:adminOrderSlice,
        shopSearch:searchSlice,
        shopReview:reviewSlice
    },
})

export default store;