import  {SubscriptionButton, SubscriptionButtonPrueba, SubscriptionButtonThree}  from '@/components/Buttons/SubscriptionButton'
import EmotionsHistoryUser from '@/components/Emotion/EmotionsHistoryUser'

const Emotionspage = () => {
  return (
    <div>
      <EmotionsHistoryUser />
      <SubscriptionButton />
      <SubscriptionButtonThree/>
      <SubscriptionButtonPrueba/>
    </div>
  )
}

export default Emotionspage
