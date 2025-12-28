'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'aws-amplify/auth';
import { Container } from '@/components/layout';
import { Input, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(10, 'Password must be at least 10 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError('');

    try {
      const { isSignedIn } = await signIn({
        username: data.email,
        password: data.password,
      });

      if (isSignedIn) {
        router.push('/account');
      }
    } catch (error: any) {
      console.error('Login error:', error);

      // Handle different error types
      if (error.name === 'UserNotConfirmedException') {
        setAuthError('Please verify your email before logging in.');
      } else if (error.name === 'NotAuthorizedException') {
        setAuthError('Incorrect email or password.');
      } else if (error.name === 'UserNotFoundException') {
        setAuthError('No account found with this email.');
      } else {
        setAuthError('Failed to sign in. Please try again.');
      }
    }
  };

  return (
    <section className="py-section-lg">
      <Container size="narrow">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle as="h1" className="text-2xl">
                {t('title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {authError && (
                  <div className="rounded border border-error bg-red-50 p-3 text-sm text-error">
                    {authError}
                  </div>
                )}

                <Input
                  label={t('email')}
                  type="email"
                  autoComplete="email"
                  error={errors.email?.message}
                  required
                  {...register('email')}
                />

                <Input
                  label={t('password')}
                  type="password"
                  autoComplete="current-password"
                  error={errors.password?.message}
                  required
                  {...register('password')}
                />

                <div className="text-right">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary-700 hover:text-primary-900"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  {t('submit')}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-neutral-600">
                {t('noAccount')}{' '}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-700 hover:text-primary-900"
                >
                  {t('register')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}