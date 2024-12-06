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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { PlusIcon } from "lucide-react";

export const UpdateInfluencerModal = ({
    influencerData,
    closeUpdateModal,
    handleUpdate,
    updateModalVisibility,
}: {
    influencerData: Influencer | null;
    closeUpdateModal: () => void;
    handleUpdate: (data: Influencer) => void;
    updateModalVisibility: boolean;
}) => {
    const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>(
        influencerData?.platforms || []
    );

    useEffect(() => {
        if (influencerData?.platforms) {
            setPlatforms(influencerData.platforms);
        }
    }, [influencerData]);

    const handleTogglePlatform = (type: SocialMediaPlatform["type"]) => {
        setPlatforms((prevPlatforms) => {
            // Check if platform type already exists
            const existingPlatform = prevPlatforms.find((platform) => platform.type === type);
            if (existingPlatform) {
                // If it exists, remove it
                return prevPlatforms.filter((platform) => platform.type !== type);
            } else {
                // If not, add a new platform
                return [
                    ...prevPlatforms,
                    {
                        type,
                        industry: "",
                        audience_focus_country: "",
                        platform_focus: "",
                        follower_count: 0,
                        follower_count_tag: "",
                    },
                ];
            }
        });
    };

    const isPlatformSelected = (type: SocialMediaPlatform["type"]) =>
        platforms.some((platform) => platform.type === type);

    const handleSave = () => {
        // Extracting address fields
        const address = {
            address: (document.getElementById("address") as HTMLInputElement).value,
            city: (document.getElementById("city") as HTMLInputElement).value,
            postcode: (document.getElementById("postcode") as HTMLInputElement).value,
            state: (document.getElementById("state") as HTMLInputElement).value,
            country: (document.getElementById("country") as HTMLInputElement).value,
        };
    
        // Extracting platforms with their updated fields
        const updatedPlatforms = platforms.map((platform) => ({
            ...platform,
            industry: (document.getElementById(`industry-${platform.type}`) as HTMLInputElement).value,
            audience_focus_country: (
                document.getElementById(`audience-focus-country-${platform.type}`) as HTMLInputElement
            ).value,
            platform_focus: (document.getElementById(`platform-focus-${platform.type}`) as HTMLInputElement).value,
            follower_count: parseInt(
                (document.getElementById(`follower-count-${platform.type}`) as HTMLInputElement).value
            ) || 0,
        }));
    
        // Constructing the updated influencer object
        const updatedInfluencer: Influencer = {
            influencer_id: influencerData?.influencer_id || crypto.randomUUID(),
            full_name: (document.getElementById("full_name") as HTMLInputElement).value,
            preferred_name: (document.getElementById("preferred_name") as HTMLInputElement).value,
            contact_no: (document.getElementById("contact_no") as HTMLInputElement).value,
            alt_contact_no: (document.getElementById("alt_contact_no") as HTMLInputElement).value,
            email_address: (document.getElementById("email_address") as HTMLInputElement).value,
            address,
            platforms: updatedPlatforms,
            total_follower_count: updatedPlatforms.reduce(
                (total, platform) => total + platform.follower_count,
                0
            ),
        };
    
        // Call the update handler with the updated influencer object
        handleUpdate(updatedInfluencer);
        closeUpdateModal();
    };

    return (
        <Dialog open={updateModalVisibility}>
            <DialogContent
                className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
                    md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px] max-h-[550px] overflow-y-scroll"
                onEscapeKeyDown={closeUpdateModal}
                modalTopRightClose={closeUpdateModal}
            >
                <DialogHeader>
                    <DialogTitle>Editing {influencerData?.full_name}'s Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to the influencer's profile here. Click save changes when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-4">
                    <Input
                        className="col-span-1"
                        type="text"
                        id="full_name"
                        placeholder="Full Name"
                        defaultValue={influencerData?.full_name}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="preferred_name"
                        placeholder="Preferred Name"
                        defaultValue={influencerData?.preferred_name}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="contact_no"
                        placeholder="Contact Number"
                        defaultValue={influencerData?.contact_no}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="alt_contact_no"
                        placeholder="Alternative Contact Number"
                        defaultValue={influencerData?.alt_contact_no}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="email"
                        id="email_address"
                        placeholder="Email Address"
                        defaultValue={influencerData?.email_address}
                        required
                    />
                    <Input
                        className="col-span-2"
                        type="text"
                        id="address"
                        placeholder="Address"
                        defaultValue={influencerData?.address.address}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="postcode"
                        placeholder="Postcode"
                        defaultValue={influencerData?.address.postcode}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="city"
                        placeholder="City"
                        defaultValue={influencerData?.address.city}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="state"
                        placeholder="State"
                        defaultValue={influencerData?.address.state}
                        required
                    />
                    <Input
                        className="col-span-1"
                        type="text"
                        id="country"
                        placeholder="Country"
                        defaultValue={influencerData?.address.country}
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
                                        checked={isPlatformSelected(type as SocialMediaPlatform["type"])}
                                        onSelect={() => handleTogglePlatform(type as SocialMediaPlatform["type"])}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {platforms.map((platform, index) => (
                        <div className="mb-2">
                            <p className="capitalize ml-1 text-lg font-semibold mb-2">{platform.type}</p>
                            <div className="grid grid-cols-4 gap-4">
                                <Input
                                    className="col-span-1"
                                    type="text"
                                    id={`industry-${platform.type}`}
                                    placeholder="Type"
                                    defaultValue={platform.industry}
                                    required
                                />
                                <Input
                                    className="col-span-1"
                                    type="text"
                                    id={`audience-focus-country-${platform.type}`}
                                    placeholder="Audience Focus Country"
                                    defaultValue={platform.audience_focus_country}
                                    required
                                />
                                <Input
                                    className="col-span-1"
                                    type="text"
                                    id={`platform-focus-${platform.type}`}
                                    placeholder="Platform Focus"
                                    defaultValue={platform.platform_focus}
                                    required
                                />
                                <Input
                                    className="col-span-1"
                                    type="number"
                                    id={`follower-count-${platform.type}`}
                                    placeholder="Follower Count"
                                    defaultValue={platform.follower_count}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={closeUpdateModal} className="bg-gray-400 hover:bg-gray-500">
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
