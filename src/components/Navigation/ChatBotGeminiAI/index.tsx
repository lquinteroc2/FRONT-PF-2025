"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Minimize2, Bot } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { usePathname } from "next/navigation"


interface Message {
  sender: "user" | "bot"
  text: string
}

export default function GlobalChatbot() {
  const pathname = usePathname();

    if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null;
  }

  const words = [
    "Inteligente",
    "Eficiente",
    "Rápido",
    "Innovador",
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)
  const [messages, setMessages] = useState<Message[]>([{ sender: "bot", text: "Hola 👋, ¿cómo puedo ayudarte hoy?" }])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [words.length])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { sender: "user", text: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token") 

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatbot/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ message: input }),
      })

      if (!res.ok) throw new Error("Error en la API")

      const data = await res.json()
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }])
    } catch (error) {
      console.error("Error enviando mensaje:", error)
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Lo siento, hubo un error. Por favor intenta de nuevo.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const maximizeChat = () => {
    setIsMinimized(false)
  }

  return (
    <>
      {/* Botón flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 bg-primary hover:bg-primary.dark text-white rounded-full p-4 shadow-lg transition-colors z-50"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Widget Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ maxHeight: isMinimized ? "60px" : "500px", height: "auto" }}
            className={`
                fixed bottom-6 right-4 
                z-50 
                cursor-pointer 
                bg-card text-card-foreground 
                rounded-lg shadow-2xl border border-border 
                overflow-hidden
                ${isMinimized ? "p-0" : ""}
                w-[90vw] sm:w-80
            `}
            >
            {/* Encabezado */}
            <div 
               className="bg-primary text-white p-2 flex items-center justify-between"
               onClick={() => {
                if (isMinimized) {
                maximizeChat()
                } else {
                minimizeChat()
                }
            }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="font-semibold text-sm">Séntia</h3>
                  <p className="text-xs opacity-90">Powered by Gemini AI</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                onClick={(e) => {
                    e.stopPropagation()
                    isMinimized ? maximizeChat() : minimizeChat()
                }}
                className="hover:bg-white/20 rounded p-1"
                >
                <Minimize2 className="w-4 h-4" />
                </button>

                <button
                onClick={(e) => {
                    e.stopPropagation()
                    toggleChat()
                }}
                className="hover:bg-white/20 rounded p-1"
                >
                <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contenido Chat */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col flex-1 max-h-[500px]"
                    >
                  {/* Palabras dinámicas */}
                  <div className="p-3 bg-neutro.ice border-b border-border">
                    <motion.div
                      key={currentWord}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="text-center text-sm font-semibold text-primary"
                    >
                      {words[currentWord]}
                    </motion.div>
                  </div>

                  {/* Mensajes */}
                  <div ref={chatContainerRef} className="flex-1 p-3 overflow-y-auto space-y-2 bg-neutro.ice">
                    {messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${msg.sender === "user" ? "bg-primary text-white rounded-br-none" : "bg-card text-card-foreground rounded-bl-none shadow-sm"}`}>
                          <ReactMarkdown components={{
                            a: ({ node, ...props }) => <a {...props} className="underline hover:text-primary transition" target="_blank" rel="noopener noreferrer" />,
                            p: ({ node, ...props }) => <p {...props} className="mb-1 last:mb-0" />,
                          }}>{msg.text}</ReactMarkdown>
                        </div>
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-card text-card-foreground rounded-lg rounded-bl-none shadow-sm px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-3 bg-white border-t">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder={"Escribe un mensaje"}
                        disabled={isLoading}
                        className="flex-1 border border-primary rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-light focus:border-transparent disabled:opacity-50"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="bg-secondary-dark hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
