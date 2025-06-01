import EmotionalLogView from '@/components/Emotion/EmotionalLogView';
import EmotionsHistoryUser from '@/components/Emotion/EmotionsHistoryUser';
import { notFound } from "next/navigation";


const Emotionspage = async ({ params }: { params : Promise<{ section : string }> }) => {
  const { section } = await params;


  const allowedSections = ["myHistory", "myEmotionalLog"];
  if (!allowedSections.includes(section)) {
    notFound();
  }


  return (
<div className="p-6">
  {section === "myHistory" && <EmotionsHistoryUser/>}
  {section === "myEmotionalLog" && <EmotionalLogView />}
</div>
  );
};

export default Emotionspage;
