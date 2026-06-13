import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the privacy policy'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  className?: string;
  base?: string;
}

export default function NewsletterForm({ className = '', base = '' }: NewsletterFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(result.message || 'Successfully subscribed!');
        reset();
      } else {
        setStatus('error');
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`flex flex-col gap-4 ${className}`} lang="en">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-2.5 placeholder-white/60 bg-[#4a534f] border border-white/30 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all disabled:opacity-50"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;' }}
          />
          {errors.email && (
            <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase bg-[#F4F1EA] text-[#2D2D2D] rounded-md hover:bg-white/90 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;' }}
        >
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </button>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          {...register('consent')}
          disabled={status === 'loading' || status === 'success'}
          className="mt-0.5 w-4 h-4 rounded border-white/40 bg-[#4a534f] text-white focus:ring-white/50 cursor-pointer"
        />
        <label
          htmlFor="consent"
          className="text-xs text-white/90 leading-relaxed cursor-pointer"
          style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;' }}
        >
          I agree to the{' '}
          <a href={`${base}/privacy-policy`} className="underline hover:text-white/90">
            Privacy Policy
          </a>{' '}
          and consent to receive emails.
        </label>
      </div>
      {errors.consent && (
        <p className="text-red-300 text-xs ml-7">{errors.consent.message}</p>
      )}

      {message && (
        <p
          className={`text-xs ${
            status === 'success' ? 'text-green-300' : 'text-red-300'
          }`}
          style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;' }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
