import React, { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import { X, Image, Send } from "lucide-react"
import toast from "react-hot-toast"

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {

    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      console.error("Failed to Send Message",error);

    }
  };
  return (
    <div className='p-4 w-full border-t border-blue-500/20 bg-slate-900/50'>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border-2 border-blue-500/40"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-600
              flex items-center justify-center transition-colors"
              type="button"
            >
              <X className="size-4 text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input
            type='text'
            className='w-full input input-bordered rounded-xl input-sm sm:input-md bg-slate-800 border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500'
            placeholder='Type a message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle btn-sm transition-colors ${imagePreview ? "text-emerald-500 hover:bg-emerald-500/20" : "text-slate-400 hover:bg-blue-500/20 hover:text-blue-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>

        </div>

        <button
          type="submit"
          className='btn btn-sm btn-circle bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white'
          disabled={!text.trim() && !imagePreview}>
          <Send size={20} />

        </button>
      </form>
    </div>
  )
}

export default MessageInput
