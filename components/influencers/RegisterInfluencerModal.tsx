import { Influencer, SocialMediaPlatform } from '@/data/influencer';
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
import { GetCountries } from 'react-country-state-city';
import { Country } from '@/data/shared';
import { toast } from '@/hooks/use-toast';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { capitalizeFirstLetter } from '@/lib/utils';
import {
  ddPlatformFocusValues,
  ddSocialMediaPlatformsValues,
  ddStatusValues,
} from '@/data/dropdown-values';
import { Checkbox } from '../ui/checkbox';

export const RegisterInfluencerModal = ({
  closeRegisterModal,
  handleRegister,
  registerModalVisibility,
}: {
  closeRegisterModal: () => void;
  handleRegister: (data: Influencer) => void;
  registerModalVisibility: boolean;
}) => {
  const initialPlatforms: SocialMediaPlatform[] = [];

  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [isMembership, setIsMembership] = useState<boolean>(false);
  const [status, setStatus] = useState<Influencer['status']>('Pending Approval');

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
    trigger,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      full_name: '',
      preferred_name: '',
      contact_number: '',
      alt_contact_number: '',
      email_address: '',
      industry: 'Food & Beverage',
      whatsapp_consent: false,
      whatsapp_invited: false,
      community_invited: false,
      country: '',
      state: '',
      city: '',
      address: '',
      postcode: '',
      tnc_consent: false,
      multiple_countries: false,
      additional_country: false,
      is_membership: false,
      rate: '0',
      status: 'Pending Approval',
      platforms: initialPlatforms,
    },
  });

  const {
    fields: platformFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'platforms', // Corresponds to the default value's platforms
  });

  //Get the Countries List.
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

  // Reset platforms when modal visibility changes to closed
  useEffect(() => {
    if (!registerModalVisibility) {
      clearErrors();
      reset();
    }
  }, [registerModalVisibility, setValue]);

  const handleTogglePlatform = (type: SocialMediaPlatform['platform_name']) => {
    const existingIndex = platformFields.findIndex((platform) => platform.platform_name === type);

    if (existingIndex !== -1) {
      // Remove the platform if it exists
      remove(existingIndex);
    } else {
      // Add a new platform
      append({
        // account_id: crypto.randomUUID(),
        // influencer_id: crypto.randomUUID(),
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

  const handleValidation = async () => {
    const isValid = await trigger();
    if (!isValid) {
      const displayErrorMessages = (fieldErrors: any) => {
        Object.values(fieldErrors).forEach((error: any) => {
          if (error?.message) {
            toast({
              title: 'Validation Error',
              description: error.message,
              variant: 'destructive',
              duration: 3000,
            });
          } else if (Array.isArray(error)) {
            error.forEach((nestedError) => displayErrorMessages(nestedError));
          } else if (typeof error === 'object') {
            displayErrorMessages(error);
          }
        });
      };

      displayErrorMessages(errors); // Start processing the errors object
    }
  };

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

  const onSubmit = async (data: any) => {
    // Stop Form Submission when Validation Fails.
    const isValid = handleSocMedValidation();
    if (!isValid) return;
    const token = localStorage.getItem('token');
    console.log(data);
    const formattedAccounts: SocialMediaPlatform[] = data.platforms.map(
      ({
        social_media_url,
        platform_name,
        account_type,
        platform_focus,
        follower_count,
      }: {
        influencer_id: number;
        social_media_url: string;
        platform_name: 'instagram' | 'tiktok' | 'youtube' | 'RED';
        account_type: 'Food Influencer' | "Photographer";
        platform_focus: 'UGC' | 'Food' | 'Lifestyle';
        follower_count: number;
      }): SocialMediaPlatform => ({
        social_media_url,
        platform_name,
        account_type,
        platform_focus,
        follower_count,
      }),
    );

    const influencer = new FormData();
    influencer.append('full_name', data.full_name);
    influencer.append('preferred_name', data.preferred_name);
    influencer.append('contact_number', data.contact_number);
    influencer.append('alt_contact_number', data.alt_contact_number);
    influencer.append('email_address', data.email_address);
    influencer.append('country', data.country);
    influencer.append('state', data.state);
    influencer.append('city', data.city);
    influencer.append('postcode', data.postcode);
    influencer.append('address', data.address);
    influencer.append('whatsapp_consent', data.whatsapp_consent);
    influencer.append('whatsapp_invited', data.whatsapp_invited);
    influencer.append('community_invited', data.community_invited);
    influencer.append('industry', data.industry);
    //No field for invite_count
    influencer.append('invite_count', '100');
    influencer.append('rate', data.rate);
    influencer.append('status', data.status);
    influencer.append('accounts', JSON.stringify(formattedAccounts));
    influencer.append('is_membership', data.is_membership);
    const newInfluencer: Influencer = {
      influencer_id: crypto.randomUUID(),
      full_name: data.full_name,
      preferred_name: data.preferred_name,
      contact_number: data.contact_number,
      alt_contact_number: data.alt_contact_number,
      email_address: data.email_address,
      whatsapp_consent: false,
      whatsapp_invited: false,
      community_invited: false,
      industry: data.industry,
      address: {
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        state: data.state,
        country: data.country,
      },
      multiple_countries: false,
      additional_country: false,
      is_membership: isMembership,
      rate: data.rate,
      platforms: data.platforms, // Use data.platforms directly
      total_follower_count: data.platforms.reduce(
        (total: number, platform: SocialMediaPlatform) => total + platform.follower_count,
        0,
      ),
      category: 'Undecided',
      invite_count: 0,
      status: data.status,
    };

    try {
      const response = await fetch(
        'https://backend-development-3158.up.railway.app/api/v1/influencers',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
          body: influencer,
        },
      );
      const data = await response.json();
      if (data.message != null) {
        throw new Error(data.message);
      } else {
        handleRegister(newInfluencer);
        reset();
        closeRegisterModal();
      }
    } catch (error) {
      console.error('An error occurred: ', error);
      toast({
        title: 'Register Failed!',
        description: 'An error occurred while registering influencer.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={registerModalVisibility}>
      <DialogContent
        className="max-h-[550px] overflow-y-scroll xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]"
        onEscapeKeyDown={closeRegisterModal}
        modalTopRightClose={closeRegisterModal}
      >
        <DialogHeader>
          <DialogTitle>Register New Influencer</DialogTitle>
          <DialogDescription>Fill in the details below to add a new influencer.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 xxxs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {/* Full Name */}
            <Input
              className={`col-span-2 ${errors.full_name ? 'border-red-500' : ''}`}
              type="text"
              {...register('full_name', {
                required: { value: true, message: 'Full Name is required.' },
              })}
              placeholder="Full Name"
            />

            {/* Preferred Name */}
            <Input
              className={`col-span-2 ${errors.preferred_name ? 'border-red-500' : ''}`}
              type="text"
              {...register('preferred_name', {
                required: { value: true, message: 'Preferred Name is required.' },
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
                  message: 'Value provided does not match email format.',
                },
              })}
              placeholder="Email Address"
            />

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

            {/* Status */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="col-span-2 w-full justify-between border px-3">
                  {capitalizeFirstLetter(status)}
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
              <div key={platform.id} className="mb-0">
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
                        <DropdownMenuContent align="start" className="w-[200px]">
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
          <Separator className="my-4" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                className={`${errors.whatsapp_consent ? 'border-red-500' : ''}`}
                onCheckedChange={(checked: boolean) => {
                  setValue('whatsapp_consent', checked);
                }}
                {...register('whatsapp_consent')}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I will like to receive more updates by joining the
                <a className="ml-1 cursor-pointer underline transition-all duration-300 hover:opacity-70">
                  WhatsApp Community Group
                </a>
                .
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                className={`${errors.tnc_consent ? 'border-red-500' : ''}`}
                onCheckedChange={(checked: boolean) => {
                  setValue('tnc_consent', checked);
                }}
                {...register('tnc_consent', {
                  required: {
                    value: true,
                    message: 'You must agree to the terms and conditions.',
                  },
                })}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By submitting this form, I acknowledge and agree that my information may be shared
                with clients for future collaboration invitations or updates.
                <span className="text-sm text-red-600">*</span>
              </label>
            </div>
          </div>
          <DialogFooter className="mt-5">
            <div className="flex gap-2 xxxs:flex-col-reverse sm:flex-row">
              <Button
                type="button"
                onClick={closeRegisterModal}
                className="flex-shrink-0 transition-all duration-300 hover:bg-red-600 hover:text-white xxxs:bg-red-600 lg:bg-neutral-400"
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleValidation}>
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
