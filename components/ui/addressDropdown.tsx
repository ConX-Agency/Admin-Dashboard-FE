import React, { useState } from "react";
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu"; // Adjust the import paths for your project
import { Button } from "../ui/button";

interface AddressDropdownProps {
  type: "country" | "state" | "city";
  label: string;
  onSelect: (value: any) => void;
  countryId?: number; // Required for states and cities
  stateId?: number; // Required for cities
}

const AddressDropdown = ({
  type,
  label,
  onSelect,
  countryId,
  stateId,
}: AddressDropdownProps) => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleSelection = (item: any) => {
    setSelectedItem(item.name); // Update the label with the selected name
    onSelect(item);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedItem || `Select ${label}`}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {type === "country" && (
          <CountrySelect
            onChange={(e) => handleSelection(e)}
            placeHolder={`Select ${label}`}
          />
        )}
        {type === "state" && countryId && (
          <StateSelect
            countryid={countryId}
            onChange={(e) => handleSelection(e)}
            placeHolder={`Select ${label}`}
          />
        )}
        {type === "city" && countryId && stateId && (
          <CitySelect
            countryid={countryId}
            stateid={stateId}
            onChange={(e) => handleSelection(e)}
            placeHolder={`Select ${label}`}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AddressDropdown };
