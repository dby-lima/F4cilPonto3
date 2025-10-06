"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Eye,
  Edit,
  Plus,
  FileText,
  Clock,
  ChevronDown,
  ChevronRight,
  Printer,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Fingerprint,
  Smartphone,
  Clock3,
  History,
  PiggyBank,
  FileCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Mock data for processed timesheet
const processedData = [
  {
    employeeId: 1,
    employeeName: "Ana Silva",
    employeeAvatar: "/diverse-woman-portrait.png",
    position: "Analista Administrativo",
    department: "Administrativo",
    records: [
      {
        date: "2024-01-15",
        dayOfWeek: "Segunda-feira",
        e1: { time: "08:00", type: "auto", status: "approved" },
        s1: { time: "12:00", type: "manual", status: "approved" },
        e2: { time: "13:00", type: "auto", status: "approved" },
        s2: { time: "18:00", type: "manual", status: "pending" },
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "09:00",
        ei: "00:00",
        extra: "12.5%",
        discount: "00:00",
        adn: "00:00",
        description: "BH: +01:00",
      },
      {
        date: "2024-01-16",
        dayOfWeek: "Terça-feira",
        e1: { time: "08:15", type: "manual", status: "approved" },
        s1: { time: "12:05", type: "manual", status: "approved" },
        e2: { time: "13:00", type: "auto", status: "approved" },
        s2: { time: "17:45", type: "manual", status: "approved" },
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "07:45",
        ei: "00:00",
        extra: "0%",
        discount: "00:15",
        adn: "00:00",
        description: "BH: -00:15",
      },
      {
        date: "2024-01-17",
        dayOfWeek: "Quarta-feira",
        e1: null,
        s1: null,
        e2: null,
        s2: null,
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "00:00",
        ei: "00:00",
        extra: "0%",
        discount: "08:00",
        adn: "00:00",
        description: "Falta Não Justificada",
      },
      {
        date: "2024-01-18",
        dayOfWeek: "Quinta-feira",
        e1: { time: "07:45", type: "manual", status: "approved" },
        s1: { time: "12:00", type: "auto", status: "approved" },
        e2: { time: "13:00", type: "auto", status: "approved" },
        s2: { time: "19:30", type: "manual", status: "approved" },
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "10:45",
        ei: "00:00",
        extra: "34.4%",
        discount: "00:00",
        adn: "00:30",
        description: "BH: +02:45",
      },
      {
        date: "2024-01-19",
        dayOfWeek: "Sexta-feira",
        e1: null,
        s1: null,
        e2: null,
        s2: null,
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "00:00",
        ei: "00:00",
        extra: "0%",
        discount: "00:00",
        adn: "00:00",
        description: "Folga Programada",
      },
    ],
    summary: {
      absences: 1,
      additional: "01:30",
      previousBalance: "05:30",
      debit: "08:15",
      overtime: "03:45",
      discount: "08:15",
      totalHours: "27:30",
      credit: "03:45",
      totalBalance: "01:00",
    },
  },
  {
    employeeId: 2,
    employeeName: "Carlos Santos",
    employeeAvatar: "/carlos-santos-portrait.png",
    position: "Operador de Produção",
    department: "Produção",
    records: [
      {
        date: "2024-01-15",
        dayOfWeek: "Segunda-feira",
        e1: { time: "06:00", type: "auto", status: "approved" },
        s1: { time: "10:00", type: "auto", status: "approved" },
        e2: { time: "10:15", type: "auto", status: "approved" },
        s2: { time: "14:15", type: "auto", status: "approved" },
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "08:00",
        ei: "00:00",
        extra: "0%",
        discount: "00:00",
        adn: "00:00",
        description: "BH: 00:00",
      },
      {
        date: "2024-01-16",
        dayOfWeek: "Terça-feira",
        e1: { time: "06:00", type: "auto", status: "approved" },
        s1: { time: "10:00", type: "auto", status: "approved" },
        e2: { time: "10:15", type: "auto", status: "approved" },
        s2: { time: "15:00", type: "manual", status: "approved" },
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "08:45",
        ei: "00:00",
        extra: "9.4%",
        discount: "00:00",
        adn: "00:00",
        description: "BH: +00:45",
      },
      {
        date: "2024-01-17",
        dayOfWeek: "Quarta-feira",
        e1: { time: "06:00", type: "auto", status: "approved" },
        s1: { time: "10:00", type: "auto", status: "approved" },
        e2: { time: "10:15", type: "auto", status: "approved" },
        s2: { time: "14:15", type: "auto", status: "approved" },
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "08:00",
        ei: "00:00",
        extra: "0%",
        discount: "00:00",
        adn: "00:00",
        description: "BH: 00:00",
      },
      {
        date: "2024-01-18",
        dayOfWeek: "Quinta-feira",
        e1: { time: "06:00", type: "auto", status: "approved" },
        s1: { time: "10:00", type: "auto", status: "approved" },
        e2: { time: "10:15", type: "auto", status: "approved" },
        s2: { time: "14:15", type: "auto", status: "approved" },
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "08:00",
        ei: "00:00",
        extra: "0%",
        discount: "00:00",
        adn: "00:00",
        description: "BH: 00:00",
      },
      {
        date: "2024-01-19",
        dayOfWeek: "Sexta-feira",
        e1: { time: "06:00", type: "auto", status: "approved" },
        s1: { time: "10:00", type: "auto", status: "approved" },
        e2: { time: "10:15", type: "auto", status: "approved" },
        s2: { time: "14:15", type: "auto", status: "approved" },
        e3: null,
        s3: null,
        e4: null,
        s4: null,
        ch: "08:00",
        ht: "08:00",
        ei: "00:00",
        extra: "0%",
        discount: "00:00",
        adn: "00:00",
        description: "BH: 00:00",
      },
    ],
    summary: {
      absences: 0,
      additional: "00:00",
      previousBalance: "02:15",
      debit: "00:00",
      overtime: "00:45",
      discount: "00:00",
      totalHours: "40:45",
      credit: "00:45",
      totalBalance: "03:00",
    },
  },
]

// Mock data for detailed punch records
const detailedPunchRecords = [
  {
    id: 1,
    date: "2024-01-15",
    time: "08:00:32",
    type: "O",
    status: "approved",
    location: "REP 001 - Sede Principal",
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "12:00:15",
    type: "I",
    status: "approved",
    location: "App Mobile",
  },
  {
    id: 3,
    date: "2024-01-15",
    time: "13:00:00",
    type: "O",
    status: "approved",
    location: "REP 001 - Sede Principal",
  },
  {
    id: 4,
    date: "2024-01-15",
    time: "18:00:45",
    type: "I",
    status: "pending",
    location: "App Mobile",
  },
]

export default function EspelhoPontoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedEmployees, setExpandedEmployees] = useState<number[]>([1])
  const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false)
  const [isViewPunchesDialogOpen, setIsViewPunchesDialogOpen] = useState(false)
  const [isEditPunchDialogOpen, setIsEditPunchDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [selectedPunch, setSelectedPunch] = useState<any>(null)

  const periodStart = "15/01/2024"
  const periodEnd = "19/01/2024"
  const processingType = "Em Lote - Setor Administrativo"

  const toggleEmployee = (employeeId: number) => {
    setExpandedEmployees((prev) =>
      prev.includes(employeeId) ? prev.filter((id) => id !== employeeId) : [...prev, employeeId],
    )
  }

  const filteredData = processedData.filter(
    (employee) =>
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPunchTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      O: "Original (REP)",
      I: "Inserida",
      A: "Pendente Autorização",
    }
    return types[type] || type
  }

  const getPunchTypeIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      auto: Fingerprint,
      manual: Smartphone,
    }
    return icons[type] || Clock3
  }

  const handleViewPunches = (employee: any) => {
    setSelectedEmployee(employee)
    setIsViewPunchesDialogOpen(true)
  }

  const handleEditPunch = (employee: any, record: any, punchType: string) => {
    setSelectedEmployee(employee)
    setSelectedPunch({ ...record, punchType })
    setIsEditPunchDialogOpen(true)
  }

  const handleExportEmployeeSheet = (employee: any) => {
    console.log("Exporting sheet for:", employee.employeeName)
    // Here you would generate and download the PDF
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
                <h1 className="text-xl font-semibold text-gray-900">Espelho de Ponto Processado</h1>
                <p className="text-sm text-gray-500">
                  Período: {periodStart} a {periodEnd} • {processingType}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Exportar Planilha
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Baixar Todos
                </Button>
                <Button
                  onClick={() => setIsInsertDialogOpen(true)}
                  className="bg-[#5A2D91] hover:bg-[#4A2577]"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Inserir Marcação
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 space-y-6 p-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Pesquisar funcionário por nome ou cargo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Fingerprint className="w-3 h-3 mr-1" />
                      Automática
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Smartphone className="w-3 h-3 mr-1" />
                      Manual
                    </Badge>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Pendente
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employee Records */}
            <div className="space-y-4">
              {filteredData.map((employee) => {
                const isExpanded = expandedEmployees.includes(employee.employeeId)
                return (
                  <Card key={employee.employeeId} className="overflow-hidden">
                    <Collapsible open={isExpanded} onOpenChange={() => toggleEmployee(employee.employeeId)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {isExpanded ? (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-gray-500" />
                              )}
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={employee.employeeAvatar || "/placeholder.svg"}
                                  alt={employee.employeeName}
                                />
                                <AvatarFallback>
                                  {employee.employeeName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{employee.employeeName}</CardTitle>
                                <CardDescription>
                                  {employee.position} • {employee.department}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Horas Trabalhadas</p>
                                <p className="text-xl font-bold text-[#5A2D91]">{employee.summary.totalHours}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Saldo BH</p>
                                <p
                                  className={`text-xl font-bold ${
                                    employee.summary.totalBalance.startsWith("-") ? "text-red-600" : "text-green-600"
                                  }`}
                                >
                                  {employee.summary.totalBalance}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleViewPunches(employee)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Marcações
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleExportEmployeeSheet(employee)
                                }}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Baixar
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          {/* Summary Section */}
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <h4 className="text-sm font-semibold mb-3 text-gray-700">Resumo do Período</h4>
                            <div className="grid grid-cols-9 gap-3 text-sm">
                              <div>
                                <p className="text-gray-500 text-xs">Faltas (dias)</p>
                                <p className="font-semibold text-gray-900">{employee.summary.absences}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Adicional</p>
                                <p className="font-semibold text-blue-600">{employee.summary.additional}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Saldo Anterior</p>
                                <p className="font-semibold text-gray-900">{employee.summary.previousBalance}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Débito (BH)</p>
                                <p className="font-semibold text-red-600">{employee.summary.debit}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Horas Extras</p>
                                <p className="font-semibold text-green-600">{employee.summary.overtime}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Desconto (BH)</p>
                                <p className="font-semibold text-red-600">{employee.summary.discount}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Total Horas</p>
                                <p className="font-semibold text-[#5A2D91]">{employee.summary.totalHours}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Crédito (BH)</p>
                                <p className="font-semibold text-green-600">{employee.summary.credit}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 text-xs">Total (BH)</p>
                                <p
                                  className={`font-semibold ${
                                    employee.summary.totalBalance.startsWith("-") ? "text-red-600" : "text-green-600"
                                  }`}
                                >
                                  {employee.summary.totalBalance}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Detailed Records Table */}
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-24">Data</TableHead>
                                  <TableHead className="w-32">Dia</TableHead>
                                  <TableHead className="w-20">E1</TableHead>
                                  <TableHead className="w-20">S1</TableHead>
                                  <TableHead className="w-20">E2</TableHead>
                                  <TableHead className="w-20">S2</TableHead>
                                  <TableHead className="w-20">E3</TableHead>
                                  <TableHead className="w-20">S3</TableHead>
                                  <TableHead className="w-20">E4</TableHead>
                                  <TableHead className="w-20">S4</TableHead>
                                  <TableHead className="w-16">C.H</TableHead>
                                  <TableHead className="w-16">HT</TableHead>
                                  <TableHead className="w-16">EI</TableHead>
                                  <TableHead className="w-16">%</TableHead>
                                  <TableHead className="w-20">Desc.</TableHead>
                                  <TableHead className="w-16">ADN</TableHead>
                                  <TableHead className="min-w-48">Descrição</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {employee.records.map((record, idx) => (
                                  <TableRow key={idx} className="hover:bg-gray-50">
                                    <TableCell className="font-medium">
                                      {new Date(record.date + "T00:00:00").toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                      })}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">{record.dayOfWeek}</TableCell>
                                    {["e1", "s1", "e2", "s2", "e3", "s3", "e4", "s4"].map((punchKey) => {
                                      const punch = record[punchKey as keyof typeof record] as any
                                      const PunchIcon = punch ? getPunchTypeIcon(punch.type) : null
                                      return (
                                        <TableCell key={punchKey}>
                                          {punch ? (
                                            <DropdownMenu>
                                              <DropdownMenuTrigger asChild>
                                                <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded group">
                                                  <span className="text-sm font-medium">{punch.time}</span>
                                                  {PunchIcon && (
                                                    <PunchIcon
                                                      className={`w-3 h-3 ${
                                                        punch.type === "auto" ? "text-blue-600" : "text-green-600"
                                                      }`}
                                                    />
                                                  )}
                                                  {punch.status === "pending" && (
                                                    <AlertCircle className="w-3 h-3 text-yellow-600" />
                                                  )}
                                                </div>
                                              </DropdownMenuTrigger>
                                              <DropdownMenuContent align="start">
                                                <DropdownMenuItem
                                                  onClick={() =>
                                                    handleEditPunch(employee, record, punchKey.toUpperCase())
                                                  }
                                                >
                                                  <Edit className="w-4 h-4 mr-2" />
                                                  Editar Marcação
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                  <PiggyBank className="w-4 h-4 mr-2" />
                                                  Lançar no BH
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                  <Clock className="w-4 h-4 mr-2" />
                                                  Mudança de Horário
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                  <AlertCircle className="w-4 h-4 mr-2" />
                                                  Ocorrências
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                  <History className="w-4 h-4 mr-2" />
                                                  Ver Banco de Horas
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                  <FileCheck className="w-4 h-4 mr-2" />
                                                  Espelho Fiscal
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                  <Plus className="w-4 h-4 mr-2" />
                                                  Inserir Jornada
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                  <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                                  Desconsiderar
                                                </DropdownMenuItem>
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                          ) : (
                                            <span className="text-gray-300 text-sm">--:--</span>
                                          )}
                                        </TableCell>
                                      )
                                    })}
                                    <TableCell className="text-sm">{record.ch}</TableCell>
                                    <TableCell className="text-sm font-medium">{record.ht}</TableCell>
                                    <TableCell className="text-sm">{record.ei}</TableCell>
                                    <TableCell className="text-sm">{record.extra}</TableCell>
                                    <TableCell
                                      className={`text-sm font-medium ${
                                        record.discount !== "00:00" ? "text-red-600" : ""
                                      }`}
                                    >
                                      {record.discount}
                                    </TableCell>
                                    <TableCell className="text-sm">{record.adn}</TableCell>
                                    <TableCell>
                                      <Badge
                                        variant="secondary"
                                        className={
                                          record.description.includes("BH:")
                                            ? record.description.includes("+")
                                              ? "bg-green-100 text-green-800"
                                              : record.description.includes("-")
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-100 text-gray-800"
                                            : record.description.includes("Falta")
                                              ? "bg-red-100 text-red-800"
                                              : record.description.includes("Folga")
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }
                                      >
                                        {record.description}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )
              })}
            </div>
          </main>
        </div>

        {/* Insert Punch Dialog */}
        <Dialog open={isInsertDialogOpen} onOpenChange={setIsInsertDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Inserir Marcação</DialogTitle>
              <DialogDescription>Adicione uma marcação manual para um funcionário</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="employee">Funcionário</Label>
                  <select
                    id="employee"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Selecione um funcionário</option>
                    {processedData.map((emp) => (
                      <option key={emp.employeeId} value={emp.employeeId}>
                        {emp.employeeName} - {emp.position}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="insertDate">Data</Label>
                    <Input id="insertDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="insertTime">Horário</Label>
                    <Input id="insertTime" type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="punchType">Tipo de Marcação</Label>
                  <select
                    id="punchType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="e1">Entrada 1 (E1)</option>
                    <option value="s1">Saída 1 (S1)</option>
                    <option value="e2">Entrada 2 (E2)</option>
                    <option value="s2">Saída 2 (S2)</option>
                    <option value="e3">Entrada 3 (E3)</option>
                    <option value="s3">Saída 3 (S3)</option>
                    <option value="e4">Entrada 4 (E4)</option>
                    <option value="s4">Saída 4 (S4)</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason">Motivo da Inserção</Label>
                  <Textarea id="reason" placeholder="Descreva o motivo da inserção manual" rows={3} />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInsertDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-[#5A2D91] hover:bg-[#4A2577]">
                <Plus className="w-4 h-4 mr-2" />
                Inserir Marcação
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Punches Dialog */}
        <Dialog open={isViewPunchesDialogOpen} onOpenChange={setIsViewPunchesDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Marcações Detalhadas - {selectedEmployee?.employeeName}</DialogTitle>
              <DialogDescription>
                Todas as marcações registradas no período de {periodStart} a {periodEnd}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Filter Options */}
              <div className="flex items-center gap-3">
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <div className="grid gap-2">
                    <Label htmlFor="filterStartDate" className="text-xs">
                      Data Início
                    </Label>
                    <Input id="filterStartDate" type="date" className="h-9" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="filterEndDate" className="text-xs">
                      Data Fim (máx 30 dias)
                    </Label>
                    <Input id="filterEndDate" type="date" className="h-9" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-5 bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar AFDT
                </Button>
              </div>

              <Separator />

              {/* Detailed Punch Records */}
              <div className="space-y-3">
                {detailedPunchRecords.map((punch) => (
                  <div
                    key={punch.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {punch.type === "O" ? (
                          <Fingerprint className="w-6 h-6 text-blue-600" />
                        ) : punch.type === "I" ? (
                          <Smartphone className="w-6 h-6 text-green-600" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {new Date(punch.date + "T00:00:00").toLocaleDateString("pt-BR")} - {punch.time}
                          </p>
                          <Badge
                            variant="secondary"
                            className={
                              punch.type === "O"
                                ? "bg-blue-100 text-blue-800"
                                : punch.type === "I"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {getPunchTypeLabel(punch.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{punch.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={
                          punch.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : punch.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {punch.status === "approved"
                          ? "Aprovada"
                          : punch.status === "pending"
                            ? "Pendente"
                            : "Desconsiderada"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            Aprovar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <XCircle className="w-4 h-4 mr-2 text-red-600" />
                            Desconsiderar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewPunchesDialogOpen(false)}>
                Fechar
              </Button>
              <Button className="bg-[#F06423] hover:bg-[#E55A1F]">
                <Download className="w-4 h-4 mr-2" />
                Exportar Marcações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Punch Dialog */}
        <Dialog open={isEditPunchDialogOpen} onOpenChange={setIsEditPunchDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Marcação</DialogTitle>
              <DialogDescription>Edite ou gerencie a marcação de {selectedEmployee?.employeeName}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="edit">Editar</TabsTrigger>
                <TabsTrigger value="occurrence">Ocorrência</TabsTrigger>
                <TabsTrigger value="pending">Pendências</TabsTrigger>
              </TabsList>

              <TabsContent value="edit" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Tipo de Marcação</Label>
                    <p className="text-sm font-medium text-gray-900">{selectedPunch?.punchType}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="editTime">Novo Horário</Label>
                      <Input id="editTime" type="time" defaultValue={selectedPunch?.time} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="launchBH">Lançar no BH (horas)</Label>
                      <Input id="launchBH" type="text" placeholder="Ex: +01:30 ou -00:15" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="editReason">Motivo da Alteração</Label>
                    <Textarea id="editReason" placeholder="Descreva o motivo da alteração" rows={3} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="occurrence" className="space-y-4 pt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="occurrenceType">Tipo de Ocorrência</Label>
                    <select
                      id="occurrenceType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Selecione uma ocorrência</option>
                      <option value="medical">Consulta Médica</option>
                      <option value="certificate">Atestado Médico</option>
                      <option value="absence">Falta Justificada</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="occurrenceObs">Observações</Label>
                    <Textarea id="occurrenceObs" placeholder="Detalhes da ocorrência" rows={3} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 pt-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Inserir Jornada Completa
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Clock3 className="w-4 h-4 mr-2" />
                    Inserir Marcação Específica
                  </Button>
                  <Separator />
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Desconsiderar Marcação
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditPunchDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-[#5A2D91] hover:bg-[#4A2577]">
                <CheckCircle className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}
