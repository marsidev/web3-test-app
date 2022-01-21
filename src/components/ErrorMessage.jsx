export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className='pt-4'>
      <div className='p-4 bg-red-200 border border-gray-300 text-red-600 text-sm rounded-lg block w-full'>
        {message}
      </div>
    </div>
  )
}
