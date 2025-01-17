import { Client, clientAddress } from "@/data/clients";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { ActionButton, Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { AddressDropdowns } from "../ui/addressDropdown";
import { toast } from "@/hooks/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { capitalizeFirstLetter } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ddIndustryValues, ddStatusValues } from "@/data/dropdown-values";

export const UpdateClientModal = ({ clientData, closeUpdateModal, handleUpdate, updateModalVisibility }: {
    clientData: Client | null;
    closeUpdateModal: () => void;
    handleUpdate: (data: Client) => void;
    updateModalVisibility: boolean;
}) => {
    const [status, setStatus] = useState<Client["status"]>("Active");
    const [industry, setIndustry] = useState<Client["industry"]>("Food & Beverage");
    const [monetary, setMonetary] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
        trigger,
        reset
    } = useForm<Client>({
        mode: "onSubmit",
    });

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "addresses",
    });

    useEffect(() => {
        if (clientData) {
            setValue("company_name", clientData.company_name || "");
            setValue("person_in_charge_name", clientData.person_in_charge_name || "");
            setValue("person_in_charge_email", clientData.person_in_charge_email || "");
            setValue("company_email", clientData.company_email || "");
            setValue("contact_number", clientData.contact_number || "");
            setValue("alt_contact_number", clientData.alt_contact_number || "");
            setValue("industry", clientData.industry || "");
            setValue("category", clientData.category || "");
            setStatus(clientData.status);
            setMonetary(clientData.is_non_monetary);
            setValue("discount", clientData.discount);
            setValue("ways_to_use", clientData.ways_to_use);
            setValue("addresses", clientData.addresses || []);
            replace(clientData.addresses || []);
        }
    }, [clientData, setValue, updateModalVisibility]);

    const addAddress = () => {
        append({ address: "", city: "", postcode: "", state: "", country: "" } as clientAddress);
    };

    const removeAddress = (index: number) => {
        remove(index);
    };

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

    const onSubmit = async (data: Client) => {

        const client_id = crypto.randomUUID();
        const formattedClient = {
            ...data,
            client_id,
            status: status,
            industry: industry,
            is_non_monetary: monetary,
            addresses: data.addresses.map((address: clientAddress) => ({
                ...address,
                client_id,
                client_location_id: crypto.randomUUID(),
            })),
        };

        handleUpdate(formattedClient);
        closeUpdateModal();
        reset();
    };

    return (
        <Dialog open={updateModalVisibility}>
            <DialogContent className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                    md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px] max-h-[550px] overflow-y-scroll"
                onEscapeKeyDown={closeUpdateModal} modalTopRightClose={closeUpdateModal}>
                <DialogHeader>
                    <DialogTitle>Editing {clientData?.company_name} Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to the profile here. Click save changes when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid xxxs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 items-center gap-4 mb-4">
                        {/* Company Name */}
                        <Input
                            type="text"
                            placeholder="Company Name"
                            className={`xxxs:col-span-2 sm:col-span-4 lg:col-span-2 ${errors.company_name ? 'border-red-500' : ''}`}
                            {...register("company_name", {
                                required: { value: true, message: "Company Name is required." }
                            })}
                        />

                        {/* Company Email Address */}
                        <Input
                            type="email"
                            placeholder="Company Email Address"
                            className={`col-span-2 ${errors.company_email ? 'border-red-500' : ''}`}
                            {...register("company_email", {
                                required: { value: true, message: "Company Email Address is required." }
                            })}
                        />

                        {/* Contact Number */}
                        <Input
                            type="text"
                            placeholder="Contact Number (+1234567890)"
                            className={`col-span-2 ${errors.contact_number ? 'border-red-500' : ''}`}
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
                        />

                        {/* PIC Name */}
                        <Input
                            type="text"
                            placeholder="Person-In-Charge (PIC) Name"
                            className={`xxxs:col-span-2 sm:col-span-4 lg:col-span-2 ${errors.person_in_charge_name ? 'border-red-500' : ''}`}
                            {...register("person_in_charge_name", {
                                required: { value: true, message: "Person in Charge's Name is required." }
                            })}
                        />

                        {/* PIC Email Address */}
                        <Input
                            type="email"
                            placeholder="PIC Email Address"
                            className={`col-span-2 ${errors.person_in_charge_email ? 'border-red-500' : ''}`}
                            {...register("person_in_charge_email", {
                                required: { value: true, message: "Person in Charge's Email is required." }
                            })}
                        />

                        {/* Alt Contact Number */}
                        <Input
                            type="text"
                            placeholder="Alt Contact Number (+1234567890)"
                            className={`col-span-2 ${errors.alt_contact_number ? 'border-red-500' : ''}`}
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
                        />

                        {/* Industry */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="col-span-2 px-3 border justify-between w-full">
                                    {capitalizeFirstLetter(industry)}
                                    <ChevronDown className="h-5 w-5 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full" align="start">
                                {ddIndustryValues.map((option) => (
                                    <DropdownMenuItem
                                        key={option}
                                        onClick={() => setIndustry(option as Client["industry"])}
                                        className="cursor-pointer"
                                    >
                                        {capitalizeFirstLetter(option)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Cuisine Type */}
                        <Input
                            type="text"
                            placeholder="Category (Italian, Thai, Malaysian)"
                            className={`col-span-2 ${errors.category ? 'border-red-500' : ''}`}
                            {...register("category", {
                                required: { value: true, message: "Category is required." }
                            })}
                        />

                        {/* Is Non-Monetary */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="col-span-2 px-3 border justify-between w-full">
                                    {monetary ? "Non-Monetary" : "Monetary"}
                                    <ChevronDown className="h-5 w-5 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[266px] max-w-full" align="start">
                                <DropdownMenuItem
                                    onClick={() => setMonetary(false)}
                                    className="cursor-pointer"
                                >
                                    Monetary
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setMonetary(true)}
                                    className="cursor-pointer"
                                >
                                    Non-Monetary
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Discount */}
                        <Input
                            type="text"
                            placeholder="Discount (0-100)"
                            className={`col-span-2 ${errors.discount ? 'border-red-500' : ''}`}
                            {...register("discount", {
                                required: { 
                                    value: true, 
                                    message: "Discount is required." 
                                },
                                pattern: {
                                    value: /^\d+$/,
                                    message: "Discount must contain numbers only."
                                },
                                min: {
                                    value: 0,
                                    message: "Discount must be at least 0."
                                },
                                max: {
                                    value: 100,
                                    message: "Discount must not exceed 100."
                                }
                            })}
                        />

                        {/* Ways to Use */}
                        <Input
                            type="text"
                            placeholder="Ways to Use"
                            className={`col-span-2 ${errors.ways_to_use ? 'border-red-500' : ''}`}
                            {...register("ways_to_use", {
                                required: { 
                                    value: true, 
                                    message: "Ways to Use is required." 
                                }
                            })}
                        />

                        {/* Status */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="col-span-2 px-3 border justify-between w-full">
                                    {capitalizeFirstLetter(status)}
                                    <ChevronDown className="h-5 w-5 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[266px] max-w-full" align="start">
                                {ddStatusValues.map((option) => (
                                    <DropdownMenuItem
                                        key={option}
                                        onClick={() => setStatus(option as Client["status"])}
                                        className="cursor-pointer"
                                    >
                                        {capitalizeFirstLetter(option)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Separator className="my-2 mb-0" />
                    <div className="flex flex-col w-full gap-4">
                        <div className="w-full justify-end flex items-center mt-3">
                            <ActionButton
                                onClick={addAddress}
                                icon="plus"
                                label="Add More Address"
                                textBtn="More Address"
                                className="dark:bg-neutral-800 bg-neutral-300 hover:bg-neutral-300/75 dark:hover:bg-neutral-800/75"
                                type="button"
                            />
                        </div>
                        {fields.map((address, index) => (
                            <div key={address.id} className="flex flex-col gap-4 mb-2" id={`address-form-${address.id}`}>
                                <div className="flex flex-row items-center justify-between">
                                    <h1 className="ml-1 text-lg font-semibold">Address #{index + 1}</h1>
                                    {index > 0 && (
                                        <ActionButton
                                            onClick={() => removeAddress(index)}
                                            icon="trash"
                                            label="Remove Address"
                                            className="dark:bg-neutral-800 bg-neutral-300 py-0 px-0 ml-2 h-[35px] w-[35px]"
                                            type="button"
                                        />
                                    )}
                                </div>
                                <div className="grid xxxs:grid-cols-4 sm:grid-cols-6 items-center gap-4">
                                    <AddressDropdowns
                                        country={getValues(`addresses.${index}.country`)}
                                        setCountry={(value: string) => {
                                            setValue(`addresses.${index}.country`, value, { shouldValidate: true });
                                            trigger(); //retrigger validation after fixing error.
                                        }}
                                        countryMessage={`Address #${index + 1}'s Country is required.`}
                                        countryClassname={`col-span-2 ${errors.addresses?.[index]?.country ? 'border-red-500' : ''}`}
                                        countryInputName={`addresses.${index}.country`}
                                        state={getValues(`addresses.${index}.state`)}
                                        stateMessage={`Address #${index + 1}'s State is required.`}
                                        setState={(value: string) => {
                                            setValue(`addresses.${index}.state`, value, { shouldValidate: true });
                                            trigger();
                                        }}
                                        stateClassname={`col-span-2 ${errors.addresses?.[index]?.state ? 'border-red-500' : ''}`}
                                        stateInputName={`addresses.${index}.state`}
                                        city={getValues(`addresses.${index}.city`)}
                                        cityMessage={`Address #${index + 1}'s City is required.`}
                                        setCity={(value: string) => {
                                            setValue(`addresses.${index}.city`, value, { shouldValidate: true });
                                            trigger();
                                        }}
                                        cityClassname={`col-span-2 ${errors.addresses?.[index]?.city ? 'border-red-500' : ''}`}
                                        cityInputName={`addresses.${index}.city`}
                                        control={control}
                                    />
                                    <Input
                                        type="text"
                                        id={`postcode-${address.id}`}
                                        placeholder="Postcode"
                                        {...register(`addresses.${index}.postcode` as const,
                                            {
                                                required: {
                                                    value: true,
                                                    message: `Address #${index + 1}'s Postcode is required.`
                                                },
                                                minLength: {
                                                    value: 4,
                                                    message: `Address #${index + 1}'s Postcode must be at least 4 numbers.`,
                                                },
                                                maxLength: {
                                                    value: 6,
                                                    message: `Address #${index + 1}'s Postcode must be no more than 6 numbers.`,
                                                },
                                                pattern: {
                                                    value: /^\d+$/,
                                                    message: `Address #${index + 1}'s Postcode must contain numbers only.`,
                                                },
                                            }
                                        )}
                                        className={`col-span-2 ${errors.addresses?.[index]?.postcode ? 'border-red-500' : ''}`}
                                    />
                                    <Input
                                        type="text"
                                        id={`address-${address.id}`}
                                        placeholder="Address"
                                        {...register(`addresses.${index}.address` as const,
                                            {
                                                required: {
                                                    value: true,
                                                    message: `Address #${index + 1}'s Address is required.`
                                                }
                                            }
                                        )}
                                        className={`col-span-4 ${errors.addresses?.[index]?.address ? 'border-red-500' : ''}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <div className="flex xxxs:flex-col sm:flex-row gap-2 mt-4">
                            <Button type="button" onClick={closeUpdateModal}
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