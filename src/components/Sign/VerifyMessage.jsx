import { useState } from 'react'
import { ethers } from 'ethers'
import ErrorMessage from '../ErrorMessage'
import SuccessMessage from '../SuccessMessage'
import { formInputStyleClassName, formButtonStyleClassName, checkForWallet } from '../../utils'

const verifyMessage = async ({ setError, setSuccessMsg, message, address, signature, userAddress }) => {
  try {
    checkForWallet()
    if (!userAddress) throw new Error('Connect your wallet first.')

    const signerAddr = await ethers.utils.verifyMessage(message, signature)
    if (signerAddr !== address) setError('Signature is not valid.')
    else setSuccessMsg('Signature is valid.')
  } catch (err) {
    setError(err.message)
  }
}

export default function VerifyMessage({ userAddress }) {
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleVerification = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setSuccessMsg('')
    setError('')
    await verifyMessage({
      setError,
      setSuccessMsg,
      message: data.get('message'),
      address: data.get('address'),
      signature: data.get('signature'),
      userAddress
    })
  }

  return (
    <form className='m-4' onSubmit={handleVerification}>
      <div className='credit-card w-full shadow-lg mx-auto rounded-xl bg-white'>

        <main className='mt-4 p-4 -mb-6'>
          <h1 className='text-xl font-semibold text-gray-700 text-center'>
            Verify signature
          </h1>

          <div className=''>
            <div className='my-3'>
              <input
                required
                type='text'
                name='message'
                className={`textarea h-24 textarea-bordered focus:ring focus:outline-none ${formInputStyleClassName}`}
                placeholder='Message'
              />
            </div>
            <div className='my-3'>
              <input
                required
                type='text'
                name='signature'
                className={`textarea h-24 textarea-bordered focus:ring focus:outline-none ${formInputStyleClassName}`}
                placeholder='Signature'
              />
            </div>
            <div className='my-3'>
              <input
                required
                type='text'
                name='address'
                className={`textarea h-24 textarea-bordered focus:ring focus:outline-none ${formInputStyleClassName}`}
                placeholder='Signer address'
              />
            </div>
          </div>
        </main>

        <footer className='p-4 -mb-6'>
          <button
            type='submit'
            className={formButtonStyleClassName}
          >
            Verify signature
          </button>
        </footer>

        <div className='p-4'>
          <ErrorMessage message={error} />
          <SuccessMessage message={successMsg} />
        </div>
      </div>
    </form>
  )
}
