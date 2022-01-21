import SignMessage from './SignMessage'
import VerifyMessage from './VerifyMessage'

const App = ({ userAddress }) => {
  return (
    <div className='flex flex-wrap'>
      <div className='w-full lg:w-1/2'>
        <SignMessage userAddress={userAddress} />
      </div>
      <div className='w-full lg:w-1/2'>
        <VerifyMessage userAddress={userAddress} />
      </div>
    </div>
  )
}

export default App
