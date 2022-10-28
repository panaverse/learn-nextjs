'use client';

import { useRouter } from 'next/navigation';

export default function GiveName({ params, searchParams }: {
  params: { name: string },
  searchParams: { id: string },
}) {
  const router = useRouter();
    return (
      <div>
            My name is {params.name}.
      
      </div>
    )
  }