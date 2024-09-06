"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, LayoutDashboard, LogOut, Menu, PiggyBank, Search, Settings, Shield, User, Users, Vote } from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Treasury', href: '/treasury', icon: PiggyBank },
  { name: 'Voting', href: '/voting', icon: Vote },
  { name: 'Risk Control', href: '/risk-control', icon: Shield },
  { name: 'Reputation', href: '/reputation', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <PiggyBank className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">
                DAO Treasury
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? "text-foreground" : "text-foreground/60"}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar for mobile */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col space-y-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-medium"
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar for desktop */}
          <aside className="hidden w-[200px] flex-col md:flex">
            <ScrollArea className="flex-1">
              <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                  <div className="space-y-1">
                    {sidebarItems.map((item) => (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </aside>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}