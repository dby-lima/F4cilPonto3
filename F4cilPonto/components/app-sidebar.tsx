"use client"

import {
  Home,
  Users,
  Clock,
  Settings,
  Building2,
  UserCheck,
  Briefcase,
  MapPin,
  Calendar,
  Timer,
  AlertCircle,
  PartyPopper,
  Handshake,
  Tag,
  Clock3,
  Building,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"

const menuItems = [
  {
    title: "Início / Dashboard",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Gestão de Pessoas",
    icon: Users,
    items: [
      {
        title: "Funcionários",
        url: "#",
        icon: UserCheck,
      },
      {
        title: "Cargos",
        url: "#",
        icon: Briefcase,
      },
      {
        title: "Setores",
        url: "#",
        icon: Building2,
      },
      {
        title: "Unidades",
        url: "#",
        icon: MapPin,
      },
    ],
  },
  {
    title: "Jornada de Trabalho",
    icon: Clock,
    items: [
      {
        title: "Escalas de Trabalho",
        icon: Calendar,
        items: [
          {
            title: "Escala Semanal",
            url: "#",
          },
          {
            title: "Escala Especial",
            url: "#",
          },
          {
            title: "Funcionário x Escala",
            url: "#",
          },
        ],
      },
      {
        title: "Horários",
        url: "#",
        icon: Timer,
      },
      {
        title: "Ocorrências",
        url: "#",
        icon: AlertCircle,
      },
      {
        title: "Feriados",
        url: "#",
        icon: PartyPopper,
      },
    ],
  },
  {
    title: "Configurações Gerais",
    icon: Settings,
    items: [
      {
        title: "Sindicatos",
        url: "#",
        icon: Handshake,
      },
      {
        title: "Tipos de Ocorrência",
        url: "#",
        icon: Tag,
      },
      {
        title: "REP (Relógio de Ponto)",
        url: "#",
        icon: Clock3,
      },
      {
        title: "Dados da Empresa",
        url: "#",
        icon: Building,
      },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5A2D91]">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#5A2D91]">F4cilPonto</h2>
            <p className="text-xs text-gray-500">Sistema de Ponto</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <Collapsible defaultOpen={item.title === "Jornada de Trabalho"} className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full hover:bg-[#5A2D91]/10 hover:text-[#5A2D91] data-[state=open]:bg-[#5A2D91]/10 data-[state=open]:text-[#5A2D91]">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            {subItem.items ? (
                              <Collapsible
                                defaultOpen={subItem.title === "Escalas de Trabalho"}
                                className="group/subcollapsible"
                              >
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuSubButton className="hover:bg-[#5A2D91]/10 hover:text-[#5A2D91]">
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.title}</span>
                                    <ChevronRight className="ml-auto h-3 w-3 transition-transform group-data-[state=open]/subcollapsible:rotate-90" />
                                  </SidebarMenuSubButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <SidebarMenuSub className="ml-4">
                                    {subItem.items.map((subSubItem) => (
                                      <SidebarMenuSubItem key={subSubItem.title}>
                                        <SidebarMenuSubButton
                                          asChild
                                          className="hover:bg-[#5A2D91]/10 hover:text-[#5A2D91]"
                                        >
                                          <a href={subSubItem.url}>
                                            <span>{subSubItem.title}</span>
                                          </a>
                                        </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                    ))}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </Collapsible>
                            ) : (
                              <SidebarMenuSubButton asChild className="hover:bg-[#5A2D91]/10 hover:text-[#5A2D91]">
                                <a href={subItem.url}>
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            )}
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-[#5A2D91]/10 hover:text-[#5A2D91] ${
                      item.isActive ? "bg-[#5A2D91] text-white hover:bg-[#5A2D91] hover:text-white" : ""
                    }`}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F06423] text-white text-sm font-medium">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@f4cilponto.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
