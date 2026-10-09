import { NextResponse } from 'next/server';
import { saveInquiry } from '@/lib/data/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, service_category, message, honeypot } = body;

    // Spam honeypot trap: if honeypot field is filled, silently discard or reject
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Please enter a valid full name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid business or personal email address.' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json(
        { error: 'Please enter a descriptive subject line.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide more details in your message (minimum 10 characters).' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message exceeds maximum allowable length of 5000 characters.' },
        { status: 400 }
      );
    }

    // Persist inquiry
    const saved = await saveInquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      service_category: service_category || 'General Inquiry',
      message: message.trim()
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Pravesh will respond within 24 hours.',
      inquiryId: saved.id
    });
  } catch (err) {
    console.error('Contact API submission error:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred while processing your inquiry.' },
      { status: 500 }
    );
  }
}
