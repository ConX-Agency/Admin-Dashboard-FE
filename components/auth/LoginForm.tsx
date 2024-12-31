import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const { login, user } = useAuth();

    useEffect(() => {
      if (user) {
        router.push('/');
      }
    }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    if (email === 'conxadmin@gmail.com' && password === 'conxadmin') {
      toast({
        title: 'Successful Login',
        description: 'Welcome Back, ConX Admin!',
        variant: 'default',
        duration: 3000,
      });

      login('conx_admin');
    } else {
      toast({
        title: 'Invalid Login Credentials',
        description: 'Wrong Username or Password!',
        variant: 'destructive',
        duration: 3000,
      });
    }
  };

  return (
    <div className={cn('flex w-full flex-col items-center justify-center', className)} {...props}>
      <Card className="sm:min-w</div>-[500px] flex-grow xxxs:min-w-[300px] xs:min-w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button className="w-full" type="submit">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
