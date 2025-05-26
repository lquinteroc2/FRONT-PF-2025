"use client";

import SubscriptionConfirm from "./SubscriptionConfirm";
import { subscribeUser, subscribeUserThree, subscribeUserPrueba } from "./SubscriptionsHelper";

interface Props {
  sessionId: string;
  planType: "normal" | "extended" | "trial";
}

const SubscriptionConfirmSelector = ({ sessionId, planType }: Props) => {
  let subscribeFn;

  switch (planType) {
    case "extended":
      subscribeFn = subscribeUserThree;
      break;
    case "trial":
      subscribeFn = subscribeUserPrueba;
      break;
    case "normal":
    default:
      subscribeFn = subscribeUser;
      break;
  }

  return <SubscriptionConfirm sessionId={sessionId} subscribeFn={subscribeFn} />;
};

export default SubscriptionConfirmSelector;
