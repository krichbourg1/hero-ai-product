# Email Setup for Resume PDF Delivery

The resume builder now includes the ability to email PDF resumes directly to users. To enable this functionality, you need to configure email credentials.

## Environment Variables Required

Add these variables to your `.env.local` file:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
   - Use this generated password as `EMAIL_PASS`

3. **Add to .env.local**:
   ```env
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   ```

## Other Email Providers

You can modify the `nodemailer` configuration in `/src/app/api/send-resume-email/route.ts` to use other providers:

```javascript
// For Outlook/Hotmail
service: 'outlook'

// For Yahoo
service: 'yahoo'

// For custom SMTP
host: 'your-smtp-host.com',
port: 587,
secure: false
```

## Security Notes

- Never commit your `.env.local` file to version control
- Use app passwords instead of regular passwords when possible
- Consider using environment variables in production deployments

## Features

- **PDF Generation**: Converts the formatted resume to PDF using html2pdf.js
- **Email Delivery**: Sends the PDF as an attachment to the user's email
- **Professional Template**: Uses HERO.AI branded email template
- **Error Handling**: Provides user feedback on success/failure 