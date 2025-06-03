"use client";

import SubscriptionConfirm from "./SubscriptionConfirm";
import { subscribeUser, subscribeUserThree, subscribeUserPrueba } from "./SubscriptionsHelper";

interface Props {
  sessionId: string;
  planType: "normal" | "extended" | "trial";
  userId: string;
  token: string;
}

const SubscriptionConfirmSelector = ({ sessionId, planType, userId, token }: Props) => {
  let subscribeFn;

  switch (planType) {
    case "extended":
      subscribeFn = (params: { userId: string; sessionId: string; token: string }) =>
        subscribeUserThree(params);
      break;
    case "trial":
      subscribeFn = (params: { userId: string; sessionId: string; token: string }) =>
        subscribeUserPrueba(params);
      break;
    case "normal":
    default:
      subscribeFn = (params: { userId: string; sessionId: string; token: string }) =>
        subscribeUser(params);
      break;
  }

  return (
    <SubscriptionConfirm
      sessionId={sessionId}
      subscribeFn={() => subscribeFn({ userId, sessionId, token })}
    />
  );
};

export default SubscriptionConfirmSelector;
