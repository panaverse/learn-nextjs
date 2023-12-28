import { wait } from "./Wait";

const Views = async () => {
  await wait(3000);

  return (
    <div className="text-sm text-gray-700">
      Views: {Math.floor(Math.random() * 1000) + 1}
    </div>
  );
};
export default Views;
