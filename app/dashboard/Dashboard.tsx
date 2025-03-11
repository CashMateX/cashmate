"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/");
        } else {
            setIsValid(true);
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

    return isValid ? <Dashboard /> : null;
}