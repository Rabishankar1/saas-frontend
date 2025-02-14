import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { plansType, UserInterface } from "../constants";

interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  features: string[];
}

const PricingPage = ({
  refetchData,
  user,
}: {
  refetchData: any;
  user: UserInterface;
}) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const { data, isLoading, error } = useQuery<Plan[]>({
    queryKey: ["pricing"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/api/pricing`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: { plan: plansType; userId?: string }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/api/select-plan`,
        {
          ...payload,
        },
        { withCredentials: true }
      );
      return response.data;
    },
  });

  const handleSelectPlan = async (plan: plansType) => {
    console.log("Selected plan:", plan, user);
    const response = await mutation.mutateAsync({ plan, userId: user?._id });
    console.log(response);
    refetchData();
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading pricing...</div>;
  }

  if (error) {
    return <div className="text-center py-8">Error fetching pricing data.</div>;
  }

  const bentoClasses = [
    {
      container: "relative lg:row-span-2",
      background: "absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]",
      content:
        "relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]",
      ring: "pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]",
    },
    {
      container: "relative lg:row-span-2",
      background:
        "absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]",
      content:
        "relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]",
      ring: "pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]",
    },
    {
      container: "relative lg:row-span-2",
      background:
        "absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]",
      content:
        "relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]",
      ring: "pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]",
    },
  ];
  console.log(user, "user", data, "data");
  return (
    <>
      <div className="flex justify-center my-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`cursor-pointer px-5 py-2 text-sm font-medium border transition-colors duration-200
              ${
                billingCycle === "monthly"
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-white border-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-600"
              }
              rounded-l-md hover:bg-blue-500 hover:text-white focus:outline-none`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`cursor-pointer px-5 py-2 text-sm font-medium border transition-colors duration-200
              ${
                billingCycle === "yearly"
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-white border-gray-300 text-gray-800 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-600"
              }
              rounded-r-md hover:bg-blue-500 hover:text-white focus:outline-none`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-base font-semibold text-indigo-600">
            Work Faster
          </h2>
          <p className="mt-2 text-4xl leading-8 font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Various tiers to suit your needs
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:max-w-7xl">
          <div className="grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {data?.map((plan, idx) => {
              const classes = bentoClasses[idx] || bentoClasses[1];
              const isTierSelected =
                user?.subscriptionPlan === "Free"
                  ? idx === 0
                  : user?.subscriptionPlan === "Pro"
                  ? idx === 1
                  : idx === 2;
              return (
                <div
                  key={plan.name}
                  className={`${classes.container} transition-transform duration-200 hover:scale-105`}
                >
                  {/* Background layer */}
                  <div
                    className={`${classes.background} ${
                      isTierSelected
                        ? "inset-shadow-sm inset-shadow-indigo-500"
                        : ""
                    } bg-gray-900 dark:bg-gray-900 ${ isTierSelected
                        ? "border border-indigo-500"
                        : ""}`}
                  />

                  {/* Actual card content */}
                  <div className={`${classes.content} flex-1`}>
                    <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-6">
                      <p className="text-lg font-medium tracking-tight text-gray-900 dark:text-gray-200 text-center">
                        {plan.name}
                      </p>
                      <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 my-6 text-center">
                        $
                        {billingCycle === "monthly"
                          ? plan.monthly
                          : plan.yearly}
                        <span className="text-base font-normal text-gray-500 dark:text-gray-300 ml-1">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </p>

                      <ul className="mb-6 space-y-2">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="text-gray-600 dark:text-gray-300 flex items-center gap-2 justify-center"
                          >
                            <svg
                              className="w-5 h-5 text-blue-500 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 01.023 1.377l-7 8a1 1 0 01-1.451.04l-3-3a1 1 0 111.414-1.414l2.304 2.304 6.293-7.192a1 1 0 011.417-.115z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {plan.name === "Pro" && (
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md text-green-700 dark:text-green-200 text-xs font-medium text-center">
                          * Bonus: Exclusive Pro-only features!
                        </div>
                      )}
                      {plan.name === "Enterprise" && (
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-md text-yellow-700 dark:text-yellow-200 text-xs font-medium text-center">
                          * Bonus: Exclusive Enterprise-only features!
                        </div>
                      )}

                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={() =>
                            handleSelectPlan(plan.name as plansType)
                          }
                          disabled={isTierSelected}
                          className={`cursor-pointer inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm transition-colors duration-200 
                            ${
                              isTierSelected
                                ? "bg-gray-500 cursor-not-allowed opacity-50 text-white"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                        >
                          {isTierSelected
                            ? `${plan.name} Plan Chosen`
                            : `Choose ${plan.name}`}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={classes.ring} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
