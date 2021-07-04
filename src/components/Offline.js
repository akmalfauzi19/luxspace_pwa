function Offline() {
  return (
    <div className="bg-yellow-50 border-1-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-exclamation-diamond-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            You are offline. don't you worry, you still can do things
          </p>
        </div>
      </div>
    </div>
  );
}
export default Offline;
