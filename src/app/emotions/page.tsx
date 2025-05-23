import  {StripeButton, StripeButtonPrueba, StripeButtonThree}  from '@/components/Buttons/StripeButton'
import EmotionsHistoryUser from '@/components/Emotion/EmotionsHistoryUser'

const Emotionspage = () => {
  return (
    <div>
      <EmotionsHistoryUser />
      <StripeButton />
      <StripeButtonThree/>
      <StripeButtonPrueba/>
    </div>
  )
}

export default Emotionspage
