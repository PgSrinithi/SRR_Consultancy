// Navigation and Layout Constants
export const COMPANY_NAME = "SRR Consultancy";
export const COMPANY_ESTABLISHED_YEAR = 2005;
export const COMPANY_PHONE = "+91 123 456 7890";
export const COMPANY_EMAIL = "info@srrconsultancy.com";
export const COMPANY_ADDRESS = "123 Business Avenue, Corporate Tower, Mumbai, India - 400001";

// Navigation Links
export const NAV_LINKS = [
  { name: "Home", href: "/", id: "home" },
  { name: "About Us", href: "#about", id: "about" },
  { name: "Sectors", href: "#sectors", id: "sectors" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Jobs", href: "/jobs", id: "jobs" },
  { name: "Contact", href: "#contact", id: "contact" },
];

// Home Page - Hero Section
export const HERO_BADGE_TEXT = "ESTABLISHED 2005";
export const HERO_TITLE = "Building the Future with Global Talent";
export const HERO_DESCRIPTION =
  "Connecting world-class businesses with exceptional talent. Your trusted partner for international recruitment and workforce management.";

// Home Page - Stats
export const STATS = [
  { number: "18+", label: "Years Experience" },
  { number: "50k+", label: "Workers Placed" },
  { number: "500+", label: "Corporate Clients" },
  { number: "25+", label: "Countries Served" },
];

// Home Page - About Section
export const ABOUT_BADGE = "About SRR Consultancy";
export const ABOUT_TITLE = "Reliable Manpower Solutions Since 2005";
export const ABOUT_DESCRIPTION =
  "SRR Consultancy has been a pioneer in the recruitment industry, providing comprehensive manpower solutions to clients across the Middle East, Europe, and Asia. We specialize in sourcing, screening, and deploying top-tier talent that meets the specific needs of your industry.";

export const ABOUT_FEATURES = [
  "ISO Certified Process",
  "Global Network",
  "Industry Specialists",
  "Fast Turnaround",
];

export const ABOUT_CEO_QUOTE = "Excellence in every placement";

// Home Page - Sectors
export const SECTORS_BADGE = "Industries We Serve";
export const SECTORS_TITLE = "Specialized Recruitment Across Key Sectors";
export const SECTORS_DESCRIPTION =
  "We have deep expertise in sourcing professionals for specialized industries, ensuring technical competency and cultural fit.";

export const SECTOR_NAMES = [
  "Construction",
  "Oil & Gas",
  "Healthcare",
  "Hospitality",
  "Logistics",
];

// Home Page - Services Section
export const SERVICES_BADGE = "Our Services";
export const SERVICES_TITLE = "Comprehensive HR Solutions";
export const SERVICES_DESCRIPTION =
  "From initial screening to final deployment, we handle every aspect of the recruitment lifecycle.";

export const SERVICES = [
  {
    title: "Recruitment",
    description: "Sourcing and screening best-fit candidates.",
  },
  { title: "Visa & Migration", description: "End-to-end documentation and processing." },
  { title: "Training", description: "Skill enhancement and cultural orientation." },
];

export const SERVICES_CTA_TITLE = "Ready to build your dream team?";
export const SERVICES_CTA_DESCRIPTION =
  "Partner with SRR Consultancy for reliable, efficient, and compliant manpower solutions.";

// Home Page - Contact CTA Section
export const CONTACT_CTA_TITLE = "Get in Touch With Us";
export const CONTACT_CTA_DESCRIPTION =
  "Whether you're an employer looking for talent or a professional seeking opportunities, we're here to help.";

// Footer - Quick Links
export const FOOTER_QUICK_LINKS = [
  { name: "About Us", href: "#about" },
  { name: "Our Services", href: "#services" },
  { name: "Sectors", href: "#sectors" },
  { name: "Job Seekers", href: "#jobs" },
  { name: "Contact Us", href: "#contact" },
];

// Footer - Social Links
export const SOCIAL_LINKS = [
  { name: "Facebook", url: "#" },
  { name: "Twitter", url: "#" },
  { name: "LinkedIn", url: "#" },
  { name: "Instagram", url: "#" },
];

// Jobs Page
export const JOBS_HERO_TITLE = "Job Opportunities";
export const JOBS_HERO_DESCRIPTION =
  "Explore exciting career opportunities across construction, oil & gas, healthcare, hospitality, and logistics sectors.";

export const JOBS_FILTER_TITLE = "Filter Jobs";
export const JOBS_SEARCH_PLACEHOLDER = "Search jobs...";
export const JOBS_SEARCH_LABEL = "Search by Job Title";
export const JOBS_INDUSTRY_LABEL = "Industry";
export const JOBS_LOCATION_LABEL = "Location";

// Client Modal
export const CLIENT_MODAL_TITLE = "Find Talent";
export const CLIENT_MODAL_DESCRIPTION = "Tell us about your business and talent requirements";

export const CLIENT_FORM_LABELS = {
  name: "Full Name",
  email: "Email",
  phone: "Phone",
  businessName: "Business Name",
  industry: "Industry",
  otherIndustry: "Please Specify Industry",
  locations: "Preferred Locations",
  otherLocation: "Please Specify Location",
  message: "Message (Optional)",
};

export const CLIENT_FORM_PLACEHOLDERS = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 98765 43210",
  businessName: "Your Company Name",
  industry: "Select industry",
  otherIndustry: "Enter your industry",
  locations: "Select locations",
  otherLocation: "Enter your location",
  message: "Tell us about your talent requirements...",
};

export const CLIENT_INDUSTRIES = [
  "Construction",
  "Oil & Gas",
  "Healthcare",
  "Hospitality",
  "Logistics",
  "Other",
];

export const CLIENT_LOCATIONS = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan",
  "Calabar",
  "Other",
];

// Job Application Modal
export const JOB_APPLICATION_TITLE = "Apply for Position";
export const JOB_APPLICATION_FORM_LABELS = {
  jobTitle: "Job Title",
  applicantName: "Full Name",
  applicantEmail: "Email",
  applicantPhone: "Phone",
  message: "Message (Optional)",
  resume: "Resume (Optional)",
};

export const JOB_APPLICATION_PLACEHOLDERS = {
  applicantName: "John Doe",
  applicantEmail: "john@example.com",
  applicantPhone: "+91 98765 43210",
  message: "Tell us why you're interested in this position...",
};

// Button Text
export const BUTTON_TEXT = {
  findTalent: "Find Talent",
  searchJobs: "Search Jobs",
  iAmCandidate: "I'm a Candidate",
  iAmClient: "I'm a Client",
  viewPositions: "View Positions",
  apply: "Apply",
  view: "View",
  applyNow: "Apply Now",
  close: "Close",
  submitInquiry: "Submit Inquiry",
  submitApplication: "Submit Application",
  clearAll: "Clear All",
  getInTouch: "Get in Touch",
  contactSupport: "Contact Support",
  submitResume: "Submit Resume",
  requestConsultation: "Request a Consultation",
  readMore: "Read More About Us",
  viewAllIndustries: "View All Industries",
};

// Toast Messages
export const TOAST_MESSAGES = {
  applicationSuccess: {
    title: "Application Submitted Successfully",
    description:
      "Thank you for applying. We will review your application and contact you soon.",
  },
  applicationError: {
    title: "Error",
    description: "Failed to submit application. Please try again.",
  },
  inquirySuccess: {
    title: "Inquiry Submitted Successfully",
    description: "Thank you for your interest. Our team will contact you soon.",
  },
  inquiryError: {
    title: "Error",
    description: "Failed to submit inquiry. Please try again.",
  },
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Jobs Page - Filter Labels
export const JOBS_FILTER_LABELS = {
  activeFilters: "Active Filters:",
  industry: "Industry",
  location: "Location",
  jobRole: "Job Role",
};

export const JOBS_PAGE_TEXT = {
  viewButton: "View",
  applyButton: "Apply",
  applyNowButton: "Apply Now",
  closeButton: "Close",
  noJobsFound: "No jobs found matching your criteria.",
  jobDescription: "Job Description",
  requiredQualifications: "Required Qualifications",
  industry: "Industry",
  location: "Location",
  showing: "Showing",
  to: "to",
  of: "of",
  jobs: "jobs",
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  nameRequired: "Name must be at least 2 characters",
  emailInvalid: "Invalid email address",
  phoneInvalid: "Phone number must be at least 10 digits",
  businessNameRequired: "Business name must be at least 2 characters",
  industryRequired: "Please select an industry",
  industrySpecifyRequired: "Please specify the industry",
  locationsRequired: "Please select at least one location",
  locationSpecifyRequired: "Please specify the location",
};

// Resume Upload
export const RESUME_ACCEPTED_FORMATS = "PDF, DOC, DOCX, TXT";
export const RESUME_ACCEPT_TYPES = ".pdf,.doc,.docx,.txt";
export const RESUME_UPLOAD_TEXT = "Click to upload resume";
