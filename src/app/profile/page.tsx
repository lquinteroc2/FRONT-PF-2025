import EmotionsHistoryUser from "@/components/Emotion/EmotionsHistoryUser";
import ProfileUserView from "@/components/ProfileUser/ProfileUserView";
import SubscriptionPlans from "@/components/Stripe/SubscriptionPlans";

const PageProfile = () => {
    return (
        <div > 
        <ProfileUserView/>
        <EmotionsHistoryUser/> 
        <SubscriptionPlans/>
         </div>
    )
}

export default PageProfile;