import SubscriptionConfirm from "@/components/Subscription/SubscriptionConfirm";


const SubscriptionConfirmPage =async ({ params }: { params: Promise<{ sessionId: string }> }) => {
  const resolvedParams = await params;  // await completo de params
  const sessionId = resolvedParams.sessionId; // ya accedes a sessionId

  return <SubscriptionConfirm sessionId={sessionId} />;
}

export default SubscriptionConfirmPage;