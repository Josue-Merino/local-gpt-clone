import { useState } from "react";
import Conversation from "../components/Conversation";
import FormInput from "../components/FormInput";
import useChat from "../api/useChat";
import { useGlobal } from "../context/GlobalContext";

export default function Chat () {
    const { askAI, loading } = useChat();
    const { saveChat } = useGlobal();
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async (text) => {
        // Agrega el mensaje del usuario inmediatamente
        const newMessages = [...messages, { id: Date.now(), role: "user", content: text }];
        setMessages(newMessages);

        // Llama a la API (el backend ya filtra el <think>)
        const botResponse = await askAI(text);

        // Actualiza el chat con la respuesta limpia
        setMessages((prev) => [
            ...prev, 
            { id: Date.now(), role: "assistant", content: botResponse }
        ]);
    };

    const handleSaveSession = () => {
        saveChat(messages);
        setMessages([]); // Limpiar chat para iniciar uno nuevo
    };

    return (
        <main className="bg-neutral h-screen flex flex-col relative">
            {/* Botón flotante para guardar sesión en MongoDB */}
            {messages.length > 0 && (
                <button 
                    onClick={handleSaveSession}
                    className="absolute top-4 right-4 bg-ia-bg text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity z-10"
                >
                    Guardar y Nuevo Chat
                </button>
            )}

            <div className="flex-1 overflow-y-auto">
                <Conversation messages={messages} loading={loading} />
            </div>
            
            <FormInput onSendMessage={handleSendMessage} />
        </main>
    );
}