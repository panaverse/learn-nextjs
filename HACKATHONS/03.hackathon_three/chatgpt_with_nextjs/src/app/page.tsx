import Image from 'next/image'
import GPTView from './components/gpt-view'

export default function Home() {
  return (
    <main className='p-6'>
      <div className='w-full text-center py-4'>
        <h1 className='text-[22px] font-semibold'>ChatGPT 3 with Nextjs</h1>
      </div>
      <GPTView/>
    </main>
  )
}
