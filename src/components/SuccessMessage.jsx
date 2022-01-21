export default function SuccessMessage({ message }) {
  if (!message) return null

  return (
    <div className='pt-4'>
      <div className='p-4 bg-green-200 border border-gray-300 text-green-600 text-sm rounded-lg block w-full'>
        {message}
      </div>
    </div>
  )
}
