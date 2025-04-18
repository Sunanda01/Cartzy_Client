import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFeaturedProducts,
  fetchProductDetails,
} from "@/store/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductFilter from "../../components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/productDetail";
import { addToCart, fetchCart } from "@/store/cart-slice";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function ShoppingListing() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const dispatch = useDispatch();
  const { productsList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const categorySearchParam = searchParams.get("category");
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItem = cartItems?.items || [];
    if (getCartItem?.length) {
      const indexOfCurrentItem = getCartItem.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItem[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getTotalStock} items can be added`);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload.success) {
        toast.success(data?.payload.msg);
        dispatch(fetchCart(user?.id));
      } else {
        toast.error(data?.payload.msg);
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  }

  function handleSort(value) {
    setSort(value);
  }

  function handleFilters(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilters);

    if (getSectionId === "CLEAR_ALL") {
      setFilters({});
      sessionStorage.removeItem("filters");
      return;
    }

    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFeaturedProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, filters, sort]);
  return (
    <>
      <Sheet open={showMobileFilter} onOpenChange={setShowMobileFilter}>
        <SheetContent side="left" className="w-[260px] sm:w-[300px]">
          <div className="mt-4 overflow-y-auto h-full">
            <ProductFilter filters={filters} handleFilters={handleFilters} />
          </div>
        </SheetContent>
      </Sheet>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 p-4 sm:p-5 md:p-6">
        <div className="hidden lg:block min-w-[200px]">
          <ProductFilter filters={filters} handleFilters={handleFilters} />
        </div>
        <div className="bg-background rounded-lg w-full shadow-sm">
          <div className="border-b p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground ">
                {productsList?.length} Products
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex justify-center gap-1"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={handleSort}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        key={sortItem.id}
                        value={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center justify-end lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileFilter(true)}
                >
                  <FilterIcon className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productsList && productsList.length > 0 ? (
              productsList.map((productList) => (
                <ShoppingProductTile
                  key={productList._id}
                  product={productList}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-10">
                No products found matching the selected filters.
              </div>
            )}
          </div>
        </div>
        <ProductDetailsDialog
          open={open}
          setOpen={setOpen}
          productDetails={productDetails}
        />
      </div>
    </>
  );
}

export default ShoppingListing;
