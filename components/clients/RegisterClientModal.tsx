import { Client, clientAddress } from "@/data/clients";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ActionButton, Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const RegisterClientModal = ({ closeRegisterModal, handleRegister, registerModalVisibility }:
    {
        closeRegisterModal: () => void;
        handleRegister: (data: Client) => void;
        registerModalVisibility: boolean;
    }) => {
    const [addresses, setAddresses] = useState<clientAddress[]>([
        { id: Date.now(), address: "", city: "", postcode: "", state: "", country: "" },
    ]);

    useEffect(() => {
        if (registerModalVisibility) {
            setAddresses([
                { id: Date.now(), address: "", city: "", postcode: "", state: "", country: "" },
            ]);
        }
    }, [registerModalVisibility]);

    // Add a new address section with a unique ID
    const addAddress = () => {
        setAddresses([...addresses, {
            id: Date.now(),
            address: "",
            city: "",
            postcode: "",
            state: "",
            country: ""
        } as clientAddress ]);
    };

    // Remove an address section based on its unique ID
    const removeAddress = (id: number) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    const saveClient = () => {
        const client: Client = {
            client_id: crypto.randomUUID(), // Generate a unique ID for the client
            company_name: (document.getElementById("company_name") as HTMLInputElement).value,
            company_email: (document.getElementById("company_email_address") as HTMLInputElement).value,
            contact_no: (document.getElementById("contact_number") as HTMLInputElement).value,
            alt_contact_no: (document.getElementById("alt_contact_no") as HTMLInputElement).value,
            pic_name: (document.getElementById("pic_name") as HTMLInputElement).value,
            pic_email: (document.getElementById("pic_email") as HTMLInputElement).value,
            industry_type: (document.getElementById("industry") as HTMLInputElement).value,
            food_category: (document.getElementById("category") as HTMLInputElement).value,
            subscription: (document.getElementById("subscription") as HTMLInputElement).value as Client["subscription"],
            company_addresses: addresses.map((address, index) => ({
                address: (document.getElementById(`address-${index}`) as HTMLInputElement).value,
                city: (document.getElementById(`city-${index}`) as HTMLInputElement).value,
                postcode: (document.getElementById(`postcode-${index}`) as HTMLInputElement).value,
                state: (document.getElementById(`state-${index}`) as HTMLInputElement).value,
                country: (document.getElementById(`country-${index}`) as HTMLInputElement).value,
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
                        <Input type="text" id="pic_name" placeholder="PIC Name" className="col-span-2" required />
                        <Input type="email" id="pic_email" placeholder="PIC Email" className="col-span-1" required />
                        <Input type="text" id="alt_contact_no" placeholder="Alt Contact Number" className="col-span-1" required />
                        <Input type="text" id="industry" placeholder="Industry" className="col-span-1" required />
                        <Input type="text" id="category" placeholder="Category" className="col-span-1" required />
                        <Input type="text" id="subscription" placeholder="Subscription" className="col-span-1" required />
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
                            <div key={address.id} className="flex flex-col gap-4 mb-2" id={`address-form-${address.id}`}>
                                <div className="flex flex-row items-center justify-between">
                                    <h1 className="ml-1 text-lg font-semibold">Address #{index + 1}</h1>
                                    {index > 0 && (
                                        <ActionButton
                                            onClick={() => removeAddress(address.id!)}
                                            icon="trash"
                                            label="Remove Address"
                                            className="dark:bg-neutral-800 bg-neutral-300 py-0 px-0 ml-2 h-[35px] w-[35px]"
                                        />
                                    )}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Input type="text" id={`address-${address.id}`} placeholder="Address" className="col-span-3" required />
                                    <Input type="number" id={`postcode-${address.id}`} placeholder="Postcode" className="col-span-1" required />
                                    <Input type="text" id={`city-${address.id}`} placeholder="City" className="col-span-1" required />
                                    <Input type="text" id={`state-${address.id}`} placeholder="State" className="col-span-1" required />
                                    <Input type="text" id={`country-${address.id}`} placeholder="Country" className="col-span-1" required />
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
