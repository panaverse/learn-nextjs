import Image from "next/image";

export default function Page() {
  return (
    <div className="font-sans bg-purple-200 p-12">
      <h3>justify-start</h3>
      <div className="menu flex justify-start">
        <a href="#" className="active">
          Profile
        </a>
        <a href="#">Notifications</a>
        <a href="#">Payments</a>
        <a href="#">Settings</a>
      </div>
      <h3>justify-end</h3>
      <div className="menu flex justify-end">
        <a href="#" className="active">
          Profile
        </a>
        <a href="#">Notifications</a>
        <a href="#">Payments</a>
        <a href="#">Settings</a>
      </div>
      <h3>justify-center</h3>
      <div className="menu flex justify-center">
        <a href="#" className="active">
          Profile
        </a>
        <a href="#">Notifications</a>
        <a href="#">Payments</a>
        <a href="#">Settings</a>
      </div>
      <h3>justify-between</h3>
      <div className="menu flex justify-between">
        <a href="#" className="active">
          Profile
        </a>
        <a href="#">Notifications</a>
        <a href="#">Payments</a>
        <a href="#">Settings</a>
      </div>
      <h3>justify-around</h3>
      <div className="menu flex justify-around">
        <a href="#" className="active">
          Profile
        </a>
        <a href="#">Notifications</a>
        <a href="#">Payments</a>
        <a href="#">Settings</a>
      </div>
      <h3>justify-evenly</h3>
      <div className="menu flex justify-evenly">
        <a href="#" className="active">
          Profile
        </a>
        <a href="#">Notifications</a>
        <a href="#">Payments</a>
        <a href="#">Settings</a>
      </div>
    </div>
  );
}
