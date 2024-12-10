import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { useEffect, useState } from "react";
import { AddressDropdownsProps, City, CityInputProps, Country, CountryInputProps, State, StateInputProps } from "../../data/shared"; // Assuming interfaces are imported
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export const CountryInput = ({
  country,
  setCountry,
  setCountryId,
  countriesList,
  inputId,
  className,
  placeholder
}: CountryInputProps) => {
  return (
    <div id={inputId}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={`flex justify-between items-center p-3 w-full ${className}}`}>
            <span>{country || placeholder}</span>
            <ChevronDown className="h-5 w-5 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-max overflow-y-scroll max-h-[200px]">
          <DropdownMenuRadioGroup
            value={country}
            onValueChange={(selectedCountry) => {
              const countryData = countriesList.find((item) => item.name === selectedCountry);
              setCountry(countryData?.name || ""); // Ensure the setter is called with a string value
              setCountryId(countryData?.id || 0); // Updating countryId as well
            }}
          >
            {countriesList.map((item) => (
              <DropdownMenuRadioItem key={item.id} value={item.name}>
                {item.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const StateInput = ({
  state,
  setState,
  setStateId,
  stateList,
  isDisabled,
  inputId,
  className
}: StateInputProps) => {
  return (
    <div id={inputId}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
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
              const stateData = stateList.find((item) => item.name === selectedState);
              setState(stateData?.name || "");
              setStateId(stateData?.id || 0);
            }}
          >
            {stateList.map((item) => (
              <DropdownMenuRadioItem key={item.id} value={item.name}>
                {item.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const CityInput = ({
  city,
  setCity,
  setCityId,
  cityList,
  isDisabled,
  inputId,
  className
}: CityInputProps) => {
  return (
    <div id={inputId}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
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
              const cityData = cityList.find((item) => item.name === selectedCity);
              setCity(cityData?.name || "");
              setCityId(cityData?.id || 0);
            }}
          >
            {cityList.map((item) => (
              <DropdownMenuRadioItem key={item.id} value={item.name}>
                {item.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const AddressDropdowns = ({
  countryInputId,
  stateInputId,
  cityInputId,
  countryClassname,
  stateClassname,
  cityClassname,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  countryPlaceholder
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
        setState("");
        setStateId(0);
        setCity("");
        setCityId(0);
        setCityList([]);
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
        setCity("");
        setCityId(0);
      };
      fetchCities();
    }
  }, [stateId]);

  return (
    <>
      <CountryInput
        country={country}
        setCountry={setCountry}
        setCountryId={setCountryId}
        countriesList={countriesList}
        inputId={countryInputId}
        className={countryClassname}
        placeholder={countryPlaceholder || "Country"}
      />
      <StateInput
        state={state}
        setState={setState}
        setStateId={setStateId}
        stateList={stateList}
        isDisabled={!stateList.length}
        inputId={stateInputId}
        className={stateClassname}
      />
      <CityInput
        city={city}
        setCity={setCity}
        setCityId={setCityId}
        cityList={cityList}
        isDisabled={!cityList.length}
        inputId={cityInputId}
        className={cityClassname}
      />
    </>
  );
};
