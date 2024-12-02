import { Client } from "@/data/clients";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const UpdateModal = ({ clientId, closeUpdateModal, handleUpdate, updateModalVisibility }:
    {
        clientId: string | null;
        closeUpdateModal: () => void;
        handleUpdate: (data: string) => void;
        updateModalVisibility: boolean;
    }) => {
    return (
        <>
            <Dialog open={updateModalVisibility}>
                <DialogContent className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                    md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]" 
                    onEscapeKeyDown={closeUpdateModal} modalTopRightClose={closeUpdateModal}>
                    <DialogHeader>
                        <DialogTitle>Edit profile {clientId}</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                defaultValue="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => handleUpdate("test")}>Save changes</Button>
                        <Button onClick={closeUpdateModal}>Discard changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>

    );
}