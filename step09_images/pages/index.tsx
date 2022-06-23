import type { NextPage } from 'next';
import Image from 'next/image';

const HomePage: NextPage = () => {
  return (
    <div>
      <Image
        src='https://images.unsplash.com/photo-1605460375648-278bcbd579a6'
        width={500}
        height={200}
        alt='A beautiful English Setter'
        />
      <div
        style={{ width: 500, height: 200, position:
        'relative' }}
        >
        <Image
        src='https://images.unsplash.com/photo-1605460375648-278bcbd579a6'
        layout='fill'
        objectFit='cover'
        alt='A beautiful English Setter'
        />
      </div>
    </div>
  )
}

export default HomePage
