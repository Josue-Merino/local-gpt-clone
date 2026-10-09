import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [history, setHistory] = useState([]);

    // Cargar historial desde el backend
    const loadHistory = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/history");
            const data = await res.json();
            setHistory(data);
        } catch (error) {
            console.error("Error cargando historial:", error);
        }
    };

    // Guardar un chat en el backend
    const saveChat = async (messages) => {
        if (messages.length < 2) return; // No guardar chats vacíos
        const title = messages[0].content.substring(0, 30) + "..."; // Usar primer mensaje como título
        
        try {
            await fetch("http://localhost:8080/api/history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, messages }),
            });
            loadHistory(); // Recargar historial tras guardar
        } catch (error) {
            console.error("Error guardando chat:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadHistory();
    }, []);

    return (
        <GlobalContext.Provider value={{ history, saveChat }}>
            {children}
        </GlobalContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => useContext(GlobalContext);