
//utils/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { account ,storage} from "../appwriteConfig";
import { ID } from "appwrite";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {

        const [loading, setLoading] = useState(true)
        const [user, setUser] = useState(null)

        useEffect(() => {
            checkUserStatus()
            
         }, [])

        //  const loginUser = async (userInfo) => {
        //     setLoading(true)
        //     try{
        //         let response = await account.createEmailPasswordSession(
        //             userInfo.email,
        //             userInfo.password
        //         )
        //         let accountDetail = await account.get()
        //         console.log("Account Detail :",accountDetail);
        //         setUser(accountDetail)
        //     }catch(err){
        //         console.error(err)
        //     }
        //     setLoading(false)
        //  }
        const loginUser = async (userInfo) => {
            setLoading(true);
            try {
                // Check if user is already logged in
                const accountDetail = await account.get();
                console.log("User is already logged in:", accountDetail);
                setUser(accountDetail);
            } catch (err) {
                if (err.code === 401) { // No active session
                    try {
                        let response = await account.createEmailPasswordSession(
                            userInfo.email,
                            userInfo.password
                        );
                        console.log("Session created successfully:", response);
                        let accountDetail = await account.get();
                        setUser(accountDetail);
                    } catch (sessionError) {
                        console.error("Error creating session:", sessionError);
                        alert("password incorrect !!")
                    }
                } else {
                    console.error("Error checking user session:", err);
                }
            }
            setLoading(false);
        };
        

         const logoutUser = async () => {
            account.deleteSession('current')
            setUser(null)
         }

        //  const registerUser = async (userInfo) => {
        //     setLoading(true)
        //     try{
        //         let response = await account.create(
        //             ID.unique(),
        //             userInfo.email,
        //             userInfo.password1,
        //             userInfo.name
        //         )
        //         await account.createEmailSession(
        //             userInfo.email,
        //             userInfo.password1
        //         )
        //         let accountDetails = await account.get()
        //         setUser(accountDetails)
        //     }catch(err){
        //         console.error(err)
        //     }
        //     setLoading(false)
        //  }
        const registerUser = async (userInfo) => {
            setLoading(true);
            try {
            
        
                const response = await account.create(
                    ID.unique(),
                    userInfo.email,
                    userInfo.password,
                    userInfo.name
                );
                console.log("User registered successfully:", response);

                if (userInfo.file) {
             // Ensure client is set up correctly
                    const fileResponse = await storage.createFile(
                        '677644b5000aab5d0b4a', // Bucket ID
                        ID.unique(), // Unique file ID
                        userInfo.file // File object
                    );
                    console.log("File uploaded successfully:", fileResponse);
                }
        
                const sessionResponse = await account.createEmailPasswordSession(
                    userInfo.email,
                    userInfo.password
                );
                console.log("Session created successfully:", sessionResponse);

                //start 

                

                //end 
        
                const accountDetails = await account.get();
                console.log("Fetched account details:", accountDetails);
                setUser(accountDetails);
            } catch (err) {
                console.error("Error during registration:", err.message);
                alert(err.message);
            } finally {
                setLoading(false);
            }
        };
        

         const checkUserStatus = async () => {
            try{
                let accountDetail = await account.get()
                setUser(accountDetail)
            }catch(err){
                console.error(err)
            }
            setLoading(false)
        }

        const contextData = {
            user,
            loginUser,
            logoutUser,
            registerUser
        }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;