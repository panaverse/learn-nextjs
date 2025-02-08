

const gql = String.raw;
type todoType = {
  
}
const fetchDataFromGraphql = async ()=>{
   
  const res:Response = await fetch('http://localhost:3000/api/graphql', {method:'POST', headers:{"Content-Type":"application/json"}, body:JSON.stringify({
    query:gql`
    query TodosQuery {
      getTodos {
        description
        isCompleted
        id
      }
    }
    `
  })} )

  
const response:{data:{getTodos:{}}} =  await res.json()
console.log("response",response.data.getTodos )
return response.data.getTodos
}

export default function Home() {
  const data = fetchDataFromGraphql()
  return (
    <div>

      h
    </div>
  )
}
