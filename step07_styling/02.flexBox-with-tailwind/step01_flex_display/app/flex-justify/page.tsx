import Image from "next/image";

export default function Page() {
  return (
    <div className="font-sans bg-purple-200 p-12 text-center">
      <div className="flex justify-between bg-white p-2 rounded-full">
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
