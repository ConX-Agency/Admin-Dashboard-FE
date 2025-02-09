import { Client, UpdateClient, UpdateClientAddress } from '@/data/clients';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { ActionButton, Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useEffect, useState } from 'react';
import { AddressDropdowns } from '../ui/addressDropdown';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { capitalizeFirstLetter, handleValidation } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { ddIndustryValues, ddStatusValues } from '@/data/dropdown-values';
import { Label } from '../ui/label';

export const UpdateClientModal = ({
  clientData,
  closeUpdateModal,
  handleUpdate,
  updateModalVisibility,
}: {
  clientData: Client;
  closeUpdateModal: () => void;
  handleUpdate: (clientId: number, data: UpdateClient) => void;
  updateModalVisibility: boolean;
}) => {
  const [status, setStatus] = useState<Client['status']>('Active');
  const [industry, setIndustry] = useState<Client['industry']>('Food & Beverage');
  const [monetary, setMonetary] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    reset,
  } = useForm<UpdateClient>({
    mode: 'onSubmit',
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'addresses',
  });

  // Important to set Client's initial data.
  useEffect(() => {
    if (clientData) {
      reset({
        company_name: clientData.company_name || '',
        company_email: clientData.company_email || '',
        contact_number: clientData.contact_number || '',
        alt_contact_number: clientData.alt_contact_number || '',
        person_in_charge_name: clientData.person_in_charge_name || '',
        person_in_charge_email: clientData.person_in_charge_email || '',
        industry: clientData.industry || '',
        category: clientData.category || '',
        addresses: clientData.addresses || [],
        is_non_monetary: clientData.is_non_monetary,
        discount: clientData.discount,
        ways_to_use: clientData.ways_to_use,
        status: clientData.status || 'Active',
      });
      setStatus(clientData.status);
      setMonetary(clientData.is_non_monetary);
      replace(clientData.addresses || []);
    }
  }, [clientData, reset, replace, updateModalVisibility]);

  const addAddress = () => {
    append({
      client_id: clientData?.client_id,
      address: '',
      city: '',
      postcode: '',
      state: '',
      country: '',
    } as UpdateClientAddress);
  };

  const removeAddress = (index: number) => {
    remove(index);
  };

  const onSubmit = async (data: UpdateClient) => {
    // Set Values for Remaining Fields
    data.is_non_monetary = monetary;
    data.industry = industry;
    data.status = status;

    handleUpdate(clientData?.client_id, data);
    closeUpdateModal();
    reset();
  };

  // UseEffect
  useEffect(() => {
    if (!updateModalVisibility) {
      reset();
    }
  }, [updateModalVisibility, reset]);

  return (
    <Dialog open={updateModalVisibility}>
      <DialogContent
        className="max-h-[550px] overflow-y-scroll xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]"
        onEscapeKeyDown={closeUpdateModal}
        modalTopRightClose={closeUpdateModal}
      >
        <DialogHeader>
          <DialogTitle>Editing {clientData?.company_name} Profile</DialogTitle>
          <DialogDescription>
            Make changes to the profile here. Click save changes when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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

            {/* Is Non Monetary */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="is_non_monetary" className="mb-1 text-xs ml-1 text-neutral-500">
                Monetary Status
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between border px-3">
                    {monetary ? 'Non-Monetary' : 'Monetary'}
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[190px] max-w-full" align="start">
                  <DropdownMenuItem onClick={() => setMonetary(false)} className="cursor-pointer">
                    Monetary
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setMonetary(true)} className="cursor-pointer">
                    Non-Monetary
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Discount */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="discount" className="mb-1 text-xs ml-1 text-neutral-500">
                Discount
              </Label>
              <Input
                type="text"
                placeholder="Discount (0-100)"
                className={`${errors.discount ? 'border-red-500' : ''}`}
                {...register('discount', {
                  required: {
                    value: true,
                    message: 'Discount is required.',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Discount must contain numbers only.',
                  },
                  min: {
                    value: 0,
                    message: 'Discount must be at least 0.',
                  },
                  max: {
                    value: 100,
                    message: 'Discount must not exceed 100.',
                  },
                })}
              />
            </div>

            {/* Ways to Use */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="ways_to_use" className="mb-1 text-xs ml-1 text-neutral-500">
                Ways to Use
              </Label>
              <Input
                type="text"
                placeholder="Ways to Use"
                className={`${errors.ways_to_use ? 'border-red-500' : ''}`}
                {...register('ways_to_use', {
                  required: {
                    value: true,
                    message: 'Ways to Use is required.',
                  },
                })}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col col-span-2">
              <Label htmlFor="status" className="mb-1 text-xs ml-1 text-neutral-500">
                Status
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between border px-3">
                    {capitalizeFirstLetter(status)}
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[266px] max-w-full" align="start">
                  {ddStatusValues.map((option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setStatus(option as Client['status'])}
                      className="cursor-pointer"
                    >
                      {capitalizeFirstLetter(option)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
                key={index}
                className="mb-2 flex flex-col gap-4"
                id={`address-form-${index}`}
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
                <div className="grid items-center gap-4 xxxs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
                  {/* Country, City, State */}
                  <AddressDropdowns
                    country={getValues(`addresses.${index}.country`)!}
                    setCountry={(value: string) => {
                      setValue(`addresses.${index}.country`, value, { shouldValidate: true });
                      trigger(); //retrigger validation after fixing error.
                    }}
                    countryMessage={`Address #${index + 1}'s Country is required.`}
                    countrySpan='xxxs:col-span-4 sm:col-span-2'
                    countryClassname={`${errors.addresses?.[index]?.country ? 'border-red-500' : ''}`}
                    countryInputName={`addresses.${index}.country`}
                    state={getValues(`addresses.${index}.state`)!}
                    stateMessage={`Address #${index + 1}'s State is required.`}
                    setState={(value: string) => {
                      setValue(`addresses.${index}.state`, value, { shouldValidate: true });
                      trigger();
                    }}
                    stateSpan='xxxs:col-span-4 sm:col-span-2'
                    stateClassname={`${errors.addresses?.[index]?.state ? 'border-red-500' : ''}`}
                    stateInputName={`addresses.${index}.state`}
                    city={getValues(`addresses.${index}.city`)!}
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
          <DialogFooter>
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
