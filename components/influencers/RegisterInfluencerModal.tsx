import { Influencer, SocialMediaPlatform } from "@/data/influencer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useRef, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { AddressDropdowns, CountryInput } from "../ui/addressDropdown";
import { GetCountries } from "react-country-state-city";
import { Country } from "@/data/shared";

export const RegisterInfluencerModal = ({
    closeRegisterModal,
    handleRegister,
    registerModalVisibility,
}: {
    closeRegisterModal: () => void;
    handleRegister: (data: Influencer) => void;
    registerModalVisibility: boolean;
}) => {
    const initialPlatforms: SocialMediaPlatform[] = []; // Default empty or initial state

    const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>(initialPlatforms);
    const [country, setCountry] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [countriesList, setCountriesList] = useState<Country[]>([]);

    const fullNameRef = useRef<HTMLInputElement>(null);
    const preferredNameRef = useRef<HTMLInputElement>(null);
    const contactNumberRef = useRef<HTMLInputElement>(null);
    const altContactNumberRef = useRef<HTMLInputElement>(null);
    const emailAddressRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postcodeRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);

    //Get the Countries List.
    useEffect(() => {
        const fetchCountries = async () => {
            const countries = await GetCountries();
            setCountriesList(countries);
        };
        fetchCountries();
    }, []);

    // Reset platforms when modal visibility changes to closed
    useEffect(() => {
        if (!registerModalVisibility) {
            setPlatforms(initialPlatforms);
        }
    }, [registerModalVisibility]);

    const handleTogglePlatform = (type: SocialMediaPlatform["platform_name"]) => {
        setPlatforms((prevPlatforms) => {
            const existingPlatform = prevPlatforms.find((platform) => platform.platform_name === type);
            if (existingPlatform) {
                return prevPlatforms.filter((platform) => platform.platform_name !== type);
            } else {
                return [
                    ...prevPlatforms,
                    {
                        account_id: crypto.randomUUID(),
                        influencer_id: crypto.randomUUID(),
                        social_media_url: "",
                        platform_name: type,
                        audience_focus_country: "",
                        platform_focus: "UGC",
                        follower_count: 0,
                    },
                ];
            }
        });
    };

    const isPlatformSelected = (type: SocialMediaPlatform["platform_name"]) =>
        platforms.some((platform) => platform.platform_name === type);

    const handleSave = () => {
        const address = {
            address: addressRef.current?.value as string,
            city: cityRef.current?.value as string,
            postcode: postcodeRef.current?.value as string,
            state: stateRef.current?.value as string,
            country: countryRef.current?.value as string,
        };

        const updatedPlatforms = platforms.map((platform) => ({
            ...platform,
            audience_focus_country: platform.audience_focus_country,
            platform_focus: platform.platform_focus,
            follower_count: 1000,
        }));

        const newInfluencer: Influencer = {
            influencer_id: crypto.randomUUID(),
            full_name: fullNameRef.current?.value as string,
            preferred_name: preferredNameRef.current?.value as string,
            contact_number: contactNumberRef.current?.value as string,
            alt_contact_number: altContactNumberRef.current?.value as string,
            email_address: emailAddressRef.current?.value as string,
            whatsapp_consent: false,
            whatsapp_invited: false,
            community_invited: false,
            address,
            platforms: updatedPlatforms,
            total_follower_count: updatedPlatforms.reduce(
                (total, platform) => total + platform.follower_count,
                0
            ),
            invite_count: 0
        };

        handleRegister(newInfluencer);
        closeRegisterModal();
    };

    return (
        <Dialog open={registerModalVisibility}>
            <DialogContent
                className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                    md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px] max-h-[550px] overflow-y-scroll"
                onEscapeKeyDown={closeRegisterModal}
            >
                <DialogHeader>
                    <DialogTitle>Register New Influencer</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new influencer.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-4">
                    <Input
                        className="col-span-1"
                        type="text"
                        id="full_name"
                        placeholder="Full Name"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="preferred_name"
                        placeholder="Preferred Name"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="contact_number"
                        placeholder="Contact Number"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="alt_contact_number"
                        placeholder="Alternative Contact Number"
                    />
                    <Input
                        className="col-span-1"
                        type="email"
                        id="email_address"
                        placeholder="Email Address"
                        required
                    />
                    <AddressDropdowns
                        countryInputId="country"
                        stateInputId="state"
                        cityInputId="city"
                        country={country}
                        setCountry={setCountry}
                        state={state}
                        setState={setState}
                        city={city}
                        setCity={setCity}
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="postcode"
                        placeholder="Postcode"
                        required
                    />
                    <Input
                        className="col-span-2"
                        type="text"
                        id="address"
                        placeholder="Address"
                        required
                    />
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col w-full gap-4">
                    <div className="w-full justify-end flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="dark:bg-neutral-800 bg-neutral-300 hover:bg-neutral-300/75 dark:hover:bg-neutral-800/75">
                                    Add Platform <PlusIcon className="w-4 h-4 ml-2 flex-shrink-0" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {["instagram", "tiktok", "youtube", "RED"].map((type) => (
                                    <DropdownMenuCheckboxItem
                                        key={type}
                                        checked={isPlatformSelected(type as SocialMediaPlatform["platform_name"])}
                                        onSelect={() => handleTogglePlatform(type as SocialMediaPlatform["platform_name"])}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {platforms.map((platform) => (
                        <div key={platform.platform_name} className="mb-2">
                            <p className="capitalize ml-1 text-lg font-semibold mb-2">{platform.platform_name}</p>
                            <div className="grid grid-cols-4 gap-4">
                                <Input
                                    className="col-span-2"
                                    type="text"
                                    id={`social_media_url-${platform.platform_name}`}
                                    placeholder="Social Media URL"
                                    required
                                />
                                <CountryInput
                                    country={platform.audience_focus_country}
                                    setCountry={(value) => {
                                        setPlatforms((prev) =>
                                            prev.map((plat) =>
                                                plat.platform_name === platform.platform_name
                                                    ? { ...plat, audience_focus_country: value }
                                                    : plat
                                            )
                                        );
                                    }}
                                    setCountryId={() => { }}
                                    countriesList={countriesList}
                                    inputId={`audience-focus-country-${platform.platform_name}`}
                                    className="col-span-1"
                                    placeholder="Audience Focus Country"
                                />
                                <Input
                                    className="col-span-1"
                                    type="text"
                                    id={`platform-focus-${platform.platform_name}`}
                                    placeholder="Platform Focus"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={closeRegisterModal} className="bg-gray-400 hover:bg-gray-500">
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Register</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
