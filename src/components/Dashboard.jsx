import { useContext, useState } from "react";
import { ChatContext } from "../pages/ChatContext";

const Dashboard = () => {
  const { currentUser, groups, activegroup, setActivegroup, setGroups, setCurrentUser , } =
    useContext(ChatContext);
  const selectedGroup = groups.find((group) => group.id === activegroup);

  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
  if (!message.trim()) return;

  const updatedGroups = groups.map((group) => {
    if (group.id === activegroup) {
      return {
        ...group,
        messages: [...group.messages, message]
      };
    }
    return group;

  });
  setGroups(updatedGroups);
  setMessage("");
};

//  const handleNewGroup = () => {
//     const groupName = prompt("Enter the group name.")

//     if(!groupName || groupName.trim() === "")
//       return ;


//     const newGroup = {
//       id: Date.now(),
//       name: groupName,
//       message:[]
//     }

//     setGroups([...groups,newGroup])
//     setActivegroup(newGroup.id)
//   }

  const handleLogout =()=>{
    setCurrentUser(null)
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-1/4 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">👤 {currentUser?.name}</h2>

        <button className="w-full mb-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          + New Group
        </button>

        <button onClick={handleLogout}  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Logout
        </button>

        <div className="mt-8">
          <h3 className="font-semibold mb-3">{selectedGroup?.name}</h3>
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => setActivegroup(group.id)}
                className={`p-3 rounded-lg cursor-pointer ${
                  activegroup === group.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {group.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-2/4 flex flex-col bg-gray-50 p-6">
        <div className="flex-1 bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Group Chat</h2>

          {selectedGroup?.messages.length === 0 ? (
            <div className="text-gray-400">No messages yet...</div>
          ) : (
            selectedGroup.messages.map((msg, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                {msg}
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex gap-3 ">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-lg border outline-none"
          />

          <button onClick={handleSendMessage} className="px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Send
          </button>
        </div>
      </div>

      <div className="w-1/4 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-6">🔔 Notifications</h2>

        <div className="text-gray-500">No notifications yet.</div>

        <button className="mt-6 w-full py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
