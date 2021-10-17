import type { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import nookies from 'nookies';

import Clock from '@/components/Clock';
import Mails from '@/components/Mails';
import CheckConnection from '@/components/CheckConnection';
import { useWidget } from '@/contexts/widget';
import Agenda from '@/components/Agenda';

const Home: NextPage<{ user?: any; hash?: string }> = ({ user, hash }) => {
  const { setHash } = useWidget();

  useEffect(() => {
    setHash(hash);
  }, [hash, setHash]);

  return (
    <div>
      <Head>
        <title>Smart Mirror</title>
      </Head>

      <div className="container">
        <Clock user={user} direction="row" />

        <div className="bottomContainer">
          <Mails user={user} />
          <Agenda user={user} />
          <CheckConnection hash={hash} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const user = cookies['smart-mirror.user'];
  const hash = cookies['smart-mirror.mirror-hash'];

  if (!user)
    return {
      redirect: { destination: '/', permanent: false },
    };

  return { props: { user: JSON.parse(user), hash: hash || null } };
};

export default Home;
