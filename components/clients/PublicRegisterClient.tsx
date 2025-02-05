'use client';

import { Client, clientAddress } from '@/data/clients';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { ActionButton, Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { AddressDropdowns } from '../ui/addressDropdown'; // Updated from AddressDropdown to AddressDropdowns
import { useFieldArray, useForm } from 'react-hook-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ddIndustryValues } from '@/data/dropdown-values';
import { capitalizeFirstLetter, handleApiError, handleValidation } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { useConx } from '@/context/ConxContext';
import { Label } from '../ui/label';

export const PublicRegisterClient = () => {
  const [industry, setIndustry] = useState<Client['industry']>('Food & Beverage');
  const client_id = crypto.randomUUID();
  const { addClient } = useConx();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    clearErrors,
    reset,
  } = useForm<Client>({
    mode: 'onSubmit',
    defaultValues: {
      client_id: '',
      company_name: '',
      company_email: '',
      contact_number: '',
      alt_contact_number: '',
      person_in_charge_name: '',
      person_in_charge_email: '',
      industry: '',
      category: '',
      addresses: [],
      tnc_consent: false,
      is_non_monetary: false,
      discount: 0,
      ways_to_use: '',
      status: 'Active',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  // Clear session cookies when component is destroyed.
  useEffect(() => {
    return () => {
      sessionStorage.clear(); // Clear session storage on unmount
      // console.log('Session cookies cleared on component unmount');
    };
  }, []); // Empty dependency array ensures cleanup runs on unmount.

  const addAddress = () => {
    append({
      clients_location_id: crypto.randomUUID(),
      client_id: client_id,
      address: '',
      city: '',
      postcode: '',
      state: '',
      country: '',
    } as clientAddress);
  };

  const removeAddress = (index: number) => {
    remove(index);
  };

  const handleAddressValidation = () => {
    if (fields.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please provide at least one Address.',
        variant: 'destructive',
        duration: 3000,
      });
      return false;
    }

    return true;
  };

  const handleRegister = async (data: Client) => {
    const client = new FormData();
    client.append('company_name', data.company_name);
    client.append('person_in_charge_name', data.person_in_charge_name);
    client.append('person_in_charge_email', data.person_in_charge_email);
    client.append('company_email', data.company_email);
    client.append('contact_number', data.contact_number);
    client.append('alt_contact_number', data.alt_contact_number);
    client.append('industry', data.industry);
    client.append('category', data.category);
    client.append('is_non_monetary', data.is_non_monetary.toString());
    client.append('discount', data.discount.toString());
    client.append('ways_to_use', data.ways_to_use.toString());
    client.append('status', data.status);
    client.append('addresses', JSON.stringify(data.addresses));

    try {
      const res = await addClient(client);
      if (res.message != null) {
        toast({
          title: 'Registration API Failure!',
          description: 'An error occurred with the API.',
          variant: 'destructive',
          duration: 3000,
        });
      } else {
        toast({
          title: "Registeration is Successful",
          description: `Successfully registered new client, ${data.company_name}.`,
          duration: 3000
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const onSubmit = async (data: Client) => {
    const isValid = handleAddressValidation();
    if (!isValid) return;

    // Set Values for Remaining Fields
    data.client_id = crypto.randomUUID();
    data.industry = industry;

    handleRegister(data);
    reset();
  };

  // UseEffect
  useEffect(() => {
    clearErrors();
    reset();
  }, []);

  useEffect(() => {
    if (fields.length === 0) {
      addAddress();
    } 
  }, [fields]);

  return (
    <>
      <div className="h-[100vh - 40px] flex min-h-full w-full flex-col items-center justify-start px-4">
        <div className="mb-4 w-full text-left">
          <h1 className="mb-1 font-bold xxxs:text-2xl sm:text-3xl md:text-4xl">
            Client Registration Form
          </h1>
          <h2 className="leading-10 xxxs:text-xs sm:text-sm">
            This is a client registration form, please fill it up and click on the "Register" button
            to proceed.
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4 grid items-center gap-4 xxxs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
            {/* Company Name */}
            <div className="flex flex-col xxxs:col-span-2 sm:col-span-4 lg:col-span-2 ">
              <Label htmlFor="company_name" className="mb-1 text-xs ml-1 text-neutral-500">
                Company Name
              </Label>
              <Input
                type="text"
                placeholder="Company Name"
                className={`${errors.company_name ? 'border-red-500' : ''}`}
                {...register('company_name', {
                  required: {
                    value: true,
                    message: 'Company Name is required.'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9&\-',.\s]+$/,
                    message: 'Company Name must contain only alphabets, numbers, &, -, \', ,, ., and spaces.',
                  }
                })}
              />
            </div>

            {/* Company Email Address */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="company_email" className="mb-1 text-xs ml-1 text-neutral-500">
                Company Email Address
              </Label>
              <Input
                type="email"
                placeholder="Company Email Address"
                className={`${errors.company_email ? 'border-red-500' : ''}`}
                {...register('company_email', {
                  required: {
                    value: true,
                    message: "Company Email Address is required.",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Comapany Email Address provided does not match email format.',
                  },
                })}
              />
            </div>

            {/* Contact Number */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="contact_number" className="mb-1 text-xs ml-1 text-neutral-500">
                Contact Number
              </Label>
              <Input
                type="text"
                placeholder="Contact Number (+1234567890)"
                className={`${errors.contact_number ? 'border-red-500' : ''}`}
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
              />
            </div>

            {/* PIC Name */}
            <div className="flex flex-col xxxs:col-span-2 sm:col-span-4 lg:col-span-2">
              <Label htmlFor="person_in_charge_name" className="mb-1 text-xs ml-1 text-neutral-500">
                PIC Name
              </Label>
              <Input
                type="text"
                placeholder="Person-In-Charge (PIC) Name"
                className={`${errors.person_in_charge_name ? 'border-red-500' : ''}`}
                {...register('person_in_charge_name', {
                  required: {
                    value: true,
                    message: "Person-In-Charge's Name is required."
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Person-In-Charge's Name must contain only alphabets.",
                  },
                })}
              />
            </div>

            {/* PIC Email Address */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="person_in_charge_email" className="mb-1 text-xs ml-1 text-neutral-500">
                PIC Email Address
              </Label>
              <Input
                type="email"
                placeholder="PIC Email Address"
                className={`${errors.person_in_charge_email ? 'border-red-500' : ''}`}
                {...register('person_in_charge_email', {
                  required: {
                    value: true,
                    message: 'Person-In-Charge\'s Email Address is required.',
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Person-In-Charge\'s Email provided does not match email format.',
                  },
                })}
              />
            </div>

            {/* Alt Contact Number */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="alt_contact_number" className="mb-1 text-xs ml-1 text-neutral-500">
                Alt Contact Number
              </Label>
              <Input
                type="text"
                placeholder="Alt Contact Number (+1234567890)"
                className={`${errors.alt_contact_number ? 'border-red-500' : ''}`}
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
                <DropdownMenuContent className="w-full" align="start">
                  {ddIndustryValues.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setIndustry(option as Client['industry'])}
                      className="cursor-pointer"
                    >
                      {capitalizeFirstLetter(option)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Category */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="category" className="mb-1 text-xs ml-1 text-neutral-500">
                Category
              </Label>
              <Input
                type="text"
                placeholder="Category (Italian, Thai, Malaysian)"
                className={`col-span-2 ${errors.category ? 'border-red-500' : ''}`}
                {...register('category', {
                  required: {
                    value: true,
                    message: "Category is required."
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Category must contain only alphabets.",
                  },
                })}
              />
            </div>
          </div>
          <Separator className="my-2 mb-0" />
          <div className="flex w-full flex-col gap-4">
            <div className="mt-3 flex w-full items-center justify-end">
              <ActionButton
                onClick={addAddress}
                icon="plus"
                label="Add More Address"
                textBtn="More Address"
                className="bg-neutral-300 hover:bg-neutral-300/75 dark:bg-neutral-800 dark:hover:bg-neutral-800/75"
                type="button"
              />
            </div>
            {fields.map((address, index) => (
              <div
                key={address.id}
                className="mb-2 flex flex-col gap-4"
                id={`address-form-${address.id}`}
              >
                <div className="flex flex-row items-center justify-between">
                  <h1 className="ml-1 text-lg font-semibold">Address #{index + 1}</h1>
                  {index > 0 && (
                    <ActionButton
                      onClick={() => removeAddress(index)}
                      icon="trash"
                      label="Remove Address"
                      className="ml-2 h-[35px] w-[35px] bg-neutral-300 px-0 py-0 dark:bg-neutral-800"
                      type="button"
                    />
                  )}
                </div>
                <div className="grid items-center gap-4 xxxs:grid-cols-4 sm:grid-cols-6">
                  {/* Country, City, State */}
                  <AddressDropdowns
                    country={getValues(`addresses.${index}.country`)}
                    setCountry={(value: string) => {
                      setValue(`addresses.${index}.country`, value, { shouldValidate: true });
                      trigger(); //retrigger validation after fixing error.
                    }}
                    countryMessage={`Address #${index + 1}'s Country is required.`}
                    countrySpan='xxxs:col-span-4 sm:col-span-2'
                    countryClassname={`${errors.addresses?.[index]?.country ? 'border-red-500' : ''}`}
                    countryInputName={`addresses.${index}.country`}
                    state={getValues(`addresses.${index}.state`)}
                    stateMessage={`Address #${index + 1}'s State is required.`}
                    setState={(value: string) => {
                      setValue(`addresses.${index}.state`, value, { shouldValidate: true });
                      trigger();
                    }}
                    stateSpan='xxxs:col-span-4 sm:col-span-2'
                    stateClassname={`${errors.addresses?.[index]?.state ? 'border-red-500' : ''}`}
                    stateInputName={`addresses.${index}.state`}
                    city={getValues(`addresses.${index}.city`)}
                    cityMessage={`Address #${index + 1}'s City is required.`}
                    setCity={(value: string) => {
                      setValue(`addresses.${index}.city`, value, { shouldValidate: true });
                      trigger();
                    }}
                    citySpan='xxxs:col-span-4 sm:col-span-2'
                    cityClassname={`${errors.addresses?.[index]?.city ? 'border-red-500' : ''}`}
                    cityInputName={`addresses.${index}.city`}
                    control={control}
                  />

                  {/* Postcode */}
                  <div className="flex flex-col xxxs:col-span-4 sm:col-span-2">
                    <Label htmlFor="postcode" className="mb-1 text-xs ml-1 text-neutral-500">
                      Postcode
                    </Label>
                    <Input
                      type="text"
                      id={`postcode-${address.id}`}
                      placeholder="Postcode"
                      {...register(`addresses.${index}.postcode` as const, {
                        required: {
                          value: true,
                          message: `Address #${index + 1}'s Postcode is required.`,
                        },
                        minLength: {
                          value: 4,
                          message: `Address #${index + 1}'s Postcode must be at least 4 numbers.`,
                        },
                        maxLength: {
                          value: 6,
                          message: `Address #${index + 1}'s Postcode must be no more than 6 numbers.`,
                        },
                        pattern: {
                          value: /^\d+$/,
                          message: `Address #${index + 1}'s Postcode must contain numbers only.`,
                        },
                      })}
                      className={`${errors.addresses?.[index]?.postcode ? 'border-red-500' : ''}`}
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col xxxs:col-span-4">
                    <Label htmlFor="address" className="mb-1 text-xs ml-1 text-neutral-500">
                      Address
                    </Label>
                    <Input
                      type="text"
                      id={`address-${address.id}`}
                      placeholder="Address"
                      {...register(`addresses.${index}.address` as const, {
                        required: {
                          value: true,
                          message: `Address #${index + 1}'s Address is required.`,
                        },
                      })}
                      className={`${errors.addresses?.[index]?.address ? 'border-red-500' : ''}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-start space-x-2">
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
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By submitting this form, I acknowledge and agree that my information will be processed
              in accordance with ConX Agency's Terms & Conditions.
              <span className="text-sm text-red-600">*</span>
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2 xxxs:flex-col sm:flex-row">
            <Button
              type="submit"
              onClick={() => handleValidation(trigger, errors)}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
