import { Client, clientAddress } from "@/data/clients";
import { SetStateAction, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ActionButton, Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { AddressDropdowns } from "../ui/addressDropdown"; // Updated from AddressDropdown to AddressDropdowns
import { toast } from "@/hooks/use-toast";
import { useFieldArray, useForm } from "react-hook-form";

export const RegisterClientModal = ({ closeRegisterModal, handleRegister, registerModalVisibility }:
    {
        closeRegisterModal: () => void;
        handleRegister: (data: Client) => void;
        registerModalVisibility: boolean;
    }) => {
    const {
        control,
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
        trigger,
        reset,
    } = useForm<Client>({
        mode: "onSubmit",
        defaultValues: {
            company_name: "",
            company_email: "",
            contact_number: "",
            additional_contact_number: "",
            person_in_charge_name: "",
            person_in_charge_email: "",
            industry: "",
            category: "",
            addresses: [
                { address: "", city: "", postcode: "", state: "", country: "" } as clientAddress,
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "addresses",
    });

    // Reset form when modal visibility changes
    useEffect(() => {
        if (!registerModalVisibility) {
            reset();
        }
    }, [registerModalVisibility, reset]);

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

    const onSubmit = (data: Client) => {
        console.log(data);
        const client_id = crypto.randomUUID();
        const formattedClient = {
            ...data,
            client_id,
            addresses: data.addresses.map((address: clientAddress) => ({
                ...address,
                client_id,
                client_location_id: crypto.randomUUID(),
            })),
        };

        handleRegister(formattedClient);
        closeRegisterModal();
        reset();
    };

    return (
        <>
            <Dialog open={registerModalVisibility}>
                <DialogContent className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                    md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px] max-h-[550px] overflow-y-scroll"
                    onEscapeKeyDown={closeRegisterModal} modalTopRightClose={closeRegisterModal}>
                    <DialogHeader>
                        <DialogTitle>Register New Client</DialogTitle>
                        <DialogDescription>
                            Register a new client here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                                type="text"
                                placeholder="Company Name"
                                className={`col-span-2 ${errors.company_name ? 'border-red-500' : ''}`}
                                {...register("company_name", {
                                    required: { value: true, message: "Company Name is required." }
                                })}
                            />
                            <Input
                                type="email"
                                placeholder="Company Email Address"
                                className={`col-span-1 ${errors.company_email ? 'border-red-500' : ''}`}
                                {...register("company_email", {
                                    required: { value: true, message: "Company Email Address is required." }
                                })}
                            />
                            <Input
                                type="text"
                                placeholder="Contact Number"
                                className={`col-span-1 ${errors.contact_number ? 'border-red-500' : ''}`}
                                {...register("contact_number", {
                                    required: { value: true, message: "Contact Number is required." }
                                })}
                            />
                            <Input
                                type="text"
                                placeholder="PIC Name"
                                className={`col-span-2 ${errors.person_in_charge_name ? 'border-red-500' : ''}`}
                                {...register("person_in_charge_name", {
                                    required: { value: true, message: "Person in Charge's Name is required." }
                                })}
                            />
                            <Input
                                type="email"
                                placeholder="PIC Email"
                                className={`col-span-1 ${errors.person_in_charge_email ? 'border-red-500' : ''}`}
                                {...register("person_in_charge_email", {
                                    required: { value: true, message: "Person in Charge's Email is required." }
                                })}
                            />
                            <Input
                                type="text"
                                placeholder="Alt Contact Number"
                                className={`col-span-1 ${errors.additional_contact_number ? 'border-red-500' : ''}`}
                                {...register("additional_contact_number")}
                            />
                            <Input
                                type="text"
                                id="industry"
                                placeholder="Industry"
                                className={`col-span-1 ${errors.industry ? 'border-red-500' : ''}`}
                                {...register("industry", {
                                    required: { value: true, message: "Industry is required." }
                                })}
                            />
                            <Input
                                type="text"
                                id="category"
                                placeholder="Category"
                                className={`col-span-1 ${errors.category ? 'border-red-500' : ''}`}
                                {...register("category", {
                                    required: { value: true, message: "Category is required." }
                                })}
                            />
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
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <AddressDropdowns
                                            country={getValues(`addresses.${index}.country`)}
                                            setCountry={(value: string) => {
                                                setValue(`addresses.${index}.country`, value, { shouldValidate: true });
                                                trigger(); //retrigger validation after fixing error.
                                            }}
                                            countryMessage={`Address #${index + 1}'s Country is required.`}
                                            countryClassname={`${errors.addresses?.[index]?.country ? 'border-red-500' : ''}`}
                                            countryInputName={`addresses.${index}.country`}
                                            state={getValues(`addresses.${index}.state`)}
                                            stateMessage={`Address #${index + 1}'s State is required.`}
                                            setState={(value: string) => {
                                                setValue(`addresses.${index}.state`, value, { shouldValidate: true });
                                                trigger();
                                            }}
                                            stateClassname={`${errors.addresses?.[index]?.state ? 'border-red-500' : ''}`}
                                            stateInputName={`addresses.${index}.state`}
                                            city={getValues(`addresses.${index}.city`)}
                                            cityMessage={`Address #${index + 1}'s City is required.`}
                                            setCity={(value: string) => {
                                                setValue(`addresses.${index}.city`, value, { shouldValidate: true });
                                                trigger();
                                            }}
                                            cityClassname={`${errors.addresses?.[index]?.city ? 'border-red-500' : ''}`}
                                            cityInputName={`addresses.${index}.city`}
                                            control={control}
                                        />
                                        <Input
                                            type="number"
                                            id={`postcode-${address.id}`}
                                            placeholder="Postcode"
                                            {...register(`addresses.${index}.postcode` as const,
                                                {
                                                    required: {
                                                        value: true,
                                                        message: `Address #${index + 1}'s Postcode is required.`
                                                    }
                                                }
                                            )}
                                            className={`col-span-1 ${errors.addresses?.[index]?.postcode ? 'border-red-500' : ''}`}
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
                                            className={`col-span-3 ${errors.addresses?.[index]?.address ? 'border-red-500' : ''}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button type="button" onClick={closeRegisterModal}
                                className="bg-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300 flex-shrink-0">
                                Cancel
                            </Button>
                            <Button type="submit" onClick={handleValidation}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};
