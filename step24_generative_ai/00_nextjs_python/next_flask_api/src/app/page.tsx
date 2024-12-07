import TodoList from './components/todo-list'

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center mt-16'>
      <h1 className='text-[18px] font-bold py-6'>NextJs Flask Todo List</h1>
      <TodoList />
    </main>
  )
}
