import { Client, clientAddress } from "@/data/clients";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { ActionButton, Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";

export const UpdateClientModal = ({ clientData, closeUpdateModal, handleUpdate, updateModalVisibility }: {
    clientData: Client | null;
    closeUpdateModal: () => void;
    handleUpdate: (data: Client) => void;
    updateModalVisibility: boolean;
}) => {
    const [addresses, setAddresses] = useState<clientAddress[]>([]);

    useEffect(() => {
        if (updateModalVisibility) {
            setAddresses(
                clientData?.company_addresses.map((address, index) => ({
                    ...address,
                    id: index,
                })) || [{ id: Date.now(), address: "", city: "", postcode: "", state: "", country: "" }]
            );
        }
    }, [updateModalVisibility, clientData]);

    const addAddress = () => {
        setAddresses([
            ...addresses,
            { id: Date.now(), address: "", city: "", postcode: "", state: "", country: "" }
        ]);
    };

    const removeAddress = (id: number) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    const handleSave = () => {
        const updatedClient: Client = {
            client_id: clientData?.client_id || crypto.randomUUID(),
            company_name: (document.getElementById("company_name") as HTMLInputElement).value,
            company_email: (document.getElementById("company_email_address") as HTMLInputElement).value,
            contact_no: (document.getElementById("contact_number") as HTMLInputElement).value,
            alt_contact_no: (document.getElementById("alt_contact_no") as HTMLInputElement).value,
            pic_name: (document.getElementById("pic_name") as HTMLInputElement).value,
            pic_email: (document.getElementById("pic_email") as HTMLInputElement).value,
            industry_type: (document.getElementById("industry") as HTMLInputElement).value,
            food_category: (document.getElementById("category") as HTMLInputElement).value,
            subscription: (document.getElementById("subscription") as HTMLInputElement).value as Client["subscription"],
            company_addresses: addresses.map((address) => ({
                address: (document.getElementById(`address-${address.id}`) as HTMLInputElement).value,
                postcode: (document.getElementById(`postcode-${address.id}`) as HTMLInputElement).value,
                city: (document.getElementById(`city-${address.id}`) as HTMLInputElement).value,
                state: (document.getElementById(`state-${address.id}`) as HTMLInputElement).value,
                country: (document.getElementById(`country-${address.id}`) as HTMLInputElement).value,
            })),
        };

        handleUpdate(updatedClient);
        closeUpdateModal();
    };

    return (
        <Dialog open={updateModalVisibility}>
            <DialogContent className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]"
                onEscapeKeyDown={closeUpdateModal} modalTopRightClose={closeUpdateModal}>
                <DialogHeader>
                    <DialogTitle>Editing {clientData?.company_name} Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to the profile here. Click save changes when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Input type="text" id="company_name" placeholder="Company Name" className="col-span-2" defaultValue={clientData?.company_name} required />
                    <Input type="email" id="company_email_address" placeholder="Company Email Address" className="col-span-1" defaultValue={clientData?.company_email} required />
                    <Input type="text" id="contact_number" placeholder="Contact Number" className="col-span-1" defaultValue={clientData?.contact_no} required />
                    <Input type="text" id="pic_name" placeholder="PIC Name" className="col-span-2" defaultValue={clientData?.pic_name} required />
                    <Input type="email" id="pic_email" placeholder="PIC Email" className="col-span-1" defaultValue={clientData?.pic_email} required />
                    <Input type="text" id="alt_contact_no" placeholder="Alt Contact Number" className="col-span-1" defaultValue={clientData?.alt_contact_no} required />
                    <Input type="text" id="industry" placeholder="Industry" className="col-span-1" defaultValue={clientData?.industry_type} required />
                    <Input type="text" id="category" placeholder="Category" className="col-span-1" defaultValue={clientData?.food_category} required />
                    <Input type="text" id="subscription" placeholder="Subscription" className="col-span-1" defaultValue={clientData?.subscription} required />
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
                        <div key={address.id} className="flex flex-col gap-4 mb-2">
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
                                <Input type="text" id={`address-${address.id}`} placeholder="Address" className="col-span-3" defaultValue={address.address} required />
                                <Input type="number" id={`postcode-${address.id}`} placeholder="Postcode" className="col-span-1" defaultValue={address.postcode} required />
                                <Input type="text" id={`city-${address.id}`} placeholder="City" className="col-span-1" defaultValue={address.city} required />
                                <Input type="text" id={`state-${address.id}`} placeholder="State" className="col-span-1" defaultValue={address.state} required />
                                <Input type="text" id={`country-${address.id}`} placeholder="Country" className="col-span-1" defaultValue={address.country} required />
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={closeUpdateModal}
                        className="bg-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300 flex-shrink-0">
                        Discard Changes
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};