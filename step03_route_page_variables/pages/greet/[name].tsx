import type { NextPage } from 'next';

//https://nextjs.org/docs/basic-features/typescript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params!;
  return {
        props: {
            name
        }
    }
}

interface Props{
  name: string;
}

//https://stackoverflow.com/questions/69560905/how-to-type-a-page-component-with-props-in-next-js
//https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript
//https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
const NamePage: NextPage<Props> = (props: Props) => {
  return (
    <div>
      Hello {props.name}.
    </div>
  )
}

export default NamePage
