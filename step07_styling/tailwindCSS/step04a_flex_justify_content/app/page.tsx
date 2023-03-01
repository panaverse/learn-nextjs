import Image from 'next/image'

export default function Page() {
  return (
    <div className="wrapper">
        <div className="menu flex justify-between">
          <a href="#" className="active">Profile</a>
          <a href="#">Notifications</a>
          <a href="#">Payments</a>
          <a href="#">Settings</a>
        </div>
    </div>
  )
}
