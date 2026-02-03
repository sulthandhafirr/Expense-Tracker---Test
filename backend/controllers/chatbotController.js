// @desc    Chat with AI assistant
// @route   POST /api/chatbot
// @access  Private
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message is required' 
      });
    }

    // Generate bot response based on message
    const botResponse = getBotResponse(message);

    res.status(200).json({
      success: true,
      data: {
        message: botResponse,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Helper function to generate responses
const getBotResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('cara') && (lowerMsg.includes('tambah') || lowerMsg.includes('add'))) {
    return 'Untuk menambah expense, klik tombol "+ Tambah Expense" di Dashboard atau Expenses page. Isi form dengan nama, jumlah, kategori, dan tanggal expense Anda.';
  } else if (lowerMsg.includes('kategori')) {
    return 'Kategori yang tersedia: Food, Transportation, Entertainment, Shopping, Bills, Health, dan Other. Anda bisa memfilter expense berdasarkan kategori di halaman Expenses.';
  } else if (lowerMsg.includes('edit') || lowerMsg.includes('ubah')) {
    return 'Untuk mengedit expense, buka halaman Expenses, lalu klik tombol "Edit" pada expense yang ingin diubah.';
  } else if (lowerMsg.includes('hapus') || lowerMsg.includes('delete')) {
    return 'Untuk menghapus expense, buka halaman Expenses, lalu klik tombol "Delete" pada expense yang ingin dihapus. Konfirmasi diperlukan untuk menghindari penghapusan tidak disengaja.';
  } else if (lowerMsg.includes('dashboard')) {
    return 'Dashboard menampilkan ringkasan total pengeluaran Anda dan breakdown per kategori. Anda bisa melihat visualisasi pengeluaran dengan mudah di sana dengan berbagai warna untuk setiap kategori.';
  } else if (lowerMsg.includes('filter')) {
    return 'Di halaman Expenses, Anda bisa memfilter berdasarkan kategori dan tanggal untuk menemukan expense tertentu dengan lebih mudah. Filter membantu analisa pengeluaran Anda.';
  } else if (lowerMsg.includes('total') || lowerMsg.includes('jumlah')) {
    return 'Total pengeluaran Anda dapat dilihat di Dashboard. Sistem akan otomatis menghitung total dari semua expense yang sudah Anda input.';
  } else if (lowerMsg.includes('export') || lowerMsg.includes('download')) {
    return 'Fitur export data sedang dalam pengembangan. Saat ini Anda bisa melihat semua data expense Anda di halaman Expenses.';
  } else if (lowerMsg.includes('halo') || lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hai')) {
    return 'Halo! 👋 Senang bisa membantu Anda. Ada pertanyaan tentang Expense Tracker? Saya bisa membantu dengan cara tambah expense, kategori, edit, hapus, filter, dan fitur dashboard.';
  } else if (lowerMsg.includes('terima kasih') || lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
    return 'Sama-sama! 😊 Jika ada pertanyaan lagi, jangan ragu untuk bertanya ya! Saya siap membantu kapan saja.';
  } else if (lowerMsg.includes('bantuan') || lowerMsg.includes('help') || lowerMsg.includes('tolong')) {
    return 'Saya bisa membantu Anda dengan:\n- Cara menambah expense\n- Informasi kategori\n- Cara edit dan hapus expense\n- Fitur dashboard\n- Filter dan pencarian\n- Tips pengelolaan keuangan\n\nSilakan tanyakan apa yang Anda butuhkan!';
  } else if (lowerMsg.includes('berapa') && lowerMsg.includes('expense')) {
    return 'Untuk mengetahui jumlah expense Anda, silakan cek Dashboard yang menampilkan total pengeluaran dan breakdown per kategori secara real-time.';
  } else {
    return 'Maaf, saya belum mengerti pertanyaan Anda. 🤔 Coba tanya tentang:\n- Cara menambah expense\n- Kategori yang tersedia\n- Cara edit atau hapus expense\n- Fitur dashboard\n- Filter data\n\nAtau ketik "bantuan" untuk melihat semua yang bisa saya bantu!';
  }
};
