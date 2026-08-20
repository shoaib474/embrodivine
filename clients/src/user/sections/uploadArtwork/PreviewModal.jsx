const PreviewModal = ({ file, onClose }) => {
  if (!file) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl border border-[#007BFF]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#007BFF]/10">
          <p className="text-[#222222] font-semibold truncate">{file.name}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#F5F7FA] border border-[#007BFF]/20 flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 bg-[#F5F7FA]">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
