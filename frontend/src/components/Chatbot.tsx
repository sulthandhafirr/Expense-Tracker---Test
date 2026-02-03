import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    { text: 'Halo! Saya asisten Expense Tracker. Ada yang bisa saya bantu?', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    // Tambah pesan user
    const userMessage = { text: inputText, sender: 'user' as const };
    setMessages([...messages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Call backend API
      const response = await api.post('/chatbot/chat', { message: inputText });
      const botResponse = response.data.data.message;
      
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      // Fallback to local response if backend fails
      const fallbackResponse = getBotResponse(inputText);
      setMessages(prev => [...prev, { text: fallbackResponse, sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getBotResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('cara') && (lowerMsg.includes('tambah') || lowerMsg.includes('add'))) {
      return 'Untuk menambah expense, klik tombol "+ Tambah Expense" di Dashboard atau Expenses page. Isi form dengan nama, jumlah, kategori, dan tanggal expense Anda.';
    } else if (lowerMsg.includes('kategori')) {
      return 'Kategori yang tersedia: Makanan, Transport, Belanja, Hiburan, dan Lainnya. Anda bisa memfilter expense berdasarkan kategori di halaman Expenses.';
    } else if (lowerMsg.includes('edit') || lowerMsg.includes('ubah')) {
      return 'Untuk mengedit expense, buka halaman Expenses, lalu klik tombol "Edit" pada expense yang ingin diubah.';
    } else if (lowerMsg.includes('hapus') || lowerMsg.includes('delete')) {
      return 'Untuk menghapus expense, buka halaman Expenses, lalu klik tombol "Delete" pada expense yang ingin dihapus.';
    } else if (lowerMsg.includes('dashboard')) {
      return 'Dashboard menampilkan ringkasan total pengeluaran Anda dan breakdown per kategori. Anda bisa melihat visualisasi pengeluaran dengan mudah di sana.';
    } else if (lowerMsg.includes('filter')) {
      return 'Di halaman Expenses, Anda bisa memfilter berdasarkan kategori dan tanggal untuk menemukan expense tertentu dengan lebih mudah.';
    } else if (lowerMsg.includes('halo') || lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
      return 'Halo! Senang bisa membantu Anda. Ada pertanyaan tentang Expense Tracker?';
    } else if (lowerMsg.includes('terima kasih') || lowerMsg.includes('thanks')) {
      return 'Sama-sama! Jika ada pertanyaan lagi, jangan ragu untuk bertanya ya! 😊';
    } else {
      return 'Maaf, saya belum mengerti pertanyaan Anda. Coba tanya tentang cara menambah expense, kategori, edit, hapus, dashboard, atau filter.';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">🤖 Asisten Expense Tracker</h3>
              <p className="text-xs text-blue-100 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Online
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition duration-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition duration-200"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className={`bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-200 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? '...' : '➤'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:from-blue-700 hover:to-indigo-700 transition duration-300 z-50 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        style={{ width: '64px', height: '64px' }}
      >
        {isOpen ? (
          <span className="text-2xl">✕</span>
        ) : (
          <span className="text-3xl animate-bounce">💬</span>
        )}
      </button>
    </>
  );
};

export default Chatbot;
