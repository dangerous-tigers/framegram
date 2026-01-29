'use client';

import { useRouter } from 'next/navigation';
// В пропсах еще есть error - если вдруг будет нужен
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={() => {
          reset();
          router.refresh();
        }}
      >
        Try again
      </button>
    </div>
  );
}
