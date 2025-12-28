'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container } from '@/components/layout';
import { Input, Textarea, Select, Button } from '@/components/ui';

const contactSchema = z.object({
  purpose: z.string().min(1, 'Purpose is required'),
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const t = useTranslations('contact');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Implement form submission
    console.log('Contact form submitted:', data);
    alert('Message sent! (Demo)');
    reset();
  };

  const purposeOptions = [
    { value: 'billing', label: t('form.purposeOptions.billing') },
    { value: 'delivery', label: t('form.purposeOptions.delivery') },
    { value: 'status', label: t('form.purposeOptions.status') },
  ];

  return (
    <>
      {/* Header Section */}
      <section className="border-b border-neutral-200 bg-neutral-50 py-section-sm">
        <Container size="narrow">
          <h1 className="font-serif text-3xl font-bold text-primary-900 md:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-neutral-700">{t('description')}</p>
        </Container>
      </section>

      {/* Contact Form */}
      <section className="py-section-md">
        <Container size="narrow">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Select
              label={t('form.purpose')}
              options={purposeOptions}
              placeholder="Select purpose"
              error={errors.purpose?.message}
              required
              {...register('purpose')}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label={t('form.name')}
                error={errors.name?.message}
                required
                {...register('name')}
              />
              <Input
                label={t('form.company')}
                error={errors.company?.message}
                required
                {...register('company')}
              />
            </div>

            <Input
              label={t('form.email')}
              type="email"
              error={errors.email?.message}
              required
              {...register('email')}
            />

            <Textarea
              label={t('form.message')}
              error={errors.message?.message}
              required
              {...register('message')}
            />

            <Button type="submit" size="lg" isLoading={isSubmitting}>
              {t('form.submit')}
            </Button>
          </form>

          <p className="mt-8 text-sm text-neutral-500">{t('note')}</p>
        </Container>
      </section>
    </>
  );
}
