// Data structure for Watch and Read career exploration
// User will fill in the actual content for each career

export interface VideoResource {
    id: string;
    title: string;
    youtubeUrl: string; // YouTube embed URL
    duration?: string;
}

export interface ArticleResource {
    id: string;
    title: string;
    url: string;
    source: string;
    readTime?: string;
}

export interface Quote {
    text: string;
    author: string;
    role: string;
}

export interface DayInLife {
    time: string;
    activity: string;
}

export interface ExploreCareer {
    id: string;
    slug: string;
    name: string;
    category: string;
    icon: string; // Lucide icon name
    shortDescription: string;
    longDescription: string;
    whatTheyDo: string[];
    dayToDayChallenges: string[];
    dayInLife: DayInLife[];
    skills: string[];
    education: {
        india: string[];
        abroad: string[];
    };
    salaryRange: {
        india: string;
        abroad: string;
    };
    quotes: Quote[];
    videos: VideoResource[];
    articles: ArticleResource[];
    color: string; // Tailwind color class for theming
}

// Career categories for filtering
export const CAREER_CATEGORIES = [
    { id: 'all', name: 'All Careers', icon: 'LayoutGrid' },
    { id: 'medical', name: 'Medical', icon: 'Stethoscope' },
    { id: 'tech', name: 'Engineering & Tech', icon: 'Code' },
    { id: 'government', name: 'Government Services', icon: 'Building2' },
    { id: 'legal', name: 'Legal', icon: 'Scale' },
    { id: 'finance', name: 'Finance', icon: 'Calculator' },
    { id: 'media', name: 'Media', icon: 'Newspaper' },
    { id: 'education', name: 'Education', icon: 'GraduationCap' },
];

// Hard-coded career data - TO BE FILLED BY USER
export const EXPLORE_CAREERS: ExploreCareer[] = [
    // MEDICAL
    {
        id: 'doctor',
        slug: 'doctor',
        name: 'MBBS Doctor / Physician',
        category: 'medical',
        icon: 'Stethoscope',
        shortDescription: 'MBBS (Bachelor of Medicine and Bachelor of Surgery) is an internationally recognised undergraduate medical degree that qualifies you to practice as a doctor.',
        longDescription: 'MBBS is a 5.5-year programme that combines theoretical medical science with hands-on clinical training. It requires clearing competitive entrance exams like NEET. After completion, doctors can work in hospitals, clinics, public health settings, or research institutions, diagnosing and treating patients with diverse health conditions.',
        whatTheyDo: [
            'Diagnose and treat patients in hospitals, clinics, and public health settings',
            'Work with diverse health conditions and medical emergencies',
            'Prescribe medications and create treatment plans',
            'Perform medical procedures and surgeries (based on specialization)',
            'Counsel patients on preventive healthcare and healthy living',
            'Collaborate with healthcare teams and specialists',
            'Conduct medical research and contribute to advancements',
        ],
        dayToDayChallenges: [
            'Managing multiple patients with different conditions simultaneously',
            'Making critical decisions under pressure in emergencies',
            'Staying updated with the latest medical advancements and research',
            'Dealing with emotional situations and patient families',
            'Long working hours, night shifts, and on-call duties',
            'Continuous learning through conferences and publications',
        ],
        dayInLife: [
            { time: '7:00 AM', activity: 'Morning rounds - checking on admitted patients' },
            { time: '9:00 AM', activity: 'OPD (Outpatient) consultations begin' },
            { time: '1:00 PM', activity: 'Lunch break and case discussions with colleagues' },
            { time: '2:00 PM', activity: 'Surgeries, procedures, or specialist consultations' },
            { time: '5:00 PM', activity: 'Evening rounds, documentation, and discharge summaries' },
            { time: '7:00 PM', activity: 'Emergency cases or on-call duties (if assigned)' },
        ],
        skills: ['Empathy', 'Problem-solving', 'Communication', 'Attention to detail', 'Patience', 'Continuous learning', 'Working under pressure'],
        education: {
            india: [
                'Complete Class 12 with Physics, Chemistry & Biology',
                'Clear NEET UG entrance exam (all-India medical entrance)',
                'Join MBBS programme (5.5 years including internship)',
                'Register with National Medical Commission to practice',
                'Optional: Specialize through MD/MS postgraduate exams',
            ],
            abroad: [
                'Pre-med undergraduate degree (4 years)',
                'Clear medical entrance exams (MCAT for USA)',
                'Medical school (4 years)',
                'Residency training (3-7 years based on specialization)',
                'Licensing exams like USMLE (USA) or PLAB (UK)',
            ],
        },
        salaryRange: {
            india: '₹8L - ₹30L+ per year (₹50L+ for super-specialists)',
            abroad: '$60,000 - $400,000 per year (varies by country and specialization)',
        },
        quotes: [
            {
                text: "Medicine is a science of uncertainty and an art of probability.",
                author: "William Osler",
                role: "Father of Modern Medicine"
            },
            {
                text: "Wherever the art of medicine is loved, there is also a love of humanity.",
                author: "Hippocrates",
                role: "Father of Medicine"
            },
            {
                text: "The good physician treats the disease; the great physician treats the patient who has the disease.",
                author: "William Osler",
                role: "Father of Modern Medicine"
            }
        ],
        videos: [
            {
                id: 'doc-video-1',
                title: 'What is MBBS? Career Overview & Possibilities',
                youtubeUrl: 'https://www.youtube.com/embed/agBjsqcNAEI',
                duration: '10 min'
            },
            {
                id: 'doc-video-2',
                title: 'Career Pathway of a Doctor - From Medical School to Specialization',
                youtubeUrl: 'https://www.youtube.com/embed/7wcg9qsgk1s',
                duration: '12 min'
            }
        ],
        articles: [
            {
                id: 'doc-article-1',
                title: 'MBBS (Bachelor of Medicine & Surgery) - Complete Overview',
                url: 'https://en.wikipedia.org/wiki/Bachelor_of_Medicine,_Bachelor_of_Surgery',
                source: 'Wikipedia',
                readTime: '10 min read'
            },
            {
                id: 'doc-article-2',
                title: 'How to Become a Doctor in India - Complete Step-by-Step Guide',
                url: 'https://future-mbbs.com/how-to-become-a-doctor-in-india/',
                source: 'FutureMBBS',
                readTime: '8 min read'
            },
            {
                id: 'doc-article-3',
                title: 'Career After MBBS - Jobs, Salary, Scope & Options',
                url: 'https://www.shiksha.com/mbbs-career-chp',
                source: 'Shiksha',
                readTime: '7 min read'
            },
            {
                id: 'doc-article-4',
                title: 'What to Do After MBBS in India - Post-MBBS Career Paths',
                url: 'https://www.medvarsity.com/blog/what-to-do-after-mbbs-in-india',
                source: 'Medvarsity',
                readTime: '6 min read'
            }
        ],
        color: 'emerald',
    },

    // ENGINEERING & TECH
    {
        id: 'software-engineer',
        slug: 'software-engineer',
        name: 'Software Engineer / Engineering & Tech',
        category: 'tech',
        icon: 'Code',
        shortDescription: 'Engineering is about solving real-world problems using science, mathematics, and practical thinking. Engineers design, build, improve, and maintain things that people use every day.',
        longDescription: 'Technology refers to the tools, systems, software, and machines created using engineering knowledge. Engineers help society by building infrastructure, creating software platforms, developing renewable energy solutions, and automating processes. In simple terms: Engineers create technology, and technology enables modern life.',
        whatTheyDo: [
            'Understanding problems and user needs',
            'Designing solutions, systems, and architectures',
            'Creating models, prototypes, or code',
            'Testing and improving designs iteratively',
            'Fixing issues and optimizing performance',
            'Writing documentation and technical reports',
            'Working in teams with other engineers, designers, and managers',
            'Contributing to software, machines, devices, networks, and tools',
        ],
        dayToDayChallenges: [
            'Technology changes regularly — continuous learning is essential',
            'Debugging complex issues and finding root causes',
            'Projects may take months or years to complete',
            'Balancing code quality with delivery speed',
            'Communicating technical concepts to non-technical stakeholders',
            'Working in teams rather than alone on most projects',
            'Mistakes and debugging are part of daily life',
        ],
        dayInLife: [
            { time: '9:00 AM', activity: 'Check emails, messages, and task updates' },
            { time: '9:30 AM', activity: 'Daily standup meeting with team' },
            { time: '10:00 AM', activity: 'Deep work - coding new features or solving problems' },
            { time: '1:00 PM', activity: 'Lunch and informal discussions with colleagues' },
            { time: '2:00 PM', activity: 'Code reviews and pair programming sessions' },
            { time: '4:00 PM', activity: 'Meetings with product team or design discussions' },
            { time: '5:30 PM', activity: 'Documentation, testing, and wrap-up' },
        ],
        skills: [
            'Logical and analytical thinking',
            'Problem-solving and system design',
            'Mathematics and core subject understanding',
            'Communication and teamwork',
            'Curiosity and continuous learning',
            'Breaking large problems into smaller parts',
            'Using tools and software effectively',
        ],
        education: {
            india: [
                'Class 12 with Physics, Chemistry, Mathematics (PCM)',
                'JEE Main & Advanced for IITs, NITs, IIITs',
                'State entrance exams for state colleges',
                'B.Tech / B.E. (4 years) in CSE, IT, ECE, or other branches',
                'Diploma in Engineering (3 years) after Class 10 is also an option',
                'Self-taught path with projects and certifications',
            ],
            abroad: [
                'BS in Computer Science or Engineering (4 years)',
                'Coding bootcamps for practical skills',
                'MS in CS for advanced roles and research',
                'Online degrees from international universities',
                'Self-taught with strong portfolio and open source contributions',
            ],
        },
        salaryRange: {
            india: '₹6L - ₹50L+ per year (varies by company, role, and experience)',
            abroad: '$70,000 - $200,000+ per year (varies by location and company)',
        },
        quotes: [
            {
                text: "Excellence happens not by accident. It is a process.",
                author: "Dr. A. P. J. Abdul Kalam",
                role: "Aerospace Engineer & Former President of India"
            },
            {
                text: "Empathy makes you a better innovator.",
                author: "Satya Nadella",
                role: "CEO of Microsoft"
            },
            {
                text: "There was no choice but to be pioneers.",
                author: "Margaret Hamilton",
                role: "NASA Software Engineer, Apollo Missions"
            }
        ],
        videos: [
            {
                id: 'eng-video-1',
                title: 'CrashCourse Engineering - What is Engineering?',
                youtubeUrl: 'https://www.youtube.com/embed/btGYcizV0iI',
                duration: '10 min'
            },
            {
                id: 'eng-video-2',
                title: 'Real Engineering - How Engineers Solve Problems',
                youtubeUrl: 'https://www.youtube.com/embed/6gxRcgbq-OY',
                duration: '12 min'
            },
            {
                id: 'eng-video-3',
                title: 'Practical Engineering - Real Infrastructure Problems',
                youtubeUrl: 'https://www.youtube.com/embed/MpKbTNonIwc',
                duration: '15 min'
            }
        ],
        articles: [
            {
                id: 'eng-article-1',
                title: 'What Do Engineers Do? - Complete Career Guide',
                url: 'https://tryengineering.org/careers/what-do-engineers-do/',
                source: 'TryEngineering (IEEE)',
                readTime: '8 min read'
            },
            {
                id: 'eng-article-2',
                title: 'Engineering Grand Challenges for the 21st Century',
                url: 'https://www.engineeringchallenges.org',
                source: 'National Academy of Engineering',
                readTime: '10 min read'
            },
            {
                id: 'eng-article-3',
                title: 'What Is Engineering? - Simple Explanation',
                url: 'https://www.livescience.com/47599-engineer.html',
                source: 'Live Science',
                readTime: '6 min read'
            },
            {
                id: 'eng-article-4',
                title: 'Types of Engineers & Their Work',
                url: 'https://www.indeed.com/career-advice/finding-a-job/what-do-engineers-do',
                source: 'Indeed Career Guide',
                readTime: '7 min read'
            },
            {
                id: 'eng-article-5',
                title: 'What Is Engineering? - Coursera Guide',
                url: 'https://www.coursera.org/articles/what-is-engineering',
                source: 'Coursera',
                readTime: '5 min read'
            }
        ],
        color: 'blue',
    },

    // GOVERNMENT SERVICES
    {
        id: 'civil-servant',
        slug: 'civil-servant',
        name: 'Civil Servant (IAS/IPS/IFS) & Defence',
        category: 'government',
        icon: 'Building2',
        shortDescription: 'Civil Services are elite administrative roles managing governance, law and order, foreign relations, and development programs. Recruited through UPSC CSE, these are among the most respected careers in India.',
        longDescription: 'Government Services are careers where you work for the nation — administering systems, enforcing laws, protecting sovereignty, and delivering public services. The UPSC Civil Services Examination recruits for IAS, IPS, IFS, and other services. Defence Services (Army, Navy, Air Force) are entered through NDA or CDS exams. Both paths involve structured progression and high responsibility.',
        whatTheyDo: [
            'Lead district governance and administration (IAS)',
            'Maintain law and order, lead police forces (IPS)',
            'Represent India in foreign countries (IFS)',
            'Make and implement policy decisions',
            'Coordinate with ministries and departments',
            'Interact with public and stakeholders daily',
            'Manage crisis situations and emergencies',
            'Protect national borders and security (Defence)',
            'Lead military operations and strategy (Defence)',
        ],
        dayToDayChallenges: [
            'Balancing multiple responsibilities across departments',
            'Navigating political pressures while maintaining integrity',
            'Resource constraints and bureaucratic processes',
            'Addressing public grievances and expectations',
            'Managing crisis situations under pressure',
            'Frequent transfers and postings across the country',
            'Long years of preparation for competitive exams',
        ],
        dayInLife: [
            { time: '6:00 AM', activity: 'Physical training (Defence) / Morning briefing (Civil)' },
            { time: '9:00 AM', activity: 'Office work, file clearances, and meetings' },
            { time: '11:00 AM', activity: 'Public meetings, grievance redressal, or field duties' },
            { time: '2:00 PM', activity: 'Field visits, inspections, or operational planning' },
            { time: '5:00 PM', activity: 'Review meetings with department heads or seniors' },
            { time: '7:00 PM', activity: 'Emergency response or evening briefings' },
        ],
        skills: [
            'Leadership and decision-making',
            'Communication and public speaking',
            'Analytical thinking and problem-solving',
            'Integrity and ethical judgment',
            'Resilience and mental toughness',
            'Physical fitness (especially for Defence)',
            'Crisis management',
            'Empathy and public service orientation',
        ],
        education: {
            india: [
                'UPSC Civil Services: Graduate in any discipline + CSE exam',
                'Three-stage exam: Prelims → Mains → Interview',
                'Training at LBSNAA Mussoorie (for IAS)',
                'NDA (National Defence Academy): After 12th for Army/Navy/Air Force',
                'CDS (Combined Defence Services): After graduation',
                'Training at NDA (3 years) + Service-specific academies',
            ],
            abroad: [
                'Equivalent civil service exams in respective countries',
                'Diplomatic corps entry through foreign service exams',
                'Military academies like West Point (USA), Sandhurst (UK)',
            ],
        },
        salaryRange: {
            india: '₹6L - ₹25L+ per year (plus housing, car, allowances, pension)',
            abroad: 'Varies by country — diplomatic and military roles well-compensated',
        },
        quotes: [
            {
                text: "The power of the Executive to cast a man into prison without formulating any charge known to the law, is utterly odious and is the foundation of all totalitarian governments.",
                author: "Sardar Vallabhbhai Patel",
                role: "Iron Man of India, First Home Minister"
            },
            {
                text: "A public servant must have the courage to say 'No' when required, and the wisdom to say 'Yes' when needed.",
                author: "T.N. Seshan",
                role: "Former Chief Election Commissioner of India"
            },
            {
                text: "The nation that has a great military but lacks discipline, is destined to fall.",
                author: "Field Marshal Sam Manekshaw",
                role: "Chief of Army Staff, 1971 War Hero"
            }
        ],
        videos: [
            {
                id: 'upsc-video-1',
                title: 'Reality of a Career in IAS - Full Story',
                youtubeUrl: 'https://www.youtube.com/embed/HL4-gkrI-0w',
                duration: '20 min'
            },
            {
                id: 'upsc-video-2',
                title: 'UPSC Exams & Strategy Overview',
                youtubeUrl: 'https://www.youtube.com/embed/vgmxNaDdQhM',
                duration: '15 min'
            },
            {
                id: 'nda-video-1',
                title: 'A Day in the Life of an NDA Cadet',
                youtubeUrl: 'https://www.youtube.com/embed/IXTW5ZnbrOE',
                duration: '12 min'
            },
            {
                id: 'nda-video-2',
                title: 'Life at NDA - Daily Routine of Cadets',
                youtubeUrl: 'https://www.youtube.com/embed/xSToerhn0b4',
                duration: '10 min'
            }
        ],
        articles: [
            {
                id: 'upsc-article-1',
                title: 'UPSC Civil Services - Official Information',
                url: 'https://www.upsc.gov.in',
                source: 'UPSC Official',
                readTime: 'Official portal'
            },
            {
                id: 'upsc-article-2',
                title: 'How to Prepare for UPSC CSE - Complete Guide',
                url: 'https://www.clearias.com/upsc-civil-services-exam/',
                source: 'ClearIAS',
                readTime: '15 min read'
            },
            {
                id: 'nda-article-1',
                title: 'NDA Exam - Eligibility, Syllabus, Selection Process',
                url: 'https://www.shiksha.com/exams/nda',
                source: 'Shiksha',
                readTime: '10 min read'
            },
            {
                id: 'defence-article-1',
                title: 'Join Indian Army - Official Recruitment Portal',
                url: 'https://joinindianarmy.nic.in',
                source: 'Indian Army Official',
                readTime: 'Official portal'
            }
        ],
        color: 'amber',
    },

    // LEGAL
    {
        id: 'lawyer',
        slug: 'lawyer',
        name: 'Lawyer / Advocate',
        category: 'legal',
        icon: 'Scale',
        shortDescription: 'Law is a system of rules created to help society function fairly and peacefully. Lawyers work as problem-solvers within the legal system, explaining laws, protecting rights, and resolving disputes.',
        longDescription: 'Legal systems exist to maintain order, protect rights, resolve disputes peacefully, and ensure accountability. Lawyers help individuals, companies, and governments by drafting documents, advising on compliance, and representing clients. Many study law not only to become advocates but also to work in policy, research, business, governance, and social sectors.',
        whatTheyDo: [
            'Reading laws, rules, and case judgments',
            'Researching past court decisions and precedents',
            'Drafting contracts, notices, and legal agreements',
            'Meeting clients to understand their problems',
            'Preparing written arguments and case briefs',
            'Negotiating settlements between parties',
            'Reviewing compliance documents for organizations',
            'Representing clients in court proceedings',
            'Tracking changes in laws and regulations',
        ],
        dayToDayChallenges: [
            'Heavy reading and continuous learning throughout career',
            'Slow early growth — building reputation takes time',
            'Responsibility toward clients and society',
            'Long working hours in demanding roles',
            'Constant updating of knowledge as laws change',
            'Managing multiple cases with different deadlines',
            'Dealing with emotional and sensitive client situations',
        ],
        dayInLife: [
            { time: '8:00 AM', activity: 'Reading case files and preparing for court' },
            { time: '10:00 AM', activity: 'Court appearances and hearings' },
            { time: '1:00 PM', activity: 'Lunch and case discussions with colleagues' },
            { time: '2:00 PM', activity: 'Client meetings and consultations' },
            { time: '4:00 PM', activity: 'Legal research and drafting documents' },
            { time: '6:00 PM', activity: 'Case strategy discussions and wrap-up' },
        ],
        skills: [
            'Strong reading comprehension',
            'Logical thinking and structured argument building',
            'Legal and factual research',
            'Clear communication (written and verbal)',
            'Patience and consistency',
            'Attention to detail',
            'Ethical responsibility',
            'Ability to listen carefully',
        ],
        education: {
            india: [
                '5-year integrated law degree after Class 12 (BA LLB, BBA LLB, BCom LLB)',
                '3-year LLB after any graduation',
                'CLAT exam for National Law Universities',
                'AILET for National Law University, Delhi',
                'State-level exams for state law colleges',
                'Bar Council enrollment to practice as advocate',
            ],
            abroad: [
                'JD (Juris Doctor) in USA — 3 years after undergraduate',
                'LLB in UK — 3 years undergraduate',
                'Bar exam in respective country to practice',
                'LLM for specialization (optional)',
            ],
        },
        salaryRange: {
            india: '₹3L - ₹50L+ per year (varies by practice area, firm, and reputation)',
            abroad: '$50,000 - $200,000+ per year (varies by firm and country)',
        },
        quotes: [
            {
                text: "Constitutional morality is not a natural sentiment. It has to be cultivated.",
                author: "Dr. B. R. Ambedkar",
                role: "Chief Architect of Indian Constitution"
            },
            {
                text: "The law is not a trade, it is a calling.",
                author: "Ram Jethmalani",
                role: "Renowned Criminal Lawyer & Parliamentarian"
            },
            {
                text: "The Constitution is a living document.",
                author: "Justice D. Y. Chandrachud",
                role: "Former Chief Justice of India"
            },
            {
                text: "Fight for the things that you care about.",
                author: "Ruth Bader Ginsburg",
                role: "US Supreme Court Justice"
            }
        ],
        videos: [
            {
                id: 'law-video-1',
                title: 'What Is Law? - Simple Explanation',
                youtubeUrl: 'https://www.youtube.com/embed/Z9mK3v9x7O8',
                duration: '8 min'
            },
            {
                id: 'law-video-2',
                title: 'Types of Lawyers in India',
                youtubeUrl: 'https://www.youtube.com/embed/KJYk2A6vFqM',
                duration: '12 min'
            },
            {
                id: 'law-video-3',
                title: 'Day in the Life of a Lawyer (India)',
                youtubeUrl: 'https://www.youtube.com/embed/5yA8C2Z9L3E',
                duration: '10 min'
            }
        ],
        articles: [
            {
                id: 'law-article-1',
                title: 'Understanding Legal Careers - Types of Lawyers & Career Paths',
                url: 'https://blog.ipleaders.in',
                source: 'iPleaders Blog',
                readTime: '10 min read'
            },
            {
                id: 'law-article-2',
                title: 'How Laws Are Made in India - Legislative Process',
                url: 'https://prsindia.org',
                source: 'PRS Legislative Research',
                readTime: '8 min read'
            },
            {
                id: 'law-article-3',
                title: 'Latest Legal News and Court Updates',
                url: 'https://www.livelaw.in',
                source: 'LiveLaw',
                readTime: '5 min read'
            },
            {
                id: 'law-article-4',
                title: 'Law Firm News and Legal Industry Updates',
                url: 'https://www.barandbench.com',
                source: 'Bar & Bench',
                readTime: '6 min read'
            },
            {
                id: 'law-article-5',
                title: 'Search Indian Court Judgments and Case Laws',
                url: 'https://indiankanoon.org',
                source: 'Indian Kanoon',
                readTime: 'Research tool'
            }
        ],
        color: 'purple',
    },

    // FINANCE
    {
        id: 'chartered-accountant',
        slug: 'chartered-accountant',
        name: 'Chartered Accountant (CA)',
        category: 'finance',
        icon: 'Calculator',
        shortDescription: 'A Chartered Accountant is a professional finance expert who handles financial reporting, auditing, taxation (including GST), and strategic financial planning. They are trusted advisors in business decisions.',
        longDescription: 'CAs are certified by ICAI (Institute of Chartered Accountants of India) after passing rigorous exams and completing 3 years of articleship training. They work in audit firms, corporate finance, taxation, and many start their own practice. Related paths include CFA (investment analysis), CMA (cost accounting), and MBA Finance.',
        whatTheyDo: [
            'Review financial records, journals, and ledgers',
            'Prepare reports for audit, tax planning, and compliance',
            'Attend meetings with clients and businesses',
            'Handle GST, income tax, and regulatory filings',
            'Advise on financial decisions and investments',
            'Work with teams to solve compliance or accounting issues',
            'Prepare financial statements and annual reports',
            'Conduct internal and statutory audits',
        ],
        dayToDayChallenges: [
            'Meeting strict filing and compliance deadlines',
            'Keeping up with constantly changing tax laws and GST rules',
            'Managing multiple client expectations simultaneously',
            'Handling complex and large-scale financial data',
            'Work-life balance during quarter-end and year-end busy seasons',
            'Staying updated with accounting standards (Ind AS, IFRS)',
            'Balancing articleship work with exam preparation',
        ],
        dayInLife: [
            { time: '9:00 AM', activity: 'Review financial records and check emails' },
            { time: '10:00 AM', activity: 'Audit fieldwork at client offices' },
            { time: '1:00 PM', activity: 'Lunch and team discussions' },
            { time: '2:00 PM', activity: 'Tax consultations and GST filings' },
            { time: '4:00 PM', activity: 'Report preparation and analysis' },
            { time: '6:00 PM', activity: 'Client meetings and mentoring juniors' },
        ],
        skills: [
            'Strong numerical aptitude',
            'Attention to detail and accuracy',
            'Analytical and logical thinking',
            'Integrity and ethical judgment',
            'Time management and organization',
            'Communication with clients and teams',
            'Knowledge of tax laws and accounting standards',
            'Problem-solving under pressure',
        ],
        education: {
            india: [
                'After 12th (Commerce) → CA Foundation exam',
                'CA Intermediate (Group I & II)',
                'CA Final + 3 years Articleship training',
                'Register with ICAI to start the journey',
                'Articleship gives real workplace experience',
                'Alternative paths: CMA (Cost Accountant), CS (Company Secretary)',
            ],
            abroad: [
                'CPA (Certified Public Accountant) in USA',
                'ACCA (Association of Chartered Certified Accountants) in UK',
                'CFA (Chartered Financial Analyst) for investment roles',
                'MBA Finance for business leadership roles',
            ],
        },
        salaryRange: {
            india: '₹7L - ₹30L+ per year (Big 4 firms pay higher, own practice can earn more)',
            abroad: '$60,000 - $150,000+ per year (varies by certification and role)',
        },
        quotes: [
            {
                text: "Accounting is the language of business.",
                author: "Warren Buffett",
                role: "Legendary Investor & CEO of Berkshire Hathaway"
            },
            {
                text: "In the business world, the rearview mirror is always clearer than the windshield.",
                author: "Warren Buffett",
                role: "Legendary Investor"
            },
            {
                text: "The numbers tell a story. A good accountant reads between the lines.",
                author: "ICAI",
                role: "Institute of Chartered Accountants of India"
            }
        ],
        videos: [
            {
                id: 'ca-video-1',
                title: 'What is CA? Complete Career Guide',
                youtubeUrl: 'https://www.youtube.com/embed/5TjqM9F5fRk',
                duration: '12 min'
            },
            {
                id: 'ca-video-2',
                title: 'CA vs CFA vs MBA - Which Path to Choose?',
                youtubeUrl: 'https://www.youtube.com/embed/QOmwcTQPYKA',
                duration: '15 min'
            },
            {
                id: 'ca-video-3',
                title: 'A Day in the Life of a CA',
                youtubeUrl: 'https://www.youtube.com/embed/8mKf3ZZmKvE',
                duration: '10 min'
            }
        ],
        articles: [
            {
                id: 'ca-article-1',
                title: 'How to Become a CA - Complete Roadmap',
                url: 'https://www.icai.org',
                source: 'ICAI Official',
                readTime: '10 min read'
            },
            {
                id: 'ca-article-2',
                title: 'CA Career Guide - Eligibility, Exams, Salary',
                url: 'https://www.shiksha.com/finance-accounting/chartered-accountancy-chp',
                source: 'Shiksha',
                readTime: '8 min read'
            },
            {
                id: 'ca-article-3',
                title: 'CA vs CFA vs CMA - Comparison Guide',
                url: 'https://www.careers360.com/courses/chartered-accountancy-course',
                source: 'Careers360',
                readTime: '7 min read'
            },
            {
                id: 'ca-article-4',
                title: 'CFA Institute - Investment Analysis Career',
                url: 'https://www.cfainstitute.org',
                source: 'CFA Institute',
                readTime: 'Official portal'
            }
        ],
        color: 'cyan',
    },

    // MEDIA
    {
        id: 'journalist',
        slug: 'journalist',
        name: 'Journalist / Media Professional',
        category: 'media',
        icon: 'Newspaper',
        shortDescription: 'Journalism is the practice of gathering, verifying, and presenting news and information to the public. Journalists serve as watchdogs of democracy, holding power accountable.',
        longDescription: 'Journalists inform the public about important events, issues, and stories that affect their lives. They work across print, television, radio, and digital platforms. The profession demands curiosity, integrity, and the ability to communicate complex information clearly. From investigative reporting to breaking news, journalism plays a vital role in a functioning democracy.',
        whatTheyDo: [
            'Research and investigate news stories and leads',
            'Conduct interviews with sources and experts',
            'Write articles, reports, and scripts',
            'Present news on TV, radio, or digital platforms',
            'Verify facts and ensure accuracy before publishing',
            'Cover breaking news and live events',
            'Build and maintain source networks',
            'Adapt stories for different media formats',
            'Meet tight deadlines while maintaining quality',
        ],
        dayToDayChallenges: [
            'Meeting tight and unpredictable deadlines',
            'Verifying information in the age of misinformation',
            'Dealing with sensitive and emotional topics',
            'Maintaining objectivity and avoiding bias',
            'Safety concerns in conflict or crime reporting',
            'Balancing speed with accuracy',
            'Building trust with sources and audience',
        ],
        dayInLife: [
            { time: '7:00 AM', activity: 'Morning news scan and story pitch preparation' },
            { time: '9:00 AM', activity: 'Editorial meeting to discuss story assignments' },
            { time: '10:00 AM', activity: 'Field reporting, interviews, and gathering footage' },
            { time: '1:00 PM', activity: 'Lunch and informal source meetings' },
            { time: '2:00 PM', activity: 'Writing, editing, and fact-checking stories' },
            { time: '5:00 PM', activity: 'Filing stories, preparing for evening broadcast' },
            { time: '7:00 PM', activity: 'Live reporting or breaking news coverage (if needed)' },
        ],
        skills: [
            'Excellent writing and storytelling',
            'Curiosity and investigative mindset',
            'Critical thinking and analysis',
            'Strong verbal communication',
            'Ethical judgment and integrity',
            'Ability to work under pressure',
            'Digital and social media literacy',
            'Networking and source building',
        ],
        education: {
            india: [
                'B.A. in Journalism / Mass Communication (3 years)',
                'PG Diploma in Journalism from IIMC or similar institutes',
                'Masters in Mass Communication (optional)',
                'On-the-job training and internships',
                'No formal degree required — skills and portfolio matter',
            ],
            abroad: [
                'BA/MA in Journalism from recognized universities',
                'Columbia Journalism School (prestigious)',
                'Medill School of Journalism (Northwestern)',
                'Internships at major outlets like NYT, BBC, Reuters',
            ],
        },
        salaryRange: {
            india: '₹3L - ₹25L+ per year (varies by outlet, experience, and role)',
            abroad: '$40,000 - $120,000+ per year (varies by outlet and location)',
        },
        quotes: [
            {
                text: "Journalism is printing what someone else does not want printed. Everything else is public relations.",
                author: "George Orwell",
                role: "Author & Journalist"
            },
            {
                text: "The duty of a journalist is to tell the truth.",
                author: "Ravish Kumar",
                role: "Indian Journalist & Author"
            },
            {
                text: "A free press is the unsleeping guardian of every other right.",
                author: "Winston Churchill",
                role: "Former British Prime Minister"
            },
            {
                text: "News is what somebody somewhere wants to suppress; all the rest is advertising.",
                author: "Lord Northcliffe",
                role: "British Newspaper Magnate"
            }
        ],
        videos: [
            {
                id: 'jour-video-1',
                title: 'What is Journalism? - Introduction',
                youtubeUrl: 'https://www.youtube.com/embed/orI0uEj2Z7M',
                duration: '10 min'
            },
            {
                id: 'jour-video-2',
                title: 'Understanding Journalism - Basics Explained',
                youtubeUrl: 'https://www.youtube.com/embed/Rr7povAInwQ',
                duration: '12 min'
            },
            {
                id: 'jour-video-3',
                title: 'A Day in the Life of a Journalist',
                youtubeUrl: 'https://www.youtube.com/embed/deip2YAygrM',
                duration: '15 min'
            },
            {
                id: 'jour-video-4',
                title: 'How Journalists Spend Their Day',
                youtubeUrl: 'https://www.youtube.com/embed/Gpq6lPtDUMg',
                duration: '10 min'
            }
        ],
        articles: [
            {
                id: 'jour-article-1',
                title: 'Careers in Journalism - Complete Guide',
                url: 'https://www.careers360.com/courses/journalism-course',
                source: 'Careers360',
                readTime: '8 min read'
            },
            {
                id: 'jour-article-2',
                title: 'How to Become a Journalist in India',
                url: 'https://www.shiksha.com/humanities-social-sciences/journalism-mass-communication/articles/how-to-become-a-journalist-in-india-blogId-27752',
                source: 'Shiksha',
                readTime: '7 min read'
            },
            {
                id: 'jour-article-3',
                title: 'The Hindu - Quality Journalism Example',
                url: 'https://www.thehindu.com',
                source: 'The Hindu',
                readTime: 'News portal'
            },
            {
                id: 'jour-article-4',
                title: 'Press Council of India - Journalism Ethics',
                url: 'https://presscouncil.nic.in',
                source: 'Press Council of India',
                readTime: '10 min read'
            }
        ],
        color: 'rose',
    },

    // EDUCATION
    {
        id: 'teacher-professor',
        slug: 'teacher-professor',
        name: 'Teacher / Professor',
        category: 'education',
        icon: 'GraduationCap',
        shortDescription: 'Teaching is a profession of lifelong learning. Educators shape individuals and communities by sharing knowledge, building skills, and inspiring curiosity.',
        longDescription: 'Education is the foundation of society. Teachers and professors do more than just explain concepts—they mentor students, design learning experiences, and adapt to different learning styles. From primary schools to universities, educators play a crucial role in developing the next generation of thinkers, leaders, and citizens.',
        whatTheyDo: [
            'Plan and deliver engaging lessons and lectures',
            'Explain complex concepts in simple terms',
            'Evaluate student performance and provide feedback',
            'Mentor and guide students in career and life',
            'Manage classroom dynamics and student engagement',
            'Adapt teaching methods for different learners',
            'Conduct research and publish papers (Professors)',
            'Create curriculum and learning materials',
            'Continuously update own knowledge and skills',
        ],
        dayToDayChallenges: [
            'Engaging diverse learners with different needs',
            'Managing classroom discipline and dynamics',
            'Balancing teaching, grading, and administrative tasks',
            'Keeping content current and relevant',
            'Handling emotional and social issues of students',
            'Adapting to new technologies and teaching methods',
            'Work often extends beyond school hours (grading, planning)',
        ],
        dayInLife: [
            { time: '7:30 AM', activity: 'Arrival and setting up the classroom' },
            { time: '8:30 AM', activity: 'Morning assembly and first period' },
            { time: '11:00 AM', activity: 'Grading assignments during free period' },
            { time: '12:30 PM', activity: 'Lunch and student doubts' },
            { time: '2:00 PM', activity: 'Afternoon classes and activities' },
            { time: '3:30 PM', activity: 'Lesson planning for next day' },
            { time: '5:00 PM', activity: 'Professional development or research' },
        ],
        skills: [
            'Subject matter expertise',
            'Communication and explanation ability',
            'Patience and empathy',
            'Classroom management',
            'Adaptability and creativity',
            'Observation and active listening',
            'Assessment design',
            'Lifelong learning mindset',
        ],
        education: {
            india: [
                'B.Ed. after graduation (for schools)',
                'Integrated BA-B.Ed / BSc-B.Ed (4 years)',
                'TET / CTET qualification for school jobs',
                'Masters + NET/SET for College Lecturer roles',
                'PhD is essential for University Professor roles',
                'D.El.Ed for primary teaching',
            ],
            abroad: [
                'Teaching certification/licensure (state-specific)',
                'Masters in Education (M.Ed) usually preferred',
                'PhD / Post-doc for tenure-track university positions',
                'TEFL/TESOL for teaching English abroad',
            ],
        },
        salaryRange: {
            india: '₹3L - ₹25L+ per year (varies widely by private/govt and school/college)',
            abroad: '$45,000 - $150,000+ per year (varies by country and institution)',
        },
        quotes: [
            {
                text: "Education is the most powerful weapon which you can use to change the world.",
                author: "Nelson Mandela",
                role: "Anti-apartheid Revolutionary & Statesman"
            },
            {
                text: "Teaching is a very noble profession that shapes the character, caliber, and future of an individual.",
                author: "Dr. A. P. J. Abdul Kalam",
                role: "Former President of India & Educator"
            },
            {
                text: "The highest education is that which does not merely give us information but makes our life in harmony with all existence.",
                author: "Rabindranath Tagore",
                role: "Nobel Laureate, Poet & Educator"
            },
            {
                text: "True teachers are those who help us think for ourselves.",
                author: "Dr. Sarvepalli Radhakrishnan",
                role: "Philosopher & 2nd President of India"
            }
        ],
        videos: [
            {
                id: 'teach-video-1',
                title: 'What is Teaching? - Role & Expectations',
                youtubeUrl: 'https://www.youtube.com/embed/ETBhhOnLBFc',
                duration: '10 min'
            },
            {
                id: 'teach-video-2',
                title: 'How to Become a Govt Teacher in India',
                youtubeUrl: 'https://www.youtube.com/embed/DxG8th2yjzA',
                duration: '15 min'
            },
            {
                id: 'teach-video-3',
                title: 'A Day in the Life of a Teacher (India)',
                youtubeUrl: 'https://www.youtube.com/embed/ImtZ5yKjYGM', // Placeholder for "A Day In The Life" - using a generic relatable teacher vlog ID
                duration: '10 min'
            }
        ],
        articles: [
            {
                id: 'teach-article-1',
                title: 'NCTE - National Council for Teacher Education',
                url: 'https://ncte.gov.in',
                source: 'NCTE Official',
                readTime: 'Official portal'
            },
            {
                id: 'teach-article-2',
                title: 'Swayam - Free Online Education Platform',
                url: 'https://swayam.gov.in',
                source: 'Government of India',
                readTime: 'Learning platform'
            },
            {
                id: 'teach-article-3',
                title: 'NCERT - Education Materials & Research',
                url: 'https://ncert.nic.in',
                source: 'NCERT',
                readTime: 'Resource portal'
            },
            {
                id: 'teach-article-4',
                title: 'Khan Academy - World Class Education',
                url: 'https://www.khanacademy.org',
                source: 'Khan Academy',
                readTime: 'Learning platform'
            }
        ],
        color: 'orange',
    },
];

// Helper function to get career by slug
export function getCareerBySlug(slug: string): ExploreCareer | undefined {
    return EXPLORE_CAREERS.find(career => career.slug === slug);
}

// Helper function to get careers by category
export function getCareersByCategory(category: string): ExploreCareer[] {
    if (category === 'all') return EXPLORE_CAREERS;
    return EXPLORE_CAREERS.filter(career => career.category === category);
}
