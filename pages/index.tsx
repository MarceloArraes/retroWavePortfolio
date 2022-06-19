import type { NextPage } from "next";
import Head from "next/head";
import ChatPage from "../components/chat";
import { Scroll } from "scrollex";

const keyframes = {
  heading: ({ section }:any) => ({
    [section.topAt("container-bottom")]: {
      translateX: -200,
    },
    [section.bottomAt("container-top")]: {
      translateX: 200,
    },
  }),
};

const Home: NextPage = () => {
  return (
    <div className="items-center justify-center w-screen h-screen">
      <Head>
        <title>Retrowave Portfolio</title>
        <meta name="description" content="RetroWave vibes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Scroll.Container scrollAxis="y" className="h-screen">
        <Scroll.Section className="h-screen center bg-1">
          <Scroll.Item keyframes={keyframes.heading}>
              <div className="items-center object-center text-center justify-items-center justify-center w-full h-screen border-2 border-black">
                  <h2 className="w-full tracking-wide text-3xl">HELLO WORLD</h2>
              </div>
          </Scroll.Item>
      </Scroll.Section>
      <Scroll.Section className="h-screen center bg-2">
         <Scroll.Item keyframes={keyframes.heading}>
          <h1>Page Two</h1>
        </Scroll.Item>
      </Scroll.Section>
      <Scroll.Section className="h-screen center bg-1">
         <Scroll.Item keyframes={keyframes.heading}>
           <ChatPage />
        </Scroll.Item>
      </Scroll.Section>
      </Scroll.Container>
    </div>
  );
};




export default Home;
