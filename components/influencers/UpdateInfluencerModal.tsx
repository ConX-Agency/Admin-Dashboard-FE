// import { Influencer, SocialMediaPlatform } from "@/data/influencer";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { ActionButton, Button } from "../ui/button";
// import { Separator } from "../ui/separator";
// import { useEffect, useState } from "react";

// export const UpdateInfluencerModal = ({
//     influencerData,
//     closeUpdateModal,
//     handleUpdate,
//     updateModalVisibility,
// }: {
//     influencerData: Influencer | null;
//     closeUpdateModal: () => void;
//     handleUpdate: (data: Influencer) => void;
//     updateModalVisibility: boolean;
// }) => {
//     const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>([]);

//     useEffect(() => {
//         if (updateModalVisibility) {
//             setPlatforms(
//                 influencerData?.platforms.map((platform, index) => ({
//                     ...platform,
//                     id: index,
//                 })) || [
//                     {
//                         type: "instagram",
//                         industry: "",
//                         audience_focus_country: "",
//                         platform_focus: "",
//                         follower_count: 0,
//                         follower_count_tag: "",
//                     },
//                 ]
//             );
//         }
//     }, [updateModalVisibility, influencerData]);

//     const addPlatform = () => {
//         setPlatforms([
//             ...platforms,
//             {
//                 type: "instagram",
//                 industry: "",
//                 audience_focus_country: "",
//                 platform_focus: "",
//                 follower_count: 0,
//                 follower_count_tag: "",
//             },
//         ]);
//     };

//     const removePlatform = (index: number) => {
//         setPlatforms(platforms.filter((_, idx) => idx !== index));
//     };

//     const handleSave = () => {
//         const updatedInfluencer: Influencer = {
//             influencer_id: influencerData?.influencer_id || crypto.randomUUID(),
//             full_name: (document.getElementById("full_name") as HTMLInputElement).value,
//             preferred_name: (document.getElementById("preferred_name") as HTMLInputElement).value,
//             contact_no: (document.getElementById("contact_no") as HTMLInputElement).value,
//             alt_contact_no: (document.getElementById("alt_contact_no") as HTMLInputElement).value,
//             email_address: (document.getElementById("email_address") as HTMLInputElement).value,
//             address: influencerData?.address || {
//                 address: "",
//                 city: "",
//                 postcode: "",
//                 state: "",
//                 country: "",
//             },
//             platforms: platforms,
//             total_follower_count: platforms.reduce((acc, platform) => acc + platform.follower_count, 0),
//         };

//         handleUpdate(updatedInfluencer);
//         closeUpdateModal();
//     };

//     return (
//         <Dialog open={updateModalVisibility}>
//             <DialogContent
//                 className="max-w-[90%] sm:max-w-[600px]"
//                 onEscapeKeyDown={closeUpdateModal}
//             >
//                 <DialogHeader>
//                     <DialogTitle>Editing {influencerData?.full_name}'s Profile</DialogTitle>
//                     <DialogDescription>
//                         Make changes to the influencer's profile here. Click save changes when you're done.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid grid-cols-2 gap-4">
//                     <Input
//                         type="text"
//                         id="full_name"
//                         placeholder="Full Name"
//                         defaultValue={influencerData?.full_name}
//                         required
//                     />
//                     <Input
//                         type="text"
//                         id="preferred_name"
//                         placeholder="Preferred Name"
//                         defaultValue={influencerData?.preferred_name}
//                         required
//                     />
//                     <Input
//                         type="text"
//                         id="contact_no"
//                         placeholder="Contact Number"
//                         defaultValue={influencerData?.contact_no}
//                         required
//                     />
//                     <Input
//                         type="text"
//                         id="alt_contact_no"
//                         placeholder="Alternative Contact Number"
//                         defaultValue={influencerData?.alt_contact_no}
//                         required
//                     />
//                     <Input
//                         type="email"
//                         id="email_address"
//                         placeholder="Email Address"
//                         defaultValue={influencerData?.email_address}
//                         required
//                     />
//                 </div>
//                 <Separator className="my-4" />
//                 <div className="flex flex-col gap-4">
//                     <div className="flex justify-end">
//                         <ActionButton
//                             onClick={addPlatform}
//                             icon="plus"
//                             label="Add Platform"
//                             className="bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700"
//                         />
//                     </div>
//                     {platforms.map((platform, index) => (
//                         <div key={index} className="flex flex-col gap-4">
//                             <div className="flex justify-between items-center">
//                                 <h2 className="font-semibold text-lg">Platform #{index + 1}</h2>
//                                 {index > 0 && (
//                                     <ActionButton
//                                         onClick={() => removePlatform(index)}
//                                         icon="trash"
//                                         label="Remove"
//                                         className="bg-red-500 text-white hover:bg-red-600"
//                                     />
//                                 )}
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <Input
//                                     type="text"
//                                     placeholder="Platform Type"
//                                     defaultValue={platform.type}
//                                     onChange={(e) =>
//                                         setPlatforms((platform_id: any) =>
//                                             prev.map((p, idx): =>
//                                                 idx === index ? { ...p, type: e.target.value } : p
//                                             )
//                                         )
//                                     }
//                                 />
//                                 <Input
//                                     type="text"
//                                     placeholder="Industry"
//                                     defaultValue={platform.industry}
//                                     onChange={(e) =>
//                                         setPlatforms((prev) =>
//                                             prev.map((p, idx) =>
//                                                 idx === index ? { ...p, industry: e.target.value } : p
//                                             )
//                                         )
//                                     }
//                                 />
//                                 <Input
//                                     type="text"
//                                     placeholder="Audience Focus Country"
//                                     defaultValue={platform.audience_focus_country}
//                                     onChange={(e) =>
//                                         setPlatforms((prev) =>
//                                             prev.map((p, idx) =>
//                                                 idx === index
//                                                     ? { ...p, audience_focus_country: e.target.value }
//                                                     : p
//                                             )
//                                         )
//                                     }
//                                 />
//                                 <Input
//                                     type="text"
//                                     placeholder="Platform Focus"
//                                     defaultValue={platform.platform_focus}
//                                     onChange={(e) =>
//                                         setPlatforms((prev) =>
//                                             prev.map((p, idx) =>
//                                                 idx === index ? { ...p, platform_focus: e.target.value } : p
//                                             )
//                                         )
//                                     }
//                                 />
//                                 <Input
//                                     type="number"
//                                     placeholder="Follower Count"
//                                     defaultValue={platform.follower_count.toString()}
//                                     onChange={(e) =>
//                                         setPlatforms((prev) =>
//                                             prev.map((p, idx) =>
//                                                 idx === index
//                                                     ? { ...p, follower_count: parseInt(e.target.value) || 0 }
//                                                     : p
//                                             )
//                                         )
//                                     }
//                                 />
//                                 <Input
//                                     type="text"
//                                     placeholder="Follower Count Tag"
//                                     defaultValue={platform.follower_count_tag}
//                                     onChange={(e) =>
//                                         setPlatforms((prev) =>
//                                             prev.map((p, idx) =>
//                                                 idx === index
//                                                     ? { ...p, follower_count_tag: e.target.value }
//                                                     : p
//                                             )
//                                         )
//                                     }
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <DialogFooter>
//                     <Button onClick={closeUpdateModal} className="bg-gray-400 hover:bg-gray-500">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
//                         Save Changes
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// };
