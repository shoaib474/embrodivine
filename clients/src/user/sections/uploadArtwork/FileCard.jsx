import { Eye, FileText, Trash2 } from "lucide-react";

const FileCard = ({ file, onRemove, onPreview }) => {
  const isImage = file.type.startsWith("image/");
  const sizeMB = (file.size / 1024 / 1024).toFixed(2);

  return (
    <div className="flex items-center gap-4 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl p-4 group hover:border-[#007BFF]/50 transition-all">
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-lg overflow-hidden bg-white border border-[#007BFF]/10 flex items-center justify-center shrink-0">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileText className="w-7 h-7 text-[#007BFF]/50" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[#222222] font-semibold text-sm truncate">
          {file.name}
        </p>
        <p className="text-[#333333]/40 text-xs mt-0.5">
          {sizeMB} MB · {file.type.split("/")[1]?.toUpperCase()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {isImage && (
          <button
            type="button"
            onClick={() => onPreview(file)}
            className="w-8 h-8 rounded-lg bg-white border border-[#007BFF]/20 flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(file.name)}
          className="w-8 h-8 rounded-lg bg-white border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
