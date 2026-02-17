import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => { 
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("chatCurrentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
 
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("chatGroups");
    return savedGroups
      ? JSON.parse(savedGroups)
      : [
          { id: 1, name: "General", members: 4, messages: [] },
          { id: 2, name: "Private", members: 2, messages: [] },
        ];
  });
 
  const [activegroup, setActivegroup] = useState(() => {
    const savedActive = localStorage.getItem("chatActiveGroup");
    return savedActive ? JSON.parse(savedActive) : 1;
  });
 
  const [notification, setNotification] = useState(() => {
    const saved = localStorage.getItem("chatNotifications");
    return saved ? JSON.parse(saved) : {};
  });
 
  useEffect(() => {
    localStorage.setItem("chatGroups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("chatActiveGroup", JSON.stringify(activegroup));
  }, [activegroup]);

  useEffect(() => {
    localStorage.setItem("chatCurrentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("chatNotifications", JSON.stringify(notification));
  }, [notification]);

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        groups,
        setGroups,
        activegroup,
        setActivegroup,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
