import CounterView from "@/Counter";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24 py-5">
      <div className="text-bold text-lg">Counter App</div>
      <CounterView />
    </main>
  );
}
