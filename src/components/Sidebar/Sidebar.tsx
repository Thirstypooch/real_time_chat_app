import React from 'react';
import ContactList from './ContactList';
import Profile from './Profile';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ContactList />
      </div>
      
      <Profile />
    </div>
  );
};

export default Sidebar;