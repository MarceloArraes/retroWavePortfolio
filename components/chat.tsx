import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const SUPABASE_URL = "https://kapjhvjdbaxlvwkmkmwe.supabase.co";
const supabase_client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface message {
  id: React.Key;
  de: string;
  texto?: string;
  created_at: string;
}

export default function ChatPage() {
  const [message, setMessage] = React.useState("");

  const [username, setUsername] = React.useState("Marcelo");

  const [messages, setMessages] = useState<Array<message>>([]);

  function updateMessagesRealTime() {
    return supabase_client
      .from("mensagens")
      .on("INSERT", (data: { new: any }) => {
        console.log("mensagem inserida");
        //setMessages((messages) => [...messages, data.new]);
      })
      .subscribe();
  }

  function deleteMessage(MessageToDelete: message): void {
    /* setMessages(newMessages); */
    supabase_client
      .from("mensagens")
      .delete()
      .match({ id: MessageToDelete.id })
      .then((result: any) => {
        console.log("Message deleted:", result);
        //setMessages(messages.filter((m) => m.id !== MessageToDelete.id));
      });
  }

  useEffect(() => {
    supabase_client
      .from("mensagens")
      .select("*")
      .then((result) => {
        console.log(result);
        //setMessages(result.data);
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
          //setMessages([...messages, result.data[0]]);
        });

      console.log("entered e.key", e.key);
      setMessage("");
    }
  }

  return (
    <div
      className="
                flex, alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            "
    >
      <div
        className="
                    flex,
                    flexDirection: 'column',
                    flex: 1,
                    divShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                "
      >
        <div
          className=""
          /* position: 'relative',
                        flex,
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    " */
        >
          <MessageList mensagens={messages} deleteMessage={deleteMessage} />

          <form className="flex items-center">
            <input
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              className="w-full rounded-sm p-2 bg-gray-700 m-10 text-gray-300"
              /* className="w-full border-none resize-none rounded-sm p-2 bg-gray-700 mr-3 text-gray-300" */
              /* width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            " */
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
                    p-1.5
                    mb-3
                    hover: bg-gray-500
                "
        >
          <div className="mb-2">
            <img
              className="
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        "
              src={`https://github.com/${mensagem.de}.png`}
            />
            <div className="strong">{mensagem.de}</div>
            {/*         <Icon
                    className="deletemessage"
                    label="Icon Component"
                    name="FaRegWindowClose"
                    className="
                      color: 'currentColor',
                      cursor: 'pointer',
                      fontSize: '1.5rem',
                      float: 'right',
                    "
                    onClick={() => {
                        console.log('clicked');
                        deleteMessage(mensagem);
                    
                  /> */}
            <span
              className="fontSize: '10px',
                            marginLeft: '8px',
                            color: appConfig.theme.colors.neutrals[300],
                        "
            >
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      );
    });
  return (
    <div
      className="ul
                overflow: 'scroll'
                flex,
                flexDirection: 'column-reverse'
                mb-4"
    >
      {messages}
    </div>
  );
}
