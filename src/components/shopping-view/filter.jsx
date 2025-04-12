import { filterOptions } from "@/config";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React, { Fragment } from "react";
import { Separator } from "@/components/ui/separator";

function ProductFilter({ filters, handleFilters }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem.toUpperCase()}</h3>
            </div>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyItem].map((options) => (
                <Label
                  className="flex items-center gap-2 font-medium"
                  key={options.id}
                >
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(options.id) > -1
                    }
                    key={options.id}
                    onCheckedChange={() => handleFilters(keyItem, options.id)}
                  />
                  {options.label}
                </Label>
              ))}
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
