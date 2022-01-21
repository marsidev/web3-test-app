import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pay from './components/Pay'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import Sign from './components/Sign'
import { checkForWallet } from './utils/'
import { ethers } from 'ethers'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [userAddress, setUserAddress] = useState('')
  // const [chainId, setChainId] = useState('')
  // const [address, setAddress] = useState('')

  const handleLogin = async () => {
    try {
      checkForWallet()
      const { signer, address, chainId } = await getSignerData()

      // generate random string to sign with uuid
      const messageToSign = uuidv4()
      const signature = await signer.signMessage(messageToSign)
      console.log({ signature })

      // validate signature
      const isValid = await ethers.utils.verifyMessage(messageToSign, signature, address)

      if (!isValid) throw new Error('Invalid signature')
      if (chainId !== 3) throw new Error('Please connect to Ropsten testnet.')

      setUserAddress(address)
      localStorage.setItem('userAddress', address)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLogout = () => {
    setUserAddress('')
    localStorage.removeItem('userAddress')
  }

  const getSignerData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const chainId = await signer.getChainId()
    // const balance = await signer.getBalance()
    // const balanceWei = ethers.utils.formatEther(balance)

    console.log({ address, chainId })
    return { signer, address, chainId }
  }

  const detectNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const { chainId } = await getSignerData()
    if (chainId !== 3) {
      alert('Please connect to Ropsten testnet.')
    }

    provider.on('network', async (newNetwork, oldNetwork) => {
      if (oldNetwork) {
        setUserAddress('')
        localStorage.removeItem('userAddress')

        const { chainId } = await getSignerData()
        if (chainId !== 3) {
          alert('Please connect to Ropsten testnet.')
        }
      }
    })
  }

  useEffect(async () => {
    if (window.ethereum) {
      await detectNetwork()

      const localUserAddress = localStorage.getItem('userAddress')
      if (localUserAddress) {
        setUserAddress(localUserAddress)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar handleLogin={handleLogin} handleLogout={handleLogout} userAddress={userAddress}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/pay' element={<Pay userAddress={userAddress} />} />
        <Route path='/sign' element={<Sign userAddress={userAddress} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
