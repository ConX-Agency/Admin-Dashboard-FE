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
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import { AddressDropdowns, CountryInput } from "../ui/addressDropdown";
import { Country } from "@/data/shared";
import { GetCountries } from "react-country-state-city";
import { toast } from "@/hooks/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { capitalizeFirstLetter } from "@/lib/utils";

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
    const [originalPlatforms, setOriginalPlatforms] = useState<SocialMediaPlatform[]>(influencerData?.platforms || []);
    const [isPlatformsModified, setIsPlatformsModified] = useState(false);
    const [countriesList, setCountriesList] = useState<Country[]>([]);

    const {
        control,
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
        trigger
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            full_name: influencerData?.full_name || "",
            preferred_name: influencerData?.preferred_name || "",
            contact_number: influencerData?.contact_number || "",
            alt_contact_number: influencerData?.alt_contact_number || "",
            email_address: influencerData?.email_address || "",
            country: influencerData?.address?.country || "",
            state: influencerData?.address?.state || "",
            city: influencerData?.address?.city || "",
            address: influencerData?.address?.address || "",
            postcode: influencerData?.address?.postcode || "",
            status: influencerData?.status || "",
            platforms: influencerData?.platforms || [],
        },
    });


    const { fields: platformFields, append, remove, update, replace } = useFieldArray({
        control,
        name: "platforms", // Corresponds to the default value's platforms
    });

    useEffect(() => {
        if (influencerData && influencerData.platforms) {
            // Replace the field array with updated influencerData platforms
            replace(influencerData.platforms);
        }
    }, [influencerData, replace]);

    // Important to set Influencer's initial data.
    useEffect(() => {
        if (influencerData) {
            setValue("full_name", influencerData.full_name || "");
            setValue("preferred_name", influencerData.preferred_name || "");
            setValue("contact_number", influencerData.contact_number || "");
            setValue("alt_contact_number", influencerData.alt_contact_number || "");
            setValue("email_address", influencerData.email_address || "");
            setValue("country", influencerData.address?.country || "");
            setValue("state", influencerData.address?.state || "");
            setValue("city", influencerData.address?.city || "");
            setValue("address", influencerData.address?.address || "");
            setValue("postcode", influencerData.address?.postcode || "");
            setValue("status", influencerData.status || "");
            setValue("platforms", influencerData.platforms || []); // Explicitly set platforms
            replace(influencerData.platforms || []);
        }
    }, [influencerData, setValue, updateModalVisibility]);

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
        if (!updateModalVisibility) {
            if (!isPlatformsModified) {
                setValue("platforms", originalPlatforms); // Reset only if platforms weren't modified
            }
        }
    }, [updateModalVisibility, originalPlatforms, setValue, isPlatformsModified]);


    // Handle when platform is toggled.
    const handleTogglePlatform = (type: SocialMediaPlatform["platform_name"]) => {
        const existingIndex = platformFields.findIndex(
            (platform) => platform.platform_name === type
        );

        if (existingIndex !== -1) {
            // Remove the platform if it exists
            remove(existingIndex);
        } else {
            // Add a new platform
            append({
                account_id: crypto.randomUUID(),
                influencer_id: influencerData?.influencer_id || "",
                social_media_url: "",
                platform_name: type,
                audience_focus_country: "",
                platform_focus: "UGC",
                follower_count: 0,
            });
        }
    };

    const isPlatformSelected = (type: SocialMediaPlatform["platform_name"]) =>
        platformFields.some((platform) => platform.platform_name === type);

    const handleValidation = async () => {
        const isValid = await trigger();

        if (!isValid) {
            const displayErrorMessages = (fieldErrors: any) => {
                Object.values(fieldErrors).forEach((error: any) => {
                    if (error?.message) {
                        // Display error message directly
                        toast({
                            title: "Validation Error",
                            description: error.message,
                            variant: "destructive",
                            duration: 3000,
                        });
                    } else if (Array.isArray(error)) {
                        // Recursively handle arrays (e.g., platforms)
                        error.forEach((nestedError) => displayErrorMessages(nestedError));
                    } else if (typeof error === "object") {
                        // Recursively handle nested objects
                        displayErrorMessages(error);
                    }
                });
            };

            displayErrorMessages(errors); // Start processing the errors object
        }
    };

    const onSubmit = async (data: any) => {
        const updatedInfluencer: Influencer = {
            influencer_id: influencerData?.influencer_id || crypto.randomUUID(),
            full_name: data.full_name,
            preferred_name: data.preferred_name,
            contact_number: data.contact_number,
            alt_contact_number: data.alt_contact_number,
            email_address: data.email_address,
            whatsapp_consent: false,
            whatsapp_invited: false,
            community_invited: false,
            address: {
                address: data.address,
                city: data.city,
                postcode: data.postcode,
                state: data.state,
                country: data.country,
            },
            platforms: data.platforms, // Use data.platforms directly
            total_follower_count: data.platforms.reduce(
                (total: number, platform: SocialMediaPlatform) => total + platform.follower_count,
                0
            ),
            invite_count: 0,
            status: data.status,
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-4 gap-4">
                        <Input
                            className={`col-span-1 ${errors.full_name ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("full_name", {
                                required: { value: true, message: "Full Name is required." }
                            })}
                            placeholder="Full Name"
                        />
                        <Input
                            className={`col-span-1 ${errors.preferred_name ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("preferred_name", {
                                required: { value: true, message: "Preferred Name is required." }
                            })}
                            placeholder="Preferred Name"
                        />
                        <Input
                            className={`col-span-1 ${errors.contact_number ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("contact_number", {
                                required: { value: true, message: "Contact Number is required." }
                            })}
                            placeholder="Contact Number"
                        />
                        <Input
                            className={`col-span-1 ${errors.alt_contact_number ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("alt_contact_number")}
                            placeholder="Alternative Contact Number"
                        />
                        <Input
                            className={`col-span-1 ${errors.email_address ? 'border-red-500' : ''}`}
                            type="email"
                            {...register("email_address", {
                                required: { value: true, message: "Email Address is required." }
                            })}
                            placeholder="Email Address"
                        />
                        <AddressDropdowns
                            country={getValues("country")}
                            setCountry={(value) => {
                                setValue("country", value, { shouldValidate: true });
                                trigger();
                            }}
                            countryMessage="Country is required."
                            countryClassname={`${errors.country ? 'border-red-500' : ''}`}
                            countryInputName="country"
                            state={getValues("state")}
                            setState={(value) => {
                                setValue("state", value, { shouldValidate: true });
                                trigger();
                            }}
                            stateMessage="State is required."
                            stateClassname={`${errors.state ? 'border-red-500' : ''}`}
                            stateInputName="state"
                            city={getValues("city")}
                            setCity={(value) => {
                                setValue("city", value, { shouldValidate: true });
                                trigger();
                            }}
                            cityMessage="City is required."
                            cityClassname={`${errors.city ? 'border-red-500' : ''}`}
                            cityInputName="city"
                            control={control}
                        />
                        <Input
                            className={`col-span-1 ${errors.postcode ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("postcode", {
                                required: { value: true, message: "Postcode is required." }
                            })}
                            placeholder="Postcode"
                        />
                        <Input
                            className={`col-span-2 ${errors.address ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("address", {
                                required: { value: true, message: "Address is required." }
                            })}
                            placeholder="Address"
                        />
                        <Input
                            className={`col-span-1 ${errors.status ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("status")}
                            placeholder="Status"
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
                                            <label htmlFor={type}>{capitalizeFirstLetter(type)}</label>
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {platformFields.map((platform, index) => (
                            <div key={platform.id} className="mb-2">
                                <p className="capitalize ml-1 text-lg font-semibold">{platform.platform_name}</p>
                                <div className="grid grid-cols-4 gap-4">
                                    {/* Social Media URL */}
                                    <Input
                                        className={`col-span-2 ${errors.platforms?.[index]?.social_media_url ? 'border-red-500' : ''
                                            }`}
                                        type="text"
                                        placeholder="Social Media URL"
                                        {...register(`platforms.${index}.social_media_url`, {
                                            required: {
                                                value: true,
                                                message: `${capitalizeFirstLetter(platform.platform_name)}'s Social Media URL is required.`,
                                            }
                                        })}
                                    />

                                    {/* Audience Focus Country */}
                                    <CountryInput
                                        country={getValues(`platforms.${index}.audience_focus_country`)}
                                        setCountry={(value: string) => {
                                            setValue(`platforms.${index}.audience_focus_country`, value, { shouldValidate: true });
                                            trigger();
                                        }}
                                        countriesList={countriesList}
                                        className={`col-span-1 ${errors.platforms?.[index]?.audience_focus_country ? 'border-red-500' : ''}`}
                                        placeholder="Audience Focus Country"
                                        setCountryId={() => { }}
                                        input_name={`platforms.${index}.audience_focus_country`}
                                        message={`${capitalizeFirstLetter(platform.platform_name)}'s Audience Focus Country is required.`}
                                        control={control}
                                    />

                                    {/* Platform Focus */}
                                    <Input
                                        className={`col-span-1 ${errors.platforms?.[index]?.platform_focus ? 'border-red-500' : ''
                                            }`}
                                        type="text"
                                        placeholder="Platform Focus"
                                        {...register(`platforms.${index}.platform_focus`, {
                                            required: {
                                                value: true,
                                                message: `${capitalizeFirstLetter(platform.platform_name)}'s Platform Focus is required.`
                                            },
                                        })}
                                    />

                                    {/* Follower Count */}
                                    <Input
                                        className={`col-span-1 hidden ${errors.platforms?.[index]?.follower_count ? 'border-red-500' : ''
                                            }`}
                                        type="number"
                                        placeholder="Follower Count"
                                        {...register(`platforms.${index}.follower_count`, {
                                            valueAsNumber: true,
                                            required: {
                                                value: true,
                                                message: `${capitalizeFirstLetter(platform.platform_name)}'s Follower Count is required.`
                                            },
                                        })}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter className="mt-5">
                        <Button type="button" onClick={closeUpdateModal} className="bg-gray-400 hover:bg-red-600">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleValidation}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
