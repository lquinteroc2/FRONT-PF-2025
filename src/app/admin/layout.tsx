import AdminProtected from "@/components/AdminDashboard/dashboard/admin-protected"
import { Sidebar } from "@/components/AdminDashboard/sidebar"
import React from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
        <AdminProtected>
      <Sidebar className="w-[250px]" />
      <main className="flex-1 p-6">
        {children}
      </main>
      </AdminProtected>
    </div>
  )
}
