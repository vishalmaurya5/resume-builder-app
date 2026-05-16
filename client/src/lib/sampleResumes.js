const sampleProfileImage =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'><rect width='160' height='160' rx='80' fill='%23dbeafe'/><circle cx='80' cy='58' r='32' fill='%232563eb'/><path d='M28 144c8-34 31-52 52-52s44 18 52 52' fill='%232563eb'/></svg>"

export const sampleResumes = [
  {
    id: 'sample-ats-accountant',
    title: 'Sample ATS Accountant Resume',
    template: 'ats',
    accent_color: '#111827',
    personal_info: {
      full_name: 'David Williams',
      profession: 'Accountant',
      email: 'david.williams@email.com',
      phone: '+1 312 555 7890',
      location: 'Chicago, IL',
      linkedin: 'linkedin.com/in/davidwilliams',
      website: '',
    },
    professional_summary:
      'Detail-oriented accountant with experience in financial reporting, budgeting, tax preparation, and audit support.',
    experience: [
      {
        position: 'Senior Accountant',
        company: 'Anderson Financial Group',
        start_date: '2020-01',
        end_date: '',
        is_current: true,
        description:
          'Prepared monthly financial statements in compliance with GAAP.\nManaged tax filings and audit support for internal leadership.\nImproved budget tracking workflows and reduced reporting delays.',
      },
    ],
    education: [
      {
        degree: "Bachelor's Degree",
        field: 'Accounting',
        institution: 'University of Illinois',
        graduation_date: '2016-05',
        gpa: '',
      },
    ],
    project: [],
    certificates: [
      {
        name: 'QuickBooks Online Certification',
        issuer: 'Intuit',
        issue_date: '2023-03',
        credential_url: '',
        description: 'Credential covering bookkeeping workflows, reporting, and account reconciliation.',
      },
    ],
    skills: ['Financial Reporting', 'Accounts Payable', 'Tax Preparation', 'GAAP', 'QuickBooks'],
    public: false,
  },
  {
    id: 'sample-modern-developer',
    title: 'Sample Modern Developer Resume',
    template: 'modern',
    accent_color: '#2563eb',
    personal_info: {
      full_name: 'Aarav Mehta',
      profession: 'Frontend Developer',
      email: 'aarav.mehta@email.com',
      phone: '+91 98765 43210',
      location: 'Bengaluru, India',
      linkedin: 'linkedin.com/in/aaravmehta',
      website: 'aarav.dev',
    },
    professional_summary:
      'Frontend developer focused on React applications, responsive interfaces, API integration, and performance-minded user experiences.',
    experience: [
      {
        position: 'Frontend Developer',
        company: 'PixelStack Labs',
        start_date: '2022-04',
        end_date: '',
        is_current: true,
        description:
          'Built reusable React components for product dashboards.\nIntegrated REST APIs and improved form validation flows.\nReduced page load time by optimizing assets and component rendering.',
      },
    ],
    education: [
      {
        degree: 'B.Tech',
        field: 'Computer Science',
        institution: 'PES University',
        graduation_date: '2021-06',
        gpa: '',
      },
    ],
    project: [
      {
        name: 'Resume Builder App',
        type: 'Web Application',
        description: 'Created a resume builder with templates, live preview, auth, and print-ready export.',
      },
    ],
    certificates: [
      {
        name: 'Meta Front-End Developer Certificate',
        issuer: 'Meta',
        issue_date: '2023-09',
        credential_url: '',
        description: 'React, JavaScript, UI development, and responsive web application fundamentals.',
      },
    ],
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Git'],
    public: false,
  },
  {
    id: 'sample-classic-manager',
    title: 'Sample Classic Manager Resume',
    template: 'classic',
    accent_color: '#0f766e',
    personal_info: {
      full_name: 'Emma Larsen',
      profession: 'Operations Manager',
      email: 'emma.larsen@email.com',
      phone: '+1 555 555 5555',
      location: 'San Diego, CA',
      linkedin: 'linkedin.com/in/emmalarsen',
      website: '',
    },
    professional_summary:
      'Operations manager with experience coordinating teams, improving process efficiency, and delivering customer-focused service outcomes.',
    experience: [
      {
        position: 'Operations Manager',
        company: 'Northline Retail Group',
        start_date: '2019-08',
        end_date: '',
        is_current: true,
        description:
          'Managed daily operations for a multi-location retail team.\nImproved scheduling workflows and reduced overtime costs.\nLed process improvements across inventory and customer service teams.',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Business Administration',
        field: 'Management',
        institution: 'San Diego State University',
        graduation_date: '2015-05',
        gpa: '',
      },
    ],
    project: [],
    certificates: [
      {
        name: 'Certified Manager',
        issuer: 'Institute of Certified Professional Managers',
        issue_date: '2022-11',
        credential_url: '',
        description: 'Management, operations planning, and leadership credential.',
      },
    ],
    skills: ['Team Leadership', 'Process Improvement', 'Customer Service', 'Scheduling', 'Cost Control'],
    public: false,
  },
  {
    id: 'sample-image-designer',
    title: 'Sample Image Sidebar Designer Resume',
    template: 'minimal-image',
    accent_color: '#9333ea',
    personal_info: {
      full_name: 'Maya Chen',
      profession: 'Product Designer',
      email: 'maya.chen@email.com',
      phone: '+1 415 555 0188',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/mayachen',
      website: 'maya.design',
      image: sampleProfileImage,
      image_preview: sampleProfileImage,
    },
    professional_summary:
      'Product designer creating accessible user interfaces, polished design systems, and research-backed product experiences.',
    experience: [
      {
        position: 'Product Designer',
        company: 'BrightLayer Studio',
        start_date: '2021-03',
        end_date: '',
        is_current: true,
        description:
          'Designed mobile and web flows for SaaS onboarding.\nBuilt reusable Figma components for product teams.\nPartnered with engineers to improve accessibility and interaction quality.',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Design',
        field: 'Interaction Design',
        institution: 'California College of the Arts',
        graduation_date: '2020-05',
        gpa: '',
      },
    ],
    project: [
      {
        name: 'Design System Refresh',
        type: 'Design System',
        description: 'Created shared components, tokens, and documentation for faster product delivery.',
      },
    ],
    certificates: [
      {
        name: 'Google UX Design Certificate',
        issuer: 'Google',
        issue_date: '2022-08',
        credential_url: '',
        description: 'UX research, wireframing, prototyping, and usability testing.',
      },
    ],
    skills: ['Figma', 'UX Research', 'Design Systems', 'Prototyping', 'Accessibility'],
    public: false,
  },
]
