import {
  useState,
  useRef,
  useEffect,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { codeatom } from "@/store/atom";
import { useMutation } from "@tanstack/react-query";

interface ChatMessage {
  type: "question" | "answer";
  content: string;
}

export function Geminichat() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  // const [generatingAnswer, setGeneratingAnswer] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const code = useRecoilValue(codeatom).code!!!;

  const aiapi = async () => {
    const response = await axios.post("/api/ai",{
      code,
      question
    })
    return response.data;
  };

  const aiMutaion = useMutation({
    mutationFn: aiapi,
    retry: 3,
    onSuccess: (data: any) => {
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: data.message },
      ]);
      setAnswer(data);
    },
    onError: (error: any) => {
      // console.error(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    },
  });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, aiMutaion.isPending]);

  async function generateAnswer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!question.trim()) return;

    // setGeneratingAnswer(true);

    const currentQuestion = question;
    setQuestion("");

    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);
    aiMutaion.mutate();

    // try {
    //   const response2 = await axios.post("/api/ai",{
    //     code,
    //     question
    //   })

    //   const aiResponse2 = response2.data;
    //   console.log("aiResponse", aiResponse2);

    //   setChatHistory((prev) => [
    //     ...prev,
    //     { type: "answer", content: aiResponse2.message },
    //   ]);
    //   setAnswer(aiResponse2);
    // } catch (error) {
    //   console.error(error);
    //   setAnswer("Sorry - Something went wrong. Please try again!");
    // }

    // setGeneratingAnswer(false);
  }

  return (
    <div className="min-h-screen  flex items-center justify-center">
      {!isChatOpen && (
        <Image
          src="/ai.jpg"
          alt="AI"
          width={1000}
          height={1000}
          className="absolute w-[60px] h-[60px] right-6 bottom-4 cursor-pointer transition-transform duration-300 transform hover:scale-110"
          onClick={() => setIsChatOpen(true)}
        />
      )}

      {isChatOpen && (
        <div
          className={`fixed flex flex-col rounded-2xl border border-secondary  bg-muted/50 dark:bg-card shadow-lg  w-full max-w-lg ${
            isMinimized ? "bottom-7 right-10 h-16" : "bottom-4 right-6 h-[85%]"
          } transition-all duration-500`}
        >
          <header
            className={`flex justify-between text-primary-foreground items-center bg-primary text-white rounded-t-lg px-4 py-2 ${
              isMinimized ? "hidden" : ""
            }`}
          >
            <span>Online Code Compiler</span>
            <div className="flex space-x-5 text-primary-foreground">
              {/* <button
                className="text-gray-800 hover:text-gray-600 text-xl"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                _
              </button> */}
              <button
                className="text-card hover:text-gray-600 text-xl font-bold"
                onClick={() => setIsChatOpen(false)}
              >
                ✖
              </button>
            </div>
          </header>

          {!isMinimized && (
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {chatHistory.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <div className="bg-[#1a1a1a]  border border-secondary rounded-2xl shadow-inner bg-opacity-15 p-5 max-w-2xl">
                    <h2 className="text-2xl font-bold text-white">
                      Welcome to Chat
                    </h2>
                  </div>
                </div>
              ) : (
                chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      chat.type === "question" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block w-fit max-w-[80%] p-3 rounded-lg break-words overflow-auto ${
                        chat.type === "question"
                          ? "bg-neutral-800 text-white rounded-br-none"
                          : "bg-neutral-800 text-white rounded-bl-none"
                      }`}
                    >
                      <ReactMarkdown>{chat.content}</ReactMarkdown>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {!isMinimized && (
            <form
              onSubmit={generateAnswer}
              className="w-full bg-[#1a1a1a] bg-transparent border-t  p-4"
            >
              <div className="flex gap-2 items-center">
                <textarea
                  required
                  className="flex-1 w-full p-[14px] border border-secondary rounded-md resize-none overflow-auto scrollbar-hide focus:outline-none focus:ring-1 focus:ring-neutral-800 text-white"
                  value={question}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setQuestion(e.target.value)
                  }
                  placeholder="Type your question here..."
                  rows={1}
                  onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      generateAnswer(
                        e as unknown as FormEvent<HTMLFormElement>
                      );
                    }
                  }}
                ></textarea>
                <button
                  type="submit"
                  className={`px-6 py-[14px] bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary hover:bg-primary rounded-lg text-white font-medium transition-colors ${
                    aiMutaion.isPending ? "cursor-not-allowed" : ""
                  }`}
                  disabled={aiMutaion.isPending}
                >
                  {aiMutaion.isPending ? "Generating..." : "Send"}
                </button>
              </div>
            </form>
          )}

          {isMinimized && (
            <div
              className="text-center p-4 text-2xl font-bold cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <span className="text-white text-muted-foreground font-semibold">Chat AI</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
