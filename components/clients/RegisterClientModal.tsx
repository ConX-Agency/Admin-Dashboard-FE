import { Client, clientAddress } from '@/data/clients';
import { useEffect, useState } from 'react';
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
import { AddressDropdowns } from '../ui/addressDropdown'; // Updated from AddressDropdown to AddressDropdowns
import { toast } from '@/hooks/use-toast';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ddIndustryValues, ddStatusValues } from '@/data/dropdown-values';
import { capitalizeFirstLetter } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

export const RegisterClientModal = ({
  closeRegisterModal,
  handleRegister,
  registerModalVisibility,
}: {
  closeRegisterModal: () => void;
  handleRegister: (data: Client) => void;
  registerModalVisibility: boolean;
}) => {
  const [industry, setIndustry] = useState<Client['industry']>('Food & Beverage');
  const [status, setStatus] = useState<Client['status']>('Active');
  const [monetary, setMonetary] = useState<boolean>(true);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    reset,
  } = useForm<Client>({
    mode: 'onSubmit',
    defaultValues: {
      company_name: '',
      company_email: '',
      contact_number: '',
      alt_contact_number: '',
      person_in_charge_name: '',
      person_in_charge_email: '',
      industry: '',
      category: '',
      addresses: [{ address: '', city: '', postcode: '', state: '', country: '' } as clientAddress],
      is_non_monetary: false,
      discount: 0,
      ways_to_use: '',
      tnc_consent: false,
      status: 'Active',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  // Reset form when modal visibility changes
  useEffect(() => {
    if (!registerModalVisibility) {
      reset();
    }
  }, [registerModalVisibility, reset]);

  const addAddress = () => {
    append({ address: '', city: '', postcode: '', state: '', country: '' } as clientAddress);
  };

  const removeAddress = (index: number) => {
    remove(index);
  };

  const handleValidation = async () => {
    const isValid = await trigger();

    if (!isValid) {
      const displayErrorMessages = (fieldErrors: any) => {
        Object.values(fieldErrors).forEach((error: any) => {
          if (error?.message) {
            // Display error message directly
            toast({
              title: 'Validation Error',
              description: error.message,
              variant: 'destructive',
              duration: 3000,
            });
          } else if (Array.isArray(error)) {
            // Recursively handle arrays (e.g., platforms)
            error.forEach((nestedError) => displayErrorMessages(nestedError));
          } else if (typeof error === 'object') {
            // Recursively handle nested objects
            displayErrorMessages(error);
          }
        });
      };

      displayErrorMessages(errors); // Start processing the errors object
    }
  };

  const onSubmit = async (data: Client) => {

    const client_id = crypto.randomUUID();
    const formattedClient = {
      ...data,
      client_id,
      status,
      industry,
      addresses: data.addresses.map((address: clientAddress) => ({
        ...address,
        // client_id,
        // client_location_id: crypto.randomUUID(),
      })),
    };
    const client = new FormData();
    client.append('company_name', data.company_name);
    client.append('person_in_charge_name', data.person_in_charge_name);
    client.append('person_in_charge_email', data.person_in_charge_email);
    client.append('company_email', data.company_email);
    client.append('contact_number', data.contact_number);
    client.append('alt_contact_number', data.alt_contact_number);
    //Need to be modify while there added new value for industry field
    client.append('industry', 'Food & Beverage');
    client.append('cuisine_type', data.category);
    //Need to be modify while there added new value for category field
    client.append('category', 'not sure yet');
    client.append('is_non_monetary', data.is_non_monetary.toString());
    client.append('discount', data.discount.toString());
    client.append('ways_to_use', data.ways_to_use.toString());
    client.append('status', data.status);
    client.append('addresses', JSON.stringify(formattedClient.addresses));
    //client.append('addresses', formattedClient.addresses.toString());

    handleRegister(formattedClient);
    closeRegisterModal();
    reset();
  };

  return (
    <>
      <Dialog open={registerModalVisibility}>
        <DialogContent
          className="max-h-[550px] overflow-y-scroll xxxs:max-w-[300px] xxs:max-w-[340px] xs:max-w-[461px] sm:max-w-[556px] md:max-w-[738px] lg:max-w-[962px] xl:max-w-[1170px]"
          onEscapeKeyDown={closeRegisterModal}
          modalTopRightClose={closeRegisterModal}
        >
          <DialogHeader>
            <DialogTitle>Register New Client</DialogTitle>
            <DialogDescription>
              Register a new client here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 grid items-center gap-4 xxxs:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
              {/* Company Name */}
              <Input
                type="text"
                placeholder="Company Name"
                className={`xxxs:col-span-2 sm:col-span-4 lg:col-span-2 ${errors.company_name ? 'border-red-500' : ''}`}
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

              {/* Company Email Address */}
              <Input
                type="email"
                placeholder="Company Email Address"
                className={`col-span-2 ${errors.company_email ? 'border-red-500' : ''}`}
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

              {/* Contact Number */}
              <Input
                type="text"
                placeholder="Contact Number (+1234567890)"
                className={`col-span-2 ${errors.contact_number ? 'border-red-500' : ''}`}
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

              {/* PIC Name */}
              <Input
                type="text"
                placeholder="Person-In-Charge (PIC) Name"
                className={`xxxs:col-span-2 sm:col-span-4 lg:col-span-2 ${errors.person_in_charge_name ? 'border-red-500' : ''}`}
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

              {/* PIC Email Address */}
              <Input
                type="email"
                placeholder="PIC Email Address"
                className={`col-span-2 ${errors.person_in_charge_email ? 'border-red-500' : ''}`}
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

              {/* Alt Contact Number */}
              <Input
                type="text"
                placeholder="Alt Contact Number (+1234567890)"
                className={`col-span-2 ${errors.alt_contact_number ? 'border-red-500' : ''}`}
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

              {/* Industry */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="col-span-2 w-full justify-between border px-3">
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

              {/* Cuisine Type */}
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

              {/* Is Non Monetary */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="col-span-2 w-full justify-between border px-3">
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

              {/* Discount */}
              <Input
                type="text"
                placeholder="Discount (0-100)"
                className={`col-span-2 ${errors.discount ? 'border-red-500' : ''}`}
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

              {/* Ways to Use */}
              <Input
                type="text"
                placeholder="Ways to Use"
                className={`col-span-2 ${errors.ways_to_use ? 'border-red-500' : ''}`}
                {...register('ways_to_use', {
                  required: {
                    value: true,
                    message: 'Ways to Use is required.',
                  },
                })}
              />

              {/* Status */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="col-span-2 w-full justify-between border px-3">
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
                      countryClassname={`col-span-2 ${errors.addresses?.[index]?.country ? 'border-red-500' : ''}`}
                      countryInputName={`addresses.${index}.country`}
                      state={getValues(`addresses.${index}.state`)}
                      stateMessage={`Address #${index + 1}'s State is required.`}
                      setState={(value: string) => {
                        setValue(`addresses.${index}.state`, value, { shouldValidate: true });
                        trigger();
                      }}
                      stateClassname={`col-span-2 ${errors.addresses?.[index]?.state ? 'border-red-500' : ''}`}
                      stateInputName={`addresses.${index}.state`}
                      city={getValues(`addresses.${index}.city`)}
                      cityMessage={`Address #${index + 1}'s City is required.`}
                      setCity={(value: string) => {
                        setValue(`addresses.${index}.city`, value, { shouldValidate: true });
                        trigger();
                      }}
                      cityClassname={`col-span-2 ${errors.addresses?.[index]?.city ? 'border-red-500' : ''}`}
                      cityInputName={`addresses.${index}.city`}
                      control={control}
                    />

                    {/* Postcode */}
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
                      className={`col-span-1 xxxs:col-span-2 ${errors.addresses?.[index]?.postcode ? 'border-red-500' : ''}`}
                    />

                    {/* Address */}
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
                      className={`col-span-3 xxxs:col-span-4 ${errors.addresses?.[index]?.address ? 'border-red-500' : ''}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
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
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By submitting this form, I acknowledge and agree that my information will be
                processed in accordance with ConX Agency's Terms & Conditions.
                <span className="text-xl text-red-600">*</span>
              </label>
            </div>
            <DialogFooter>
              <div className="mt-4 flex gap-2 xxxs:flex-col sm:flex-row">
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
    </>
  );
};
