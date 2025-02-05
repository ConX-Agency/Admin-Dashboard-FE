import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { useEffect, useState } from "react";
import { AddressDropdownsProps, City, CityInputProps, Country, CountryInputProps, State, StateInputProps } from "../../data/shared";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Control, Controller } from "react-hook-form";
import { Label } from "./label";

export const CountryInput = ({
  country,
  setCountry,
  setCountryId,
  countriesList,
  span,
  className,
  placeholder,
  control,
  message,
  input_name,
}: CountryInputProps & { control: Control<any> }) => {
  return (
    <Controller
      name={input_name} // The name that matches the form field name
      control={control} // Connect with react-hook-form control
      rules={{
        required: {
          value: true,
          message: `${message}`,
        },
      }} // Add validation rule
      render={({ field }) => (
        <div className={`flex flex-col ${span}`}>
          <Label htmlFor={input_name} className="mb-1 text-xs ml-1 text-neutral-500">
            Country
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`flex justify-between items-center p-3 w-full bg-white dark:bg-neutral-950 ${className}`}
              >
                <span className="truncate">{country || placeholder}</span>
                <ChevronDown className="h-5 w-5 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] overflow-y-scroll max-h-[200px]" align="start">
              {countriesList.map((item: any) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => {
                    const selectedCountry = countriesList.find(
                      (countryItem) => countryItem.name === item.name
                    );
                    setCountry(selectedCountry?.name || "");
                    setCountryId(selectedCountry?.id || 0);
                    field.onChange(selectedCountry?.name || ""); // Update field value
                  }}
                  className="cursor-pointer"
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    />
  );
};


const StateInput = ({
  state,
  setState,
  setStateId,
  stateList,
  isDisabled,
  span,
  className,
  control,
  message,
  input_name,
}: StateInputProps & { control: Control<any> }) => {
  return (
    <Controller
      name={input_name} // The name that matches the form field name
      control={control} // Connect with react-hook-form control
      rules={{
        validate: (value) => {
          if (isDisabled) return true; // Skip validation if disabled
          return value ? true : `${message}`;
        },
      }}
      render={({ field }) => (
        <div className={`flex flex-col ${span}`}>
          <Label htmlFor={input_name} className="mb-1 text-xs ml-1 text-neutral-500">
            State
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`flex justify-between items-center p-3 w-full bg-white dark:bg-neutral-950 ${className}`}
                disabled={isDisabled}
              >
                <span className="truncate">{state || "State"}</span>
                <ChevronDown className="h-5 w-5 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] overflow-y-scroll max-h-[200px]" align="start">
              {stateList.map((item: any) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => {
                    const selectedState = stateList.find(
                      (stateItem) => stateItem.name === item.name
                    );
                    setState(selectedState?.name || "");
                    setStateId(selectedState?.id || 0);
                    field.onChange(selectedState?.name || ""); // Update field value
                  }}
                  className="cursor-pointer"
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    />
  );
};


const CityInput = ({
  city,
  setCity,
  setCityId,
  cityList,
  isDisabled,
  span,
  className,
  control,
  message,
  input_name
}: CityInputProps & { control: Control<any> }) => {
  return (
    <Controller
      name={input_name} // The name that matches the form field name
      control={control} // Connect with react-hook-form control
      rules={{
        validate: (value) => {
          if (isDisabled) return true; // Skip validation if disabled
          return value ? true : `${message}`;
        },
      }}
      render={({ field, fieldState }) => (
        <div className={`flex flex-col ${span}`}>
          <Label htmlFor={input_name} className="mb-1 text-xs ml-1 text-neutral-500">
            City
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                {...field} // Spread the Controller field here
                variant="outline"
                className={`flex justify-between items-center p-3 w-full bg-white dark:bg-neutral-950 ${className}`}
                disabled={isDisabled}
              >
                <span className="truncate">{city || "City"}</span>
                <ChevronDown className="h-5 w-5 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] overflow-y-scroll max-h-[200px]" align="start">
              {cityList.map((item: any) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => {
                    const selectedCity = cityList.find(
                      (cityItem) => cityItem.name === item.name
                    );
                    setCity(selectedCity?.name || "");
                    setCityId(selectedCity?.id || 0);
                    field.onChange(selectedCity?.name || ""); // Update field value
                  }}
                  className="cursor-pointer"
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    />
  );
};

export const AddressDropdowns = ({
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  countryMessage,
  stateMessage,
  cityMessage,
  countryClassname,
  countrySpan,
  stateClassname,
  stateSpan,
  cityClassname,
  citySpan,
  countryPlaceholder,
  countryInputName,
  stateInputName,
  cityInputName,
  control,
}: AddressDropdownsProps) => {
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);

  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [stateList, setStateList] = useState<State[]>([]);
  const [cityList, setCityList] = useState<City[]>([]);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await GetCountries();
      setCountriesList(countries);
    };
    fetchCountries();
  }, []);

  // Fetch states
  useEffect(() => {
    if (countryId) {
      const fetchStates = async () => {
        const states = await GetState(countryId);
        setStateList(states);
        setState(""); // Reset state when country changes
        setStateId(0);
        setCity(""); // Reset city when state changes
        setCityId(0);
        setCityList([]); // Reset city list
      };
      fetchStates();
    }
  }, [countryId]);

  // Fetch cities
  useEffect(() => {
    if (stateId) {
      const fetchCities = async () => {
        const cities = await GetCity(countryId, stateId);
        setCityList(cities);
        setCity(""); // Reset city when state changes
        setCityId(0);
      };
      fetchCities();
    }
  }, [stateId]);

  // Handle country change
  const handleCountryChange = (newCountry: string, newCountryId: number) => {
    setCountry(newCountry); // Update the parent component's state
    setCountryId(newCountryId); // Set the countryId for fetching states
    setState(""); // Reset state and city when country changes
    setStateId(0);
    setCity(""); // Reset city when country changes
    setCityId(0);
    setCityList([]); // Clear city list on country change
  };

  // Handle state change
  const handleStateChange = (newState: string, newStateId: number) => {
    setState(newState); // Update the parent component's state
    setStateId(newStateId); // Set the stateId for fetching cities
    setCity(""); // Reset city when state changes
    setCityId(0);
  };

  // Handle city change
  const handleCityChange = (newCity: string, newCityId: number) => {
    setCity(newCity); // Update the parent component's state
    setCityId(newCityId);
  };

  return (
    <>
      <CountryInput
        country={country}
        setCountry={(newCountry: Country["name"]) => handleCountryChange(newCountry, countryId)}
        setCountryId={setCountryId}
        countriesList={countriesList}
        span={countrySpan}
        className={countryClassname}
        placeholder={countryPlaceholder || "Country"}
        control={control}
        message={countryMessage}
        input_name={countryInputName}
      />
      <StateInput
        state={state}
        setState={(newState: State["name"]) => handleStateChange(newState, stateId)}
        setStateId={setStateId}
        stateList={stateList}
        isDisabled={!stateList.length}
        span={stateSpan}
        className={stateClassname}
        control={control}
        message={stateMessage}
        input_name={stateInputName}
      />
      <CityInput
        city={city}
        setCity={(newCity: City["name"]) => handleCityChange(newCity, cityId)}
        setCityId={setCityId}
        cityList={cityList}
        isDisabled={!cityList.length}
        span={citySpan}
        className={cityClassname}
        control={control}
        message={cityMessage}
        input_name={cityInputName}
      />
    </>
  );
};
