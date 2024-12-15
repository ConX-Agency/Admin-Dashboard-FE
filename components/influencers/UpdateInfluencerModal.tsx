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
import { useEffect, useState, useRef } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { AddressDropdowns, CountryInput } from "../ui/addressDropdown";
import { Country } from "@/data/shared";
import { GetCountries } from "react-country-state-city";
import { toast } from "@/hooks/use-toast";

export const UpdateInfluencerModal = ({
    influencerData,
    closeUpdateModal,
    handleUpdate,
    updateModalVisibility,
}: {
    influencerData: Influencer | null;
    closeUpdateModal: () => void;
    handleUpdate: (data: Influencer) => void;
    updateModalVisibility: boolean;
}) => {
    const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>(influencerData?.platforms || []);
    const [originalPlatforms, setOriginalPlatforms] = useState<SocialMediaPlatform[]>(influencerData?.platforms || []);
    const [country, setCountry] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [countriesList, setCountriesList] = useState<Country[]>([]);

    // References for form fields
    const fullNameRef = useRef<HTMLInputElement>(null);
    const preferredNameRef = useRef<HTMLInputElement>(null);
    const contactNumberRef = useRef<HTMLInputElement>(null);
    const altContactNumberRef = useRef<HTMLInputElement>(null);
    const emailAddressRef = useRef<HTMLInputElement>(null);
    const countryRef = country;
    const cityRef = city;
    const stateRef = state;
    const addressRef = useRef<HTMLInputElement>(null);
    const postcodeRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);

    // Fetching the countries list
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countries = await GetCountries();
                setCountriesList(countries);
            } catch (error) {
                console.error("Failed to fetch countries", error);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        //Important for triggering setting the Influencer Platforms' Data.
        if (influencerData?.platforms) {
            setPlatforms(influencerData.platforms);
            setOriginalPlatforms(influencerData.platforms);
        }

        //Important for triggering setting the Country, State, City Data.
        if (influencerData?.address) {
            const { country, state, city } = influencerData.address;
            setCountry(country || "");
            setState(state || "");
            setCity(city || "");
        }
    }, [influencerData]);

    useEffect(() => {
        // Reset platforms when modal is closed
        if (!updateModalVisibility) {
            setPlatforms(originalPlatforms);
        }
    }, [updateModalVisibility, originalPlatforms]);

    const handleTogglePlatform = (type: SocialMediaPlatform["platform_name"]) => {
        setPlatforms((prevPlatforms) => {
            const existingPlatform = prevPlatforms.find((platform) => platform.platform_name === type);
            if (existingPlatform) {
                // Remove platform if it already exists
                return prevPlatforms.filter((platform) => platform.platform_name !== type);
            } else {
                // Add platform if it doesn't exist
                return [
                    ...prevPlatforms,
                    {
                        account_id: crypto.randomUUID(),
                        influencer_id: influencerData?.influencer_id || "",
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

    const validateInputs = (): { error: boolean; message: string } => {
        const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

        const inputRefs = [
            { ref: fullNameRef, name: "Full Name" },
            { ref: preferredNameRef, name: "Preferred Name" },
            { ref: contactNumberRef, name: "Contact Number" },
            { ref: emailAddressRef, name: "Email Address" },
            { ref: addressRef, name: "Address" },
            { ref: postcodeRef, name: "Postcode" },
        ];

        const missingFields: string[] = [];
    
        // Validate inputRefs
        inputRefs.forEach(({ ref, name }) => {
            if (!ref.current || !ref.current.value.trim()) {
                missingFields.push(name);
            }
        });
    
        // Validate country
        if (!country.trim()) missingFields.push("Country");

        // Validate platform fields
        platforms.forEach((platform) => {
            const platformName = capitalizeFirstLetter(platform.platform_name);
    
            if (!platform.social_media_url.trim()) {
                missingFields.push(`${platformName}'s Social Media URL`);
            }
            if (!platform.audience_focus_country.trim()) {
                missingFields.push(`${platformName}'s Audience Focus Country`);
            }
        });

        if (missingFields.length > 0) {
            return {
                error: true,
                message: `Missing fields: ${missingFields.join(", ")}`,
            };
        }
    
        return { error: false, message: "" };
    };

    const handleSave = () => {
        //Validate input if there's any errors.
        const { error, message } = validateInputs();

        if (error) {
            toast({
                title: "Validation Error",
                description: message,
                variant: "destructive",
                duration: 3000
            });
            return; // Stop execution if validation fails
        }
        
        //Handle Update if there's no errors.
        const address = {
            address: addressRef.current?.value as string,
            city: city,
            postcode: postcodeRef.current?.value as string,
            state: state,
            country: country
        };

        const updatedPlatforms = platforms.map((platform) => ({
            ...platform,
            audience_focus_country: platform.audience_focus_country,
            platform_focus: platform.platform_focus,
            follower_count: platform.follower_count,
        }));

        const updatedInfluencer: Influencer = {
            influencer_id: influencerData?.influencer_id || crypto.randomUUID(),
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
            invite_count: 0,
            status: statusRef.current?.value as string
        };

        handleUpdate(updatedInfluencer);
        closeUpdateModal();
    };

    return (
        <Dialog open={updateModalVisibility}>
            <DialogContent
                className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                    md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px] max-h-[550px] overflow-y-scroll"
                onEscapeKeyDown={closeUpdateModal} modalTopRightClose={closeUpdateModal}
            >
                <DialogHeader>
                    <DialogTitle>Editing {influencerData?.full_name}'s Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to the influencer's profile here. Click save changes when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-4">
                    <Input
                        className="col-span-1"
                        type="text"
                        ref={fullNameRef}
                        id="full_name"
                        placeholder="Full Name"
                        defaultValue={influencerData?.full_name}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        ref={preferredNameRef}
                        id="preferred_name"
                        placeholder="Preferred Name"
                        defaultValue={influencerData?.preferred_name}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        ref={contactNumberRef}
                        id="contact_number"
                        placeholder="Contact Number"
                        defaultValue={influencerData?.contact_number}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        ref={altContactNumberRef}
                        id="alt_contact_number"
                        placeholder="Alternative Contact Number"
                        defaultValue={influencerData?.alt_contact_number}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="email"
                        ref={emailAddressRef}
                        id="email_address"
                        placeholder="Email Address"
                        defaultValue={influencerData?.email_address}
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
                        ref={postcodeRef}
                        id="postcode"
                        placeholder="Postcode"
                        defaultValue={influencerData?.address.postcode}
                        required
                    />
                    <Input
                        className="col-span-2"
                        type="text"
                        ref={addressRef}
                        id="address"
                        placeholder="Address"
                        defaultValue={influencerData?.address.address}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        ref={statusRef}
                        id="status"
                        placeholder="Status"
                        defaultValue={influencerData?.status}
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
                                        <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {platforms.map((platform) => (
                        <div key={platform.platform_name} className="mb-2">
                            <p className="capitalize ml-1 text-lg font-semibold">{platform.platform_name}</p>
                            <div className="grid grid-cols-4 gap-4">
                                <Input
                                    className="col-span-2"
                                    type="text"
                                    id={`social_media_url-${platform.platform_name}`}
                                    placeholder="Social Media URL"
                                    defaultValue={platform.social_media_url}
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
                                    defaultValue={platform.platform_focus}
                                    required
                                />
                                <Input
                                    className="col-span-1 hidden"
                                    type="text"
                                    id={`follower-count-${platform.platform_name}`}
                                    placeholder="Follower Count"
                                    defaultValue={platform.follower_count}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={closeUpdateModal} className="bg-gray-400 hover:bg-red-600">
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
