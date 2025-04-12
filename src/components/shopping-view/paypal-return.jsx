import React from 'react'
import { Card, CardHeader, CardTitle } from '../ui/card'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { capturePayment } from '@/store/order-slice';

function PaypalReturnPage() {
    const dispatch=useDispatch();
    const location=useLocation();
    const params=new URLSearchParams(location.search);
    const payerId=params.get('PayerID');
    const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'));
    const paymentId=JSON.parse(sessionStorage.getItem('currentPaymentId'));
    dispatch(capturePayment({paymentId,payerId,orderId})).then((data)=>{
        if(data?.payload?.success){
            sessionStorage.removeItem('currentOrderId');
            sessionStorage.removeItem('currentPaymentId');
            window.location.href='/shop/payment-success';
        }
    })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturnPage