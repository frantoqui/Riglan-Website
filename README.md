# RIGLAN Website

Professional institutional website for RIGLAN, selling analytical research publications.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: AWS Amplify Gen 2
- **Authentication**: AWS Cognito
- **Database**: AWS AppSync + DynamoDB
- **Storage**: Amazon S3
- **Payments**: Stripe (prepared for future integration)
- **Internationalization**: next-intl (English/Spanish)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- AWS Account (for deployment)
- Amplify CLI (optional, for local development)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd riglan-website
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

### Local Development (Without AWS Backend)

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

**Note**: Authentication features will not work without AWS Amplify backend configured.

### Local Development (With AWS Amplify)

1. Install Amplify CLI globally (if not already installed)
```bash
npm install -g @aws-amplify/cli
```

2. Initialize Amplify sandbox
```bash
npx ampx sandbox
```

This will:
- Create a temporary AWS environment
- Deploy Cognito, AppSync, DynamoDB, and S3
- Auto-generate configuration files
- Watch for backend changes

3. The sandbox will output the configuration values. Copy them to `.env.local`

4. Run the development server
```bash
npm run dev
```

## Project Structure

```
riglan-website/
├── amplify/              # AWS Amplify Gen 2 backend
│   ├── auth/            # Cognito authentication config
│   ├── data/            # AppSync GraphQL schema
│   ├── storage/         # S3 storage config
│   └── backend.ts       # Backend definition
├── public/              # Static files
│   ├── images/          # Logo and images
│   ├── locales/         # Translation files
│   └── favicon files
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── [locale]/    # Internationalized routes
│   │   └── globals.css
│   ├── components/      # React components
│   │   ├── ui/          # Base UI components
│   │   ├── layout/      # Layout components
│   │   ├── publications/
│   │   └── commission/
│   ├── lib/             # Utilities and configuration
│   │   ├── amplify/     # AWS Amplify config
│   │   ├── i18n/        # Internationalization
│   │   ├── pricing/     # Pricing calculator
│   │   └── utils/
│   ├── theme/           # Design system tokens
│   └── types/           # TypeScript types
├── next.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

## Features

### Implemented

- ✅ Responsive layout with header, footer, and navigation
- ✅ Multi-language support (English/Spanish) with flag dropdown
- ✅ Professional institutional design (inspired by RAND.org, Brookings.edu)
- ✅ Logo and favicon integration
- ✅ Homepage with value proposition
- ✅ Publications catalogue page with filters
- ✅ Commission request form with dynamic pricing calculator
- ✅ Core/About page explaining methodology
- ✅ Contact form
- ✅ Legal pages (Terms, Privacy, AI Policy)
- ✅ Authentication pages (Login, Register) with AWS Amplify
- ✅ AWS Amplify backend configuration (Auth, Data, Storage)

### To Be Implemented

- ⏳ User account dashboard
- ⏳ Purchase flow and order history
- ⏳ Stripe payment integration
- ⏳ PDF watermarking and secure downloads
- ⏳ Admin panel for content management
- ⏳ Email notifications
- ⏳ Invoice generation

## Deployment to AWS Amplify

### Option 1: Amplify Console (Recommended)

1. Push your code to GitHub, GitLab, or Bitbucket

2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)

3. Click "New app" → "Host web app"

4. Connect your repository

5. Configure build settings (auto-detected for Next.js)

6. Add environment variables in Amplify Console

7. Deploy!

Amplify will automatically:
- Deploy the backend (Cognito, AppSync, DynamoDB, S3)
- Build and deploy the frontend
- Set up CI/CD for automatic deployments
- Configure custom domain and SSL

### Option 2: Amplify CLI

```bash
# Configure Amplify CLI with your AWS credentials
amplify configure

# Initialize Amplify in your project
amplify init

# Deploy backend and frontend
amplify push

# Publish frontend to Amplify Hosting
amplify publish
```

## Environment Variables

After deploying with Amplify, you'll receive the following configuration values:

```env
NEXT_PUBLIC_USER_POOL_ID=          # From Amplify Auth
NEXT_PUBLIC_USER_POOL_CLIENT_ID=   # From Amplify Auth
NEXT_PUBLIC_IDENTITY_POOL_ID=      # From Amplify Auth
NEXT_PUBLIC_API_ENDPOINT=          # From Amplify API
NEXT_PUBLIC_AWS_REGION=            # Your AWS region
NEXT_PUBLIC_STORAGE_BUCKET=        # From Amplify Storage
```

## Pricing Structure

| Product | Catalogue | Commissioned (Private) | Express Delivery |
|---------|-----------|------------------------|------------------|
| BRIEF   | $2,400    | $2,400                | Not available    |
| DOSSIER | $7,900    | $7,900                | +20%             |
| REVIEW  | $14,900   | $16,900 (+$2K premium)| +20%             |
| FILE    | $49,900   | $54,900 (+$5K premium)| +30%             |

*Catalogue inclusion option removes private premium for REVIEW/FILE*

## Design Principles

- **Institutional Aesthetic**: Calm, professional, document-focused
- **No Animations**: Static, predictable interface
- **Generous Spacing**: Clear content hierarchy
- **Typography**: Inter (sans-serif), Libre Baskerville (serif)
- **Colors**: Deep navy primary, warm gray neutrals
- **No Marketing Fluff**: No testimonials, no chat widgets, no personalization

## Authentication Flow

1. **Registration**: User signs up with email, receives verification email
2. **Email Verification**: User clicks link to verify account
3. **Login**: User authenticates with Cognito
4. **Session Management**: Handled automatically by Amplify
5. **Protected Routes**: Account pages require authentication

## Contributing

This is a private project. For questions, contact the RIGLAN team.

## License

Proprietary - All rights reserved by RIGLAN.