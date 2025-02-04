import {
  getSocialMediaPlatformsByInfluencerId,
  Influencer,
  InfluencerWithPlatforms,
  SocialMediaPlatform,
} from '@/data/influencer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ChevronDown, PlusIcon } from 'lucide-react';
import { AddressDropdowns, CountryInput } from '../ui/addressDropdown';
import { Country } from '@/data/shared';
import { GetCountries } from 'react-country-state-city';
import { toast } from '@/hooks/use-toast';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { capitalizeFirstLetter, formatInfluencerCategory, handleValidation } from '@/lib/utils';
import {
  ddAccountTypeValues,
  ddCategoryValues,
  ddIndustryValues,
  ddPlatformFocusValues,
  ddSocialMediaPlatformsValues,
  ddStatusValues,
} from '@/data/dropdown-values';

export const UpdateInfluencerModal = ({
  influencerData,
  closeUpdateModal,
  handleUpdate,
  updateModalVisibility,
}: {
  influencerData: InfluencerWithPlatforms | null;
  closeUpdateModal: () => void;
  handleUpdate: (data: InfluencerWithPlatforms) => void;
  updateModalVisibility: boolean;
}) => {
  const [originalPlatforms, setOriginalPlatforms] = useState<SocialMediaPlatform[]>(
    influencerData?.platforms || [],
  );
  const [isPlatformsModified, setIsPlatformsModified] = useState(false);
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [status, setStatus] = useState<Influencer['status']>('Active');
  const [isMembership, setIsMembership] = useState<boolean>(false);
  const [industry, setIndustry] = useState<Influencer['industry']>('Food & Beverage');
  const [category, setCategory] = useState<Influencer['category']>('Undecided');

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    clearErrors,
    formState: { errors },
    trigger,
  } = useForm<InfluencerWithPlatforms>({
    mode: 'onSubmit',
  });

  const {
    fields: platformFields,
    append,
    remove,
    update,
    replace,
  } = useFieldArray({
    control,
    name: 'platforms', // Corresponds to the default value's platforms
  });

  useEffect(() => {
    if (influencerData && influencerData.platforms) {
      // Replace the field array with updated influencerData platforms
      replace(influencerData.platforms);
    }
  }, [influencerData, replace]);

  // Important to set Influencer's initial data.
  useEffect(() => {
    clearErrors();
    if (influencerData) {
      reset({
        influencer_id: influencerData?.influencer_id || '',
        full_name: influencerData?.full_name || '',
        preferred_name: influencerData?.preferred_name || '',
        contact_number: influencerData?.contact_number || '',
        alt_contact_number: influencerData?.alt_contact_number || '',
        email_address: influencerData?.email_address || '',
        industry: influencerData?.industry || 'Food & Beverage',
        whatsapp_consent: influencerData?.whatsapp_consent || false,
        whatsapp_invited: influencerData?.whatsapp_invited || false,
        community_invited: influencerData?.community_invited || false,
        country: influencerData?.country || '',
        state: influencerData?.state || '',
        city: influencerData?.city || '',
        address: influencerData?.address || '',
        postcode: influencerData?.postcode || '',
        category: influencerData?.category || 'Undecided',
        rate: influencerData?.rate || '',
        multiple_countries: influencerData?.multiple_countries || false,
        additional_country: influencerData?.additional_country || false,
        is_membership: influencerData?.is_membership || false,
        invite_count: influencerData?.invite_count || 0,
        status: influencerData?.status || 'Pending Approval',
        platforms: influencerData?.platforms || [],
      });
      setIndustry(influencerData.industry);
      setCategory(influencerData.category);
      setStatus(influencerData.status);
      replace(influencerData.platforms || []);
    }
  }, [influencerData, reset, replace, updateModalVisibility]);

  // Fetching the countries list
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await GetCountries();
        setCountriesList(countries);
      } catch (error) {
        console.error('Failed to fetch countries', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!updateModalVisibility) {
      if (!isPlatformsModified) {
        setValue('platforms', originalPlatforms); // Reset only if platforms weren't modified
      }
    }
  }, [updateModalVisibility, originalPlatforms, setValue, isPlatformsModified]);

  // Handle when platform is toggled.
  const handleTogglePlatform = (type: SocialMediaPlatform['platform_name']) => {
    const existingIndex = platformFields.findIndex((platform) => platform.platform_name === type);

    if (existingIndex !== -1) {
      // Remove the platform if it exists
      remove(existingIndex);
    } else {
      // Add a new platform
      append({
        // account_id: crypto.randomUUID(),
        influencer_id: influencerData?.influencer_id || '',
        social_media_url: '',
        platform_name: type,
        account_type: 'Food Influencer',
        platform_focus: 'UGC',
        follower_count: 0,
      });
    }
  };

  const isPlatformSelected = (type: SocialMediaPlatform['platform_name']) =>
    platformFields.some((platform) => platform.platform_name === type);

  const handleSocMedValidation = () => {
    if (platformFields.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please provide at least one Social Media Platform.',
        variant: 'destructive',
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  const onSubmit = async (data: InfluencerWithPlatforms) => {
    // Stop Form Submission when Validation Fails.
    const isValid = handleSocMedValidation();
    if (!isValid) return;

    data.industry = industry;
    data.is_membership = isMembership;
    const totalFollowerCount = data.platforms.reduce(
      (total, platform) => total + platform.follower_count,
      0,
    );
    data.category = formatInfluencerCategory(totalFollowerCount) as typeof data.category;
    data.status = status;

    handleUpdate(data);
    closeUpdateModal();
    reset();
  };

  return (
    <Dialog open={updateModalVisibility}>
      <DialogContent
        className="max-h-[550px] overflow-y-scroll xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]"
        onEscapeKeyDown={closeUpdateModal}
        modalTopRightClose={closeUpdateModal}
      >
        <DialogHeader>
          <DialogTitle>Editing {influencerData?.full_name}'s Profile</DialogTitle>
          <DialogDescription>
            Make changes to the influencer's profile here. Click save changes when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 xxxs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {/* Full Name */}
            <Input
              className={`col-span-2 ${errors.full_name ? 'border-red-500' : ''}`}
              type="text"
              {...register('full_name', {
                required: {
                  value: true,
                  message: 'Full Name is required.',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Full Name must contain only alphabets.',
                },
              })}
              placeholder="Full Name"
            />

            {/* Preferred Name */}
            <Input
              className={`col-span-2 ${errors.preferred_name ? 'border-red-500' : ''}`}
              type="text"
              {...register('preferred_name', {
                required: {
                  value: true,
                  message: 'Preferred Name is required.',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Preferred Name must contain only alphabets.',
                },
              })}
              placeholder="Preferred Name"
            />

            {/* Contact Number */}
            <Input
              className={`col-span-2 ${errors.contact_number ? 'border-red-500' : ''}`}
              type="text"
              {...register('contact_number', {
                required: {
                  value: true,
                  message: 'Contact Number is required.',
                },
                pattern: {
                  value: /^\+\d{1,4}\d{7,15}$/,
                  message: 'Contact Number must include country code and be digits only.',
                },
                minLength: {
                  value: 8,
                  message: 'Contact Number must be at least 8 digits.',
                },
                maxLength: {
                  value: 19, // + (1-4 country code) + (7-15 phone number)
                  message: 'Contact Number must not exceed 19 digits.',
                },
              })}
              placeholder="Contact Number (+1234567890)"
            />

            {/* Alt Contact Number */}
            <Input
              className={`col-span-2 ${errors.alt_contact_number ? 'border-red-500' : ''}`}
              type="text"
              {...register('alt_contact_number', {
                pattern: {
                  value: /^\+\d{1,4}\d{7,15}$/,
                  message:
                    'Alternative Contact Number must include country code and be digits only.',
                },
                minLength: {
                  value: 8,
                  message: 'Alternative Contact Number must be at least 8 digits.',
                },
                maxLength: {
                  value: 19, // + (1-4 country code) + (7-15 phone number)
                  message: 'Alternative Contact Number must not exceed 19 digits.',
                },
              })}
              placeholder="Alt Contact Number (+1234567890)"
            />

            {/* Email Address */}
            <Input
              className={`col-span-2 ${errors.email_address ? 'border-red-500' : ''}`}
              type="email"
              {...register('email_address', {
                required: {
                  value: true,
                  message: 'Email Address is required.',
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email Address provided does not match email format.',
                },
              })}
              placeholder="Email Address"
            />

            {/* Industry */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="col-span-2 w-full justify-between border px-3">
                  {capitalizeFirstLetter(industry)}
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[190px] max-w-full" align="start">
                {ddIndustryValues.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setIndustry(option as Influencer['industry'])}
                    className="cursor-pointer"
                  >
                    {capitalizeFirstLetter(option)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Country, State, City */}
            <AddressDropdowns
              country={getValues('country')}
              setCountry={(value) => {
                setValue('country', value, { shouldValidate: true });
                trigger();
              }}
              countryMessage="Country is required."
              countryClassname={`xxxs:col-span-2 sm:col-span-1 md:col-span-2 ${errors.country ? 'border-red-500' : ''}`}
              countryInputName="country"
              state={getValues('state')}
              setState={(value) => {
                setValue('state', value, { shouldValidate: true });
                trigger();
              }}
              stateMessage="State is required."
              stateClassname={`xxxs:col-span-2 sm:col-span-1 md:col-span-2 ${errors.state ? 'border-red-500' : ''}`}
              stateInputName="state"
              city={getValues('city')}
              setCity={(value) => {
                setValue('city', value, { shouldValidate: true });
                trigger();
              }}
              cityMessage="City is required."
              cityClassname={`xxxs:col-span-2 sm:col-span-1 md:col-span-2 ${errors.city ? 'border-red-500' : ''}`}
              cityInputName="city"
              control={control}
            />

            {/* Postcode */}
            <Input
              className={`xxxs:col-span-2 sm:col-span-1 lg:col-span-2 ${errors.postcode ? 'border-red-500' : ''}`}
              type="text"
              {...register('postcode', {
                required: {
                  value: true,
                  message: `Postcode is required.`,
                },
                minLength: {
                  value: 4,
                  message: `Postcode must be at least 4 numbers.`,
                },
                maxLength: {
                  value: 6,
                  message: `Postcode must be no more than 6 numbers.`,
                },
                pattern: {
                  value: /^\d+$/,
                  message: `Postcode must contain numbers only.`,
                },
              })}
              placeholder="Postcode"
            />

            {/* Address */}
            <Input
              className={`xxxs:col-span-2 md:col-span-3 lg:col-span-4 ${errors.address ? 'border-red-500' : ''}`}
              type="text"
              {...register('address', {
                required: { value: true, message: 'Address is required.' },
              })}
              placeholder="Address"
            />

            {/* Is Membership */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between border px-3 xxxs:col-span-2 xs:col-span-1 md:col-span-2"
                >
                  {isMembership ? 'Has Membership' : 'No Membership'}
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[190px] max-w-full" align="start">
                <DropdownMenuItem onClick={() => setIsMembership(false)} className="cursor-pointer">
                  No Membership
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsMembership(true)} className="cursor-pointer">
                  Has Membership
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rate */}
            <Input
              className={`xxxs:col-span-2 xs:col-span-1 md:col-span-2 ${errors.rate ? 'border-red-500' : ''}`}
              type="text"
              {...register('rate', {
                required: {
                  value: true,
                  message: 'Rate is required.',
                },
                pattern: {
                  value: /^\d+$/,
                  message: 'Rate must contain numbers only.',
                },
                min: {
                  value: 0,
                  message: 'Rate must be at least 0.',
                },
                max: {
                  value: 100,
                  message: 'Rate must not exceed 100.',
                },
              })}
              placeholder="Rate (0-100)"
            />

            {/* Category */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="col-span-2 w-full justify-between border px-3">
                  {capitalizeFirstLetter(category)}
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[190px] max-w-full" align="start">
                {ddCategoryValues.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setCategory(option as Influencer['category'])}
                    className="cursor-pointer"
                  >
                    {capitalizeFirstLetter(option)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="col-span-2 w-full justify-between border px-3">
                  Status: {capitalizeFirstLetter(status)}
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[190px] max-w-full" align="start">
                {ddStatusValues.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setStatus(option as Influencer['status'])}
                    className="cursor-pointer"
                  >
                    {capitalizeFirstLetter(option)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator className="my-4" />
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="bg-neutral-300 hover:bg-neutral-300/75 dark:bg-neutral-800 dark:hover:bg-neutral-800/75"
                  >
                    Add Platform <PlusIcon className="ml-2 h-4 w-4 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {ddSocialMediaPlatformsValues.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={isPlatformSelected(type as SocialMediaPlatform['platform_name'])}
                      onSelect={() =>
                        handleTogglePlatform(type as SocialMediaPlatform['platform_name'])
                      }
                    >
                      <label htmlFor={type}>{capitalizeFirstLetter(type)}</label>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {platformFields.map((platform, index) => (
              <div key={platform.id} className="mb-2">
                <p className="ml-1 text-lg font-semibold capitalize">{platform.platform_name}</p>
                <div className="grid gap-4 xxxs:grid-cols-2 lg:grid-cols-4">
                  {/* Social Media URL */}
                  <Input
                    className={`col-span-2 ${
                      errors.platforms?.[index]?.social_media_url ? 'border-red-500' : ''
                    }`}
                    type="text"
                    placeholder="Social Media URL"
                    {...register(`platforms.${index}.social_media_url`, {
                      required: {
                        value: true,
                        message: `${capitalizeFirstLetter(platform.platform_name)}'s Social Media URL is required.`,
                      },
                      pattern: {
                        value:
                          /^(https?:\/\/)?(www\.)?(youtube\.com|tiktok\.com|xiaohongshu\.com|instagram\.com)(\/.*)?$/,
                        message: `${capitalizeFirstLetter(platform.platform_name)}'s Social Media URL must be from YouTube, TikTok, XiaoHongShu, or Instagram.`,
                      },
                    })}
                  />

                  {/* Account Type */}
                  <Controller
                    name={`platforms.${index}.account_type`}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: `${capitalizeFirstLetter(platform.platform_name)}'s Account Type is required.`,
                      },
                    }}
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            {...field} // Spread the Controller field here
                            variant="outline"
                            className="justify-between xxxs:col-span-2 sm:col-span-1"
                          >
                            <span>{field.value || 'Select Account Type'}</span>
                            <ChevronDown className="ml-2 h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[200px]">
                          {ddAccountTypeValues.map((option) => (
                            <DropdownMenuItem
                              key={option}
                              onClick={() =>
                                setValue(
                                  `platforms.${index}.account_type`,
                                  option as SocialMediaPlatform['account_type'],
                                  { shouldValidate: true },
                                )
                              }
                              className="cursor-pointer"
                            >
                              {capitalizeFirstLetter(option)}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />

                  {/* Platform Focus */}
                  <Controller
                    name={`platforms.${index}.platform_focus`}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: `${capitalizeFirstLetter(platform.platform_name)}'s Platform Focus is required.`,
                      },
                    }}
                    render={({ field }) => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            {...field} // Spread the Controller field here
                            variant="outline"
                            className="justify-between xxxs:col-span-2 sm:col-span-1"
                          >
                            <span>{field.value || 'Select Platform Focus'}</span>
                            <ChevronDown className="ml-2 h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {ddPlatformFocusValues.map((option) => (
                            <DropdownMenuItem
                              key={option}
                              onClick={() =>
                                setValue(
                                  `platforms.${index}.platform_focus`,
                                  option as SocialMediaPlatform['platform_focus'],
                                  { shouldValidate: true },
                                )
                              }
                              className="cursor-pointer"
                            >
                              {capitalizeFirstLetter(option)}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  />

                  {/* Follower Count */}
                  <Input
                    className={`hidden xxxs:col-span-2 sm:col-span-1 ${
                      errors.platforms?.[index]?.follower_count ? 'border-red-500' : ''
                    }`}
                    type="number"
                    placeholder="Follower Count"
                    {...register(`platforms.${index}.follower_count`, {
                      valueAsNumber: true,
                      required: {
                        value: true,
                        message: `${capitalizeFirstLetter(platform.platform_name)}'s Follower Count is required.`,
                      },
                    })}
                  />
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="mt-5">
            <div className="mt-4 flex gap-2 xxxs:flex-col-reverse sm:flex-row">
              <Button
                type="button"
                onClick={closeUpdateModal}
                className="flex-shrink-0 transition-all duration-300 hover:bg-red-600 hover:text-white xxxs:bg-red-600 lg:bg-neutral-400"
              >
                Cancel
              </Button>
              <Button type="submit" onClick={() => handleValidation(trigger, errors)}>
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
