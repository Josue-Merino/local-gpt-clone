function Conversation({ messages }) { // 1. Recibir los mensajes reales por props
    
    const isEmptyMock = !messages || messages.length === 0;

    return (
        <section 
            aria-label="Historial de Chat"
            className="w-full max-w-4xl mx-auto mt-6 px-4 py-4"
        >
            {isEmptyMock ? (
                <h1 className="text-center text-4xl text-gray-100 font-semibold">Bienvenido, intentemos algo nuevo </h1>
            ) : (
                 <ul className="flex flex-col gap-6">
                 {/* 2. Mapear la variable messages en lugar de mockMessages */}
                {messages.map((msg) => (
                    <li 
                        key={msg.id}
                        className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <article className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className="shrink-0" aria-hidden="true">
                                {msg.role === 'assistant' ? (
                                <span className="w-8 h-8 rounded-full bg-ia-bg flex items-center justify-center text-xs font-bold text-ia">
                                    IA
                                </span>
                                ) : (
                                <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                    Tú
                                </span>
                                )}
                            </div>
                            <p className={`p-4 rounded-2xl shadow-sm text-sm md:text-base ${ msg.role === 'user'
                                     ? 'bg-light-neutral text-gray-100 rounded-tr-none '
                                     : 'bg-transparent text-gray-100 rounded-tl-none text-justify border border-gray-700/90'
                                 }`}
                            >
                                {msg.content}
                            </p>
                        </article>
                    </li>
                ))}
            </ul>
            )}
        </section>
    );
}

export default Conversation;