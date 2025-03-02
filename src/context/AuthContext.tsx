// import { createContext, useState } from "react";

// export interface AuthContextType {
//     brushSize: number;
//     setBrushSize: (size: number) => void;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState();


//   return (
//       <AuthContext.Provider value={{ brushSize, setBrushSize }}>
//           {children}
//       </AuthContext.Provider>
//   );
// };