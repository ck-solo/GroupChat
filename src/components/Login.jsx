import { useState, useContext } from "react";
import { ChatContext } from "../pages/ChatContext";

const Login = () => {
  const { setCurrentUser } = useContext(ChatContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: "Alice", online: true },
    { id: 2, name: "Bob", online: true },
    { id: 3, name: "Charlie", online: false },
    { id: 4, name: "Diana", online: true }
  ];

  const handleLogin = () => {
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
  <div className="h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">

    <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-112.5 text-center">

      <h1 className="text-4xl font-bold text-white mb-8">
        Select User
      </h1> 
      <div className="grid grid-cols-2 gap-6 mb-8">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`cursor-pointer rounded-xl p-6 text-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl
              ${
                selectedUser?.id === user.id
                  ? "bg-white text-indigo-600 shadow-lg scale-105"
                  : "bg-white/70 text-gray-800 hover:bg-white"
              }`}
          >
            <div className="flex items-center justify-center gap-3">
              <span>{user.name}</span>
              <span className="text-2xl">
                {user.online ? "🟢" : "🔴"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleLogin}
        disabled={!selectedUser}
        className="w-full py-3 rounded-xl text-lg font-semibold transition-all duration-300
        bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Login
      </button> 

    </div>
  </div>
);

};

export default Login
