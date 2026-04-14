"use client";

import React, { useState } from "react";
import { ModalForm } from "@/components/ui/modal-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast-context";
import { Plus, Search, MapPin, Phone, ShoppingBag, Star } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";

const MOCK_CUSTOMERS = [
  { id: "CUST-01", name: "Alice Johnson", phone: "555-0101", address: "123 Cherry Lane", orders: 5, notes: "Allergic to nuts" },
  { id: "CUST-02", name: "Bob Smith", phone: "555-0102", address: "456 Apple St", orders: 2, notes: "" },
  { id: "CUST-03", name: "Charlie Davis", phone: "555-0103", address: "789 Banana Blvd", orders: 1, notes: "" },
  { id: "CUST-04", name: "Diana Prince", phone: "555-0104", address: "101 Paradise Island", orders: 8, notes: "Prefers red velvet" },
  { id: "CUST-05", name: "Evan Wright", phone: "555-0105", address: "202 Developer Rd", orders: 4, notes: "Always pays in cash" },
];

const customerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(5, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  notes: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

export default function CustomersPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema)
  });

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  const onSubmit = async (data: CustomerFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newCustomer = {
      id: `CUST-${String(customers.length + 1).padStart(2, '0')}`,
      orders: 0,
      ...data,
      notes: data.notes || "",
    };
    setCustomers([newCustomer, ...customers]);
    setIsModalOpen(false);
    reset();
    toast("Customer added successfully!", "success");
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold font-heading text-amber-950 tracking-tight">Customers</h1>
          <p className="text-slate-500">Manage client details and order history.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-bold px-6 py-6 h-auto">
          <Plus className="mr-2 h-5 w-5" />
          Add Customer
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search by name or phone..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl bg-white border-orange-900/10 shadow-sm"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {Array.from({ length: 6 }).map((_, i) => (
             <Skeleton key={i} className="h-48 w-full rounded-2xl bg-white/60" />
           ))}
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-orange-900/10 p-12 text-center shadow-sm">
           <UsersIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
           <p className="text-slate-500 font-medium">No customers found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.map(customer => (
            <div key={customer.id} className="bg-white rounded-2xl border border-orange-900/10 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group relative overflow-hidden">
               {customer.orders > 3 && (
                 <div className="absolute top-0 right-0 bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 border-b border-l border-amber-200">
                   <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                   Frequent
                 </div>
               )}
               <h3 className="text-lg font-bold text-amber-950 font-heading mb-1">{customer.name}</h3>
               <p className="text-xs text-slate-400 font-mono mb-4">{customer.id}</p>
               
               <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{customer.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="font-bold text-blue-600">{customer.orders} Orders</span>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}

      <ModalForm 
        title="Add New Customer" 
        description="Add a new client to the bakery registry."
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); reset(); }}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        submitText="Save Customer"
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700">Full Name</label>
            <Input {...register("name")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Phone</label>
             <Input {...register("phone")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
             {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Address</label>
             <Input {...register("address")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
             {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
          </div>

          <div className="space-y-1">
             <label className="text-sm font-bold text-slate-700">Notes (Optional)</label>
             <Input {...register("notes")} className="rounded-xl border-slate-200 focus-visible:ring-blue-500" />
          </div>
        </div>
      </ModalForm>
    </div>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
