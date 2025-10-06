"use client"

import { useState } from "react"
import {
  Clock,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  Download,
  TrendingUp,
  Building,
  Activity,
  UserCheck,
  Play,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for company info
const companyInfo = {
  name: "F4cil Tecnologia Ltda",
  cnpj: "12.345.678/0001-90",
  address: "Rua das Empresas, 123 - Centro",
  city: "São Paulo - SP",
  employees: 156,
  activeScales: 8,
  occurrenceTypes: 12,
}

// Mock data for time records
const timeRecords = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Ana Silva",
    employeeAvatar: "/diverse-woman-portrait.png",
    date: "2024-01-15",
    time: "08:15:32",
    type: "entrada",
    status: "pending",
    location: "Sede Principal",
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "Carlos Santos",
    employeeAvatar: "/carlos-santos-portrait.png",
    date: "2024-01-15",
    time: "08:22:15",
    type: "entrada",
    status: "approved",
    location: "Sede Principal",
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "Maria Oliveira",
    employeeAvatar: "/maria-oliveira-portrait.png",
    date: "2024-01-15",
    time: "12:05:45",
    type: "saida_almoco",
    status: "pending",
    location: "Sede Principal",
  },
  {
    id: 4,
    employeeId: 1,
    employeeName: "Ana Silva",
    employeeAvatar: "/diverse-woman-portrait.png",
    date: "2024-01-15",
    time: "13:02:18",
    type: "volta_almoco",
    status: "approved",
    location: "Sede Principal",
  },
  {
    id: 5,
    employeeId: 4,
    employeeName: "João Costa",
    employeeAvatar: "/jo-o-costa.png",
    date: "2024-01-15",
    time: "17:45:30",
    type: "saida",
    status: "pending",
    location: "Filial Norte",
  },
]

// Mock data for pending occurrences
const pendingOccurrences = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Ana Silva",
    employeeAvatar: "/diverse-woman-portrait.png",
    type: "Consulta Médica",
    date: "2024-01-16",
    hours: 2,
    status: "pending",
    requestedAt: "2024-01-15T14:30:00",
  },
  {
    id: 2,
    employeeId: 3,
    employeeName: "Maria Oliveira",
    employeeAvatar: "/maria-oliveira-portrait.png",
    type: "Atestado Médico",
    date: "2024-01-17",
    hours: null,
    status: "pending",
    requestedAt: "2024-01-15T16:45:00",
  },
  {
    id: 3,
    employeeId: 2,
    employeeName: "Carlos Santos",
    employeeAvatar: "/carlos-santos-portrait.png",
    type: "Falta Justificada",
    date: "2024-01-14",
    hours: 8,
    status: "approved",
    requestedAt: "2024-01-14T09:15:00",
  },
]

// Mock data for employees who didn't clock in today
const absentEmployees = [
  {
    id: 5,
    name: "Roberto Alves",
    avatar: "/roberto-alves.png",
    position: "Operador Noturno",
    lastClockIn: "2024-01-14",
  },
  {
    id: 6,
    name: "Fernanda Lima",
    avatar: "/fernanda-lima.png",
    position: "Assistente RH",
    lastClockIn: "2024-01-14",
  },
]

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const [isProcessingDialogOpen, setIsProcessingDialogOpen] = useState(false)

  const totalRecordsToday = timeRecords.filter((record) => record.date === "2024-01-15").length
  const pendingRecords = timeRecords.filter((record) => record.status === "pending").length
  const approvedRecords = timeRecords.filter((record) => record.status === "approved").length
  const totalPendingOccurrences = pendingOccurrences.filter((occ) => occ.status === "pending").length

  const handleApproveRecord = (recordId: number) => {
    console.log("Approving record:", recordId)
    // Here you would update the record status
  }

  const handleRejectRecord = (recordId: number) => {
    console.log("Rejecting record:", recordId)
    // Here you would update the record status
  }

  const handleApproveOccurrence = (occurrenceId: number) => {
    console.log("Approving occurrence:", occurrenceId)
    // Here you would update the occurrence status
  }

  const handleRejectOccurrence = (occurrenceId: number) => {
    console.log("Rejecting occurrence:", occurrenceId)
    // Here you would update the occurrence status
  }

  const getRecordTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      entrada: "Entrada",
      saida_almoco: "Saída Almoço",
      volta_almoco: "Volta Almoço",
      saida: "Saída",
    }
    return types[type] || type
  }

  const getRecordTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      entrada: "bg-green-100 text-green-800",
      saida_almoco: "bg-yellow-100 text-yellow-800",
      volta_almoco: "bg-blue-100 text-blue-800",
      saida: "bg-red-100 text-red-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-full flex-col bg-gray-50/50">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 shadow-sm">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Visão geral do sistema de ponto</p>
              </div>
              <div className="flex items-center gap-3">
                <Dialog open={isProcessingDialogOpen} onOpenChange={setIsProcessingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#F06423] hover:bg-[#E55A1F] text-white">
                      <Play className="mr-2 h-4 w-4" />
                      Processar Ponto
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 space-y-6 p-6">
            {/* Company Info */}
            <Card className="bg-gradient-to-r from-[#5A2D91] to-[#4A2577] text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">{companyInfo.name}</CardTitle>
                      <CardDescription className="text-white/80">
                        CNPJ: {companyInfo.cnpj} • {companyInfo.address}
                      </CardDescription>
                      <p className="text-white/80 text-sm mt-1">{companyInfo.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 text-sm">Hoje</p>
                    <p className="text-2xl font-bold text-white">
                      {new Date().toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-white/80 text-sm">
                      {new Date().toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-l-[#5A2D91]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Funcionários Ativos</CardTitle>
                  <Users className="h-4 w-4 text-[#5A2D91]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#5A2D91]">{companyInfo.employees}</div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    +12 este mês
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#F06423]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Marcações Hoje</CardTitle>
                  <Clock className="h-4 w-4 text-[#F06423]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#F06423]">{totalRecordsToday}</div>
                  <p className="text-xs text-gray-500">{pendingRecords} pendentes</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Escalas Ativas</CardTitle>
                  <Calendar className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{companyInfo.activeScales}</div>
                  <p className="text-xs text-gray-500">funcionários vinculados</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ocorrências Pendentes</CardTitle>
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">{totalPendingOccurrences}</div>
                  <p className="text-xs text-gray-500">aguardando aprovação</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="records" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="records">Marcações de Ponto</TabsTrigger>
                <TabsTrigger value="occurrences">Ocorrências</TabsTrigger>
                <TabsTrigger value="absent">Funcionários Ausentes</TabsTrigger>
              </TabsList>

              {/* Time Records Tab */}
              <TabsContent value="records" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Marcações de Ponto</CardTitle>
                        <CardDescription>Gerencie as marcações dos funcionários</CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={selectedPeriod}
                          onChange={(e) => setSelectedPeriod(e.target.value)}
                          className="flex h-9 w-32 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="today">Hoje</option>
                          <option value="week">Esta Semana</option>
                          <option value="month">Este Mês</option>
                        </select>
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filtros
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Funcionário</TableHead>
                          <TableHead>Data/Hora</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Local</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={record.employeeAvatar || "/placeholder.svg"}
                                    alt={record.employeeName}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {record.employeeName
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{record.employeeName}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">
                                  {new Date(record.date + "T00:00:00").toLocaleDateString("pt-BR")}
                                </p>
                                <p className="text-sm text-gray-500">{record.time}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className={getRecordTypeColor(record.type)}>
                                {getRecordTypeLabel(record.type)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{record.location}</TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={
                                  record.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : record.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {record.status === "approved"
                                  ? "Aprovada"
                                  : record.status === "pending"
                                    ? "Pendente"
                                    : "Rejeitada"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {record.status === "pending" && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleApproveRecord(record.id)}
                                      className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRejectRecord(record.id)}
                                      className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                                    >
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Occurrences Tab */}
              <TabsContent value="occurrences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ocorrências Pendentes</CardTitle>
                    <CardDescription>Aprove ou rejeite as solicitações de ocorrências</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingOccurrences.map((occurrence) => (
                        <div
                          key={occurrence.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={occurrence.employeeAvatar || "/placeholder.svg"}
                                alt={occurrence.employeeName}
                              />
                              <AvatarFallback>
                                {occurrence.employeeName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{occurrence.employeeName}</p>
                              <p className="text-sm text-gray-600">{occurrence.type}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span>Data: {new Date(occurrence.date + "T00:00:00").toLocaleDateString("pt-BR")}</span>
                                {occurrence.hours && <span>Horas: {occurrence.hours}h</span>}
                                <span>Solicitado em: {new Date(occurrence.requestedAt).toLocaleString("pt-BR")}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={
                                occurrence.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : occurrence.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {occurrence.status === "approved"
                                ? "Aprovada"
                                : occurrence.status === "pending"
                                  ? "Pendente"
                                  : "Rejeitada"}
                            </Badge>
                            {occurrence.status === "pending" && (
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleApproveOccurrence(occurrence.id)}
                                  className="border-green-200 text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Aprovar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectOccurrence(occurrence.id)}
                                  className="border-red-200 text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Rejeitar
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Absent Employees Tab */}
              <TabsContent value="absent" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Funcionários Ausentes Hoje</CardTitle>
                    <CardDescription>Funcionários que ainda não registraram ponto hoje</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {absentEmployees.map((employee) => (
                        <Card key={employee.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                                <AvatarFallback>
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-sm text-gray-600">{employee.position}</p>
                                <p className="text-xs text-gray-500">
                                  Último ponto:{" "}
                                  {new Date(employee.lastClockIn + "T00:00:00").toLocaleDateString("pt-BR")}
                                </p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Ver Funcionário
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Activity className="w-4 h-4 mr-2" />
                                    Histórico
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#5A2D91]" />
                  Atividades Recentes
                </CardTitle>
                <CardDescription>Últimas ações realizadas no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeRecords.slice(0, 5).map((record) => (
                    <div key={record.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-[#5A2D91] rounded-full"></div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={record.employeeAvatar || "/placeholder.svg"} alt={record.employeeName} />
                        <AvatarFallback className="text-xs">
                          {record.employeeName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{record.employeeName}</span> registrou{" "}
                          <span className="font-medium">{getRecordTypeLabel(record.type).toLowerCase()}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {record.time} • {new Date(record.date + "T00:00:00").toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          record.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : record.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {record.status === "approved"
                          ? "Aprovada"
                          : record.status === "pending"
                            ? "Pendente"
                            : "Rejeitada"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        {/* Processing Dialog */}
        <Dialog open={isProcessingDialogOpen} onOpenChange={setIsProcessingDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Processamento de Ponto</DialogTitle>
              <DialogDescription>Configure o processamento das marcações de ponto</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <Tabs defaultValue="individual" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="individual">Individual</TabsTrigger>
                  <TabsTrigger value="batch">Em Lote</TabsTrigger>
                </TabsList>

                <TabsContent value="individual" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="employee">Funcionário</Label>
                      <select
                        id="employee"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Selecione um funcionário</option>
                        <option value="1">Ana Silva</option>
                        <option value="2">Carlos Santos</option>
                        <option value="3">Maria Oliveira</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="startDate">Data Início</Label>
                        <Input id="startDate" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endDate">Data Fim</Label>
                        <Input id="endDate" type="date" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="batch" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="department">Setor</Label>
                      <select
                        id="department"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Todos os setores</option>
                        <option value="admin">Administrativo</option>
                        <option value="prod">Produção</option>
                        <option value="rh">Recursos Humanos</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="batchStartDate">Data Início</Label>
                        <Input id="batchStartDate" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="batchEndDate">Data Fim</Label>
                        <Input id="batchEndDate" type="date" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={() => setIsProcessingDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-[#F06423] hover:bg-[#E55A1F]">
                <Play className="w-4 h-4 mr-2" />
                Iniciar Processamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
