import { Client, clientAddress } from "@/data/clients";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ActionButton, Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { AddressDropdowns } from "../ui/addressDropdown"; // Updated from AddressDropdown to AddressDropdowns

export const RegisterClientModal = ({ closeRegisterModal, handleRegister, registerModalVisibility }:
    {
        closeRegisterModal: () => void;
        handleRegister: (data: Client) => void;
        registerModalVisibility: boolean;
    }) => {
    const [addresses, setAddresses] = useState<clientAddress[]>([
        { temp_id: Date.now(), client_location_id: "", client_id: "", address: "", city: "", postcode: "", state: "", country: "" },
    ]);

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
            client_location_id: crypto.randomUUID(),
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

    const saveClient = () => {
        const client_id = crypto.randomUUID();

        const client: Client = {
            client_id: client_id, // Generate a unique ID for the client
            company_name: (document.getElementById("company_name") as HTMLInputElement).value,
            company_email: (document.getElementById("company_email_address") as HTMLInputElement).value,
            contact_number: (document.getElementById("contact_number") as HTMLInputElement).value,
            additional_contact_number: (document.getElementById("additional_contact_number") as HTMLInputElement).value,
            person_in_charge_name: (document.getElementById("person_in_charge_name") as HTMLInputElement).value,
            person_in_charge_email: (document.getElementById("person_in_charge_email") as HTMLInputElement).value,
            industry: (document.getElementById("industry") as HTMLInputElement).value,
            category: (document.getElementById("category") as HTMLInputElement).value,
            status: "Active",
            addresses: addresses.map((address) => ({
                client_location_id: crypto.randomUUID(),
                client_id: client_id,
                address: (document.getElementById(`address-${address.temp_id}`) as HTMLInputElement).value,
                city: (document.getElementById(`city-${address.temp_id}`) as HTMLInputElement).value,
                postcode: (document.getElementById(`postcode-${address.temp_id}`) as HTMLInputElement).value,
                state: (document.getElementById(`state-${address.temp_id}`) as HTMLInputElement).value,
                country: (document.getElementById(`country-${address.temp_id}`) as HTMLInputElement).value,
            })),
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
                        <Input type="text" id="company_name" placeholder="Company Name" className="col-span-2" required />
                        <Input type="email" id="company_email_address" placeholder="Company Email Address" className="col-span-1" required />
                        <Input type="text" id="contact_number" placeholder="Contact Number" className="col-span-1" required />
                        <Input type="text" id="person_in_charge_name" placeholder="PIC Name" className="col-span-2" required />
                        <Input type="email" id="person_in_charge_email" placeholder="PIC Email" className="col-span-1" required />
                        <Input type="text" id="additional_contact_number" placeholder="Additional Contact Number" className="col-span-1" required />
                        <Input type="text" id="industry" placeholder="Industry" className="col-span-1" required />
                        <Input type="text" id="category" placeholder="Category" className="col-span-1" required />
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
                                    {/* <AddressDropdowns
                                        countryInputId={`country-${address.temp_id}`} 
                                        stateInputId={`state-${address.temp_id}`}
                                        cityInputId={`city-${address.temp_id}`}
                                        country={address.country}
                                        state={address.state}
                                        city={address.city}
                                        setCountry={(val: string) => setAddresses(addresses.map((addr) =>
                                            addr.temp_id === address.temp_id ? { ...addr, country: val } : addr
                                        ))}
                                        setState={(val: string) => setAddresses(addresses.map((addr) =>
                                            addr.temp_id === address.temp_id ? { ...addr, state: val } : addr
                                        ))}
                                        setCity={(val: string) => setAddresses(addresses.map((addr) =>
                                            addr.temp_id === address.temp_id ? { ...addr, country: val } : addr
                                        ))}
                                    /> */}
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
