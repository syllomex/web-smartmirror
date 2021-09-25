import Clock from '../components/Clock';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import Mails from '@/components/Mails';
import CheckConnection from '@/components/CheckConnection';

const Home: NextPage<{ user?: any; hash?: string }> = ({ user, hash }) => {
  return (
    <div>
      <Head>
        <title>Smart Mirror</title>
      </Head>

      <div className="container">
        <Clock user={user} direction="column" />
        <Mails user={user} />
        <CheckConnection hash={hash} />
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

  return { props: { user: JSON.parse(user), hash } };
};

export default Home;
