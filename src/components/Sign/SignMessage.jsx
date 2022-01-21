import { useState } from 'react'
import { ethers } from 'ethers'
import ErrorMessage from '../ErrorMessage'
import { formInputStyleClassName, formButtonStyleClassName, checkForWallet } from '../../utils'

const signMessage = async ({ setError, message, userAddress }) => {
  try {
    checkForWallet()
    if (!userAddress) throw new Error('Connect your wallet first.')

    await window.ethereum.send('eth_requestAccounts')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const signature = await signer.signMessage(message)
    const address = await signer.getAddress()

    return { message, signature, address }
  } catch (err) {
    setError(err.message)
  }
}

export default function SignMessage({ userAddress }) {
  const [signatures, setSignatures] = useState([])
  const [error, setError] = useState()

  const handleSign = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setError()
    const sig = await signMessage({
      setError,
      message: data.get('message'),
      userAddress
    })
    if (sig) {
      setSignatures([...signatures, sig])
    }
  }

  return (
    <form className='m-4' onSubmit={handleSign}>
      <div className='credit-card w-full shadow-lg mx-auto rounded-xl bg-white'>

        <main className='mt-4 p-4 -mb-6'>
          <h1 className='text-xl font-semibold text-gray-700 text-center'>
            Sign messages
          </h1>

          <div className='my-3'>
            <input
              required
              type='text'
              name='message'
              className={`textarea h-24 textarea-bordered focus:ring focus:outline-none ${formInputStyleClassName}`}
              placeholder='Message'
            />
          </div>
        </main>

        <footer className='p-4'>
          <button
            type='submit'
            className={formButtonStyleClassName}
          >
            Sign message
          </button>
          <ErrorMessage message={error} />
        </footer>

        {signatures.map((sig, idx) => {
          return (
            <div className='p-4' key={idx}>
              <div className='my-3'>
                <p className='break-words'>Message {idx + 1}: {sig.message}</p>
                <p className='break-words'>Signer: {sig.address}</p>
                <p className='break-words'>Signature: {sig.signature}</p>
              </div>
            </div>
          )
        })}
      </div>
    </form>
  )
}
