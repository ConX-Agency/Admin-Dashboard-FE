"use client"

import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Admin } from '@/data/auth';
import { handleApiError } from '@/lib/utils';

const AdminRegistrationForm = () => {
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
  } = useForm<Admin>({
    mode: 'onSubmit',
    defaultValues: {
      full_name: '',
      preferred_name: '',
      username: '',
      email_address: '',
      contact_number: '',
      password: '',
      repeat_password: '',
      status: ''
    },
  });

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
  }

  const handleRegisterAdmin = async (admin_data: Admin) => {
    const admin = new FormData();
    admin.append('full_name', admin_data.full_name);
    admin.append('preferred_name', admin_data.preferred_name);
    admin.append('username', admin_data.username);
    admin.append('email_address', admin_data.email_address);
    admin.append('contact_number', admin_data.contact_number);
    admin.append('password', admin_data.password);
    admin.append('status', admin_data.status);

    // try {
    //   const res = await addAdmin(admin);
    //   if (res.message != null) {
    //     toast({
    //       title: 'Registration API Failure!',
    //       description: 'An error occurred with the Admin Registeration API.',
    //       variant: 'destructive',
    //       duration: 3000,
    //     });
    //   } else {
    //     toast({
    //       title: "Registration is Successful",
    //       description: `Successfully registered new admin, ${data.full_name}!`,
    //       duration: 3000
    //     });
    //   }
    // } catch (error) {
    //   handleApiError(error);
    // }
  }

  const handlePasswordSimilitaryCheck = (password: string, repeat_password: string) => {
    if (repeat_password !== password) {
      toast({
        title: 'Validation Error',
        description: 'Password and Repeat Password are not the same!',
        variant: 'destructive',
        duration: 3000,
      });
      return false;
    }

    return true;
  }

  const onSubmit = (data: any) => {
    const isValid = handlePasswordSimilitaryCheck(data.password, data.repeat_password);
    if (!isValid) return;

    const newAdmin: Admin = {
      admin_id: crypto.randomUUID(),
      full_name: data.full_name,
      preferred_name: data.preferred_name,
      username: data.username,
      email_address: data.email_address,
      contact_number: data.contact_number,
      password: data.password,
      status: "Active",
    }

    handleRegisterAdmin(newAdmin);
    reset();
  }

  return (
    <div className='w-full h-full p-4'>
      <div className="mb-4 w-full text-left">
        <h1 className="mb-1 font-bold xxxs:text-2xl sm:text-3xl md:text-4xl">
          Admin Registration Form
        </h1>
        <h2 className="leading-10 xxxs:text-xs sm:text-sm italic">
          With great power comes great responsibility.
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 xxxs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {/* Full Name */}
          <Input
            className={`col-span-2 ${errors.full_name ? 'border-red-500' : ''}`}
            type="text"
            {...register('full_name', {
              required: {
                value: true,
                message: 'Full Name is required.'
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
                message: 'Preferred Name is required.'
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Preferred Name must contain only alphabets.',
              },
            })}
            placeholder="Preferred Name"
          />

          <Input
            className={`col-span-2 ${errors.username ? 'border-red-500' : ''}`}
            type="text"
            {...register('username', {
              required: { value: true, message: 'Username is required.' },
              pattern: {
                value: /^[A-Za-z0-9]+$/,
                message: 'Username must contain only letters and numbers.',
              },
            })}
            placeholder="Username"
          />

          {/* Email Address */}
          <Input
            className={`col-span-2 ${errors.email_address ? 'border-red-500' : ''}`}
            type="text"
            {...register('email_address', {
              required: {
                value: true,
                message: 'Email Address is required.',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Emaill Address provided does not match email format.',
              },
            })}
            placeholder="Email Address"
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
            placeholder="Contact Number"
          />

          <Input
            className={`col-span-2 ${errors.password ? 'border-red-500' : ''}`}
            type="password"
            {...register('password', {
              required: { 
                value: true, 
                message: 'Password is required.' 
              },
              minLength: {
                value: 10,
                message: 'Password must be at least 10 characters long.',
              },
            })}
            placeholder="Password"
          />

          {/* Repeat Password */}
          <Input
            className={`col-span-2 ${errors.repeat_password ? 'border-red-500' : ''}`}
            type="text"
            {...register('repeat_password', {
              required: { value: true, message: 'Repeat Password is required.' },
            })}
            placeholder="Repeat Password"
          />
        </div>
        <div className="flex gap-2 xxxs:flex-col-reverse sm:flex-row mt-4 justify-end">
          <Button type="submit" onClick={handleValidation}>
            Register New Admin
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AdminRegistrationForm