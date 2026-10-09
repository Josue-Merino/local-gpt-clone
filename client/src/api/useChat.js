import { useState } from 'react';

export default function useChat() {
    const [loading, setLoading] = useState(false);

    const askAI = async (prompt) => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            
            if (!res.ok) throw new Error('Error en el servidor');
            const data = await res.json();
            return data.response;
        } catch (error) {
            console.error('Error:', error);
            return "Lo siento, hubo un error procesando tu solicitud.";
        } finally {
            setLoading(false);
        }
    };

    return { askAI, loading };
}