import React from 'react';
import { motion } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'error' | 'success' | 'info';
  onClose: () => void;
}

const typeClasses: Record<ToastProps['type'], string> = {
  error: 'bg-red-500/20 border-red-500/30 text-red-400',
  success: 'bg-green-500/20 border-green-500/30 text-green-400',
  info: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
};

const typeIcons: Record<ToastProps['type'], React.ReactNode> = {
  error: <AlertCircle size={18} />,
  success: <CheckCircle size={18} />,
  info: <Info size={18} />, 
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-xl border backdrop-blur-md flex items-center gap-3 ${typeClasses[type]}`}
  >
    {typeIcons[type]}
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-70">
      <X size={16} />
    </button>
  </motion.div>
);
