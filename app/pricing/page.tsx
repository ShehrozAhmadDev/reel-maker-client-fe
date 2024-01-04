"use client";
import PaymentModal from "@/components/modals/paymentModal/paymentModal";
import MainContainer from "@/providers/mainContainer/mainContainer";
import MainLayout from "@/providers/mainLayout/mainLayout";
import { useAppSelector } from "@/redux/store";
import Plans from "@/services/plan";
import Subscriptions from "@/services/subscription";
import { PlanDataType, SubscriptionType } from "@/types/type";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user-slice";

const Pricing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [plansData, setPlansData] = useState<PlanDataType[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PlanDataType | null>(null);
  const [userSubscriptions, setUserSubscriptions] =
    useState<SubscriptionType | null>(null);

  const [showModal, setShowModal] = useState(false);
  const { user } = useAppSelector((state) => state.userReducer.value);
  const getAllPlans = () => {
    Plans.getPlans()
      .then((data) => {
        setPlansData(data.products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const handleSelectPlan = (plan: PlanDataType) => {
    console.log({ userSubscriptions });
    if (!user) {
      router.push("/login");
      return;
    } else {
      if (userSubscriptions && userSubscriptions.status === "active") {
        toast.error("Please cancel your previous subscription");
        return;
      }
      setSelectedPlan(plan);
      setShowModal(true);
    }
  };

  const handleCancelPlan = async () => {
    try {
      if (user?.subscriptionId) {
        const token = Cookie?.get("token");
        const data = await Subscriptions.cancelSubscription(
          user?.subscriptionId?._id,
          token
        );
        if (data.status === 200) {
          toast.success("Plan cancelled successfully");
          dispatch(setUser({ ...user, subscriptionId: null }));
          getUserSubscription();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occured");
    }
  };

  const getUserSubscription = async () => {
    try {
      if (user?.stripeId) {
        const token = Cookie?.get("token");
        console.log(user.stripeId);
        const subscriptions = await Subscriptions.getSubscriptions(
          user.stripeId,
          token
        );
        console.log({ subscriptions });
        if (subscriptions)
          setUserSubscriptions(subscriptions?.subscriptions?.[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPlans();
    getUserSubscription();
  }, []);

  console.log({ user, userSubscriptions });

  return (
    <MainLayout>
      <div className="text-white bg-[#0d0d10]">
        <MainContainer>
          <div className="flex items-center justify-center py-20 h-[calc(100vh-160px)]">
            {plansData?.map((plan, index) => (
              <div
                key={index}
                className="bg-[#212121] h-[400px] w-[350px] rounded-lg p-6 scardShadow mx-4 flex flex-col justify-between"
              >
                <span>
                  <h2 className="text-2xl font-bold mb-4 gradient-text text-center">
                    {plan.title}
                  </h2>
                  <p className="text-4xl font-semibold mb-4 text-center">
                    ${(plan.price / 100).toFixed(2)}
                  </p>

                  <div className="list-disc pl-5 mb-8 mt-6">
                    {plan.features.map((feature, idx) => (
                      <span className="flex space-x-2" key={idx}>
                        <p className="bg-gradient-to-r from-purple-600 to-pink-500 w-2 h-2 rounded-full mt-1.5"></p>
                        <p key={idx}>{feature}</p>
                      </span>
                    ))}
                  </div>
                </span>

                {userSubscriptions?.productId === plan.productId ? (
                  <>
                    {user?.subscriptionId?.subscriptionId &&
                    user?.subscriptionId?.paymentStatus === "approved" ? (
                      <button
                        onClick={() => handleCancelPlan()}
                        className="w-full border-[1px] border-600 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-300"
                      >
                        Cancel Plan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSelectPlan(plan)}
                        className="w-full b bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-300"
                      >
                        Select Plan
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full b bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-300"
                  >
                    Select Plan
                  </button>
                )}
              </div>
            ))}
          </div>
        </MainContainer>
      </div>
      <div className="w-full items-center justify-center">
        <PaymentModal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
          selectedPlan={selectedPlan}
          getUserSubscription={getUserSubscription}
        />
      </div>
    </MainLayout>
  );
};

export default Pricing;
