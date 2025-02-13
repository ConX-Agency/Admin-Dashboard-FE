'use client';

import { cn, handleApiError } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useConx } from '@/context/ConxContext';
import { useEffect } from 'react';
import { ApiError } from '@/data/error';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const { login, token } = useConx();

  useEffect(() => {
    if (token) {
      router.push('/'); // Redirect after login
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const username = form.username.value;
    const password = form.password.value;
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password', password);

    try {
      const isLoggedIn = await login(formdata);
      if (isLoggedIn) {
        // Login success
        toast({
          title: 'Successful Login',
          description: `Welcome Back, Admin @${username}`,
          variant: 'default',
          duration: 3000,
        });
      } else {
        // Login failed
        toast({
          title: 'Login Failed',
          description: 'Invalid Login Credentials',
          variant: 'destructive',
          duration: 3000,
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className={cn('flex w-full flex-col items-center justify-center', className)} {...props}>
      <Card className="sm:min-w</div>-[500px] flex-grow xxxs:min-w-[300px] xs:min-w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your username below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Please enter your username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* Admin forgot password */}
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
              {/* Admin unable to login with email */}
              {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
            </div>
            {/* Admin unable to signup in login page */}
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
