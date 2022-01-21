import { Link } from 'react-router-dom'
import { useState, createRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'

const CollapseIcon = () => {
  return (
    <svg
      className='block h-6 w-6'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 6h16M4 12h16M4 18h16'
      />
    </svg>
  )
}

const CloseIcon = () => {
  return (
    <svg
      className='block h-6 w-6'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      aria-hidden='true'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  )
}

const Navbar = ({ handleLogin, handleLogout, userAddress }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [buttonCaption, setButtonCaption] = useState('')
  const ref = createRef()

  const buttonHoverHandler = () => {
    if (userAddress) {
      setButtonCaption('Disconnect')
    } else {
      setButtonCaption('Connect Wallet')
    }
  }

  const buttonLeaveHandler = () => {
    if (userAddress) {
      setButtonCaption(userAddress.slice(0, 6) + '...' + userAddress.slice(userAddress.length - 4))
    } else {
      setButtonCaption('Connect Wallet')
    }
  }

  useEffect(() => {
    if (userAddress) {
      setButtonCaption(userAddress.slice(0, 6) + '...' + userAddress.slice(userAddress.length - 4))
    } else {
      setButtonCaption('Connect Wallet')
    }
  }, [userAddress])

  return (
    <div>
      <nav className='bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <Link to='/' className='flex'>
                  <img className='"w-8 h-8 rounded-full' src='https://avatars.githubusercontent.com/u/56328053?v=4' />
                </Link>
              </div>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <Link
                    to='/pay'
                    className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Pay
                  </Link>

                  <Link
                    to='/sign'
                    className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Sign
                  </Link>
                </div>
              </div>
            </div>

            <div className='hidden md:block'>
              <div className='ml-4 flex items-center md:ml-6'>
                <button
                  type='button'
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={userAddress ? handleLogout : handleLogin}
                  onMouseOver={buttonHoverHandler}
                  onMouseLeave={buttonLeaveHandler}
                >
                  {buttonCaption}
                </button>
              </div>
            </div>

            <div className='-mr-2 flex md:hidden'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type='button'
                className='bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                {!isOpen
                  ? <CollapseIcon />
                  : <CloseIcon />}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter='transition ease-out duration-100 transform'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-75 transform'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          {() => (
            <div className='md:hidden' id='mobile-menu'>
              <div ref={ref} className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                <Link
                  to='/pay'
                  className=' hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium'
                >
                  Pay
                </Link>

                <Link
                  to='/sign'
                  className=' hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium'
                >
                  Sign
                </Link>

                <button
                  type='button'
                  className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full'
                  onClick={userAddress ? handleLogout : handleLogin}
                  onMouseOver={buttonHoverHandler}
                  onMouseLeave={buttonLeaveHandler}
                >
                  {buttonCaption}
                </button>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  )
}

export default Navbar
