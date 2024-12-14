import { Client, clientAddress } from "@/data/clients";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ActionButton, Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { AddressDropdowns } from "../ui/addressDropdown"; // Updated from AddressDropdown to AddressDropdowns
import { checkNullInputs } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export const RegisterClientModal = ({ closeRegisterModal, handleRegister, registerModalVisibility }:
    {
        closeRegisterModal: () => void;
        handleRegister: (data: Client) => void;
        registerModalVisibility: boolean;
    }) => {
    const [addresses, setAddresses] = useState<clientAddress[]>([
        { temp_id: Date.now(), client_location_id: "", client_id: "", address: "", city: "", postcode: "", state: "", country: "" },
    ]);

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
        if (registerModalVisibility) {
            setAddresses([
                { temp_id: Date.now(), client_location_id: "", client_id: "", address: "", city: "", postcode: "", state: "", country: "" },
            ]);
        }
    }, [registerModalVisibility]);

    // Add a new address section with a unique ID
    const addAddress = () => {
        setAddresses([...addresses, {
            temp_id: Date.now(),
            client_id: crypto.randomUUID(),
            client_location_id: "",
            address: "",
            city: "",
            postcode: "",
            state: "",
            country: "",
        }]);
    };

    // Remove an address section based on its unique ID
    const removeAddress = (id: number) => {
        setAddresses(addresses.filter((address) => address.temp_id !== id));
    };

    // Validators
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

    const saveClient = () => {

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

        //Handle Register if there's no errors.
        const client_id = crypto.randomUUID();

        const client: Client = {
            client_id: client_id,
            company_name: companyNameRef.current?.value as string,
            company_email: companyEmailRef.current?.value as string,
            contact_number: contactNumberRef.current?.value as string,
            additional_contact_number: altContactNumberRef.current?.value as string,
            person_in_charge_name: picNameRef.current?.value as string,
            person_in_charge_email: picEmailRef.current?.value as string,
            industry: industryRef.current?.value as string,
            category: categoryRef.current?.value as string,
            status: "Pending Approval",
            addresses: addresses.map((address) => {
                const ref = addressRefs.current.get(address.temp_id!);
                return {
                    client_id: client_id,
                    client_location_id: crypto.randomUUID(),
                    address: ref?.address?.value || "",
                    postcode: ref?.postcode?.value || "",
                    city: address.city || "",
                    state: address.state || "",
                    country: address.country || "",
                };
            }),
        };

        // Pass the client object to the handleRegister callback
        handleRegister(client);
        closeRegisterModal(); // Close the modal after saving
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
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                        type="text"
                        id="company_name"
                        placeholder="Company Name"
                        className="col-span-2"
                        ref={companyNameRef}
                        required
                    />
                    <Input 
                        type="email" 
                        id="company_email_address" 
                        placeholder="Company Email Address" 
                        className="col-span-1" 
                        ref={companyEmailRef}
                        required 
                    />
                    <Input 
                        type="text" 
                        id="contact_number" 
                        placeholder="Contact Number" 
                        className="col-span-1" 
                        ref={contactNumberRef}
                        required 
                    />
                    <Input 
                        type="text" 
                        id="pic_name" 
                        placeholder="PIC Name" 
                        className="col-span-2" 
                        ref={picNameRef}
                        required 
                    />
                    <Input 
                        type="email" 
                        id="pic_email" 
                        placeholder="PIC Email" 
                        className="col-span-1" 
                        ref={picEmailRef}
                        required 
                    />
                    <Input 
                        type="text" 
                        id="alt_contact_no" 
                        placeholder="Alt Contact Number" 
                        className="col-span-1" 
                        ref={altContactNumberRef}
                        required 
                    />
                    <Input 
                        type="text" 
                        id="industry" 
                        placeholder="Industry" 
                        className="col-span-1" 
                        ref={industryRef}
                        required 
                        />
                    <Input 
                        type="text" 
                        id="category" 
                        placeholder="Category" 
                        className="col-span-1" 
                        ref={categoryRef}
                        required 
                        />
                    </div>
                    <Separator className="my-2 mb-0" />
                    <div className="flex flex-col w-full gap-4">
                        <div className="w-full justify-end flex items-center">
                            <ActionButton
                                onClick={addAddress} // Replace with function to add new address section
                                icon="plus"
                                label="Add More Address"
                                textBtn="More Address"
                                className="dark:bg-neutral-800 bg-neutral-300 hover:bg-neutral-300/75 dark:hover:bg-neutral-800/75"
                            />
                        </div>
                        {addresses.map((address, index) => (
                            <div key={address.temp_id} className="flex flex-col gap-4 mb-2" id={`address-form-${address.temp_id}`}>
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
                                    <Input type="number" id={`postcode-${address.temp_id}`} placeholder="Postcode" defaultValue={address.postcode} className="col-span-1" required />
                                    <Input type="text" id={`address-${address.temp_id}`} placeholder="Address" defaultValue={address.address} className="col-span-3" required />
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={closeRegisterModal}
                            className="bg-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300 flex-shrink-0">
                            Cancel
                        </Button>
                        <Button onClick={saveClient} className="">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
