# Email Setup Guide for Supabase Authentication

## Current Issue
The "Check your email for the confirmation link" message appears, but emails are not being sent because Supabase email configuration is not set up.

## Solution Options

### Option 1: Use Supabase's Built-in Email Service (Quick Setup)

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project: `mcbahnkqvlsqivflityt`

2. **Configure Email Settings**
   - Go to **Authentication** → **Settings**
   - Under **Email Auth**, ensure:
     - ✅ **Enable email confirmations** is checked
     - ✅ **Enable email change confirmations** is checked
     - ✅ **Enable secure email change** is checked

3. **Email Templates**
   - Go to **Authentication** → **Email Templates**
   - Customize the **Confirm signup** template if desired
   - Test the email template

### Option 2: Configure SMTP (Recommended for Production)

1. **Choose an Email Provider**
   - **Gmail** (requires app password)
   - **SendGrid** (recommended for production)
   - **Mailgun**
   - **Amazon SES**

2. **Gmail Setup Example**
   ```bash
   # Enable 2-Factor Authentication on your Gmail account
   # Generate an App Password:
   # 1. Go to Google Account settings
   # 2. Security → 2-Step Verification → App passwords
   # 3. Select "Mail" and generate a password
   ```

3. **Configure in Supabase Dashboard**
   - Go to **Authentication** → **Settings**
   - Under **SMTP Settings**, enter:
     ```
     Host: smtp.gmail.com
     Port: 587
     Username: your-email@gmail.com
     Password: your-16-digit-app-password
     Sender Name: HERO.AI
     Sender Email: your-email@gmail.com
     ```

### Option 3: Use Resend (Modern Email Service)

1. **Sign up for Resend**
   - Visit [https://resend.com](https://resend.com)
   - Create a free account (3,000 emails/month free)

2. **Get API Key**
   - Go to **API Keys** in Resend dashboard
   - Create a new API key

3. **Configure in Supabase**
   - Go to **Authentication** → **Settings**
   - Under **SMTP Settings**, enter:
     ```
     Host: smtp.resend.com
     Port: 587
     Username: resend
     Password: your-resend-api-key
     Sender Name: HERO.AI
     Sender Email: onboarding@resend.dev (or your verified domain)
     ```

## Testing Email Configuration

### 1. Test in Supabase Dashboard
- Go to **Authentication** → **Users**
- Click on a user
- Click **Send email confirmation**

### 2. Test via API
```bash
curl -X POST 'https://mcbahnkqvlsqivflityt.supabase.co/auth/v1/admin/generate_link' \
  -H "apikey: YOUR_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "signup",
    "email": "test@example.com"
  }'
```

## Troubleshooting

### Common Issues:

1. **Emails not sending**
   - Check SMTP settings in Supabase dashboard
   - Verify email provider credentials
   - Check spam folder

2. **"Email already confirmed" error**
   - User already confirmed their email
   - Check user status in Supabase dashboard

3. **SMTP authentication failed**
   - Verify username/password
   - For Gmail: Use app password, not regular password
   - Check if 2FA is enabled

### Debug Steps:

1. **Check Supabase Logs**
   - Go to **Logs** in Supabase dashboard
   - Filter by "auth" to see email-related errors

2. **Test SMTP Connection**
   ```bash
   # Test Gmail SMTP
   telnet smtp.gmail.com 587
   
   # Test Resend SMTP
   telnet smtp.resend.com 587
   ```

## Environment Variables (Optional)

If you want to use environment variables for SMTP settings, add to your `.env` file:

```env
# SMTP Configuration (if using custom SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

## Next Steps

1. **Choose an email provider** (Gmail for testing, Resend for production)
2. **Configure SMTP settings** in Supabase dashboard
3. **Test email sending** with a test user
4. **Monitor email delivery** in your email provider's dashboard

## Production Considerations

- **Domain Verification**: Verify your domain with your email provider
- **Email Templates**: Customize email templates to match your brand
- **Monitoring**: Set up email delivery monitoring
- **Rate Limits**: Be aware of email sending limits
- **Spam Prevention**: Follow email best practices to avoid spam filters 