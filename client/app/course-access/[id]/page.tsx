'use client'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import Loader from '@/app/components/Loader/Loader';
import CourseContent from "@/app/components/Course/CourseContent";
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';

type Props = {
  params: Promise<{
    id: string;
  }>;
}

const CourseAccessPage = ({params}: Props) => {
     const { id } = React.use(params);
     const {isLoading, error, data, refetch: refetchUser} = useLoadUserQuery(undefined,{refetchOnMountOrArgChange: true});
     const [createOrder, {data: orderData, error: orderError}] = useCreateOrderMutation();
     const [isAuthorized, setIsAuthorized] = useState(false);
     const [orderProcessing, setOrderProcessing] = useState(false);

     // Handle Stripe redirect with payment intent
     useEffect(() => {
       const searchParams = new URLSearchParams(window.location.search);
       const paymentIntent = searchParams.get('payment_intent');
       const redirectStatus = searchParams.get('redirect_status');
       
       if (paymentIntent && redirectStatus === 'succeeded') {
         setOrderProcessing(true);
         createOrder({ 
           courseId: id, 
           payment_info: { id: paymentIntent } 
         });
       }
     }, [id, createOrder]);

     // Handle order creation response
     useEffect(() => {
       if (orderData) {
         // Refetch user to get updated courses list
         refetchUser();
         setOrderProcessing(false);
       }
       
       if (orderError) {
         setOrderProcessing(false);
       }
     }, [orderData, orderError, refetchUser]);

     useEffect(() =>{
        if(data?.user?.courses && Array.isArray(data.user.courses)){
            const isPurchased = data.user.courses.find((item:any) => {
              const purchasedId = item?.courseId ?? item?._id ?? item;
              return purchasedId?.toString?.() === id.toString() || purchasedId === id;
            });
            
            if(isPurchased){
              setIsAuthorized(true);
            } else if (!orderProcessing) {
              redirect("/");
            }
        }
        
        if(error && !orderProcessing){
          redirect("/");
        }
     },[data, error, id, orderProcessing]);
  
  return (
     <>
       {
        isLoading || !isAuthorized ? (
          <Loader />
        ) :(
          <div>
             <CourseContent id={id} />
          </div>
        )
       }
     </>
  )
}

export default CourseAccessPage;
