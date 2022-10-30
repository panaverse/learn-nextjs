
//https://beta.nextjs.org/docs/data-fetching/generating-static-params
export async function generateStaticParams() {
  const names: string[] = ["zia", "zeeshan", "hira"];

  return names.map((name) => ({
    name: name,
  }));
}

export default function GiveName({ params, searchParams }: {
  params: { name: string },
  searchParams: { id: string },
}) {
    return (
      <div>
            My name is {params.name}.
            
      </div>
    )
  }