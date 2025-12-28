'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signUp } from 'aws-amplify/auth';
import { Container } from '@/components/layout';
import { Input, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(10, 'Password must be at least 10 characters')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[0-9]/, 'Password must contain a number')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain a special character'),
    confirmPassword: z.string(),
    organization: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError('');
    setSuccess(false);

    try {
      const { isSignUpComplete } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            given_name: data.firstName,
            family_name: data.lastName,
            'custom:organization': data.organization || '',
          },
        },
      });

      if (isSignUpComplete) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Registration error:', error);

      // Handle different error types
      if (error.name === 'UsernameExistsException') {
        setAuthError('An account with this email already exists.');
      } else if (error.name === 'InvalidPasswordException') {
        setAuthError('Password does not meet security requirements.');
      } else if (error.name === 'InvalidParameterException') {
        setAuthError('Invalid registration data. Please check your information.');
      } else {
        setAuthError('Failed to create account. Please try again.');
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

                {success && (
                  <div className="rounded border border-success bg-green-50 p-3 text-sm text-success">
                    Account created successfully! Please check your email to verify your account.
                    Redirecting to login...
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label={t('firstName')}
                    autoComplete="given-name"
                    error={errors.firstName?.message}
                    required
                    {...register('firstName')}
                  />
                  <Input
                    label={t('lastName')}
                    autoComplete="family-name"
                    error={errors.lastName?.message}
                    required
                    {...register('lastName')}
                  />
                </div>

                <Input
                  label={t('email')}
                  type="email"
                  autoComplete="email"
                  error={errors.email?.message}
                  required
                  {...register('email')}
                />

                <Input
                  label={t('organization')}
                  autoComplete="organization"
                  {...register('organization')}
                />

                <Input
                  label={t('password')}
                  type="password"
                  autoComplete="new-password"
                  error={errors.password?.message}
                  hint="Min 10 characters with uppercase, lowercase, number, and special character"
                  required
                  {...register('password')}
                />

                <Input
                  label={t('confirmPassword')}
                  type="password"
                  autoComplete="new-password"
                  error={errors.confirmPassword?.message}
                  required
                  {...register('confirmPassword')}
                />

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                  disabled={success}
                >
                  {t('submit')}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-neutral-600">
                {t('hasAccount')}{' '}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary-700 hover:text-primary-900"
                >
                  {t('login')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}