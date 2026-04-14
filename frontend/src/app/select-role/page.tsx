"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, User, UserCheck, ArrowRight, Cake } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/hooks/use-role";

export default function SelectRolePage() {
  const { setRole } = useRole();

  const selectionRoles = [
    {
      id: "super-admin",
      title: "Super Admin",
      description: "Full system access, billing, and organizational management.",
      icon: Shield,
      href: "/login?role=super-admin",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: "admin",
      title: "Bakery Admin",
      description: "Manage orders, customers, and bakery inventory.",
      icon: UserCheck,
      href: "/login?role=admin",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      id: "client",
      title: "Customer",
      description: "Browse delicious cakes and order for your special events.",
      icon: User,
      href: "/shop",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-5xl space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl mx-auto mb-6">
            <Cake className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary font-heading sm:text-5xl">
            Choose Your Sweet Perspective
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Select how you would like to experience SweetOps today.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {selectionRoles.map((role) => (
            <Card key={role.id} className="group relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-background">
              <CardHeader className="space-y-4 pb-4">
                <div className={`h-14 w-14 rounded-2xl ${role.bg} ${role.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                  <role.icon className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold">{role.title}</CardTitle>
                  <CardDescription className="text-md leading-relaxed">
                    {role.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="pt-4">
                <Button 
                  render={<Link href={role.href} />}
                  className="w-full h-12 rounded-xl text-md font-bold group-hover:bg-primary transition-all shadow-lg"
                  onClick={() => setRole(role.id as any)}
                >
                  <div className="flex items-center justify-between w-full">
                    Select Role
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
              </CardFooter>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="ghost" render={<Link href="/" />} className="text-muted-foreground hover:text-primary rounded-full px-8">
            Back to Landing Page
          </Button>
        </div>
      </div>
    </div>
  );
}
