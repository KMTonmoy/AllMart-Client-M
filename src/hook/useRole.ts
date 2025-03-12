import { AuthContext } from "@/Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";

interface UserData {
    role?: string;
    [key: string]: any;
}

const useRole = () => {
    const [data, setData] = useState<UserData>({});
    const authContext = useContext(AuthContext);

    const role = data[0]?.role;

    useEffect(() => {
        if (!authContext || !authContext.user) return;

        const { user } = authContext;
        const email = user?.email || "";

        const fetchUserData = async () => {
            try {
                const response = await fetch(`https://allmartserver.vercel.app/users/${email}`);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [authContext]);

    return { role };
};

export default useRole;
