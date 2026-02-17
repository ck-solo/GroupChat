import { createContext, useContext, useState } from "react";
 
export const ChatContext = createContext()

const ChatProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [groups, setGroups] = useState([
        {id:1, name:"General", members: 4, messages : []},
        {id:2, name:"Private", members: 2, messages : []}
    ])

    const [activegroup, setActivegroup] = useState(1);
    const [notification, setNotification] = useState([])

    return(
    <ChatContext.Provider value={{ currentUser,setCurrentUser,groups,setGroups,activegroup,setActivegroup,notification,setNotification}} >
        {children}
    </ChatContext.Provider>
    
)
}

export default ChatProvider;