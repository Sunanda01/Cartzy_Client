import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { useEffect,useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
import UserCartWrapper from "./cart-wrapper";
import { fetchCart } from "@/store/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location=useLocation();
  const [searchParams, setSearchParams] = useSearchParams()
  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" && getCurrentMenuItem.id !== "product" 
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes('listing') && currentFilter !== null ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)):
    navigate(getCurrentMenuItem.path);
  }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="text-sm font-medium cursor-pointer"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const [openCart, setOpenCart] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      toast.success(data?.payload.msg);
    });
  }
  useEffect(() => dispatch(fetchCart(user?.id)), [dispatch]);
  console.log(cartItems?.items, "jdhfjkdshfjhdsjf");
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
        <Button varient="outline" size="icon" onClick={() => setOpenCart(true)}>
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          setOpenCart={setOpenCart}
          cartItems={
            cartItems && cartItems?.items && cartItems?.items.length > 0
              ? cartItems?.items
              : []
          }
        />
      </Sheet>
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
          <DropdownMenuItem onClick={() => naviagte("/shop/account")}>
            <UserCog className="h-4 w-4 mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            LogOut
          </DropdownMenuItem>
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
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
