
export default function Page() {
  return (
    <div>
      <div className="mb-10 bg-gradient-to-r from-gray-50 to-black p-10 w-1/2">
        <button className="p-10 mx-10 bg-white">One</button>
        <button className="p-10 mx-10 bg-white">Two</button>
      </div>
      <div className="mb-10 p-10 w-1/2
        bg-gradient-to-r from-gray-50 via-black to-gray-50">
        <button className="p-10 mx-10 bg-white">Three</button>
        <button className="p-10 mx-10 bg-white">Four</button>
      </div>
    </div>
  )
}
