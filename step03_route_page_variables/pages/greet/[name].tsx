import type { NextPage } from 'next';

//https://nextjs.org/docs/basic-features/typescript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params;
    return {
        props: {
            name
        }
    }
}

const NamePage: NextPage = (props: GetServerSideProps) => {
  return (
    <div>
      Hello {props.name}.
    </div>
  )
}

export default NamePage
