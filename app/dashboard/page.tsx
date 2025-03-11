"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
    const router = useRouter();
    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (!Cookies.get("token")) {
            router.push("/");
        } else {
            setValid(true);
        }
    }, []);

    return (
        <div>
            {valid ? <Dashboard /> : null}
        </div>
    );
}