import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/Chat/ChatWindow';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <div className="h-screen overflow-hidden flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="w-80 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 h-full">
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;