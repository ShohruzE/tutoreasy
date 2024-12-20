"use client";

import { House, Users, BookCopy, Notebook } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const navLinks = [
  {
    href: "/dashboard",
    title: "Home",
    icon: House,
  },
  {
    href: "/dashboard/classes",
    title: "Classes",
    icon: BookCopy,
    items: [
      {
        href: "/dashboard/classes/1",
        title: "Class 1",
      },
      {
        href: "/dashboard/classes/2",
        title: "Class 2",
      },
      {
        href: "/dashboard/classes/3",
        title: "Class 3",
      },
    ],
  },
  {
    href: "/dashboard/tutors",
    title: "Tutors",
    icon: Users,
  },
  {
    href: "/dashboard/tutoring-sessions",
    title: "Sessions",
    icon: Notebook,
  },
];
// Add way to fetch all classes from professor/TA, may have to create api route and return from there to be mapped

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <div className="flex justify-between items-center ml-1">
        <SidebarHeader className="flex flex-row justify-center items-center">
          <Image
            src="/dark-green-logo.png"
            alt="TutorEasy Logo"
            width="36"
            height="36"
          />
          <h1 className="font-bold text-2xl text-primary-green">TutorEasy</h1>
        </SidebarHeader>
        <SidebarTrigger />
      </div>

      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((item) => {
                // if (item.href === "/dashboard/classes") {
                //   return (
                //     <Collapsible
                //       key={item.title}
                //       asChild
                //       defaultOpen
                //       className="group/collapsible"
                //     >
                //       <SidebarMenuItem>
                //         <CollapsibleTrigger asChild>
                //           <SidebarMenuItem key={item.title}>
                //             <SidebarMenuButton asChild tooltip={item.title}>
                //               <Link href={item.href}>
                //                 <item.icon />
                //                 <span className="font-bold">{item.title}</span>
                //                 <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                //               </Link>
                //             </SidebarMenuButton>
                //           </SidebarMenuItem>
                //         </CollapsibleTrigger>
                //         <CollapsibleContent>
                //           <SidebarMenuSub>
                //             {/* Map through all classes of professor/TA */}
                //             <SidebarMenuButton asChild>
                //               <Link href={`${item.href}/:classId`}>
                //                 <span className="font-bold">Class 1</span>
                //               </Link>
                //             </SidebarMenuButton>
                //             <SidebarMenuButton asChild>
                //               <Link href={`${item.href}/:classId`}>
                //                 <span className="font-bold">Class 2</span>
                //               </Link>
                //             </SidebarMenuButton>
                //             {/* End of map */}
                //           </SidebarMenuSub>
                //         </CollapsibleContent>
                //       </SidebarMenuItem>
                //     </Collapsible>
                //   );
                // }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        pathname === item.href ? "bg-slate-200" : ""
                      }`}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span className="font-bold">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="text-center space-y-2">
          <SidebarSeparator />
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} TutorEasy
          </p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
