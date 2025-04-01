import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "sonner";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          className="text-sm font-medium"
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const {user}=useSelector((state)=>state.auth);
  const naviagte=useNavigate();
  const dispatch=useDispatch();
  function handleLogout(){
    dispatch(logoutUser()).then((data)=>{toast.success(data?.payload.msg)});
  }
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Button varient="outline" size="icon">
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">User Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black flex items-center justify-center">
            <AvatarFallback className="font-extrabold text-white bg-black flex items-center">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuLabel>Logged In As {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>naviagte('/auth/logout')}><UserCog className="h-4 w-4 mr-2"/>Account</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}><LogOut className="h-4 w-4 mr-2"/>LogOut</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky bg-background top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        <Link to="/shop/home" className="flex gap-2 items-center">
          <HousePlug className="w-6 h-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" varient="outline" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs flex flex-col">
            <MenuItems />
            <div>
            <HeaderRightContent/>
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
          <div className="hidden lg:block">
            <HeaderRightContent/>
          </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
