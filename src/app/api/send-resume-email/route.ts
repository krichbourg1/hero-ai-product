import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('pdf') as File;
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;

    if (!pdfFile || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Professional Resume - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Your Resume is Ready!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for using HERO.AI Resume Builder! Your professionally formatted military-to-civilian resume is attached to this email.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">What's Next?</h3>
            <ul style="color: #6b7280;">
              <li>Review your resume for any final adjustments</li>
              <li>Tailor it for specific job applications</li>
              <li>Use it to apply to positions that match your military skills</li>
            </ul>
          </div>
          
          <p>If you need to make any changes or create additional resumes, you can always return to our platform.</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>The HERO.AI Team</strong>
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af;">
            This email was sent from HERO.AI Resume Builder. If you have any questions, please contact our support team.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: pdfFile.name,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Resume sent successfully!' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 