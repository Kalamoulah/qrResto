// app/dashboard/page.tsx
"use client";
import { useState } from "react";
import {
  Package, Plus, Edit, Trash2, Eye, QrCode,
  MapPin, Phone, Mail, Settings, LogOut,
  Menu, Search, Image as ImageIcon, Utensils, Coffee, Cake, Wine,
  Store, Download, ShoppingBag, TrendingUp, Users, Clock,
  ChefHat, Bell, CheckCircle, XCircle
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Components Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
type Category = "entrees" | "plats" | "boissons" | "desserts";
type OrderStatus = "pending" | "preparing" | "ready" | "served";

interface MenuItem {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
}

interface Order {
  id: string;
  tableNumber: number;
  items: { name: string; quantity: number; price: string }[];
  total: string;
  timestamp: Date;
  status: OrderStatus;
}

// Motifs de fond pour la carte QR
const cardPatterns = [
  { name: "Vague", value: "wave", bg: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)" },
  { name: "Points", value: "dots", bg: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 1px)", bgSize: "4px 4px" },
  { name: "Lignes", value: "lines", bg: "repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 2px, transparent 2px, transparent 12px)" },
  { name: "Cercles", value: "circles", bg: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0%, transparent 35%)" },
  { name: "Tissage", value: "grid", bg: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", bgSize: "20px 20px" },
];

// Données mockées
const mockMenuItems: MenuItem[] = [
  { id: "1", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop", name: "Salade Thiebou", description: "Riz croustillant, légumes frais, poisson fumé", price: 2500, category: "entrees", isAvailable: true },
  { id: "2", imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=200&fit=crop", name: "Soupe Kandia", description: "Gombo frais, viande tendre, crevettes", price: 2000, category: "entrees", isAvailable: true },
  { id: "3", imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop", name: "Mafé Royal", description: "Bœuf fondant, sauce arachide, légumes du jour", price: 3500, category: "plats", isAvailable: true },
  { id: "4", imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop", name: "Ceebu Jën", description: "Riz blanc, thiof entier, légumes", price: 4000, category: "plats", isAvailable: true },
  { id: "5", imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=200&h=200&fit=crop", name: "Yassa Poulet", description: "Poulet mariné, oignons caramélisés", price: 3500, category: "plats", isAvailable: false },
  { id: "6", imageUrl: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=200&h=200&fit=crop", name: "Bissap", description: "Jus d'hibiscus frais maison", price: 1000, category: "boissons", isAvailable: true },
  { id: "7", imageUrl: "https://images.unsplash.com/photo-1615485925600-9728c6d6d685?w=200&h=200&fit=crop", name: "Jus de Bouye", description: "Jus de fruit du baobab", price: 1000, category: "boissons", isAvailable: true },
  { id: "8", imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop", name: "Thiakry", description: "Semoule au lait caillé, vanille", price: 1500, category: "desserts", isAvailable: true },
];

// Données mockées des commandes
const mockOrders: Order[] = [
  {
    id: "1",
    tableNumber: 7,
    items: [
      { name: "Mafé Royal", quantity: 2, price: "3 500 FCFA" },
      { name: "Bissap", quantity: 1, price: "1 000 FCFA" },
    ],
    total: "8 000 FCFA",
    timestamp: new Date(),
    status: "pending",
  },
  {
    id: "2",
    tableNumber: 3,
    items: [
      { name: "Ceebu Jën", quantity: 1, price: "4 000 FCFA" },
      { name: "Thiakry", quantity: 1, price: "1 500 FCFA" },
    ],
    total: "5 500 FCFA",
    timestamp: new Date(Date.now() - 5 * 60000),
    status: "preparing",
  },
  {
    id: "3",
    tableNumber: 5,
    items: [
      { name: "Yassa Poulet", quantity: 1, price: "3 500 FCFA" },
      { name: "Jus de Bouye", quantity: 2, price: "1 000 FCFA" },
    ],
    total: "5 500 FCFA",
    timestamp: new Date(Date.now() - 15 * 60000),
    status: "ready",
  },
  {
    id: "4",
    tableNumber: 2,
    items: [
      { name: "Salade Thiebou", quantity: 1, price: "2 500 FCFA" },
      { name: "Bissap", quantity: 1, price: "1 000 FCFA" },
    ],
    total: "3 500 FCFA",
    timestamp: new Date(Date.now() - 60 * 60000),
    status: "served",
  },
];

const categories: { id: Category; label: string; icon: React.ReactNode }[] = [
  { id: "entrees", label: "Entrées", icon: <Utensils className="w-4 h-4" /> },
  { id: "plats", label: "Plats", icon: <Coffee className="w-4 h-4" /> },
  { id: "boissons", label: "Boissons", icon: <Cake className="w-4 h-4" /> },
  { id: "desserts", label: "Desserts", icon: <Wine className="w-4 h-4" /> },
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "En attente", color: "bg-yellow-500", icon: <Clock className="w-3 h-3" /> },
  preparing: { label: "Préparation", color: "bg-blue-500", icon: <ChefHat className="w-3 h-3" /> },
  ready: { label: "Prêt", color: "bg-green-500", icon: <CheckCircle className="w-3 h-3" /> },
  served: { label: "Servi", color: "bg-gray-400", icon: <CheckCircle className="w-3 h-3" /> },
};

// QR Code SVG component
const QRCodeSVG = () => (
  <svg width="160" height="160" viewBox="0 0 16 16" fill="none">
    <path fill="#000" d="M6 0h-6v6h6v-6zM5 5h-4v-4h4v4z"/>
    <path fill="#000" d="M2 2h2v2h-2v-2z"/>
    <path fill="#000" d="M0 16h6v-6h-6v6zM1 11h4v4h-4v-4z"/>
    <path fill="#000" d="M2 12h2v2h-2v-2z"/>
    <path fill="#000" d="M10 0v6h6v-6h-6zM15 5h-4v-4h4v4z"/>
    <path fill="#000" d="M12 2h2v2h-2v-2z"/>
    <path fill="#000" d="M2 7h-2v2h3v-1h-1z"/>
    <path fill="#000" d="M7 9h2v2h-2v-2z"/>
    <path fill="#000" d="M3 7h2v1h-2v-1z"/>
    <path fill="#000" d="M9 12h-2v1h1v1h1v-1z"/>
    <path fill="#000" d="M6 7v1h-1v1h2v-2z"/>
    <path fill="#000" d="M8 4h1v2h-1v-2z"/>
    <path fill="#000" d="M9 8v1h2v-2h-3v1z"/>
    <path fill="#000" d="M7 6h1v1h-1v-1z"/>
    <path fill="#000" d="M9 14h2v2h-2v-2z"/>
    <path fill="#000" d="M7 14h1v2h-1v-2z"/>
    <path fill="#000" d="M9 11h1v1h-1v-1z"/>
    <path fill="#000" d="M9 3v-2h-1v-1h-1v4h1v-1z"/>
    <path fill="#000" d="M12 14h1v2h-1v-2z"/>
    <path fill="#000" d="M12 12h2v1h-2v-1z"/>
    <path fill="#000" d="M11 13h1v1h-1v-1z"/>
    <path fill="#000" d="M10 12h1v1h-1v-1z"/>
    <path fill="#000" d="M14 10v1h1v1h1v-2h-1z"/>
    <path fill="#000" d="M15 13h-1v3h2v-2h-1z"/>
    <path fill="#000" d="M10 10v1h3v-2h-2v1z"/>
    <path fill="#000" d="M12 7v1h2v1h2v-2h-2z"/>
  </svg>
);

// Carte QR unique avec motif et logo
function QRCard({ primaryColor, pattern, logoUrl, restaurantName }: { primaryColor: string; pattern: string; logoUrl?: string; restaurantName: string }) {
  const selectedPattern = cardPatterns.find(p => p.value === pattern) || cardPatterns[0];
  
  return (
    <div 
      className="relative rounded-2xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer"
      style={{ 
        background: primaryColor,
        boxShadow: `0 12px 40px ${primaryColor}30`
      }}
    >
      <div 
        className="absolute inset-0 opacity-25"
        style={{ 
          background: selectedPattern.bg, 
          backgroundSize: selectedPattern.bgSize || 'auto'
        }}
      />
      
      <div className="relative z-10 p-8 flex flex-col items-center text-center">
        {logoUrl ? (
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg overflow-hidden">
            <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 shadow-lg backdrop-blur-sm">
            <span className="text-3xl">🍽️</span>
          </div>
        )}
        
        <h3 className="text-white font-bold text-xl mb-1">{restaurantName}</h3>
        
        <div className="bg-white p-3 rounded-xl shadow-lg my-4">
          <QRCodeSVG />
        </div>
        
        <p className="text-white font-medium text-sm">Scannez pour voir le menu</p>
        <p className="text-white/70 text-xs mt-1">Aucune application nécessaire</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Personnalisation
  const [primaryColor, setPrimaryColor] = useState("#C9A84C");
  const [selectedPattern, setSelectedPattern] = useState("wave");
  const [logoUrl, setLogoUrl] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [formData, setFormData] = useState({
    imageUrl: "",
    name: "",
    description: "",
    price: "",
  });

  const shop = {
    name: "Le Baobab Doré",
    neighborhood: "Mermoz",
    city: "Dakar",
    phone: "+221 77 123 45 67",
    email: "contact@baobabdore.sn",
    link: "baobab-dore",
  };

  // Statistiques des commandes
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
    preparingOrders: orders.filter(o => o.status === "preparing").length,
    readyOrders: orders.filter(o => o.status === "ready").length,
    servedOrders: orders.filter(o => o.status === "served").length,
    totalRevenue: orders.reduce((sum, order) => {
      const total = parseInt(order.total.replace(/\D/g, ""));
      return sum + total;
    }, 0),
    popularItems: [
      { name: "Mafé Royal", count: 12 },
      { name: "Ceebu Jën", count: 8 },
      { name: "Yassa Poulet", count: 6 },
    ],
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({ imageUrl: "", name: "", description: "", price: "" });
    setImagePreview("");
    setIsModalOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      imageUrl: item.imageUrl,
      name: item.name,
      description: item.description,
      price: item.price.toString(),
    });
    setImagePreview(item.imageUrl);
    setIsModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!formData.name || !formData.price) return;

    const newItem: MenuItem = {
      id: editingItem?.id || Date.now().toString(),
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      category: "plats",
      isAvailable: true,
    };

    if (editingItem) {
      setMenuItems(menuItems.map(item => item.id === editingItem.id ? newItem : item));
    } else {
      setMenuItems([...menuItems, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Supprimer ce plat ?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleToggleAvailable = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadQR = () => {
    alert("Téléchargement du QR code (à implémenter)");
  };

  const navItems = [
    { id: "overview", label: "Accueil", icon: TrendingUp },
    { id: "orders", label: "Commandes", icon: ShoppingBag },
    { id: "menu", label: "Mon Menu", icon: Package },
    { id: "qrcode", label: "QR Code", icon: QrCode },
    { id: "kitchen", label: "Cuisine", icon: ChefHat },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header mobile */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Bienvenue {shop.name}</p>
          </div>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className="w-full justify-start"
                        style={activeTab === item.id ? { backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor } : {}}
                        onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        {item.label}
                      </Button>
                    );
                  })}
                </div>
                <Separator />
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href={`/shop/${shop.link}`}>
                      <Store className="w-4 h-4 mr-3" /> Ma boutique
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive">
                    <LogOut className="w-4 h-4 mr-3" /> Déconnexion
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-4 sticky top-24">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span className="text-white text-xl font-bold">QR</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-sm">{shop.name}</h2>
                      <p className="text-xs text-muted-foreground">Restaurant</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className="w-full justify-start"
                          style={activeTab === item.id ? { backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor } : {}}
                          onClick={() => setActiveTab(item.id)}
                        >
                          <Icon className="w-4 h-4 mr-3" /> {item.label}
                        </Button>
                      );
                    })}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link href={`/shop/${shop.link}`}>
                        <Eye className="w-4 h-4 mr-3" /> Aperçu
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-destructive">
                      <LogOut className="w-4 h-4 mr-3" /> Déconnexion
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Infos boutique</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">{shop.neighborhood}, {shop.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{shop.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">{shop.email}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Identité visuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="w-full h-12 rounded-lg mb-3"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="text-xs text-muted-foreground">
                    <p>Couleur principale</p>
                    <p className="font-mono mt-1">{primaryColor}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            {/* Navigation tabs mobile */}
            <div className="lg:hidden mb-4">
              <div className="grid grid-cols-3 gap-1">
                {navItems.slice(0, 3).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className="flex flex-col items-center gap-1 h-auto py-2"
                      style={activeTab === item.id ? { backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor } : {}}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{item.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Vue d'ensemble (Accueil) avec stats */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <Card className="bg-gradient-to-br from-white to-blue-50/30">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Commandes</p>
                          <p className="text-2xl font-bold">{stats.totalOrders}</p>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <ShoppingBag className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-white to-yellow-50/30">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">En attente</p>
                          <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                        </div>
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-white to-green-50/30">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Prêts</p>
                          <p className="text-2xl font-bold text-green-600">{stats.readyOrders}</p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-white to-amber-50/30">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">CA total</p>
                          <p className="text-xl font-bold text-[#C9A84C]">{stats.totalRevenue.toLocaleString()} F</p>
                        </div>
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-amber-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Commandes récentes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Commandes récentes</CardTitle>
                    <CardDescription>Les 3 dernières commandes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Table {order.tableNumber}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{order.total}</p>
                          <Badge className={cn("text-[10px]", statusConfig[order.status].color, "text-white")}>
                            {statusConfig[order.status].label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Plats populaires */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Plats les plus commandés</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {stats.popularItems.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <span className="text-sm">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={(item.count / stats.popularItems[0].count) * 100} className="w-24 h-1.5" />
                          <span className="text-xs font-medium">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Section Commandes */}
            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Toutes les commandes</CardTitle>
                  <CardDescription>Gérez les commandes de vos clients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-400">Aucune commande pour le moment</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <Badge className="bg-black text-[#C9A84C]">Table {order.tableNumber}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(order.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                          <Badge className={statusConfig[order.status].color}>
                            <span className="flex items-center gap-1 text-white">
                              {statusConfig[order.status].icon}
                              {statusConfig[order.status].label}
                            </span>
                          </Badge>
                        </div>
                        <div className="space-y-1 mb-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.quantity}x {item.name}</span>
                              <span className="text-muted-foreground">{item.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-2 flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-[#C9A84C]">{order.total}</span>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {/* Section Menu (comme avant) */}
            {activeTab === "menu" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-xl font-bold">Mon Menu</h2>
                    <p className="text-xs text-muted-foreground">{menuItems.length} plat{menuItems.length > 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Rechercher..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <Button size="sm" style={{ backgroundColor: primaryColor }} onClick={handleAddItem}>
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Ajouter
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-5 w-full max-w-md bg-gray-100 rounded-xl p-1">
                    <TabsTrigger value="all" className="rounded-lg">Tous</TabsTrigger>
                    {categories.map(cat => (
                      <TabsTrigger key={cat.id} value={cat.id} className="rounded-lg gap-1">
                        {cat.icon}
                        <span className="hidden sm:inline">{cat.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="all" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {filteredItems.map((item, idx) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                          <Card className="group overflow-hidden hover:shadow-md transition-all">
                            <div className="aspect-square bg-muted relative overflow-hidden">
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="secondary" className="rounded-full w-7 h-7 bg-white/90">
                                      <span className="text-lg">⋯</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditItem(item)}>
                                      <Edit className="w-3 h-3 mr-2" /> Modifier
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleToggleAvailable(item.id)}>
                                      {item.isAvailable ? "Marquer épuisé" : "Marquer disponible"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteItem(item.id)} className="text-red-600">
                                      <Trash2 className="w-3 h-3 mr-2" /> Supprimer
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <CardContent className="p-2 sm:p-3">
                              <h3 className="text-xs sm:text-sm font-medium truncate">{item.name}</h3>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs sm:text-sm font-bold text-[#8B6914]">{formatPrice(item.price)}</span>
                                <Badge variant="outline" className={item.isAvailable ? "text-green-600 border-green-200 text-[9px]" : "text-red-600 border-red-200 text-[9px]"}>
                                  {item.isAvailable ? "Disponible" : "Épuisé"}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  {categories.map(cat => (
                    <TabsContent key={cat.id} value={cat.id} className="mt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {filteredItems.filter(item => item.category === cat.id).map((item, idx) => (
                          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                            <Card className="group overflow-hidden hover:shadow-md transition-all">
                              <div className="aspect-square bg-muted relative overflow-hidden">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button size="icon" variant="secondary" className="rounded-full w-7 h-7 bg-white/90">
                                        <span className="text-lg">⋯</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleEditItem(item)}>
                                        <Edit className="w-3 h-3 mr-2" /> Modifier
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleToggleAvailable(item.id)}>
                                        {item.isAvailable ? "Marquer épuisé" : "Marquer disponible"}
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDeleteItem(item.id)} className="text-red-600">
                                        <Trash2 className="w-3 h-3 mr-2" /> Supprimer
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <CardContent className="p-2 sm:p-3">
                                <h3 className="text-xs sm:text-sm font-medium truncate">{item.name}</h3>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-xs sm:text-sm font-bold text-[#8B6914]">{formatPrice(item.price)}</span>
                                  <Badge variant="outline" className={item.isAvailable ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}>
                                    {item.isAvailable ? "Disponible" : "Épuisé"}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}

            {/* Section QR Code */}
            {activeTab === "qrcode" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Votre QR Code unique</CardTitle>
                    <CardDescription>
                      Un seul QR code pour tout votre restaurant. Imprimez-le et placez-le sur chaque table.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                      <h3 className="text-sm font-semibold mb-3">Aperçu de votre carte</h3>
                      <div className="max-w-sm mx-auto">
                        <QRCard 
                          primaryColor={primaryColor} 
                          pattern={selectedPattern} 
                          logoUrl={logoUrl} 
                          restaurantName={shop.name}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <Label className="mb-2 block">Couleur principale</Label>
                        <div className="flex gap-3 items-center">
                          <div 
                            className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                            style={{ backgroundColor: primaryColor }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                          />
                          <Input 
                            type="text" 
                            value={primaryColor} 
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-32 font-mono"
                          />
                          {showColorPicker && (
                            <input 
                              type="color" 
                              value={primaryColor} 
                              onChange={(e) => setPrimaryColor(e.target.value)}
                              className="w-10 h-10 rounded-lg cursor-pointer"
                              onBlur={() => setShowColorPicker(false)}
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="mb-2 block">Motif de fond</Label>
                        <div className="flex gap-2 flex-wrap">
                          {cardPatterns.map((pattern) => (
                            <button
                              key={pattern.value}
                              onClick={() => setSelectedPattern(pattern.value)}
                              className={`w-12 h-12 rounded-lg border-2 transition-all ${
                                selectedPattern === pattern.value ? 'border-black shadow-md' : 'border-gray-200'
                              }`}
                              style={{ 
                                background: primaryColor,
                                backgroundImage: pattern.bg,
                                backgroundSize: pattern.bgSize || 'auto'
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <Label className="mb-2 block">Logo du restaurant</Label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                            {logoUrl ? (
                              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <Store className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <Input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm" />
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG. Carré de préférence.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg"
                        style={{ backgroundColor: primaryColor }} 
                        className="gap-2"
                        onClick={handleDownloadQR}
                      >
                        <Download className="w-4 h-4" />
                        Télécharger le QR code (PNG)
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline"
                        className="gap-2"
                      >
                        <Printer className="w-4 h-4" />
                        Imprimer (PDF)
                      </Button>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
                      <p className="text-sm text-blue-700">
                      Conseil : Imprimez ce QR code en format A4 ou A5 et placez-le sur chaque table. 
                        Vos clients n'auront qu'à scanner pour accéder à votre menu.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Section Cuisine (Profil cuisinier) */}
            {activeTab === "kitchen" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-[#C9A84C]" />
                    Espace Cuisine
                  </CardTitle>
                  <CardDescription>
                    Gérez les commandes en temps réel depuis la cuisine
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stats cuisine */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-yellow-50 rounded-lg p-3 text-center">
                      <Clock className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                      <p className="text-xl font-bold">{stats.pendingOrders}</p>
                      <p className="text-xs text-muted-foreground">En attente</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <ChefHat className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-xl font-bold">{stats.preparingOrders}</p>
                      <p className="text-xs text-muted-foreground">En préparation</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <p className="text-xl font-bold">{stats.readyOrders}</p>
                      <p className="text-xs text-muted-foreground">Prêts</p>
                    </div>
                  </div>

                  {/* Lien vers la page cuisine */}
                  <Button 
                    asChild
                    className="w-full bg-[#C9A84C] hover:bg-[#b8982d] text-white"
                  >
                    <Link href={`/kitchen/${shop.link}`}>
                      <ChefHat className="w-4 h-4 mr-2" />
                      Ouvrir l'espace cuisine
                    </Link>
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Accédez à l'interface dédiée pour gérer toutes les commandes
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Section Paramètres */}
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres du restaurant</CardTitle>
                  <CardDescription>Modifiez vos informations et votre identité visuelle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><Label>Nom du restaurant</Label><Input defaultValue={shop.name} className="mt-1" /></div>
                    <div><Label>Téléphone</Label><Input defaultValue={shop.phone} className="mt-1" /></div>
                    <div><Label>Email</Label><Input defaultValue={shop.email} className="mt-1" type="email" /></div>
                    <div><Label>Adresse</Label><Input defaultValue={`${shop.neighborhood}, ${shop.city}`} className="mt-1" /></div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label>Couleur principale</Label>
                    <div className="flex gap-3 items-center mt-1">
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                        style={{ backgroundColor: primaryColor }}
                        onClick={() => setShowColorPicker(!showColorPicker)}
                      />
                      <Input 
                        type="text" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-32 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Logo du restaurant</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                        {logoUrl ? (
                          <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl">🍽️</span>
                        )}
                      </div>
                      <Button variant="outline" onClick={() => document.getElementById('logoUpload')?.click()}>
                        Changer le logo
                      </Button>
                      <input id="logoUpload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button style={{ backgroundColor: primaryColor }}>Enregistrer</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modal Add/Edit */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Modifier le plat" : "Ajouter un plat"}</DialogTitle>
            <DialogDescription>{editingItem ? "Modifiez les informations de votre plat." : "Ajoutez un nouveau plat à votre menu."}</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div>
              <Label>Photo du plat</Label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
                  {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <Input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG. Max 2MB.</p>
                </div>
              </div>
            </div>
            <div><Label>Nom du plat *</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="ex: Mafé Royal" className="mt-1" /></div>
            <div><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="ex: Bœuf fondant, sauce arachide" rows={3} className="mt-1" /></div>
            <div><Label>Prix (FCFA) *</Label><Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="ex: 3500" className="mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Annuler</Button>
            <Button onClick={handleSaveItem} disabled={!formData.name || !formData.price} className="bg-black text-[#C9A84C] hover:bg-neutral-800">{editingItem ? "Modifier" : "Ajouter"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Printer(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <path d="M6 9V3h12v6"/>
      <rect x="6" y="15" width="12" height="6" rx="2"/>
    </svg>
  );
}