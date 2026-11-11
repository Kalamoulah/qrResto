// app/kitchen/[restaurantId]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChefHat, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Bell,
  ShoppingBag,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Phone,
  MapPin,
  Mail,
  QrCode
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Components Shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Types
type OrderStatus = "pending" | "preparing" | "ready" | "served";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  tableNumber: number;
  items: OrderItem[];
  total: string;
  timestamp: Date;
  status: OrderStatus;
  notes?: string;
}

// Données mockées
const mockOrders: Order[] = [
  {
    id: "1",
    tableNumber: 7,
    items: [
      { name: "Mafé Royal", quantity: 2, price: "3 500 FCFA" },
      { name: "Bissap", quantity: 1, price: "1 000 FCFA" },
      { name: "Thiakry", quantity: 1, price: "1 500 FCFA" },
    ],
    total: "9 500 FCFA",
    timestamp: new Date(Date.now() - 2 * 60000),
    status: "pending",
    notes: "Sans piment",
  },
  {
    id: "2",
    tableNumber: 3,
    items: [
      { name: "Ceebu Jën", quantity: 1, price: "4 000 FCFA" },
      { name: "Jus de Bouye", quantity: 2, price: "1 000 FCFA" },
    ],
    total: "6 000 FCFA",
    timestamp: new Date(Date.now() - 5 * 60000),
    status: "pending",
  },
  {
    id: "3",
    tableNumber: 5,
    items: [
      { name: "Yassa Poulet", quantity: 1, price: "3 500 FCFA" },
      { name: "Salade Thiebou", quantity: 1, price: "2 500 FCFA" },
    ],
    total: "6 000 FCFA",
    timestamp: new Date(Date.now() - 12 * 60000),
    status: "preparing",
  },
  {
    id: "4",
    tableNumber: 2,
    items: [
      { name: "Dibi", quantity: 2, price: "4 500 FCFA" },
      { name: "Bissap", quantity: 2, price: "1 000 FCFA" },
    ],
    total: "11 000 FCFA",
    timestamp: new Date(Date.now() - 20 * 60000),
    status: "preparing",
    notes: "Viande bien cuite",
  },
  {
    id: "5",
    tableNumber: 8,
    items: [
      { name: "Mafé Royal", quantity: 1, price: "3 500 FCFA" },
      { name: "Thiakry", quantity: 1, price: "1 500 FCFA" },
    ],
    total: "5 000 FCFA",
    timestamp: new Date(Date.now() - 35 * 60000),
    status: "ready",
  },
  {
    id: "6",
    tableNumber: 1,
    items: [
      { name: "Ceebu Jën", quantity: 1, price: "4 000 FCFA" },
    ],
    total: "4 000 FCFA",
    timestamp: new Date(Date.now() - 60 * 60000),
    status: "served",
  },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  pending: { 
    label: "En attente", 
    color: "text-yellow-600", 
    bgColor: "bg-yellow-50 border-yellow-200",
    icon: <Clock className="w-4 h-4" /> 
  },
  preparing: { 
    label: "En préparation", 
    color: "text-blue-600", 
    bgColor: "bg-blue-50 border-blue-200",
    icon: <ChefHat className="w-4 h-4" /> 
  },
  ready: { 
    label: "Prêt", 
    color: "text-green-600", 
    bgColor: "bg-green-50 border-green-200",
    icon: <CheckCircle className="w-4 h-4" /> 
  },
  served: { 
    label: "Servi", 
    color: "text-gray-500", 
    bgColor: "bg-gray-50 border-gray-200",
    icon: <CheckCircle className="w-4 h-4" /> 
  },
};

const restaurant = {
  name: "Le Baobab Doré",
  primaryColor: "#C9A84C",
  neighborhood: "Mermoz",
  city: "Dakar",
  phone: "+221 77 123 45 67",
  email: "contact@baobabdore.sn",
};

// Animation variants (identiques à SpicyCabPage)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [newOrderAlert, setNewOrderAlert] = useState(false);
  const [activeNav, setActiveNav] = useState("kanban");

  // Simuler réception d'une nouvelle commande
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const newOrder: Order = {
          id: Date.now().toString(),
          tableNumber: Math.floor(Math.random() * 12) + 1,
          items: [
            { name: "Yassa Poulet", quantity: 1, price: "3 500 FCFA" },
            { name: "Bissap", quantity: 1, price: "1 000 FCFA" },
          ],
          total: "4 500 FCFA",
          timestamp: new Date(),
          status: "pending",
        };
        setOrders(prev => [newOrder, ...prev]);
        setNewOrderAlert(true);
        setTimeout(() => setNewOrderAlert(false), 5000);
      }
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter(order => order.status === status);
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const columns: { id: OrderStatus; title: string; icon: React.ReactNode }[] = [
    { id: "pending", title: "En attente", icon: <Clock className="w-4 h-4" /> },
    { id: "preparing", title: "En préparation", icon: <ChefHat className="w-4 h-4" /> },
    { id: "ready", title: "Prêts", icon: <CheckCircle className="w-4 h-4" /> },
    { id: "served", title: "Servis", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const stats = {
    total: orders.length,
    pending: getOrdersByStatus("pending").length,
    preparing: getOrdersByStatus("preparing").length,
    ready: getOrdersByStatus("ready").length,
    served: getOrdersByStatus("served").length,
    todayRevenue: orders
      .filter(o => o.status === "served")
      .reduce((sum, o) => sum + parseInt(o.total.replace(/\D/g, "")), 0),
  };

  const navItems = [
    { id: "kanban", label: "Commandes", icon: ChefHat },
    { id: "stats", label: "Stats", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans">
      {/* Alerte nouvelle commande */}
      <AnimatePresence>
        {newOrderAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-red-500 text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-sm">
              <Bell className="w-4 h-4 animate-bounce" />
              <span className="font-medium">Nouvelle commande !</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 px-5 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu Cuisine</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => { setActiveNav(item.id); setMobileMenuOpen(false); }}
                      >
                        <item.icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </Button>
                    ))}
                  </div>
                  <Separator />
                  <Button variant="ghost" className="w-full justify-start text-destructive">
                    <LogOut className="w-4 h-4 mr-3" /> Déconnexion
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C9A84C] rounded-xl flex items-center justify-center">
              <ChefHat size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-stone-800">
                CUISINE
              </h1>
              <p className="text-xs text-stone-400">{restaurant.name}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 bg-[#C9A84C]">
            <AvatarFallback className="bg-[#C9A84C] text-white text-xs">
              CH
            </AvatarFallback>
          </Avatar>
        </div>
      </motion.header>

      <main className="px-5 pb-24">
        {/* Vue Kanban */}
        {activeNav === "kanban" && (
          <>
            {/* Stats rapides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-4 gap-3 mt-4 mb-6"
            >
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-stone-800">{stats.pending}</div>
                <div className="text-xs text-stone-400">En attente</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{stats.preparing}</div>
                <div className="text-xs text-stone-400">Préparation</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-600">{stats.ready}</div>
                <div className="text-xs text-stone-400">Prêts</div>
              </div>
              <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                <div className="text-2xl font-bold text-stone-800">{stats.served}</div>
                <div className="text-xs text-stone-400">Servis</div>
              </div>
            </motion.div>

            {/* Kanban Board - 4 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {columns.map((column, colIdx) => (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: colIdx * 0.1 }}
                  className="min-w-[280px]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-stone-700 flex items-center gap-2 text-sm">
                      {column.icon}
                      {column.title}
                    </h3>
                    <Badge variant="secondary" className="bg-stone-100 text-stone-600">
                      {getOrdersByStatus(column.id).length}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                      {getOrdersByStatus(column.id).map((order, idx) => (
                        <motion.div
                          key={order.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -20 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          className={cn(
                            "bg-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-all border",
                            statusConfig[order.status].bgColor
                          )}
                          onClick={() => {
                            setSelectedOrder(order);
                            setDetailsOpen(true);
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Badge className="bg-black text-[#C9A84C] text-[10px]">
                              Table {order.tableNumber}
                            </Badge>
                            <span className="text-[10px] text-stone-400">
                              {formatTime(order.timestamp)}
                            </span>
                          </div>

                          <div className="space-y-1 mb-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>
                                  <span className="font-medium">{item.quantity}x</span> {item.name}
                                </span>
                                <span className="text-stone-500 text-xs">{item.price}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-dashed border-stone-200">
                            <span className="text-xs font-medium">Total</span>
                            <span className="text-sm font-bold text-[#C9A84C]">{order.total}</span>
                          </div>

                          {order.notes && (
                            <p className="text-[10px] text-amber-600 mt-2 bg-amber-50 p-1.5 rounded">
                              📝 {order.notes}
                            </p>
                          )}

                          <div className="flex gap-2 mt-3">
                            {order.status === "pending" && (
                              <Button
                                size="sm"
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-[11px] h-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, "preparing");
                                }}
                              >
                                Démarrer
                              </Button>
                            )}
                            {order.status === "preparing" && (
                              <Button
                                size="sm"
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-[11px] h-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, "ready");
                                }}
                              >
                                Prêt
                              </Button>
                            )}
                            {order.status === "ready" && (
                              <Button
                                size="sm"
                                className="flex-1 bg-black text-[#C9A84C] text-[11px] h-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateOrderStatus(order.id, "served");
                                }}
                              >
                                Servi
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {getOrdersByStatus(column.id).length === 0 && (
                      <div className="text-center py-8 text-stone-400 text-sm bg-white rounded-xl border">
                        Aucune commande
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Vue Statistiques */}
        {activeNav === "stats" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 mt-4"
          >
            {/* Cartes stats */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Commandes</p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-stone-300" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-yellow-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Temps moyen</p>
                      <p className="text-2xl font-bold text-yellow-600">12 min</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-300" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">CA aujourd'hui</p>
                      <p className="text-base font-bold text-green-600">{stats.todayRevenue.toLocaleString()} F</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-300" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Tables servies</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.served}</p>
                    </div>
                    <ChefHat className="w-8 h-8 text-blue-300" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progression */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Activité du jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "En attente", value: stats.pending, color: "bg-yellow-500" },
                    { label: "En préparation", value: stats.preparing, color: "bg-blue-500" },
                    { label: "Prêts", value: stats.ready, color: "bg-green-500" },
                    { label: "Servis", value: stats.served, color: "bg-gray-400" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-stone-600">{item.label}</span>
                        <span className="font-medium text-stone-800">{item.value}</span>
                      </div>
                      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full transition-all duration-500", item.color)}
                          style={{ width: stats.total > 0 ? `${(item.value / stats.total) * 100}%` : 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Infos restaurant */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-stone-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs">{restaurant.neighborhood}, {restaurant.city}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs">{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs">{restaurant.email}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Bottom Sheet Détails commande */}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl p-0 border-0 max-h-[85vh] overflow-y-auto">
          <AnimatePresence>
            {selectedOrder && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="pb-6"
              >
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white z-10"
                >
                  <X size={16} />
                </button>

                <div className="bg-[#F7F5F2] flex items-center justify-center py-8 rounded-t-3xl">
                  <div className="w-16 h-16 bg-[#C9A84C]/20 rounded-full flex items-center justify-center">
                    <ChefHat size={28} className="text-[#C9A84C]" />
                  </div>
                </div>

                <div className="px-6 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-stone-800">
                      Table {selectedOrder.tableNumber}
                    </h2>
                    <Badge className={cn("text-xs", statusConfig[selectedOrder.status].bgColor, statusConfig[selectedOrder.status].color)}>
                      <span className="flex items-center gap-1">
                        {statusConfig[selectedOrder.status].icon}
                        {statusConfig[selectedOrder.status].label}
                      </span>
                    </Badge>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-3 mb-4">
                    <p className="text-xs text-stone-400 mb-1">Heure de commande</p>
                    <p className="text-sm font-medium text-stone-700">
                      {new Date(selectedOrder.timestamp).toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-stone-700 text-sm mb-2">Articles</h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between py-2 border-b border-stone-100">
                          <div className="text-sm">
                            <span className="font-medium">{item.quantity}x</span> {item.name}
                          </div>
                          <span className="text-sm text-stone-500">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between pt-3 mt-2 border-t border-stone-200 font-semibold">
                      <span className="text-stone-700">Total</span>
                      <span className="text-[#C9A84C] font-bold">{selectedOrder.total}</span>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div className="bg-amber-50 rounded-xl p-3 mb-4">
                      <p className="text-xs text-amber-600 font-medium mb-1">📝 Note spéciale</p>
                      <p className="text-sm text-stone-700">{selectedOrder.notes}</p>
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="flex gap-2">
                    {selectedOrder.status === "pending" && (
                      <Button
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "preparing");
                          setDetailsOpen(false);
                        }}
                      >
                        Démarrer la préparation
                      </Button>
                    )}
                    {selectedOrder.status === "preparing" && (
                      <Button
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "ready");
                          setDetailsOpen(false);
                        }}
                      >
                        Marquer comme prêt
                      </Button>
                    )}
                    {selectedOrder.status === "ready" && (
                      <Button
                        className="flex-1 bg-black text-[#C9A84C]"
                        onClick={() => {
                          updateOrderStatus(selectedOrder.id, "served");
                          setDetailsOpen(false);
                        }}
                      >
                        Confirmer service
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>

      {/* Navigation mobile bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-100 lg:hidden z-40">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                activeNav === item.id ? "text-[#C9A84C]" : "text-stone-400"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}