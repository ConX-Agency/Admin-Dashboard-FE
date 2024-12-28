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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, PlusIcon } from "lucide-react";
import { AddressDropdowns, CountryInput } from "../ui/addressDropdown";
import { GetCountries } from "react-country-state-city";
import { Country } from "@/data/shared";
import { toast } from "@/hooks/use-toast";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ddPlatformFocusValues, ddSocialMediaPlatformsValues } from "@/data/dropdown-values";
import { Checkbox } from "../ui/checkbox";

export const RegisterInfluencerModal = ({
    closeRegisterModal,
    handleRegister,
    registerModalVisibility,
}: {
    closeRegisterModal: () => void;
    handleRegister: (data: Influencer) => void;
    registerModalVisibility: boolean;
}) => {
    const initialPlatforms: SocialMediaPlatform[] = [];

    const [countriesList, setCountriesList] = useState<Country[]>([]);

    const {
        control,
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
        clearErrors,
        trigger,
        reset,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            full_name: "",
            preferred_name: "",
            contact_number: "",
            alt_contact_number: "",
            email_address: "",
            country: "",
            state: "",
            city: "",
            address: "",
            postcode: "",
            tnc_consent: false,
            whatsapp_consent: false,
            status: "",
            platforms: initialPlatforms,
        },
    });

    const { fields: platformFields, append, remove } = useFieldArray({
        control,
        name: "platforms", // Corresponds to the default value's platforms
    });

    //Get the Countries List.
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

    // Reset platforms when modal visibility changes to closed
    useEffect(() => {
        if (!registerModalVisibility) {
            clearErrors();
            reset();
        }
    }, [registerModalVisibility, setValue]);

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
                influencer_id: crypto.randomUUID(),
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
                        toast({
                            title: "Validation Error",
                            description: error.message,
                            variant: "destructive",
                            duration: 3000,
                        });
                    } else if (Array.isArray(error)) {
                        error.forEach((nestedError) => displayErrorMessages(nestedError));
                    } else if (typeof error === "object") {
                        displayErrorMessages(error);
                    }
                });
            };

            displayErrorMessages(errors); // Start processing the errors object
        }
    };

    const handleSocMedValidation = () => {
        if (platformFields.length === 0) {
            toast({
                title: "Validation Error",
                description: "Please provide at least one Social Media Platform.",
                variant: "destructive",
                duration: 3000,
            });
            return false;
        }

        return true;
    }

    const onSubmit = async (data: any) => {
        // Stop Form Submission when Validation Fails.
        const isValid = handleSocMedValidation();
        if (!isValid) return;

        const newInfluencer: Influencer = {
            influencer_id: crypto.randomUUID(),
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
            tnc_consent: data.tnc_consent,
            status: "Pending Approval",
        };

        handleRegister(newInfluencer);
        reset();
        closeRegisterModal();
    };

    return (
        <Dialog open={registerModalVisibility}>
            <DialogContent
                className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                    md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px] max-h-[550px] overflow-y-scroll"
                onEscapeKeyDown={closeRegisterModal} modalTopRightClose={closeRegisterModal}
            >
                <DialogHeader>
                    <DialogTitle>Register New Influencer</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new influencer.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid xxxs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        <Input
                            className={`col-span-2 ${errors.full_name ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("full_name", {
                                required: { value: true, message: "Full Name is required." }
                            })}
                            placeholder="Full Name"
                        />
                        <Input
                            className={`col-span-2 ${errors.preferred_name ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("preferred_name", {
                                required: { value: true, message: "Preferred Name is required." }
                            })}
                            placeholder="Preferred Name"
                        />
                        <Input
                            className={`col-span-2 ${errors.contact_number ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("contact_number", {
                                required: { 
                                    value: true, 
                                    message: "Contact Number is required." 
                                },
                                pattern: {
                                    value: /^\+\d{1,4}\d{7,15}$/,
                                    message: "Contact Number must include country code and be digits only.",
                                },
                                minLength: {
                                    value: 8,
                                    message: "Contact Number must be at least 8 digits.",
                                },
                                maxLength: {
                                    value: 19, // + (1-4 country code) + (7-15 phone number)
                                    message: "Contact Number must not exceed 19 digits.",
                                },
                            })}
                            placeholder="Contact Number (+1234567890)"
                        />
                        <Input
                            className={`col-span-2 ${errors.alt_contact_number ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("alt_contact_number", {
                                pattern: {
                                    value: /^\+\d{1,4}\d{7,15}$/,
                                    message: "Alternative Contact Number must include country code and be digits only.",
                                },
                                minLength: {
                                    value: 8,
                                    message: "Alternative Contact Number must be at least 8 digits.",
                                },
                                maxLength: {
                                    value: 19, // + (1-4 country code) + (7-15 phone number)
                                    message: "Alternative Contact Number must not exceed 19 digits.",
                                },
                            })}
                            placeholder="Alt Contact Number (+1234567890)"
                        />
                        <Input
                            className={`col-span-2 ${errors.email_address ? 'border-red-500' : ''}`}
                            type="email"
                            {...register("email_address", {
                                required: { 
                                    value: true, 
                                    message: "Email Address is required." 
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Value provided does not match email format."
                                }
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
                            countryClassname={`xxxs:col-span-1 md:col-span-2 ${errors.country ? 'border-red-500' : ''}`}
                            countryInputName="country"
                            state={getValues("state")}
                            setState={(value) => {
                                setValue("state", value, { shouldValidate: true });
                                trigger();
                            }}
                            stateMessage="State is required."
                            stateClassname={`xxxs:col-span-1 md:col-span-2 ${errors.state ? 'border-red-500' : ''}`}
                            stateInputName="state"
                            city={getValues("city")}
                            setCity={(value) => {
                                setValue("city", value, { shouldValidate: true });
                                trigger();
                            }}
                            cityMessage="City is required."
                            cityClassname={`xxxs:col-span-1 md:col-span-2 ${errors.city ? 'border-red-500' : ''}`}
                            cityInputName="city"
                            control={control}
                        />
                        <Input
                            className={`xxxs:col-span-1 lg:col-span-2 ${errors.postcode ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("postcode", {
                                required: {
                                    value: true,
                                    message: `Postcode is required.`
                                },
                                minLength: {
                                    value: 4,
                                    message: `Postcode must be at least 4 numbers.`,
                                },
                                maxLength: {
                                    value: 6,
                                    message: `Postcode must be no more than 6 numbers.`,
                                },
                                pattern: {
                                    value: /^\d+$/,
                                    message: `Postcode must contain numbers only.`,
                                },
                            })}
                            placeholder="Postcode"
                        />
                        <Input
                            className={`xxxs:col-span-2 md:col-span-3 lg:col-span-4 ${errors.address ? 'border-red-500' : ''}`}
                            type="text"
                            {...register("address", {
                                required: { value: true, message: "Address is required." }
                            })}
                            placeholder="Address"
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
                                    {ddSocialMediaPlatformsValues.map((type) => (
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
                            <div key={platform.id} className="mb-0">
                                <p className="capitalize ml-1 text-lg font-semibold">{platform.platform_name}</p>
                                <div className="grid xxxs:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                            },
                                            pattern: {
                                                value: /^(https?:\/\/)?(www\.)?(youtube\.com|tiktok\.com|xiaohongshu\.com|instagram\.com)(\/.*)?$/,
                                                message: `${capitalizeFirstLetter(platform.platform_name)}'s Social Media URL must be from YouTube, TikTok, XiaoHongShu, or Instagram.`,
                                            },
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
                                        className={`xxxs:col-span-2 sm:col-span-1 ${errors.platforms?.[index]?.audience_focus_country ? 'border-red-500' : ''}`}
                                        placeholder="Audience Focus Country"
                                        setCountryId={() => { }}
                                        input_name={`platforms.${index}.audience_focus_country`}
                                        message={`${capitalizeFirstLetter(platform.platform_name)}'s Audience Focus Country is required.`}
                                        control={control}
                                    />

                                    {/* Platform Focus */}
                                    <Controller
                                        name={`platforms.${index}.platform_focus`}
                                        control={control}
                                        rules={{
                                            required: { value: true, message: `${capitalizeFirstLetter(platform.platform_name)}'s Platform Focus is required.` },
                                        }}
                                        render={({ field }) => (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        {...field} // Spread the Controller field here
                                                        variant="outline"
                                                        className="xxxs:col-span-2 sm:col-span-1 justify-between"
                                                    >
                                                        <span>{field.value || "Select Platform Focus"}</span>
                                                        <ChevronDown className="h-5 w-5 ml-2" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" className="w-[200px]">
                                                    {ddPlatformFocusValues.map((option) => (
                                                        <DropdownMenuItem
                                                            key={option}
                                                            onClick={() => 
                                                                setValue(`platforms.${index}.platform_focus`, 
                                                                option as SocialMediaPlatform["platform_focus"], 
                                                                { shouldValidate: true })}
                                                            className="cursor-pointer"
                                                        >
                                                            {capitalizeFirstLetter(option)}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    />

                                    {/* Follower Count */}
                                    <Input
                                        className={`xxxs:col-span-2 sm:col-span-1 hidden ${errors.platforms?.[index]?.follower_count ? 'border-red-500' : ''
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
                    <Separator className="my-4" />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                className={`${errors.whatsapp_consent ? 'border-red-500' : ''}`}
                                onCheckedChange={(checked: boolean) => {
                                    setValue("whatsapp_consent", checked);
                                }}
                                {...register("whatsapp_consent")} 
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-4"
                            >
                                I will like to receive more updates by joining the 
                                <a className="underline ml-1 cursor-pointer transition-all duration-300 hover:opacity-70">
                                    WhatsApp Community Group
                                </a>.
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox 
                                className={`${errors.tnc_consent ? 'border-red-500' : ''}`}
                                onCheckedChange={(checked: boolean) => {
                                    setValue("tnc_consent", checked);
                                }}
                                {...register("tnc_consent", { 
                                    required: {
                                        value: true, 
                                        message: "You must agree to the terms and conditions."
                                    },
                                })} 
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-4"
                            >
                                By submitting this form, I acknowledge and agree that my information may be shared with clients for future collaboration invitations or updates.
                                <span className="text-red-600 text-sm">*</span>
                            </label>
                        </div>
                    </div>
                    <DialogFooter className="mt-5">
                        <div className="flex xxxs:flex-col sm:flex-row gap-2">
                            <Button type="button" onClick={closeRegisterModal}
                                className="lg:bg-neutral-400 xxxs:bg-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 flex-shrink-0">
                                Cancel
                            </Button>
                            <Button type="submit" onClick={handleValidation}>
                                Save
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
