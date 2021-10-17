import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

import { useSocket } from '@/services/socket';

export default function CheckConnection({ hash }: { hash?: string }) {
  const { push } = useRouter();
  const { io } = useSocket();

  useEffect(() => {
    const event = `from-server.disconnect:${hash}`;

    const listener = () => {
      nookies.destroy(null, 'smart-mirror.mirror-hash');
      nookies.destroy(null, 'smart-mirror.user');
      push('/');
    };

    io.on(event, listener);

    return () => {
      io.off(event, listener);
    };
  }, [io, push, hash]);

  useEffect(() => {
    const event = `from-web.check-connection`;

    io.emit(event, { hash });
  }, [io, hash]);

  return null;
}
