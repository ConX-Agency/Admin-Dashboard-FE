import { Client } from "@/data/clients";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ActionButton, Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const RegisterModal = ({ closeRegisterModal, handleRegister, registerModalVisibility }:
    {
        closeRegisterModal: () => void;
        handleRegister: (data: string) => void;
        registerModalVisibility: boolean;
    }) => {
    const [addresses, setAddresses] = useState([{ id: Date.now() }]); // Initialize with a unique ID

    // Add a new address section with a unique ID
    const addAddress = () => {
        setAddresses([...addresses, { id: Date.now() }]);
    };

    // Remove an address section based on its unique ID
    const removeAddress = (id: number) => {
        setAddresses(addresses.filter((address) => address.id !== id));
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
                        <Input id="company_name" placeholder="Company Name" className="col-span-2" required />
                        <Input id="company_email_address" placeholder="Company Email Address" className="col-span-1" required />
                        <Input id="contact_number" placeholder="Contact Number" className="col-span-1" required />
                        <Input id="pic_name" placeholder="PIC Name" className="col-span-2" required />
                        <Input id="pic_email" placeholder="PIC Email" className="col-span-1" required />
                        <Input id="alt_contact_no" placeholder="Alt Contact Number" className="col-span-1" required />
                        <Input id="industry" placeholder="Industry" className="col-span-1" required />
                        <Input id="category" placeholder="Category" className="col-span-1" required />
                        <Input id="subscription" placeholder="Subscription" className="col-span-1" required />
                    </div>
                    <Separator className="my-2 mb-0" />
                    <div className="flex flex-col w-full gap-4">
                        <div className="w-full justify-end flex items-center">
                            <ActionButton
                                onClick={addAddress} // Replace with function to add new address section
                                icon="plus"
                                label="Add More Address"
                                textBtn="More Address"
                                className="bg-neutral-800 hover:bg-neutral-800/75"
                            />
                        </div>
                        {addresses.map((address, index) => (
                            <div key={index} className="flex flex-col gap-4 mb-2" id={`address-form-${address.id}`}>
                                <div className="flex flex-row items-center justify-between">
                                    <h1 className="ml-1 text-lg font-semibold">Address #{index + 1}</h1>
                                    {index > 0 && (
                                        <ActionButton
                                            onClick={() => removeAddress(address.id)}
                                            icon="trash"
                                            label="Remove Address"
                                            className="bg-neutral-800 py-0 px-0 ml-2 h-[35px] w-[35px]"
                                        />
                                    )}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Input id={`address-${index}`} placeholder="Address" className="col-span-3" required />
                                    <Input id={`postcode-${index}`} placeholder="Postcode" className="col-span-1" required />
                                    <Input id={`city-${index}`} placeholder="City" className="col-span-1" required />
                                    <Input id={`state-${index}`} placeholder="State" className="col-span-1" required />
                                    <Input id={`country-${index}`} placeholder="Country" className="col-span-1" required />
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={closeRegisterModal}
                            className="bg-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300 flex-shrink-0">
                            Cancel
                        </Button>
                        <Button onClick={() => handleRegister("test")} className="">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
