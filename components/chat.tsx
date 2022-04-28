import React, { useState, useEffect } from "react";
import { createClient, PostgrestResponse } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const SUPABASE_URL = "https://kapjhvjdbaxlvwkmkmwe.supabase.co";
const supabase_client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface message {
  id: React.Key;
  de: string;
  texto?: string;
  created_at: Date;
}

export default function ChatPage(): JSX.Element {
  const [message, setMessage] = React.useState("");

  const [username, setUsername] = React.useState("MarceloArraes");

  const [messages, setMessages] = useState<Array<message>>([]);

  function updateMessagesRealTime() {
    return supabase_client
      .from("mensagens")
      .on("INSERT", (data: { new: any }) => {
        console.log("mensagem inserida");
        setMessages((messages) => [...messages, data.new]);
      })
      .subscribe();
  }

  function deleteMessage(MessageToDelete: message): void {
    /* setMessages(newMessages); */
    supabase_client
      .from("mensagens")
      .delete()
      .match({ id: MessageToDelete.id })
      .then((result: PostgrestResponse<any>) => {
        console.log("Message deleted:", result);
        setMessages(messages.filter((m) => m.id !== MessageToDelete.id));
      });
  }

  useEffect(() => {
    supabase_client
      .from("mensagens")
      .select("*")
      .then((result) => {
        console.log(result);
        console.log("first useEffect");
        if (result.data) {
          console.log("result.data.created_at ", result.data[0].created_at);
          console.log(
            "type of result.data[0].created_at",
            typeof result.data[0].created_at
          );
        }
        setMessages(result.data as Array<message>);
      });

    updateMessagesRealTime();
  }, []);

  function handleMessageInput(e: React.KeyboardEvent<HTMLInputElement>) {
    const mensagem = {
      /* id: Math.random(),  */
      texto: message,
      de: username,
    };
    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (e.key === "Enter" && message.trim().length > 0) {
      supabase_client
        .from("mensagens")
        .insert([mensagem])
        .then((result: any) => {
          console.log(result);
          //no longer necessary because there is a subscription on the updateMessagesRealTime function that updates the messages array
          //setMessages([...messages, result.data[0]]);
        });

      console.log("entered e.key", e.key);
      setMessage("");
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-500 h-full ">
      <div className="flex flex-col rounded bg-gray-700 sm:max-w-[65%] sm:p-6">
        <div className="relative flex h-3/4 flex-col p-5 rounded bg-gray-800">
          <MessageList mensagens={messages} deleteMessage={deleteMessage} />

          <form className="flex items-center">
            <input
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              className="w-full  resize-none rounded-sm p-2 bg-gray-700  text-gray-300"
              value={message}
              onKeyPress={(e) => {
                handleMessageInput(e);
              }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

function MessageList({
  mensagens,
  deleteMessage,
}: {
  mensagens: Array<message>;
  deleteMessage: (MessageToDelete: message) => void;
}) {
  if (mensagens.length === 0) {
    return <div></div>;
  }

  //map the props.mensagens to a list of messages
  const messages = mensagens
    .slice(0)
    .reverse()
    .map((mensagem: message) => {
      return (
        <div
          key={mensagem.id}
          className="rounded
                    p-3
                    mb-3
                    bg-gray-300
                    hover:bg-gray-500
                "
        >
          <div className="relative ">
            <img
              className="w-12 h-12 rounded-full mr-2 "
              /* src={`https://github.com/${mensagem.de}.png`} */
              /* src="https://picsum.photos/200?random=1" */
              src="/synthGlasses.png"
            />
            {/* <div className="relative strong">{mensagem.de}</div> */}
            <img
              src="https://img.icons8.com/color/48/000000/delete-forever.png"
              className="float-right absolute right-0 top-0
                    cursor-pointer
                    w-8 h-8
                    ml-2
                    "
              onClick={() => {
                console.log("clicked");
                deleteMessage(mensagem);
              }}
            />
            <span className="absolute text-xs text-gray-800 top-0 ml-[45%]">
              {new Date(mensagem.created_at).toDateString()}
            </span>
            <div className="break-all ml-[25%]">{mensagem.texto}</div>
          </div>
        </div>
      );
    });

  return (
    <div
      className="flex max-h-80 flex-col-reverse list-disc overflow-scroll
                mb-4"
    >
      {messages}
    </div>
  );
}
