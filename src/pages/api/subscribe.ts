import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import type { APIRoute } from 'astro';
import crypto from 'crypto';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
const resendApiKey = import.meta.env.RESEND_API_KEY;
const resendFromEmail = import.meta.env.RESEND_FROM_EMAIL;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Simple in-memory rate limiter (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { email, consent } = await request.json();

    // Validation
    if (!email || !consent) {
      return new Response(
        JSON.stringify({ error: 'Email and consent are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingSubscriber) {
      return new Response(
        JSON.stringify({ error: 'Email already subscribed' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate confirmation token
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    // Insert new subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert({
        email,
        consent: true,
        status: 'pending', // pending double opt-in
        confirmation_token: confirmationToken,
        subscribed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send confirmation email via Resend
    if (resend && resendFromEmail) {
      try {
        const baseUrl = new URL(request.url).origin;
        const confirmUrl = `${baseUrl}/preferences?token=${confirmationToken}`;

        await resend.emails.send({
          from: resendFromEmail,
          to: email,
          subject: 'Confirm your subscription to Voyaflair',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #69746E;">Welcome to Voyaflair</h2>
              <p>Thank you for subscribing to our newsletter! Please confirm your email address by clicking the button below:</p>
              <a href="${confirmUrl}" style="display: inline-block; padding: 12px 24px; background-color: #69746E; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">Confirm Subscription</a>
              <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
              <p style="color: #666; font-size: 12px; word-break: break-all;">${confirmUrl}</p>
              <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't subscribe to Voyaflair, you can safely ignore this email.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the subscription if email fails, just log it
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Successfully subscribed! Please check your email for confirmation.',
        subscriberId: data.id 
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
