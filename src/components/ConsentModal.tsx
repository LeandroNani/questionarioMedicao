"use client";

import { motion } from "framer-motion";

interface ConsentModalProps {
  onAccept: () => void;
}

export default function ConsentModal({ onAccept }: ConsentModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg overflow-y-auto rounded-t-3xl border-t border-slate-200 bg-white shadow-2xl sm:rounded-2xl sm:border"
        style={{ maxHeight: "92dvh" }}
      >
        {/* drag handle — mobile only */}
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-slate-200 sm:hidden" />

        <div className="px-5 pb-safe-or-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-slate-800 sm:text-lg">Termo de Consentimento</h2>
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-600">
            <p>
              Este questionário faz parte de uma <strong className="text-slate-800">pesquisa acadêmica</strong> desenvolvida
              no curso de Engenharia de Software da <strong className="text-slate-800">PUC Minas</strong>.
            </p>
            <p>Ao prosseguir, você está ciente de que:</p>
            <ul className="space-y-2.5 pl-0.5">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Suas respostas serão utilizadas <strong className="text-slate-700">exclusivamente para fins acadêmicos</strong>, sem qualquer aplicação comercial.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Os dados pessoais coletados serão <strong className="text-slate-700">criptografados e armazenados com segurança</strong>, garantindo sua privacidade.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Sua participação é <strong className="text-slate-700">voluntária e anônima</strong>; nenhuma resposta será vinculada à sua identidade.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Os resultados poderão ser publicados em trabalhos acadêmicos de forma <strong className="text-slate-700">agregada e sem identificação individual</strong>.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onAccept}
            className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Estou ciente e desejo continuar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
