
import { LucideIcon, BookOpen, Calculator, Code, Gavel, Globe, GraduationCap, Microscope, Newspaper, Scale, Stethoscope, Building2 } from "lucide-react";

export interface ExploreExam {
    id: string;
    name: string;
    shortName: string;
    category: 'engineering' | 'healthcare' | 'legal' | 'finance' | 'media' | 'government' | 'education' | 'other';
    level: 'Undergraduate' | 'Postgraduate' | 'Professional';
    frequency: string;
    mode: 'Online (CBT)' | 'Offline (Pen & Paper)' | 'Mixed';
    description: string;
    eligibility: string[];
    pattern: {
        duration: string;
        subjects: string[];
        markingScheme: string;
    };
    importantDates: {
        month: string;
        event: string;
    }[];
    website: string;
    color: string;
    videos: {
        id: string;
        title: string;
        youtubeUrl: string;
        duration?: string;
    }[];
    articles: {
        id: string;
        title: string;
        url: string;
        source: string;
        readTime?: string;
    }[];
    quotes: {
        text: string;
        author: string;
        role?: string;
    }[];
}

export const EXPLORE_EXAMS: ExploreExam[] = [
    // ENGINEERING
    {
        id: 'jee-mains',
        name: 'Joint Entrance Examination (Main)',
        shortName: 'JEE Main',
        category: 'engineering',
        level: 'Undergraduate',
        frequency: 'Twice a year (Jan & Apr)',
        mode: 'Online (CBT)',
        description: 'The gateway to NITs, IIITs, and CFTIs, and the screening test for JEE Advanced based admissions to IITs.',
        eligibility: ['Class 12th passed/appearing with Physics, Chemistry, Math', 'No age limit'],
        pattern: {
            duration: '3 Hours',
            subjects: ['Physics', 'Chemistry', 'Mathematics'],
            markingScheme: '+4 for correct, -1 for incorrect',
        },
        importantDates: [
            { month: 'November', event: 'Registration Starts' },
            { month: 'January', event: 'Session 1 Exam' },
            { month: 'April', event: 'Session 2 Exam' },
        ],
        website: 'https://jeemain.nta.nic.in',
        color: 'blue',
        videos: [
            {
                id: 'jee-strategy',
                title: 'How to Crack JEE Main in 6 Months',
                youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
                duration: '15:20'
            },
            {
                id: 'jee-topper',
                title: 'JEE Main Topper Interview - Tips & Tricks',
                youtubeUrl: 'https://www.youtube.com/embed/another-id', // Placeholder
                duration: '10:45'
            }
        ],
        articles: [
            {
                id: 'jee-syllabus',
                title: 'Complete JEE Main Syllabus Breakdown',
                url: 'https://example.com/jee-syllabus',
                source: 'ExamPedia',
                readTime: '8 min read'
            }
        ],
        quotes: [
            {
                text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
                author: "Winston Churchill",
                role: "Inspirational Leader"
            }
        ]
    },
    {
        id: 'jee-advanced',
        name: 'Joint Entrance Examination (Advanced)',
        shortName: 'JEE Advanced',
        category: 'engineering',
        level: 'Undergraduate',
        frequency: 'Once a year',
        mode: 'Online (CBT)',
        description: 'Conducted by IITs for admission to the prestigious Indian Institutes of Technology (IITs). Only top rankers of JEE Main are eligible.',
        eligibility: ['Top 2.5 Lakh rank in JEE Main', 'Class 12th passed', 'Max 2 attempts in consecutive years'],
        pattern: {
            duration: '6 Hours (Two papers of 3 hours each)',
            subjects: ['Physics', 'Chemistry', 'Mathematics'],
            markingScheme: 'Variable marking scheme',
        },
        importantDates: [
            { month: 'April', event: 'Registration after JEE Main Result' },
            { month: 'May/June', event: 'Exam Date' },
        ],
        website: 'https://jeeadv.ac.in',
        color: 'blue',
        videos: [],
        articles: [],
        quotes: []
    },
    {
        id: 'bitsat',
        name: 'Birla Institute of Technology and Science Admission Test',
        shortName: 'BITSAT',
        category: 'engineering',
        level: 'Undergraduate',
        frequency: 'Once a year (Two sessions)',
        mode: 'Online (CBT)',
        description: 'University-level exam for admission to BITS Pilani, Goa, and Hyderabad campuses.',
        eligibility: ['Class 12th with 75% aggregate in PCM'],
        pattern: {
            duration: '3 Hours',
            subjects: ['Physics', 'Chemistry', 'Maths', 'English', 'Logical Reasoning'],
            markingScheme: '+3 for correct, -1 for incorrect',
        },
        importantDates: [
            { month: 'January', event: 'Application Starts' },
            { month: 'May', event: 'Session 1 Exam' },
            { month: 'June', event: 'Session 2 Exam' },
        ],
        website: 'https://www.bitsadmission.com',
        color: 'blue',
        videos: [],
        articles: [],
        quotes: []
    },

    // MEDICAL
    {
        id: 'neet-ug',
        name: 'National Eligibility cum Entrance Test (UG)',
        shortName: 'NEET UG',
        category: 'healthcare',
        level: 'Undergraduate',
        frequency: 'Once a year',
        mode: 'Offline (Pen & Paper)',
        description: 'The single entrance test for admission to MBBS and BDS courses in India, including AIIMS and JIPMER.',
        eligibility: ['Class 12th passed/appearing with PCB', 'Min age 17 years'],
        pattern: {
            duration: '3 hours 20 mins',
            subjects: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)'],
            markingScheme: '+4 for correct, -1 for incorrect',
        },
        importantDates: [
            { month: 'March', event: 'Registration Starts' },
            { month: 'May (1st Sunday)', event: 'Exam Date' },
        ],
        website: 'https://neet.nta.nic.in',
        color: 'emerald',
        videos: [],
        articles: [],
        quotes: []
    },

    // CIVIL SERVICES / GOVT
    {
        id: 'upsc-cse',
        name: 'Civil Services Examination',
        shortName: 'UPSC CSE',
        category: 'government',
        level: 'Professional',
        frequency: 'Once a year',
        mode: 'Offline (Pen & Paper)',
        description: 'Conducted by the Union Public Service Commission for recruitment to the IAS, IPS, IFS, and other central services.',
        eligibility: ['Graduation in any stream', 'Min age 21 years'],
        pattern: {
            duration: 'Year-long process',
            subjects: ['General Studies', 'CSAT', 'Essay', 'Optional Subject'],
            markingScheme: 'Prelims (Objective), Mains (Descriptive), Interview',
        },
        importantDates: [
            { month: 'February', event: 'Notification & Application' },
            { month: 'May/June', event: 'Prelims Exam' },
            { month: 'September', event: 'Mains Exam' },
        ],
        website: 'https://upsc.gov.in',
        color: 'amber',
        videos: [],
        articles: [],
        quotes: []
    },
    {
        id: 'nda',
        name: 'National Defence Academy Exam',
        shortName: 'UPSC NDA',
        category: 'government',
        level: 'Undergraduate',
        frequency: 'Twice a year (I & II)',
        mode: 'Offline (Pen & Paper)',
        description: 'Gateway for male and female candidates to join the Army, Navy, and Air Force wings of the NDA.',
        eligibility: ['Class 12th passed/appearing', 'Age 16.5 to 19.5 years', 'Unmarried'],
        pattern: {
            duration: '5 Hours (Maths: 2.5, GAT: 2.5)',
            subjects: ['Mathematics', 'General Ability Test'],
            markingScheme: 'Negative marking applies',
        },
        importantDates: [
            { month: 'Dec/Jan', event: 'NDA-I Notification' },
            { month: 'May/June', event: 'NDA-II Notification' },
        ],
        website: 'https://upsc.gov.in',
        color: 'amber',
        videos: [],
        articles: [],
        quotes: []
    },

    // LAW
    {
        id: 'clat',
        name: 'Common Law Admission Test',
        shortName: 'CLAT',
        category: 'legal',
        level: 'Undergraduate',
        frequency: 'Once a year',
        mode: 'Offline (Pen & Paper)',
        description: 'National level entrance exam for admission to 22 National Law Universities (NLUs) in India.',
        eligibility: ['Class 12th pass/appearing with 45% marks'],
        pattern: {
            duration: '2 Hours',
            subjects: ['English', 'Current Affairs', 'Legal Reasoning', 'Logical Reasoning', 'Quant'],
            markingScheme: '+1 for correct, -0.25 for incorrect',
        },
        importantDates: [
            { month: 'July/August', event: 'Registration Starts' },
            { month: 'December', event: 'Exam Date' },
        ],
        website: 'https://consortiumofnlus.ac.in',
        color: 'rose',
        videos: [],
        articles: [],
        quotes: []
    },

    // FINANCE
    {
        id: 'ca-foundation',
        name: 'ICAI CA Foundation',
        shortName: 'CA Foundation',
        category: 'finance',
        level: 'Undergraduate',
        frequency: 'Twice a year (June & Dec)',
        mode: 'Offline (Pen & Paper)',
        description: 'The entry-level examination for the Chartered Accountancy course offered by ICAI.',
        eligibility: ['Passed Class 12th exam'],
        pattern: {
            duration: '4 papers',
            subjects: ['Accounting', 'Business Laws', 'Quant Aptitude', 'Economics'],
            markingScheme: 'Subjective & Objective mix',
        },
        importantDates: [
            { month: 'Feb/Aug', event: 'Registration Ends' },
            { month: 'June/Dec', event: 'Exam Dates' },
        ],
        website: 'https://www.icai.org',
        color: 'cyan',
        videos: [],
        articles: [],
        quotes: []
    },

    // MANAGEMENT (Often explored by students)
    {
        id: 'ipmat',
        name: 'Integrated Programme in Management Aptitude Test',
        shortName: 'IPMAT',
        category: 'other', // Or management if we add it
        level: 'Undergraduate',
        frequency: 'Once a year',
        mode: 'Online (CBT)',
        description: 'Entrance exam for the 5-year Integrated Programme in Management (IPM) at IIM Indore and IIM Rohtak.',
        eligibility: ['Class 12th passed with 60%', 'Age limit applies'],
        pattern: {
            duration: '2 Hours',
            subjects: ['Quant (MCQ)', 'Quant (SA)', 'Verbal Ability'],
            markingScheme: '+4 for correct, -1 for incorrect',
        },
        importantDates: [
            { month: 'March', event: 'Registration Starts' },
            { month: 'May', event: 'Exam Date' },
        ],
        website: 'https://www.iimidr.ac.in',
        color: 'purple',
        videos: [],
        articles: [],
        quotes: []
    },

    // TEACHING
    {
        id: 'ctet',
        name: 'Central Teacher Eligibility Test',
        shortName: 'CTET',
        category: 'education',
        level: 'Professional',
        frequency: 'Twice a year',
        mode: 'Mixed',
        description: 'National level exam to determine eligibility for appointment as specific teachers for Class 1-8.',
        eligibility: ['B.Ed or D.El.Ed qualified/appearing'],
        pattern: {
            duration: '2.5 Hours per paper',
            subjects: ['CDP', 'Language I & II', 'Maths/Science/Social Studies'],
            markingScheme: 'No negative marking',
        },
        importantDates: [
            { month: 'July', event: 'Cycle 1' },
            { month: 'December', event: 'Cycle 2' },
        ],
        website: 'https://ctet.nic.in',
        color: 'orange',
        videos: [],
        articles: [],
        quotes: []
    }
];

export function getExamsByCategory(category: string): ExploreExam[] {
    if (category === 'all') return EXPLORE_EXAMS;
    // Map existing career categories to exam categories if needed, or keeping it direct
    return EXPLORE_EXAMS.filter(exam => exam.category === category);
}
