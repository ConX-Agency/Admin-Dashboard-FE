export interface Country {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    native: string;
    region: string;
    subregion: string;
    emoji: string;
    emojiU: string;
    tld: string;
    latitude: string;
    longitude: string;
}

export interface State {
    id: number;
    name: string;
    state_code: string;
    latitude: string;
    longitude: string;
}

export interface City {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
}

export interface CountryInputProps {
    country: string;
    setCountry: (country: string) => void;
    setCountryId: (id: number) => void;
    countriesList: Country[];
    inputId: string;
    className?: string;
    placeholder?: string;
    ref?: React.Ref<HTMLButtonElement>;
}

export interface StateInputProps {
    state: string;
    setState: (state: string) => void;
    setStateId: (id: number) => void;
    stateList: State[];
    inputId: string;
    className?: string;
    isDisabled: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}

export interface CityInputProps {
    city: string;
    setCity: (city: string) => void;
    setCityId: (id: number) => void;
    cityList: City[];
    inputId: string;
    className?: string;
    isDisabled: boolean;
    ref?: React.Ref<HTMLButtonElement>;
}

export interface AddressDropdownsProps {
    countryInputId: string;
    stateInputId: string;
    cityInputId: string;
    countryClassname?: string;
    stateClassname?: string;
    cityClassname?: string;
    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    countryPlaceholder?: string;
}