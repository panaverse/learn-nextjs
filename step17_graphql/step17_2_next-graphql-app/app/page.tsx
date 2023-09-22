
const gql = String.raw;
const fetchProducts =async ()=>{
    const res = await fetch('http://localhost:3000/api/graphql',
    {
      cache: 'no-cache',
     method:"POST",
     headers:{
      "Content-Type":"application/json",
     },
     body:JSON.stringify({
      query: gql`
      query fetchProductQuery {
        getProducts {
          title
        }
      }`
     })
    },
    )
    const products = await res.json()
    console.log("products",products.data.getProducts)
    return products.data.getProducts
}

export default async function Home() {
  const products = await fetchProducts()
  console.log("products", products)
  return (
    <div>
       <button>fetch Latest products</button>
      {products?.map((item:{title:String})=>{
        return <p>{item.title}</p>
      })}

    </div>
  )
}
