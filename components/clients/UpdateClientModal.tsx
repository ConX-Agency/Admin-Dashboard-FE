import { Client, clientAddress } from "@/data/clients";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { ActionButton, Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Country } from "@/data/shared";
import { AddressDropdowns } from "../ui/addressDropdown";
import { toast } from "@/hooks/use-toast";

export const UpdateClientModal = ({ clientData, closeUpdateModal, handleUpdate, updateModalVisibility }: {
    clientData: Client | null;
    closeUpdateModal: () => void;
    handleUpdate: (data: Client) => void;
    updateModalVisibility: boolean;
}) => {
    const [addresses, setAddresses] = useState<clientAddress[]>([]);
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [countriesList, setCountriesList] = useState<Country[]>([]);

    const companyNameRef = useRef<HTMLInputElement>(null);
    const companyEmailRef = useRef<HTMLInputElement>(null);
    const contactNumberRef = useRef<HTMLInputElement>(null);
    const altContactNumberRef = useRef<HTMLInputElement>(null);
    const picNameRef = useRef<HTMLInputElement>(null);
    const picEmailRef = useRef<HTMLInputElement>(null);
    const industryRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);
    const addressRefs = useRef<Map<number, { postcode: HTMLInputElement | null; address: HTMLInputElement | null }>>(
        new Map()
    );

    useEffect(() => {
        if (updateModalVisibility && clientData) {
            setAddresses(
                clientData?.addresses.map((address, index) => ({
                    ...address,
                    temp_id: index,
                })) || []
            );

            // Initialize the state values for each address
            setCountry(clientData?.addresses[0]?.country || "");
            setState(clientData?.addresses[0]?.state || "");
            setCity(clientData?.addresses[0]?.city || "");
        }
    }, [updateModalVisibility, clientData]);

    const addAddress = () => {
        const newAddress = { temp_id: Date.now(), client_id: "", client_location_id: "", address: "", city: "", postcode: "", state: "", country: "" };
        setAddresses([...addresses, newAddress]);
    };

    const removeAddress = (id: number) => {
        setAddresses(addresses.filter((address) => address.temp_id !== id));
        addressRefs.current.delete(id);
    };

    const validateInputs = (): { error: boolean; message: string } => {
        const inputRefs = [
            { ref: companyNameRef, name: "Company Name" },
            { ref: companyEmailRef, name: "Company Email" },
            { ref: contactNumberRef, name: "Contact Number" },
            { ref: picNameRef, name: "PIC Name" },
            { ref: picEmailRef, name: "PIC Email" },
            { ref: industryRef, name: "Industry" },
            { ref: categoryRef, name: "Category" },
            { ref: statusRef, name: "Status" },
        ];

        const missingFields: string[] = [];

        // Validate inputRefs
        inputRefs.forEach(({ ref, name }) => {
            if (!ref.current || !ref.current.value.trim()) {
                missingFields.push(name);
            }
        });

        // Validate addressRefs (only `postcode`, `country`, and `address`)
        addresses.forEach((address, index) => {
            const ref = addressRefs.current.get(address?.temp_id!);
            if (!ref?.address?.value.trim()) {
                missingFields.push(`Address Line for Address #${index + 1}`);
            }
            if (!ref?.postcode?.value.trim()) {
                missingFields.push(`Postcode for Address #${index + 1}`);
            }
            if (!address.country.trim()) {
                missingFields.push(`Country for Address #${index + 1}`);
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
        const updatedClient: Client = {
            client_id: clientData?.client_id!,
            company_name: companyNameRef.current?.value as string,
            company_email: companyEmailRef.current?.value as string,
            contact_number: contactNumberRef.current?.value as string,
            additional_contact_number: altContactNumberRef.current?.value as string,
            person_in_charge_name: picNameRef.current?.value as string,
            person_in_charge_email: picEmailRef.current?.value as string,
            industry: industryRef.current?.value as string,
            category: categoryRef.current?.value as string,
            status: statusRef.current?.value as Client["status"],
            addresses: addresses.map((address) => {
                const ref = addressRefs.current.get(address.temp_id!);
                return {
                    client_id: clientData?.client_id!,
                    client_location_id: address.client_location_id || crypto.randomUUID(),
                    address: ref?.address?.value || "",
                    postcode: ref?.postcode?.value || "",
                    city: address.city || "",
                    state: address.state || "",
                    country: address.country || "",
                };
            }),
        };

        handleUpdate(updatedClient);
        closeUpdateModal();
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
                <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                        type="text"
                        id="company_name"
                        placeholder="Company Name"
                        className="col-span-2"
                        defaultValue={clientData?.company_name}
                        ref={companyNameRef}
                        required
                    />
                    <Input 
                        type="email" 
                        id="company_email_address" 
                        placeholder="Company Email Address" 
                        className="col-span-1" 
                        defaultValue={clientData?.company_email} 
                        ref={companyEmailRef}
                        required 
                    />
                    <Input 
                        type="text" 
                        id="contact_number" 
                        placeholder="Contact Number" 
                        className="col-span-1" 
                        defaultValue={clientData?.contact_number} 
                        ref={contactNumberRef}
                        required 
                    />
                    <Input 
                        type="text" 
                        id="pic_name" 
                        placeholder="PIC Name" 
                        className="col-span-2" 
                        defaultValue={clientData?.person_in_charge_name} 
                        ref={picNameRef}
                        required 
                    />
                    <Input 
                        type="email" 
                        id="pic_email" 
                        placeholder="PIC Email" 
                        className="col-span-1" 
                        defaultValue={clientData?.person_in_charge_email} 
                        ref={picEmailRef}
                        required 
                    />
                    <Input 
                        type="text" 
                        id="alt_contact_no" 
                        placeholder="Alt Contact Number" 
                        className="col-span-1" 
                        defaultValue={clientData?.additional_contact_number} 
                        ref={altContactNumberRef}
                        required 
                    />
                    <Input 
                        type="text" 
                        id="industry" 
                        placeholder="Industry" 
                        className="col-span-1" 
                        defaultValue={clientData?.industry} 
                        ref={industryRef}
                        required 
                        />
                    <Input 
                        type="text" 
                        id="category" 
                        placeholder="Category" 
                        className="col-span-1" 
                        defaultValue={clientData?.category} 
                        ref={categoryRef}
                        required 
                        />
                    <Input 
                        type="text" 
                        id="status" 
                        placeholder="Status" 
                        className="col-span-1" 
                        defaultValue={clientData?.status} 
                        ref={statusRef}
                        required 
                    />
                </div>
                <Separator className="my-2 mb-0" />
                <div className="flex flex-col w-full gap-4">
                    <div className="w-full justify-end flex items-center">
                        <ActionButton
                            onClick={addAddress}
                            icon="plus"
                            label="Add More Address"
                            textBtn="More Address"
                            className="dark:bg-neutral-800 bg-neutral-300 hover:bg-neutral-300/75 dark:hover:bg-neutral-800/75"
                        />
                    </div>
                    {addresses.map((address, index) => (
                        <div key={address.temp_id} className="flex flex-col gap-4 mb-2">
                            <div className="flex flex-row items-center justify-between">
                                <h1 className="ml-1 text-lg font-semibold">Address #{index + 1}</h1>
                                {index > 0 && (
                                    <ActionButton
                                        onClick={() => removeAddress(address.temp_id!)}
                                        icon="trash"
                                        label="Remove Address"
                                        className="dark:bg-neutral-800 bg-neutral-300 py-0 px-0 ml-2 h-[35px] w-[35px]"
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <AddressDropdowns
                                    countryInputId={`country-${address.temp_id}`} 
                                    stateInputId={`state-${address.temp_id}`}
                                    cityInputId={`city-${address.temp_id}`}
                                    country={address.country}
                                    state={address.state}
                                    city={address.city}
                                    setCountry={(value: SetStateAction<string>) => {
                                        setAddresses((prevAddresses) =>
                                            prevAddresses.map((addr) =>
                                                addr.temp_id === address.temp_id ? { ...addr, country: value as string } : addr
                                            )
                                        );
                                    }}
                                    setState={(value: SetStateAction<string>) => {
                                        setAddresses((prevAddresses) =>
                                            prevAddresses.map((addr) =>
                                                addr.temp_id === address.temp_id ? { ...addr, state: value as string } : addr
                                            )
                                        );
                                    }}
                                    setCity={(value: SetStateAction<string>) => {
                                        setAddresses((prevAddresses) =>
                                            prevAddresses.map((addr) =>
                                                addr.temp_id === address.temp_id ? { ...addr, city: value as string } : addr
                                            )
                                        );
                                    }}
                                />
                                <Input
                                    ref={(el) => {
                                        if (!addressRefs.current.has(address.temp_id!)) {
                                            addressRefs.current.set(address.temp_id!, {
                                                postcode: null,
                                                address: null,
                                            });
                                        }
                                        addressRefs.current.get(address.temp_id!)!.postcode = el;
                                    }}
                                    placeholder="Postcode"
                                    defaultValue={address.postcode}
                                    className="col-span-1"
                                />
                                <Input
                                    ref={(el) => {
                                        if (!addressRefs.current.has(address.temp_id!)) {
                                            addressRefs.current.set(address.temp_id!, {
                                                postcode: null,
                                                address: null,
                                            });
                                        }
                                        addressRefs.current.get(address.temp_id!)!.address = el;
                                    }}
                                    placeholder="Address"
                                    defaultValue={address.address}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={closeUpdateModal}
                        className="bg-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300 flex-shrink-0">
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};