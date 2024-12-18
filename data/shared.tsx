import { Control, UseFormRegisterReturn } from "react-hook-form";

export interface Country {
    id: number;
    name: string;
    iso3?: string;
    iso2?: string;
    numeric_code?: string;
    phone_code?: string;
    capital?: string;
    currency?: string;
    currency_name?: string;
    currency_symbol?: string;
    native?: string;
    region?: string;
    subregion?: string;
    emoji?: string;
    emojiU?: string;
    tld?: string;
    latitude?: string;
    longitude?: string;
}

export interface State {
    id: number;
    name: string;
    state_code?: string;
    latitude?: string;
    longitude?: string;
}

export interface City {
    id: number;
    name: string;
    latitude?: string;
    longitude?: string;
}

export interface CountryInputProps {
    country: string;
    setCountry: (country: string) => void;
    setCountryId: (id: number) => void;
    countriesList: Country[];
    className?: string;
    placeholder?: string;
    ref?: React.Ref<HTMLButtonElement>;
    message: string;
    input_name: string;
}

export interface StateInputProps {
    state: string;
    setState: (state: string) => void;
    setStateId: (id: number) => void;
    stateList: State[];
    className?: string;
    isDisabled: boolean;
    ref?: React.Ref<HTMLButtonElement>;
    message: string;
    input_name: string;
}

export interface CityInputProps {
    city: string;
    setCity: (city: string) => void;
    setCityId: (id: number) => void;
    cityList: City[];
    className?: string;
    isDisabled: boolean;
    ref?: React.Ref<HTMLButtonElement>;
    message: string;
    input_name: string;
}

export interface AddressDropdownsProps {
    country: string;
    setCountry: (country: string) => void;
    state: string;
    setState: (state: string) => void;
    city: string;
    setCity: (city: string) => void;
    countryMessage: string; // Customized Messages for the required validation.
    stateMessage: string;
    cityMessage: string;
    countryClassname?: string;
    stateClassname?: string;
    cityClassname?: string;
    countryPlaceholder?: string;
    countryInputName: string; //React-Hook-Form utilizes the name in the controller to set the values.
    stateInputName: string;
    cityInputName: string;
    control: Control<any>;
}