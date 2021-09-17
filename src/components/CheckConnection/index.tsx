import useAxios from '@/hooks/useAxios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function CheckConnection({ hash }: { hash?: string }) {
  const { push } = useRouter();

  const { data } = useAxios<{ connected?: boolean }, undefined>({
    path: 'mirrors/isConnected',
    params: { hash },
    skip: !hash,
    refetchInterval: 5,
  });

  useEffect(() => {
    if (data?.connected === false) {
      nookies.destroy(undefined, 'smart-mirror.user');
      nookies.destroy(undefined, 'smart-mirror.mirror-hash');
      push('/');
    }
  }, [data, push]);

  return null;
}
