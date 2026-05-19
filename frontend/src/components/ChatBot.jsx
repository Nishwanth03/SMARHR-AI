import {
  useState,
  useEffect
} from "react";

import API from "../services/api";

function ChatBot({
      loggedUser
    }) {

  const [chatOpen, setChatOpen] =
    useState(false);

  const [chatMessage, setChatMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [chatHistory, setChatHistory] =
    useState([]);

  // CLOSE CHAT WHEN CLICK OUTSIDE
  useEffect(() => {

    const handleClickOutside =
      (event) => {

        const chatbot =
          document.getElementById(
            "chatbot-window"
          );

        if (
          chatOpen &&
          chatbot &&
          !chatbot.contains(
            event.target
          )
        ) {

          setChatOpen(false);

        }

      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, [chatOpen]);

  // SEND MESSAGE
  const sendMessage = () => {

    if (!chatMessage.trim())
      return;

    const userText =
      chatMessage;

    // USER MESSAGE
    setChatHistory((prev) => [

      ...prev,

      {
        type: "user",
        text: userText
      }

    ]);

    setChatMessage("");

    // START LOADING
    setLoading(true);

    // API REQUEST
    API.post("/chat", {

        message: userText,

        user: loggedUser

      })

    .then((res) => {

      const fullText =
        res.data.reply;

      // EMPTY AI MESSAGE
      const aiMessage = {

        type: "ai",

        text: ""

      };

      setChatHistory((prev) => [

        ...prev,

        aiMessage

      ]);

      let currentText = "";

      let index = 0;

      // TYPING EFFECT
      const interval =
        setInterval(() => {

          currentText +=
            fullText[index];

          setChatHistory((prev) => {

            const updated = [
              ...prev
            ];

            updated[
              updated.length - 1
            ] = {

              type: "ai",

              text: currentText

            };

            return updated;

          });

          index++;

          if (
            index >=
            fullText.length
          ) {

            clearInterval(
              interval
            );

            // STOP LOADING
            setLoading(false);

          }

        }, 20);

    })

    .catch((err) => {

      console.error(err);

      // STOP LOADING
      setLoading(false);

      setChatHistory((prev) => [

        ...prev,

        {

          type: "ai",

          text:
            "Error connecting to AI server."

        }

      ]);

    });

  };

  return (

    <div className="fixed bottom-5 right-5 z-50">

      {/* OPEN BUTTON */}

      {
        !chatOpen && (

          <button
            onClick={() =>
              setChatOpen(true)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-xl text-2xl flex items-center justify-center transition"
          >
            🤖
          </button>

        )
      }

      {/* CHAT WINDOW */}

      {
        chatOpen && (

          <div
            id="chatbot-window"
            className="w-80 h-[450px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          >

            {/* HEADER */}

            <div className="bg-blue-600 text-white px-4 py-3">

              <h2 className="font-bold text-lg">
                SmartHR AI
              </h2>

              <p className="text-xs text-blue-100">
                HR Assistant
              </p>

            </div>

            {/* CHAT AREA */}

            <div className="flex-1 overflow-auto p-3 bg-gray-100">

              {
                chatHistory.map(
                  (
                    msg,
                    index
                  ) => (

                    <div
                      key={index}
                      className={`mb-3 flex ${
                        msg.type ===
                        "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`px-3 py-2 rounded-2xl max-w-[220px] text-sm shadow break-words ${
                          msg.type ===
                          "user"
                            ? "bg-blue-500 text-white"
                            : "bg-white text-black"
                        }`}
                      >

                        {msg.text}

                      </div>

                    </div>

                  )
                )
              }

              {/* LOADING ANIMATION */}

              {
                loading && (

                  <div className="flex justify-start mb-3">

                    <div className="bg-white px-4 py-2 rounded-2xl shadow text-sm">

                      <div className="flex gap-1">

                        <span className="animate-bounce">
                          .
                        </span>

                        <span className="animate-bounce delay-100">
                          .
                        </span>

                        <span className="animate-bounce delay-200">
                          .
                        </span>

                      </div>

                    </div>

                  </div>

                )
              }

            </div>

            {/* INPUT AREA */}

            <div className="p-3 border-t bg-white">

              <div className="flex gap-2">

                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) =>
                    setChatMessage(
                      e.target.value
                    )
                  }

                  onKeyDown={(e) => {

                    if (
                      e.key ===
                      "Enter"
                    ) {

                      sendMessage();

                    }

                  }}

                  placeholder="Ask SmartHR AI..."
                  className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
                />

                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl transition"
                >
                  Send
                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

}

export default ChatBot;