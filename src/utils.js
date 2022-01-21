import { ethers } from 'ethers'

export const formInputStyleClassName =
  'p-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

export const formButtonStyleClassName =
  'p-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'

export const checkForWallet = () => {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found. Please install it.')
  }
}

export const payErrorHandling = async (error, setError) => {
  if (error.message?.includes('User denied transaction signature')) {
    setError('You denied transaction signature.')
  } else if (error.message?.includes('insufficient funds')) {
    setError('Insufficient funds.')
  } else if (error.message?.includes('invalid address')) {
    setError('Please enter a valid address.')
  } else {
    console.log({ error })
    setError(error.message)
  }
}

export const chainIds = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan'
}

export const getBalance = async (wallet) => {
  if (wallet && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let balance = await provider.getBalance(wallet)
    balance = ethers.utils.formatEther(balance)
    return balance
  }
}
