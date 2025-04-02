import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFeaturedProducts, fetchProductDetails } from "@/store/product-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductFilter from "../../components/shopping-view/filter";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productsList,productDetails } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams,setSearchParams]=useSearchParams();

  function handleGetProductDetails(getCurrentProductId){
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function createSearchParamsHelper(filterParams){
    const queryParams=[];
    for(const[key,value] of Object.entries(filterParams)){
      if(Array.isArray(value) && value.length>0 ){
        const paramValue=value.join(',')
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    console.log(queryParams,'qp');
    return queryParams.join('&');
  }

  function handleSort(value){
    setSort(value);
  }

   function handleFilters(getSectionId,getCurrentOption) {
    console.log(getSectionId,getCurrentOption); 
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
    console.log(cpyFilters);
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  useEffect(()=>{setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  },[])

useEffect(()=>{
  if(filters && Object.keys(filters).length > 0){
    const createQueryString=createSearchParamsHelper(filters)
    setSearchParams(new URLSearchParams(createQueryString))
  }
},[filters])

  useEffect(() => {
    if(filters !== null && sort!==null)
    dispatch(fetchAllFeaturedProducts({filterParams:filters,sortParams:sort}));
  }, [dispatch,filters,sort]);

  console.log(filters,searchParams,productDetails )   
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilters={handleFilters}/>
      <div className="bg-background rounded-lg w-full shadow-sm">
        <div className="border-b p-4 flex items-center justify-between ">
          <h2 className="text-lg font-semibold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground ">{productsList?.length} Products</span>
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
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productsList && productsList.length > 0
            ? productsList.map((productList) => (
                <ShoppingProductTile product={productList} handleGetProductDetails={handleGetProductDetails} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
