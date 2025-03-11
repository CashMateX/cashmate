"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Home, LogOut, Menu, Package, Settings, RefreshCw, X, Landmark } from "lucide-react"
import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    { title: "Dashboard", icon: Home, link: "/dashboard" },
    { title: "Assets", icon: Landmark, link: "/dashboard/assets" },
    { title: "Transactions", icon: Package, link: "/dashboard/transactions" },
    { title: "Recurring Transactions", icon: RefreshCw, link: "/dashboard/recurring-transactions" },
    { title: "Settings", icon: Settings, link: "/dashboard/settings" },
  ]

  const logout = () => {
    Cookies.remove("token")
    router.push("/")
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" checked={isSidebarOpen} onChange={toggleSidebar} />

      <div className="drawer-content flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-2 bg-base-100 px-4 shadow-sm">
          <label htmlFor="drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">
            <Menu size={20} />
          </label>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>

      <div className="drawer-side z-20">
        <label htmlFor="drawer" aria-label="close sidebar" className="drawer-overlay"></label>

        <aside className="flex h-full w-64 flex-col bg-base-200">
          <div className="flex items-center gap-2 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-base-300">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </div>
            <span className="text-xl font-semibold">CashMate</span>

            <label htmlFor="drawer" className="btn btn-circle btn-ghost btn-sm ml-auto lg:hidden">
              <X size={18} />
            </label>
          </div>

          <ul className="menu menu-md w-full px-4 py-0">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link href={item.link} passHref>
                  <item.icon size={18} />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto p-4">
            <button className="btn btn-soft btn-secondary btn-block" onClick={logout}>
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}