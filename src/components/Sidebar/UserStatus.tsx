import React from 'react';
import { User } from '../../types';

interface UserStatusProps {
  user: User;
}

const UserStatus: React.FC<UserStatusProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-1">
      <div 
        className={`h-2.5 w-2.5 rounded-full ${
          user.status === 'online' 
            ? 'bg-green-500' 
            : user.status === 'away' 
              ? 'bg-yellow-500' 
              : 'bg-gray-400'
        }`}
      />
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {user.status === 'online' 
          ? 'Online' 
          : user.status === 'away' 
            ? 'Away' 
            : user.lastActive
        }
      </span>
    </div>
  );
};

export default UserStatus;