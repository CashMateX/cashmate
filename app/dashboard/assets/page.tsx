"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Assets from "./Assets";
import axios from "axios";

export default function DashboardPage() {
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/");
        } else {
            const checkToken = async () => {
                try {
                    const response = await axios.post("/api/auth/validate", {
                        token: token,
                    });

                    if (response.status === 200) {
                        setIsValid(true);
                    }
                } catch (error: any) {
                    router.push("/");
                }
            }
            checkToken();
        }
        setIsAuthChecked(true);
    }, [router]);

    if (!isAuthChecked) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-infinity loading-xl"></span>
            </div>
        )
    }

    return isValid ? <Assets /> : null;
}