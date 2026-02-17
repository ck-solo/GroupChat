import { useContext, useState } from "react";
import { ChatContext } from "../pages/ChatContext";

const Dashboard = () => {
  const {
    currentUser,
    groups,
    activegroup,
    setActivegroup,
    setGroups,
    setCurrentUser,
    notification,
    setNotification,
  } = useContext(ChatContext);

  const selectedGroup = groups.find((group) => group.id === activegroup);

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: currentUser.name,
      text: message,
    };

    const updatedGroups = groups.map((group) => {
      if (group.id === activegroup) {
        return {
          ...group,
          messages: [...group.messages, newMessage],
        };
      }
      return group;
    });

    setGroups(updatedGroups);

    const storedNotifications =
      JSON.parse(localStorage.getItem("chatNotifications")) || {};

    groups.forEach((group) => {
      if (group.id === activegroup) {
        group.messages.forEach((msg) => {
          if (msg.sender !== currentUser.name) {
            storedNotifications[msg.sender] =
              (storedNotifications[msg.sender] || 0) + 1;
          }
        });
      }
    });

    setNotification(storedNotifications);
    localStorage.setItem(
      "chatNotifications",
      JSON.stringify(storedNotifications)
    );

    setMessage("");
  };

  const handleNewGroup = () => {
    const groupName = prompt("Enter the group name.");
    if (!groupName || groupName.trim() === "") return;

    const newGroup = {
      id: Date.now(),
      name: groupName,
      messages: [],
    };

    setGroups([...groups, newGroup]);
    setActivegroup(newGroup.id);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const deleteGroup = (groupId) => {
    const filteredGroups = groups.filter((group) => group.id !== groupId);
    setGroups(filteredGroups);

    if (groupId === activegroup) {
      setActivegroup(filteredGroups.length > 0 ? filteredGroups[0].id : null);
    }
  };

  const clearAll = () => {
    const defaultGroups = [
      { id: 1, name: "General", members: 4, messages: [] },
      { id: 2, name: "Private", members: 2, messages: [] },
    ];

    setGroups(defaultGroups);
    setActivegroup(defaultGroups[0].id);
    setMessage("");

    const emptyNotifications = {};
    setNotification(emptyNotifications);

    localStorage.removeItem("chatGroups");
    localStorage.removeItem("chatActiveGroup");
    localStorage.removeItem("chatNotifications");

    window.location.reload();
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      
      <div className="w-full md:w-1/4 bg-white shadow-lg p-5 shrink-0">
        <h2 className="text-xl font-bold mb-6">👤 {currentUser?.name}</h2>

        <button
          onClick={handleNewGroup}
          className="w-full mb-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          + New Group
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

        <div className="mt-8">
          <h3 className="font-semibold mb-3">{selectedGroup?.name}</h3>
          <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => setActivegroup(group.id)}
                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
                  activegroup === group.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                <span>{group.name}</span>
                <button
                  onClick={() => deleteGroup(group.id)}
                  className="text-sm text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      <div className="w-full md:w-2/4 flex flex-col bg-gray-50 p-4 md:p-6 flex-1">
        <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-y-auto max-h-[60vh] md:max-h-full">
          <h2 className="text-xl font-semibold mb-4">Group Chat</h2>

          {selectedGroup?.messages.length === 0 ? (
            <div className="text-gray-400">No messages yet...</div>
          ) : (
            selectedGroup?.messages.map((msg) => (
              <div key={msg.id} className="mb-2 p-2 bg-gray-100 rounded">
                <span className="font-semibold">{msg.sender}:</span> {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-lg border outline-none w-full"
          />

          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-full sm:w-auto"
          >
            Send
          </button>
        </div>
      </div> 
      <div className="w-full md:w-1/4 bg-white shadow-lg p-5 shrink-0 mt-4 md:mt-0">
        <h2 className="text-xl font-bold mb-6">Delete  <i class="ri-delete-bin-line"></i></h2>

        <div className="text-gray-500 mb-4">
          {notification[currentUser?.name] || 0 } messages
        </div>

        <button
          onClick={clearAll}
          className="w-full py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
