# ApplyFlow - Job Preparation Platform

ApplyFlow is a comprehensive job preparation platform that helps users track their job applications, prepare for technical interviews, and analyze their application progress.

## Features

- **Smart Job Application Tracker**
  - Track applications across different companies
  - Monitor application stages (applied, interview, offer, rejected)
  - Record referral contacts
  - Automated follow-up reminders

- **Technical Interview Preparation**
  - Access to 150 NeetCode problems
  - Daily question goals
  - Spaced repetition learning
  - Progress tracking

- **Application Analytics Dashboard**
  - Weekly application goals
  - Application statistics
  - Response rate analysis
  - Time-to-offer metrics

- **All-in-One Workspace**
  - Centralized job preparation hub
  - Organized workflow
  - Progress tracking

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth.js

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your database credentials
5. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/applyflow"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
