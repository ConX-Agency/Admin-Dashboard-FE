// import { Influencer, InfluencerAddress } from "@/data/influencer";
// import { useEffect, useState } from "react";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { ActionButton, Button } from "../ui/button";
// import { Separator } from "../ui/separator";

// export const RegisterInfluencerModal = ({ closeRegisterModal, handleRegister, registerModalVisibility }:
//     {
//         closeRegisterModal: () => void;
//         handleRegister: (data: Influencer) => void;
//         registerModalVisibility: boolean;
//     }) => {
//         const [platforms, setPlatforms] = useState<SocialMediaPlatform[]>([]);

//         useEffect(() => {
//             if (updateModalVisibility) {
//                 setPlatforms(
//                     influencerData?.platforms.map((platform, index) => ({
//                         ...platform,
//                         id: index,
//                     })) || [
//                         {
//                             type: "instagram",
//                             industry: "",
//                             audience_focus_country: "",
//                             platform_focus: "",
//                             follower_count: 0,
//                             follower_count_tag: "",
//                         },
//                     ]
//                 );
//             }
//         }, [updateModalVisibility, influencerData]);
    
//         const addPlatform = () => {
//             setPlatforms([
//                 ...platforms,
//                 {
//                     type: "instagram",
//                     industry: "",
//                     audience_focus_country: "",
//                     platform_focus: "",
//                     follower_count: 0,
//                     follower_count_tag: "",
//                 },
//             ]);
//         };
    
//         const removePlatform = (index: number) => {
//             setPlatforms(platforms.filter((_, idx) => idx !== index));
//         };
//     const saveClient = () => {
//         const influencer: Influencer = {
//             influencer_id: crypto.randomUUID(),
//             full_name: (document.getElementById("full_name") as HTMLInputElement).value,
//             preferred_name: (document.getElementById("preferred_name") as HTMLInputElement).value,
//             contact_no: (document.getElementById("contact_no") as HTMLInputElement).value,
//             alt_contact_no: (document.getElementById("alt_contact_no") as HTMLInputElement).value,
//             email_address: (document.getElementById("email_address") as HTMLInputElement).value,
//             address: {
//                 address: (document.getElementById(`address`) as HTMLInputElement).value,
//                 city: (document.getElementById(`city`) as HTMLInputElement).value,
//                 postcode: (document.getElementById(`postcode`) as HTMLInputElement).value,
//                 state: (document.getElementById(`state`) as HTMLInputElement).value,
//                 country: (document.getElementById(`country`) as HTMLInputElement).value,
//             },
//             platforms: platforms,
//             total_follower_count: platforms.reduce((acc, platform): {acc: any; platform: any} => acc + platform.follower_count, 0),
//         };

//         // Pass the client object to the handleRegister callback
//         handleRegister(influencer);
//         closeRegisterModal(); // Close the modal after saving
//     };

//     return (
//         <>
//             <Dialog open={registerModalVisibility}>
//                 <DialogContent className="xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] 
//                     md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px] max-h-[550px] overflow-y-scroll"
//                     onEscapeKeyDown={closeRegisterModal} modalTopRightClose={closeRegisterModal}>
//                     <DialogHeader>
//                         <DialogTitle>Register New Client</DialogTitle>
//                         <DialogDescription>
//                             Register a new client here. Click save when you're done.
//                         </DialogDescription>
//                     </DialogHeader>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Input type="text" id="company_name" placeholder="Company Name" className="col-span-2" required />
//                         <Input type="email" id="company_email_address" placeholder="Company Email Address" className="col-span-1" required />
//                         <Input type="text" id="contact_number" placeholder="Contact Number" className="col-span-1" required />
//                         <Input type="text" id="pic_name" placeholder="PIC Name" className="col-span-2" required />
//                         <Input type="email" id="pic_email" placeholder="PIC Email" className="col-span-1" required />
//                         <Input type="text" id="alt_contact_no" placeholder="Alt Contact Number" className="col-span-1" required />
//                         <Input type="text" id="industry" placeholder="Industry" className="col-span-1" required />
//                         <Input type="text" id="category" placeholder="Category" className="col-span-1" required />
//                         <Input type="text" id="subscription" placeholder="Subscription" className="col-span-1" required />
//                     </div>
//                     <Separator className="my-2 mb-0" />
//                     <div className="flex flex-col w-full gap-4">
//                         <div className="w-full justify-end flex items-center">
//                             <ActionButton
//                                 onClick={addPlatform} // Replace with function to add new address section
//                                 icon="plus"
//                                 label="Add More Address"
//                                 textBtn="More Address"
//                                 className="dark:bg-neutral-800 bg-neutral-300 hover:bg-neutral-300/75 dark:hover:bg-neutral-800/75"
//                             />
//                         </div>
//                         {platform.map((platform, index) => (
//                             <div key={platform.id} className="flex flex-col gap-4 mb-2" id={`address-form-${platform.id}`}>
//                                 <div className="flex flex-row items-center justify-between">
//                                     <h1 className="ml-1 text-lg font-semibold">Address #{index + 1}</h1>
//                                     {index > 0 && (
//                                         <ActionButton
//                                             onClick={() => removeAddress(platform.id!)}
//                                             icon="trash"
//                                             label="Remove Address"
//                                             className="dark:bg-neutral-800 bg-neutral-300 py-0 px-0 ml-2 h-[35px] w-[35px]"
//                                         />
//                                     )}
//                                 </div>
//                                 <div className="grid grid-cols-4 items-center gap-4">
//                                     <Input type="text" id={`address-${platform.id}`} placeholder="Address" className="col-span-3" required />
//                                     <Input type="number" id={`postcode-${platform.id}`} placeholder="Postcode" className="col-span-1" required />
//                                     <Input type="text" id={`city-${platform.id}`} placeholder="City" className="col-span-1" required />
//                                     <Input type="text" id={`state-${platform.id}`} placeholder="State" className="col-span-1" required />
//                                     <Input type="text" id={`country-${platform.id}`} placeholder="Country" className="col-span-1" required />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <DialogFooter>
//                         <Button onClick={closeRegisterModal}
//                             className="bg-neutral-400 hover:bg-red-600 hover:text-white transition-all duration-300 flex-shrink-0">
//                             Cancel
//                         </Button>
//                         <Button onClick={saveClient} className="">Save</Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// };
