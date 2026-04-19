"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ModalForm } from "@/components/ui/modal-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast-context";
import { Plus, Search, Filter } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useOrder } from "@/context/OrderContext";

const orderSchema = z.object({
  customer: z.string().min(2, "Customer name is required"),
  type: z.string().min(2, "Cake type is required"),
  weight: z.string().min(1, "Weight is required"),
  price: z.number().positive("Price must be positive"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Pending", "Preparing", "Baking", "Ready", "Delivered"]),
  payment: z.enum(["Paid", "Pending"]),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export default function OrdersPage() {
  const { orders } = useOrder();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      status: "Pending",
      payment: "Pending"
    }
  });

  const mappedOrders = React.useMemo(() => {
     return orders.map(order => ({
        id: order.id,
        customer: order.client,
        type: order.items.map(i => `${i.quantity}x ${i.name}`).join(', '),
        weight: "Standard",
        price: order.amount,
        date: order.date,
        status: order.status.charAt(0).toUpperCase() + order.status.slice(1), // Pending, Preparing, Delivered
        payment: "Paid"
     }));
  }, [orders]);

  const filteredOrders = mappedOrders.filter(o => 
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === "All" || o.status.toLowerCase() === statusFilter.toLowerCase()) &&
    (paymentFilter === "All" || o.payment === paymentFilter)
  );

  const onSubmit = async (data: OrderFormValues) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsModalOpen(false);
    reset();
    toast("Order created! (Mocked on Admin)", "success");
  };

  const statusColors: Record<string, string> = {
    "Delivered": "bg-emerald-100 text-emerald-800 border-emerald-200",
    "Baking": "bg-amber-100 text-amber-800 border-amber-200",
    "Ready": "bg-blue-100 text-blue-800 border-blue-200",
    "Pending": "bg-slate-100 text-slate-800 border-slate-200",
    "Preparing": "bg-indigo-100 text-indigo-800 border-indigo-200"
  };

  const columns = [
    { header: "Order ID", accessorKey: "id" as const, className: "font-mono font-bold text-slate-800" },
    { header: "Customer", accessorKey: "customer" as const, className: "font-semibold" },
    { header: "Cake Type", accessorKey: "type" as const },
    { header: "Weight", accessorKey: "weight" as const },
    { 
      header: "Price", 
      accessorKey: "price" as const, 
      cell: (item: any) => <span className="font-mono font-bold">${item.price.toFixed(2)}</span>
    },
    { header: "Date", accessorKey: "date" as const },
    { 
      header: "Status", 
      accessorKey: "status" as const,
      cell: (item: any) => (
        <Badge variant="outline" className={`${statusColors[item.status]} font-bold`}>
          {item.status}
        </Badge>
      )
    },
    { 
      header: "Payment", 
      accessorKey: "payment" as const,
      cell: (item: any) => (
        <Badge variant={item.payment === "Paid" ? "default" : "secondary"} className={item.payment === "Paid" ? "bg-emerald-500 hover:bg-emerald-600 font-bold" : "font-bold text-slate-600 bg-slate-200"}>
          {item.payment}
        </Badge>
      )
    },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-amber-950 tracking-tight">Cake Orders</h1>
          <p className="text-slate-500">Manage all incoming orders and baking statuses.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold px-6 py-6 h-auto">
          <Plus className="mr-2 h-5 w-5" />
          Add Order
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl border border-orange-900/10 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by customer or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "All")}>
            <SelectTrigger className="w-[140px] rounded-xl flex items-center gap-2">
               <Filter className="h-4 w-4 text-slate-400" />
               <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Baking">Baking</SelectItem>
              <SelectItem value="Ready">Ready</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={(val) => setPaymentFilter(val || "All")}>
            <SelectTrigger className="w-[140px] rounded-xl flex items-center gap-2">
               <Filter className="h-4 w-4 text-slate-400" />
               <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredOrders} 
        emptyMessage="No orders found matching your filters."
      />

      <ModalForm 
        title="Add New Order" 
        description="Enter the details for the new cake order."
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); reset(); }}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        submitText="Create Order"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1 col-span-2">
            <label className="text-sm font-bold text-slate-700">Customer Name</label>
            <Input {...register("customer")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
            {errors.customer && <p className="text-xs text-red-500">{errors.customer.message}</p>}
          </div>
          
          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Cake Type</label>
             <Input {...register("type")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
             {errors.type && <p className="text-xs text-red-500">{errors.type.message}</p>}
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Weight</label>
             <Input {...register("weight")} placeholder="e.g. 2kg" className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
             {errors.weight && <p className="text-xs text-red-500">{errors.weight.message}</p>}
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Price ($)</label>
             <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
             {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Delivery Date</label>
             <Input type="date" {...register("date")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
             {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Baking Status</label>
             <Select onValueChange={(val) => setValue("status", val as any)} defaultValue="Baking">
               <SelectTrigger className="rounded-xl border-slate-200 focus:ring-blue-500"><SelectValue /></SelectTrigger>
               <SelectContent>
                 <SelectItem value="Baking">Baking</SelectItem>
                 <SelectItem value="Ready">Ready</SelectItem>
                 <SelectItem value="Delivered">Delivered</SelectItem>
               </SelectContent>
             </Select>
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Payment</label>
             <Select onValueChange={(val) => setValue("payment", val as any)} defaultValue="Pending">
               <SelectTrigger className="rounded-xl border-slate-200 focus:ring-blue-500"><SelectValue /></SelectTrigger>
               <SelectContent>
                 <SelectItem value="Paid">Paid</SelectItem>
                 <SelectItem value="Pending">Pending</SelectItem>
               </SelectContent>
             </Select>
          </div>
        </div>
      </ModalForm>
    </div>
  );
}
