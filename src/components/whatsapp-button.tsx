export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hello CampusLync, I would like to know more about your student support services.",
  );

  return (
    <a
      className="whatsapp-button"
      href={`https://wa.me/919119235092?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with CampusLync on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.05 3.2A12.7 12.7 0 0 0 5.1 22.3L3.3 28.8l6.65-1.74A12.75 12.75 0 1 0 16.05 3.2Zm0 2.15a10.6 10.6 0 1 1-5.4 19.72l-.38-.23-3.95 1.04 1.06-3.85-.25-.4a10.57 10.57 0 0 1 8.92-16.28Zm-4.77 4.53c-.23 0-.6.09-.92.43-.32.35-1.2 1.18-1.2 2.87 0 1.7 1.23 3.34 1.4 3.57.17.23 2.42 3.7 5.87 5.19 2.9 1.25 3.5 1 4.13.94.64-.06 2.06-.84 2.35-1.65.29-.81.29-1.5.2-1.65-.08-.14-.31-.23-.66-.4-.35-.18-2.06-1.02-2.38-1.13-.32-.12-.55-.18-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.4.26-.75.09-.35-.18-1.47-.54-2.8-1.73a10.5 10.5 0 0 1-1.94-2.42c-.2-.35-.02-.54.15-.71.16-.16.35-.4.52-.61.18-.2.23-.35.35-.58.11-.23.06-.43-.03-.6-.09-.18-.78-1.9-1.07-2.6-.28-.68-.57-.59-.78-.6h-.67Z"
        />
      </svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
}
