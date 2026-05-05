import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { OptimisticMessage } from '../ui/types';

export const useMessengerPageState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState('');
  const [searchName, setSearchName] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [optimisticMessages, setOptimisticMessages] = useState<OptimisticMessage[]>([]);

  const partnerId = useMemo(() => {
    const rawPartnerId = searchParams.get('partnerId');
    const parsed = Number(rawPartnerId);

    if (!rawPartnerId || Number.isNaN(parsed) || parsed <= 0) {
      return undefined;
    }

    return parsed;
  }, [searchParams]);

  const handleSelectDialog = (dialogPartnerId: number) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('partnerId', String(dialogPartnerId));
    router.replace(`${pathname}?${nextParams.toString()}`);
    setOptimisticMessages([]);
  };

  return {
    searchInput,
    setSearchInput,
    searchName,
    setSearchName,
    messageInput,
    setMessageInput,
    optimisticMessages,
    setOptimisticMessages,
    partnerId,
    handleSelectDialog,
  };
};
