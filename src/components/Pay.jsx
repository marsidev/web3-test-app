import { useState } from 'react'
import { ethers } from 'ethers'
import ErrorMessage from './ErrorMessage'
import { checkForWallet, payErrorHandling } from '../utils/'

const startPayment = async ({ address, amount, setError, setTxs }) => {
  try {
    checkForWallet()

    if (!address) {
      throw new Error('Please enter recipient address.')
    }

    if (!amount || amount <= 0) {
      throw new Error('Please enter a valid amount.')
    }

    await window.ethereum.send('eth_requestAccounts')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    ethers.utils.getAddress(address)
    const amountWei = ethers.utils.parseEther(amount)

    const tx = await signer.sendTransaction({
      to: address,
      value: amountWei
    })

    console.log({ address, amount, amountWei, tx })
    setTxs((txs) => [...txs, tx])
  } catch (error) {
    payErrorHandling(error, setError)
  }
}

const TxsList = ({ txs }) => {
  if (txs.length === 0) return null
  return (
    <>
      {txs.map((item, i) => (
        <div key={i} className='alert alert-info mt-5'>
          <div className='flex-1'>
            <label>
              <a
                href={`https://ropsten.etherscan.io/tx/${item.hash}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500'
              >
                {`TxHash #${i + 1}: ${item.hash}`}
              </a>
            </label>
          </div>
        </div>
      ))}
    </>
  )
}

const App = ({ userAddress }) => {
  const [error, setError] = useState('')
  const [txs, setTxs] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (userAddress) {
      const formData = new FormData(event.target)
      setError('')
      await startPayment({
        address: formData.get('address'),
        amount: formData.get('amount'),
        setError,
        setTxs
      })
      event.target.reset()
    } else {
      setError('Please connect your wallet first.')
    }
  }

  return (
    <div className='flex flex-col justify-center h-screen p-4'>
      <div className='bg-white rounded-lg shadow-lg p-10 border'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center'>
            <h1 className='text-2xl font-bold'>
              Send ETH payment
            </h1>
          </div>

          <div className='mb-4'>
            <input
              type='text'
              name='address'
              className='p-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Recipient Address'
              required
            />
          </div>

          <div className='mb-4'>
            <input
              type='text'
              name='amount'
              className='p-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Amount in ETH'
              required
            />
          </div>

          <button
            type='submit'
            className='p-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Pay now
          </button>

          {error && <ErrorMessage message={error} />}
          <TxsList txs={txs} />

        </form>
      </div>
    </div>
  )
}

export default App
