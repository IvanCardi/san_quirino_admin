"use client";
import { Building, Megaphone, Newspaper, Swords, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Uffici",
    url: "/uffici",
    icon: Building,
  },
  {
    title: "Agenti",
    url: "/agenti",
    icon: User,
  },
  {
    title: "Azioni",
    url: "/azioni",
    icon: Newspaper,
  },
  {
    title: "Sfide",
    url: "/sfide",
    icon: Swords,
  },
  {
    title: "Invia Notifica",
    url: "/invia-notifica",
    icon: Megaphone,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="w-full flex flex-row justify-end">
        <SidebarTrigger className="cursor-pointer" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>San Quirino Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
