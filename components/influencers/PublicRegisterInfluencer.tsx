'use client';

import { Influencer, InfluencerWithPlatforms, SocialMediaPlatform } from '@/data/influencer';
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
import { AddressDropdowns } from '../ui/addressDropdown';
import { GetCountries } from 'react-country-state-city';
import { Country } from '@/data/shared';
import { toast } from '@/hooks/use-toast';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { capitalizeFirstLetter, formatInfluencerCategory, handleApiError, handleValidation } from '@/lib/utils';
import {
  ddAccountTypeValues,
  ddIndustryValues,
  ddPlatformFocusValues,
  ddSocialMediaPlatformsValues,
} from '@/data/dropdown-values';
import { Checkbox } from '../ui/checkbox';
import { useConx } from '@/context/ConxContext';
import { Label } from '../ui/label';

export const PublicRegisterInfluencer = () => {
  const initialPlatforms: SocialMediaPlatform[] = [];

  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [industry, setIndustry] = useState<InfluencerWithPlatforms['industry']>('Food & Beverage');
  const influencer_id = crypto.randomUUID();
  const { addInfluencer } = useConx();

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
  } = useForm<InfluencerWithPlatforms>({
    mode: 'onSubmit',
    defaultValues: {
      influencer_id: influencer_id,
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
      category: 'Undecided',
      rate: '0',
      multiple_countries: false,
      additional_country: false,
      is_membership: false,
      tnc_consent: false,
      invite_count: 0,
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
    clearErrors();
    reset();
  }, [setValue]);

  const handleTogglePlatform = (type: SocialMediaPlatform['platform_name']) => {
    const existingIndex = platformFields.findIndex((platform) => platform.platform_name === type);

    if (existingIndex !== -1) {
      // Remove the platform if it exists
      remove(existingIndex);
    } else {
      // Add a new platform
      append({
        // account_id: crypto.randomUUID(),
        influencer_id: influencer_id,
        social_media_url: '',
        platform_name: type,
        platform_focus: 'UGC',
        account_type: 'Food Influencer',
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

  const handleRegister = async (data: any) => {
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
    influencer.append('industry', data.industry);
    influencer.append('whatsapp_consent', data.whatsapp_consent.toString()! || 'FALSE');
    influencer.append('whatsapp_invited', data.whatsapp_invited?.toString()! || 'FALSE');
    influencer.append('community_invited', data.community_invited?.toString()! || 'FALSE');
    influencer.append('invite_count', '0');
    influencer.append('is_membership', data.is_membership?.toString()! || 'FALSE');
    influencer.append('rate', data.rate);
    influencer.append('category', data.category);
    influencer.append('status', data.status);
    influencer.append('accounts', JSON.stringify(data.platforms));

    try {
      const res = await addInfluencer(influencer);
      if (res.message != null) {
        toast({
          title: 'Registration API Failure!',
          description: 'An error occurred with the influencer Registeration API.',
          variant: 'destructive',
          duration: 3000,
        });
      } else {
        toast({
          title: 'Registeration is Successful',
          description: `Successfully registered new influencer, ${data.full_name}.`,
          duration: 3000,
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const onSubmit = async (data: InfluencerWithPlatforms) => {
    // Stop Form Submission when Validation Fails.
    const isValid = handleSocMedValidation();
    if (!isValid) return;

    data.industry = industry;
    const totalFollowerCount = data.platforms.reduce(
      (total, platform) => total + platform.follower_count,
      0,
    );
    data.category = formatInfluencerCategory(totalFollowerCount) as typeof data.category;

    handleRegister(data);
    reset();
  };

  return (
    <div className="h-[100vh - 40px] flex min-h-full w-full flex-col items-center justify-start px-4">
      <div className="mb-4 w-full text-left">
        <h1 className="mb-1 font-bold xxxs:text-2xl sm:text-3xl md:text-4xl">
          Influencer Registration Form
        </h1>
        <h2 className="leading-10 xxxs:text-xs sm:text-sm">
          This is a influencer registration form, please fill it up and click on the "Register"
          button to proceed.
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4 grid gap-4 xxxs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {/* Full Name */}
          <div className="flex flex-col col-span-2">
            <Label htmlFor="full_name" className="mb-1 text-xs ml-1 text-neutral-500">
              Full Name
            </Label>
            <Input
              className={`${errors.full_name ? 'border-red-500' : ''}`}
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
          </div>

          {/* Preferred Name */}
          <div className="flex flex-col col-span-2">
            <Label htmlFor="preferred_name" className="mb-1 text-xs ml-1 text-neutral-500">
              Preferred Name
            </Label>
            <Input
              className={`${errors.preferred_name ? 'border-red-500' : ''}`}
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
          </div>

          {/* Contact Number */}
          <div className="flex flex-col col-span-2">
            <Label htmlFor="contact_number" className="mb-1 text-xs ml-1 text-neutral-500">
              Contact Number
            </Label>
            <Input
              className={`${errors.contact_number ? 'border-red-500' : ''}`}
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
          </div>

          {/* Alt Contact Number */}
          <div className="flex flex-col col-span-2">
            <Label htmlFor="alt_contact_number" className="mb-1 text-xs ml-1 text-neutral-500">
              Alt Contact Number
            </Label>
            <Input
              className={`${errors.alt_contact_number ? 'border-red-500' : ''}`}
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
          </div>

          {/* Email Address */}
          <div className="flex flex-col col-span-2">
            <Label htmlFor="email_address" className="mb-1 text-xs ml-1 text-neutral-500">
              Email Address
            </Label>
            <Input
              className={`${errors.email_address ? 'border-red-500' : ''}`}
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
          </div>

          {/* Industry */}
          <div className="flex flex-col col-span-2">
            <Label htmlFor="industry" className="mb-1 text-xs ml-1 text-neutral-500">
              Industry
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-between border px-3">
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
          </div>

          {/* Country, State, City */}
          <AddressDropdowns
            country={getValues('country')}
            setCountry={(value) => {
              setValue('country', value, { shouldValidate: true });
              trigger();
            }}
            countryMessage="Country is required."
            countrySpan='xxxs:col-span-2 sm:col-span-1 md:col-span-2'
            countryClassname={`${errors.country ? 'border-red-500' : ''}`}
            countryInputName="country"
            state={getValues('state')}
            setState={(value) => {
              setValue('state', value, { shouldValidate: true });
              trigger();
            }}
            stateMessage="State is required."
            stateSpan='xxxs:col-span-2 sm:col-span-1 md:col-span-2'
            stateClassname={`${errors.state ? 'border-red-500' : ''}`}
            stateInputName="state"
            city={getValues('city')}
            setCity={(value) => {
              setValue('city', value, { shouldValidate: true });
              trigger();
            }}
            cityMessage="City is required."
            citySpan='xxxs:col-span-2 sm:col-span-1 md:col-span-2'
            cityClassname={`${errors.city ? 'border-red-500' : ''}`}
            cityInputName="city"
            control={control}
          />

          {/* Postcode */}
          <div className="flex flex-col xxxs:col-span-2 sm:col-span-1 lg:col-span-2">
            <Label htmlFor="postcode" className="mb-1 text-xs ml-1 text-neutral-500">
              Postcode
            </Label>
            <Input
              className={`${errors.postcode ? 'border-red-500' : ''}`}
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
          </div>

          {/* Address */}
          <div className="flex flex-col xxxs:col-span-2 md:col-span-3 lg:col-span-4">
            <Label htmlFor="address" className="mb-1 text-xs ml-1 text-neutral-500">
              Address
            </Label>
            <Input
              className={`${errors.address ? 'border-red-500' : ''}`}
              type="text"
              {...register('address', {
                required: { value: true, message: 'Address is required.' },
              })}
              placeholder="Address"
            />
          </div>
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
                <div className="flex flex-col col-span-2">
                  <Label htmlFor={`platforms.${index}.social_media_url`} className="mb-1 text-xs ml-1 text-neutral-500">
                    Social Media URL
                  </Label>
                  <Input
                    className={`${errors.platforms?.[index]?.social_media_url ? 'border-red-500' : ''
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
                </div>

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
                    <div className="flex flex-col xxxs:col-span-2 sm:col-span-1">
                      <Label htmlFor={`platforms.${index}.account_type`} className="mb-1 text-xs ml-1 text-neutral-500">
                        Account Type
                      </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            {...field} // Spread the Controller field here
                            variant="outline"
                            className="justify-between"
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
                    </div>
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
                    <div className="flex flex-col xxxs:col-span-2 sm:col-span-1">
                      <Label htmlFor={`platforms.${index}.platform_focus`} className="mb-1 text-xs ml-1 text-neutral-500">
                        Platform Focus
                      </Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            {...field} // Spread the Controller field here
                            variant="outline"
                            className="justify-between"
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
                    </div>
                  )}
                />

                {/* Follower Count */}
                <Input
                  className={`hidden xxxs:col-span-2 sm:col-span-1 ${errors.platforms?.[index]?.follower_count ? 'border-red-500' : ''
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
            {/* WhatsApp Consent */}
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
            {/* TNC */}
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
        <div className="mt-4 flex justify-end gap-2 xxxs:flex-col sm:flex-row">
          <Button
            type="submit"
            onClick={() => handleValidation(trigger, errors)}
            variant="outline"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};
