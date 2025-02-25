import { ReactNode } from "react";
import { AppSidebar } from "@/components/Sidebar/sidebar";
import "../../app/globals.css";
import AuthProvider from "../../Provider/AuthProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className=" ha w-full">
      <AuthProvider>
        <SidebarProvider>
          <div className="flex h-full w-full">
            {/* Sidebar */}
            <AppSidebar />
            <SidebarTrigger />

            {/* Main Content */}
            <main className="flex-1 flex p-2 justify-center">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </AuthProvider>
    </div>
  );
}
