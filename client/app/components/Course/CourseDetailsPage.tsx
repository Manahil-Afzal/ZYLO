"use client";

import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useMemo, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";

type StripeConfigResponse = {
  publishablekey?: string;
};

type CourseResponse = {
  course?: {
    _id: string;
    name: string;
    price: number;
    tags?: string;
  };
};

type PaymentIntentResponse = {
  client_secret?: string;
};

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id) as {
    data?: CourseResponse;
    isLoading: boolean;
  };
  const { data: config } = useGetStripePublishablekeyQuery({}) as {
    data?: StripeConfigResponse;
  };
  const [createPaymentIntent, { data: PaymentIntentData }] =
    useCreatePaymentIntentMutation();

  const course = data?.course;

  const stripePromise = useMemo(() => {
    const publishablekey = config?.publishablekey;
    return publishablekey ? loadStripe(publishablekey) : null;
  }, [config?.publishablekey]);

  const clientSecret =
    (PaymentIntentData as PaymentIntentResponse | undefined)?.client_secret ??
    "";

  useEffect(() => {
    if (data?.course?.price) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [data?.course?.price, createPaymentIntent]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={(course?.name ?? "Course") + " - ZyLO Learning"}
            description="ZyLo is a Community which is developed by Manahil for helping Engineers"
            keywords={course?.tags ?? ""}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {course && (
            <CourseDetails
              data={course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              open={open}
              setOpen={setOpen}
            />
          )}
          <Footer />
          <div className="w-[90%] 800px:w-[85%] m-auto py-10"></div>
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;