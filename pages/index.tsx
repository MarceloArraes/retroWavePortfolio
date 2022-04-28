import type { NextPage } from "next";
import Head from "next/head";
import ChatPage from "../components/chat";

const Home: NextPage = () => {
  return (
    <div className="items-center justify-center w-screen h-screen">
      <Head>
        <title>Retrowave Portfolio</title>
        <meta name="description" content="RetroWave vibes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="items-center object-center text-center justify-items-center justify-center w-full h-screen border-2 border-black">
        <h2 className="w-full tracking-wide text-3xl">HELLO WORLD</h2>
      </div>
      <ChatPage />
    </div>
  );
};

export default Home;
