export const navigation = [
  { label: "Study", href: "/study" },
  { label: "Career", href: "/career" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];
export type ServiceKey = "study" | "career" | "accommodation";
export type Service = {
  key: ServiceKey;
  label: string;
  headline: string;
  description: string;
  href: string;
  cta: string;
  enquiry: string;
  eyebrow: string;
  items: { title: string; description: string }[];
};
export const services: Service[] = [
  {
    key: "study",
    label: "Study",
    headline: "Learn with confidence.",
    description:
      "End-to-end assignment development, academic writing, research support, tutoring and editing for students worldwide.",
    href: "/study",
    cta: "Explore Study Support",
    enquiry: "Academic Support",
    eyebrow: "Academic support / available worldwide",
    items: [
      {
        title: "Assignment & academic writing support",
        description:
          "Get comprehensive support from interpreting the brief and planning research through structure, argument development, draft feedback, editing, referencing and final review.",
      },
      {
        title: "Research & dissertation support",
        description:
          "Develop research topics, plan literature reviews, understand methodology and strengthen dissertation or thesis projects through mentoring.",
      },
      {
        title: "Tutoring & mentoring",
        description:
          "Work one-to-one on subject understanding, academic skills, study planning and projects with guidance adapted to your goals.",
      },
      {
        title: "Research support",
        description:
          "Plan research, improve source-finding strategies and discuss methodology, data analysis and academic presentations where appropriate.",
      },
      {
        title: "Proofreading & editing",
        description:
          "Get detailed feedback on clarity, grammar and consistency within your institution’s rules. You review each suggestion and retain ownership of the final work.",
      },
      {
        title: "Referencing, formatting & presentation",
        description:
          "Improve citations, reference lists, document presentation and presentation or viva preparation where appropriate.",
      },
    ],
  },
  {
    key: "career",
    label: "Career",
    headline: "Prepare for what’s next.",
    description:
      "CV and resume guidance, career planning, interview preparation and graduate support for students worldwide.",
    href: "/career",
    cta: "Explore Career Support",
    enquiry: "Career Support",
    eyebrow: "Career support / available worldwide",
    items: [
      {
        title: "CV review & improvement",
        description:
          "Make your experience easier to understand. Get feedback on structure, language and relevance, and learn how to tailor a CV honestly to a role.",
      },
      {
        title: "LinkedIn profile guidance",
        description:
          "Tell a consistent professional story through your headline, summary and experience. Make your strengths clear without overstating them.",
      },
      {
        title: "Career planning",
        description:
          "Explore the work that interests you, recognise your transferable skills and turn broad ambitions into practical next steps.",
      },
      {
        title: "Interview preparation",
        description:
          "Practise explaining your experience and answering common interview questions. Build specific examples and get constructive feedback.",
      },
      {
        title: "Job-search strategy",
        description:
          "Create a focused search routine, assess opportunities and keep track of applications. Spend your time on roles that make sense for your goals.",
      },
      {
        title: "Graduate career guidance",
        description:
          "Talk through the transition from study to work, including how to present university projects and early experience to employers.",
      },
      {
        title: "Cover letters & personal statements",
        description:
          "Get guidance on presenting your motivation and relevant evidence clearly, honestly and appropriately for an opportunity.",
      },
    ],
  },
  {
    key: "accommodation",
    label: "Accommodation",
    headline: "Find your place.",
    description:
      "Accommodation search and relocation support for students moving to London.",
    href: "/accommodation",
    cta: "Explore Accommodation",
    enquiry: "London Accommodation",
    eyebrow: "Accommodation support / currently London only",
    items: [
      {
        title: "Understanding your requirements",
        description:
          "Start with your budget, university location, move-in date and living preferences. Build a realistic picture of what you need from a home.",
      },
      {
        title: "London area guidance",
        description:
          "Compare areas through the things that matter to you: your commute, everyday amenities, pace of life and likely living costs.",
      },
      {
        title: "Accommodation search assistance",
        description:
          "Get help organising your search across student halls, shared homes and other accommodation options. Availability is always subject to the provider.",
      },
      {
        title: "Comparing your options",
        description:
          "Put rent, bills, transport, room type and practical requirements side by side so you can ask better questions before deciding.",
      },
      {
        title: "Rental process guidance",
        description:
          "Understand the steps to ask a provider about, from viewing and documentation to deposits and move-in arrangements. Seek qualified advice on legal questions.",
      },
      {
        title: "Moving support",
        description:
          "Prepare for your arrival, organise the essentials and make a practical plan for the first days in your new home.",
      },
    ],
  },
];
export type Resource = {
  title: string;
  category:
    | "Academic"
    | "Research"
    | "Career"
    | "Student Life"
    | "Accommodation"
    | "Moving Abroad";
  status: "coming-soon" | "published";
  slug: string;
};
export const resources: Resource[] = [
  {
    title: "How to structure a university assignment",
    category: "Academic",
    status: "coming-soon",
    slug: "structure-university-assignment",
  },
  {
    title: "How to approach a dissertation",
    category: "Research",
    status: "coming-soon",
    slug: "approach-a-dissertation",
  },
  {
    title: "How to choose a research topic",
    category: "Research",
    status: "coming-soon",
    slug: "choose-a-research-topic",
  },
  {
    title: "Academic referencing explained",
    category: "Academic",
    status: "coming-soon",
    slug: "academic-referencing-explained",
  },
  {
    title: "How academic proofreading works",
    category: "Academic",
    status: "coming-soon",
    slug: "academic-proofreading",
  },
  {
    title: "How to prepare your first graduate CV",
    category: "Career",
    status: "coming-soon",
    slug: "first-graduate-cv",
  },
  {
    title: "How to prepare for an interview",
    category: "Career",
    status: "coming-soon",
    slug: "prepare-for-an-interview",
  },
  {
    title: "International student study tips",
    category: "Student Life",
    status: "coming-soon",
    slug: "international-student-study-tips",
  },
  {
    title: "How to find student accommodation in London",
    category: "Accommodation",
    status: "coming-soon",
    slug: "student-accommodation-london",
  },
  {
    title: "A student’s guide to moving to London",
    category: "Moving Abroad",
    status: "coming-soon",
    slug: "moving-to-london",
  },
];
export const faqs = [
  {
    question: "What does CampusLync help with?",
    answer:
      "We bring together worldwide academic and career guidance with specialist accommodation and relocation assistance currently available in London.",
  },
  {
    question: "Who can use CampusLync?",
    answer:
      "University students and international students around the world can use our Study and Career services. Graduates and parents exploring support for a student can also enquire.",
  },
  {
    question: "Can you help international students?",
    answer:
      "Yes. Study and Career support is designed for university students and international students wherever they study. Accommodation assistance is currently limited to London. We do not provide immigration advice.",
  },
  {
    question: "Can you help me find accommodation in London?",
    answer:
      "We offer accommodation search assistance, area guidance and help comparing options. We do not own properties, act as a letting agent or guarantee accommodation. You make the final choice and contract directly with the provider.",
  },
  {
    question: "What kind of academic support do you provide?",
    answer:
      "Our worldwide services include end-to-end assignment development, academic writing support, research and dissertation mentoring, tutoring, detailed draft feedback, proofreading, editing, referencing, presentation support and study planning. Support must comply with your institution’s rules.",
  },
  {
    question: "How much assignment support can CampusLync provide?",
    answer:
      "Support can cover the full development process: understanding the brief, research planning, source strategy, structure, argument development, academic writing coaching, detailed draft review, editing, referencing and final preparation. You remain the author and are responsible for your submitted work.",
  },
  {
    question: "How do I get started?",
    answer:
      "Visit Get Support and tell us which area you need help with. The form shows whether online enquiry delivery is currently available and confirms a request only after it has been accepted.",
  },
];
export const serviceFaqs = {
  study: [
    {
      question: "Can you help with an assignment or dissertation?",
      answer:
        "Yes. Support can continue from interpreting the requirements and developing the research plan through structure, chapter or section development, detailed draft feedback, editing, referencing and final review.",
    },
    {
      question: "Is Study support available outside the UK?",
      answer:
        "Yes. Study support is available remotely to university students worldwide and can be shaped around your institution's requirements.",
    },
    {
      question: "What does proofreading include?",
      answer:
        "Proofreading can identify issues with grammar, clarity, consistency, referencing and presentation. The scope must follow your institution's academic-integrity rules, and you decide which changes to make.",
    },
    {
      question: "Who remains responsible for submitted work?",
      answer:
        "You do. You remain responsible for the ideas, accuracy, authorship and final version of everything you submit.",
    },
  ],
  career: [
    {
      question: "Can you review an existing CV or resume?",
      answer:
        "Yes. We can review its structure, clarity and relevance, then help you tailor it honestly to the kinds of roles you are targeting.",
    },
    {
      question: "Is Career support available worldwide?",
      answer:
        "Yes. Career guidance is available remotely to students and graduates worldwide. Advice is adapted to your goals and context rather than limited to the UK.",
    },
    {
      question: "Can I practise for an interview?",
      answer:
        "Yes. Interview preparation can cover common questions, examples from your experience, delivery and constructive feedback.",
    },
    {
      question: "Do you guarantee interviews or job offers?",
      answer:
        "No. CampusLync provides preparation and guidance but cannot guarantee an interview, placement or job offer.",
    },
  ],
  accommodation: [
    {
      question: "Where is accommodation support available?",
      answer:
        "Accommodation search assistance is currently available for students moving to or living in London.",
    },
    {
      question: "Does CampusLync own or rent properties?",
      answer:
        "No. CampusLync does not own properties or act as a letting agent. We help you organise your search, understand areas and compare options.",
    },
    {
      question: "Can you guarantee accommodation?",
      answer:
        "No. Availability and acceptance are controlled by each accommodation provider. You make the final decision and contract directly with the provider.",
    },
    {
      question: "Can you give legal or immigration advice?",
      answer:
        "No. We can explain practical steps and questions to ask, but legal, financial and immigration matters should go to an appropriately qualified adviser.",
    },
  ],
} satisfies Record<ServiceKey, { question: string; answer: string }[]>;

export const downloads = [
  {
    title: "Assignment review checklist",
    description:
      "A practical final review for structure, evidence, referencing and submission readiness.",
    href: "/downloads/campuslync-assignment-review-checklist.pdf",
    category: "Academic",
  },
  {
    title: "Dissertation planning checklist",
    description:
      "Plan your question, literature, methodology, milestones and supervisor conversations.",
    href: "/downloads/campuslync-dissertation-planning-checklist.pdf",
    category: "Research",
  },
  {
    title: "Graduate CV checklist",
    description:
      "Review clarity, evidence, relevance and presentation before applying.",
    href: "/downloads/campuslync-graduate-cv-checklist.pdf",
    category: "Career",
  },
  {
    title: "Moving to London checklist",
    description:
      "Keep accommodation, documents, travel and first-week essentials organised.",
    href: "/downloads/campuslync-moving-to-london-checklist.pdf",
    category: "London",
  },
];
export const journey = [
  {
    title: "Choosing your path",
    text: "Explore your direction",
    icon: "compass",
  },
  { title: "Starting university", text: "Find your feet", icon: "plane" },
  { title: "Academic support", text: "Build your skills", icon: "home" },
  { title: "Career development", text: "Prepare with purpose", icon: "book" },
  { title: "Graduation", text: "Mark the milestone", icon: "briefcase" },
  { title: "What’s next", text: "Take your next step", icon: "graduation" },
];
export const londonSteps = [
  {
    title: "Before you move",
    description:
      "Gather your university information, note important dates and create a budget for your move. Keep your own checklist of tasks and documents.",
  },
  {
    title: "Choosing where to live",
    description:
      "Start with your campus location, budget and preferred living arrangement. Think about the full cost of living, including bills and travel.",
  },
  {
    title: "Understanding London areas",
    description:
      "Look beyond a postcode. Compare the commute to your actual campus, local amenities and the kind of neighbourhood you would enjoy.",
  },
  {
    title: "Accommodation preparation",
    description:
      "Prepare questions for accommodation providers about availability, documents, payments and move-in dates. Review the details before making commitments.",
  },
  {
    title: "Arrival checklist",
    description:
      "Confirm access to your accommodation, plan your route from your arrival point and keep essential contact details available offline.",
  },
  {
    title: "Getting settled",
    description:
      "Learn your local area, plan everyday essentials and familiarise yourself with university support. Give yourself time to adjust to a new routine.",
  },
  {
    title: "Starting university",
    description:
      "Explore induction activities, understand how your course is organised and find the university teams that can help with student life.",
  },
  {
    title: "Academic support",
    description:
      "Get familiar with course expectations, plan independent study time and ask for guidance early when a topic or task feels unclear.",
  },
  {
    title: "Career preparation",
    description:
      "Start collecting examples of your skills and interests. Small steps towards a CV and career plan can make your next chapter more manageable.",
  },
];
