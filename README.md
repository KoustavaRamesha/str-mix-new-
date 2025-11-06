# STR MIX - Ready-Mix Concrete Website

A modern, responsive website for STR MIX concrete company built with Next.js 14, featuring contact forms with email/SMS notifications, customer testimonials, and project showcases.

## 🚀 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Contact Form** - Email and SMS notifications
- **Customer Reviews** - Dynamic testimonial system
- **Project Gallery** - Image showcase with custom descriptions
- **SEO Optimized** - Server-side rendering and meta tags
- **Type Safe** - Full TypeScript implementation

## 📧 Email & SMS Setup

### 1. Email Configuration (Gmail SMTP)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update `.env.local`**:
```env
EMAIL_FROM=strmixconcrete@gmail.com
EMAIL_TO=koustava.r@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 2. SMS Configuration (Twilio)

1. **Create Twilio Account** at [twilio.com](https://twilio.com)
2. **Get Account SID & Auth Token** from Twilio Console
3. **Purchase Phone Number** for SMS sending
4. **Update `.env.local`**:
```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
ADMIN_PHONE_NUMBER=+0987654321
```

### 3. Alternative Email Service (Resend)

For better deliverability, you can use [Resend](https://resend.com):

```env
RESEND_API_KEY=your-resend-api-key
```

## 🛠️ Installation & Setup

1. **Clone the repository**:
```bash
git clone https://github.com/KoustavaRamesha/str-mix-new-.git
cd str-mix-new-
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API keys
```

4. **Run development server**:
```bash
npm run dev
```

5. **Open** [http://localhost:9002](http://localhost:9002)

## 📱 Contact Form Features

When a customer submits the contact form:

- ✅ **Email Notification** - Professional HTML email sent to your inbox
- ✅ **SMS Alert** - Instant SMS notification to admin phone
- ✅ **Data Validation** - Client and server-side validation
- ✅ **Error Handling** - Graceful failure handling
- ✅ **Success Feedback** - User-friendly confirmation messages

### Sample Email Format:
```
Subject: STR MIX Contact Form: [Subject]

Contact Details:
Name: John Doe
Email: john@example.com
Phone: +1234567890
Subject: Quote Request

Message:
[Customer's detailed message]
```

### Sample SMS Format:
```
STR MIX: New inquiry from John Doe about "Quote Request". Please check your email for details.
```

## 🚀 Deployment

### Render Deployment

1. **Connect Repository** to Render
2. **Runtime**: Node
3. **Root Directory**: `./` (leave empty)
4. **Build Command**: `npm run build`
5. **Start Command**: `npm start`
6. **Environment Variables**: Copy from `.env.local`

### Environment Variables for Production

Add these to your hosting platform:

```env
NODE_ENV=production
EMAIL_FROM=strmixconcrete@gmail.com
EMAIL_TO=koustava.r@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
ADMIN_PHONE_NUMBER=+0987654321
```

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── gallery/        # Gallery page
│   │   └── products/       # Products page
│   ├── components/         # Reusable components
│   ├── lib/                # Utilities and configurations
│   │   ├── notifications.ts # Email/SMS services
│   │   ├── reviews.json    # Customer testimonials
│   │   └── placeholder-images.json # Image configurations
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
│   ├── pictures/           # Gallery images
│   └── logo.png           # Company logo
└── .env.local             # Environment variables
```

## 🧪 Testing Contact Form

1. **Fill out the contact form** on `/contact` page
2. **Submit the form**
3. **Check terminal/console** for confirmation messages
4. **Check email inbox** for professional HTML email
5. **Check SMS** for instant notification

## 🔧 Customization

### Adding New Images
1. Add images to `public/pictures/`
2. Update `src/lib/placeholder-images.json`
3. Reference by ID in components

### Modifying Email Templates
Edit `src/lib/notifications.ts` - `sendContactEmail()` function

### Changing SMS Content
Modify message in `src/lib/notifications.ts` - `sendContactSMS()` function

## 📞 Support

For technical support or questions:
- Email: contact@strmix.com
- Phone: 09741499909
- Instagram: [@strmix_9](https://instagram.com/strmix_9)

## 📄 License

This project is proprietary to STR MIX Concrete Company.

---

**Built with ❤️ for STR MIX - Building the Foundations of Tomorrow**
