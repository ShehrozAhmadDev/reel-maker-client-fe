"use client";
import PaymentModal from "@/components/modals/paymentModal/paymentModal";
import MainContainer from "@/providers/mainContainer/mainContainer";
import MainLayout from "@/providers/mainLayout/mainLayout";
import Plans from "@/services/plan";
import { PlanDataType } from "@/types/type";

import React, { useEffect, useState } from "react";

const Pricing = () => {
  const [plansData, setPlansData] = useState<PlanDataType[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PlanDataType | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getAllPlans = () => {
    Plans.getPlans()
      .then((data) => {
        if (data?.status === 200) {
          setPlansData(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  const handleSelectPlan = (plan: PlanDataType) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-black">
        <MainContainer>
          <div className="flex items-center justify-center py-20 h-[calc(100vh-160px)]">
            {plansData?.map((plan, index) => (
              <div
                key={index}
                className="bg-white h-[400px] w-[350px] rounded-lg p-6 scardShadow mx-4 flex flex-col justify-between"
              >
                <span>
                  <h2 className="text-2xl font-bold mb-4 gradient-text text-center">
                    {plan.title}
                  </h2>
                  <p className="text-4xl font-semibold mb-4 text-center">
                    ${plan.price}
                  </p>

                  <div className="list-disc pl-5 mb-8 mt-6">
                    {plan.features.map((feature, idx) => (
                      <span className="flex space-x-2">
                        <p className="bg-gradient-to-r from-purple-600 to-pink-500 w-2 h-2 rounded-full mt-1.5"></p>
                        <p key={idx}>{feature}</p>
                      </span>
                    ))}
                  </div>
                </span>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-300"
                >
                  Select Plan
                </button>
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
        />
      </div>
    </MainLayout>
  );
};

export default Pricing;
