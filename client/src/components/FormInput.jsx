import { useForm } from "react-hook-form"
import SendIcon from "../assets/icons/Send";

function FormInput({ onSendMessage }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const existErrors = errors.userPrompt

    const onSubmit = (data) => {
        onSendMessage(data.userPrompt);
        reset();
    }

  return (
    <section className="mx-auto mb-6 px-4 max-w-2xl w-full">
        {/* Mensaje de error estilizado */}
        {existErrors && (
            <div className="mb-2 ml-4 flex items-center gap-2 text-sm font-medium text-amber-500 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>Ingresa al menos 3 caracteres para continuar.</span>
            </div>
        )}
        
        <form className="relative mx-auto flex items-center" onSubmit={handleSubmit(onSubmit)}>
            <input 
                type="text" 
                /* Cambiamos dinámicamente el color del borde y el anillo (ring) si hay un error */
                className={`w-full bg-light-neutral text-gray-100 placeholder-zinc-400 rounded-full py-3 pl-6 pr-14 outline-none focus:ring-2 transition-all ${
                    existErrors 
                        ? 'focus:ring-amber-500 border border-amber-500/50' 
                        : 'focus:ring-ia border border-transparent'
                }`} 
                placeholder="Pregunta lo que quieras" 
                {...register("userPrompt", { required: true, minLength: 3 })} 
            />
            <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-ia-bg rounded-full w-9 h-9 flex justify-center items-center hover:opacity-90 transition-opacity"
            >
                <SendIcon />
            </button>
        </form>
    </section>
  );
}

export default FormInput;