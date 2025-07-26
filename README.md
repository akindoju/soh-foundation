# Stone of Help Foundation Website

A modern, responsive charity website built with Next.js, featuring a comprehensive admin panel for content management.

## Features

### Public Website
- **Home Page**: Hero section with mission statement and quick links
- **About Us**: Foundation's vision, mission, core values, and key initiatives
- **Services**: Detailed information about programs and recent events
- **Gallery**: Image gallery with event details and filtering
- **Testimonials**: Community feedback and success stories
- **Contact**: Contact information, newsletter signup, and contact form

### Admin Panel
- **Secure Authentication**: Password-protected admin access
- **Gallery Management**: Upload images with metadata (event name, date, description)
- **Content Editing**: Manage services, testimonials, and contact information
- **User Management**: Basic admin user management with role-based access

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Supabase for database and authentication
- **Deployment**: Vercel with continuous integration
- **Database**: PostgreSQL (via Supabase)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd soh-foundation-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a `.env.local` file with:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

4. Set up the database:
- Run the SQL scripts in the `scripts` folder to create tables and seed data
- Or use the Supabase dashboard to execute the scripts

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Access

### Default Admin Credentials
- **Email**: admin@sohfoundation.com
- **Password**: admin123

### Admin Panel Features

#### Gallery Management
- Upload new images with event details
- Add metadata: Event Name, Date, Location, Description
- View and manage existing gallery items
- Delete unwanted items

#### Content Management
- Edit service descriptions and dates
- Manage testimonials (add, edit, delete)
- Update contact information
- Modify newsletter content

#### User Management
- View existing admin users
- Add new admin users
- Manage user roles and permissions

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Setup
1. Create a Supabase project
2. Run the provided SQL scripts to set up tables
3. Configure Row Level Security (RLS) policies as needed

## File Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── gallery/           # Gallery page
│   ├── testimonials/      # Testimonials page
│   ├── contact/           # Contact page
│   ├── admin/             # Admin panel
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── layout/           # Header and footer
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   └── supabase.ts       # Supabase client
├── scripts/              # Database scripts
│   ├── create-database.sql
│   └── seed-data.sql
└── README.md
\`\`\`

## Key Features Implementation

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Responsive navigation with mobile menu
- Optimized images with Next.js Image component

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

### Performance
- Next.js optimizations (SSG, image optimization)
- Lazy loading for images
- Efficient database queries

### Security
- Protected admin routes
- Input validation and sanitization
- Secure authentication with Supabase

## Contact Information

**Stone of Help Foundation**
- Phone: +234 812 874 7573
- Email: sohfoundation@gmail.com
- Website: [Your deployed URL]

## License

This project is licensed under the MIT License.
