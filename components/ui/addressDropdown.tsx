import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { useEffect, useState } from "react";
import { AddressDropdownsProps, City, CityInputProps, Country, CountryInputProps, State, StateInputProps } from "../../data/shared";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Control, Controller } from "react-hook-form";

export const CountryInput = ({
  country,
  setCountry,
  setCountryId,
  countriesList,
  className,
  placeholder,
  control,
  message,
  input_name
}: CountryInputProps & { control: Control<any> }) => {
  return (
      <Controller
        name={input_name}// The name that matches the form field name
        control={control} // Connect with react-hook-form control
        rules={{
          required:
            { value: true, message: `${message}` }
        }} // Add validation rule
        render={({ field, fieldState }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                {...field} // Spread the Controller field here
                variant="outline"
                className={`flex justify-between items-center p-3 w-full ${className}`}
              >
                <span>{country || placeholder}</span>
                <ChevronDown className="h-5 w-5 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max overflow-y-scroll max-h-[200px]">
              <DropdownMenuRadioGroup
                value={country}
                onValueChange={(selectedCountry) => {
                  const countryData = countriesList.find((item: any) => item.name === selectedCountry);
                  setCountry(countryData?.name || "");
                  setCountryId(countryData?.id || 0);
                }}
              >
                {countriesList.map((item: any) => (
                  <DropdownMenuRadioItem key={item.id} value={item.name}>
                    {item.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
  className,
  control,
  message,
  input_name
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
        render={({ field, fieldState }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                {...field} // Spread the Controller field here
                variant="outline"
                className={`flex justify-between items-center p-3 w-full ${className}`}
                disabled={isDisabled}
              >
                <span>{state || "State"}</span>
                <ChevronDown className="h-5 w-5 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max overflow-y-scroll max-h-[200px]">
              <DropdownMenuRadioGroup
                value={state}
                onValueChange={(selectedState) => {
                  const stateData = stateList.find((item: any) => item.name === selectedState);
                  setState(stateData?.name || "");
                  setStateId(stateData?.id || 0);
                }}
              >
                {stateList.map((item: any) => (
                  <DropdownMenuRadioItem key={item.id} value={item.name}>
                    {item.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                {...field} // Spread the Controller field here
                variant="outline"
                className={`flex justify-between items-center p-3 w-full ${className}`}
                disabled={isDisabled}
              >
                <span>{city || "City"}</span>
                <ChevronDown className="h-5 w-5 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max overflow-y-scroll max-h-[200px]">
              <DropdownMenuRadioGroup
                value={city}
                onValueChange={(selectedCity) => {
                  const cityData = cityList.find((item: any) => item.name === selectedCity);
                  setCity(cityData?.name || "");
                  setCityId(cityData?.id || 0);
                }}
              >
                {cityList.map((item: any) => (
                  <DropdownMenuRadioItem key={item.id} value={item.name}>
                    {item.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
  stateClassname,
  cityClassname,
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
        className={cityClassname}
        control={control}
        message={cityMessage}
        input_name={cityInputName}
      />
    </>
  );
};
