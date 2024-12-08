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
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PlusIcon } from "lucide-react";

export const RegisterInfluencerModal = ({
    closeRegisterModal,
    handleRegister,
    registerModalVisibility,
}: {
    closeRegisterModal: () => void;
    handleRegister: (data: Influencer) => void;
    registerModalVisibility: boolean;
}) => {
    const initialPlatforms: SocialMediaPlatform[] = []; // Default empty or initial state

    const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>(initialPlatforms);

    // Reset platforms when modal visibility changes to closed
    useEffect(() => {
        if (!registerModalVisibility) {
            setPlatforms(initialPlatforms);
        }
    }, [registerModalVisibility]);

    const handleTogglePlatform = (type: SocialMediaPlatform["platform_name"]) => {
        setPlatforms((prevPlatforms) => {
            const existingPlatform = prevPlatforms.find((platform) => platform.platform_name === type);
            if (existingPlatform) {
                return prevPlatforms.filter((platform) => platform.platform_name !== type);
            } else {
                return [
                    ...prevPlatforms,
                    {
                        account_id: crypto.randomUUID(),
                        influencer_id: crypto.randomUUID(),
                        social_media_url: "",
                        platform_name: type,
                        audience_focus_country: "",
                        platform_focus: "UGC",
                        follower_count: 0,
                    },
                ];
            }
        });
    };

    const isPlatformSelected = (type: SocialMediaPlatform["platform_name"]) =>
        platforms.some((platform) => platform.platform_name === type);

    const handleSave = () => {
        const address = {
            address: (document.getElementById("address") as HTMLInputElement).value,
            city: (document.getElementById("city") as HTMLInputElement).value,
            postcode: (document.getElementById("postcode") as HTMLInputElement).value,
            state: (document.getElementById("state") as HTMLInputElement).value,
            country: (document.getElementById("country") as HTMLInputElement).value,
        };

        const updatedPlatforms = platforms.map((platform) => ({
            ...platform,
            industry: (document.getElementById(`industry-${platform.platform_name}`) as HTMLInputElement)
                .value,
            audience_focus_country: (
                document.getElementById(`audience-focus-country-${platform.platform_name}`) as HTMLInputElement
            ).value,
            platform_focus: (
                document.getElementById(`platform-focus-${platform.platform_name}`) as HTMLInputElement
            ).value as SocialMediaPlatform["platform_focus"],
            follower_count: parseInt(
                (document.getElementById(`follower-count-${platform.platform_name}`) as HTMLInputElement)
                    .value
            ) || 0,
        }));

        const newInfluencer: Influencer = {
            influencer_id: crypto.randomUUID(),
            full_name: (document.getElementById("full_name") as HTMLInputElement).value,
            preferred_name: (document.getElementById("preferred_name") as HTMLInputElement).value,
            contact_number: (document.getElementById("contact_number") as HTMLInputElement).value,
            alt_contact_number: (document.getElementById("alt_contact_number") as HTMLInputElement).value,
            email_address: (document.getElementById("email_address") as HTMLInputElement).value,
            whatsapp_consent: false,
            whatsapp_invited: false,
            community_invited: false,
            address,
            platforms: updatedPlatforms,
            total_follower_count: updatedPlatforms.reduce(
                (total, platform) => total + platform.follower_count,
                0
            ),
            invite_count: 0
        };

        handleRegister(newInfluencer);
        closeRegisterModal();
    };

    return (
        <Dialog open={registerModalVisibility}>
            <DialogContent
                className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                    md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px] max-h-[550px] overflow-y-scroll"
                onEscapeKeyDown={closeRegisterModal}
            >
                <DialogHeader>
                    <DialogTitle>Register New Influencer</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to add a new influencer.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-4">
                    <Input
                        className="col-span-1"
                        type="text"
                        id="full_name"
                        placeholder="Full Name"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="preferred_name"
                        placeholder="Preferred Name"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="contact_number"
                        placeholder="Contact Number"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="alt_contact_number"
                        placeholder="Alternative Contact Number"
                    />
                    <Input
                        className="col-span-1"
                        type="email"
                        id="email_address"
                        placeholder="Email Address"
                        required
                    />
                    <Input
                        className="col-span-2"
                        type="text"
                        id="address"
                        placeholder="Address"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="postcode"
                        placeholder="Postcode"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="city"
                        placeholder="City"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="state"
                        placeholder="State"
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="country"
                        placeholder="Country"
                        required
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
                                {["instagram", "tiktok", "youtube", "RED"].map((type) => (
                                    <DropdownMenuCheckboxItem
                                        key={type}
                                        checked={isPlatformSelected(type as SocialMediaPlatform["platform_name"])}
                                        onSelect={() => handleTogglePlatform(type as SocialMediaPlatform["platform_name"])}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {platforms.map((platform) => (
                        <div key={platform.platform_name} className="mb-2">
                            <p className="capitalize ml-1 text-lg font-semibold mb-2">{platform.platform_name}</p>
                            <div className="grid grid-cols-4 gap-4">
                            <Input
                                    className="col-span-2"
                                    type="text"
                                    id={`social_media_url-${platform.platform_name}`}
                                    placeholder="Type"
                                    defaultValue={platform.social_media_url}
                                    required
                                />
                                <Input
                                    className="col-span-1"
                                    type="text"
                                    id={`audience-focus-country-${platform.platform_name}`}
                                    placeholder="Type"
                                    defaultValue={platform.audience_focus_country}
                                    required
                                />
                                <Input
                                    className="col-span-1"
                                    type="text"
                                    id={`platform-focus-${platform.platform_name}`}
                                    placeholder="Type"
                                    defaultValue={platform.platform_focus}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={closeRegisterModal} className="bg-gray-400 hover:bg-gray-500">
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Register</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
