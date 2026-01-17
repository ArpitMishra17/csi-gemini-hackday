export const scenariosSeedData = {
  doctor: [
    {
      title: 'Emergency Room Triage',
      description: 'Handle multiple patients arriving at the ER and make critical decisions about treatment priority.',
      difficulty: 'intermediate',
      context: 'You are an ER doctor on a busy Saturday night. Multiple patients arrive simultaneously, and you must quickly assess and prioritize their care.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'Three patients arrive at once: a teenager with a deep cut, an elderly man with chest pain, and a child with high fever.',
          aiSystemContext: 'Opening scene of a busy ER. Create tension and urgency while introducing the three patients.',
          options: [
            {
              id: 'opt_1a',
              text: 'Attend to the elderly man with chest pain first',
              skillsRevealed: ['Critical Thinking', 'Risk Assessment'],
              nextStageId: 'stage_2a',
            },
            {
              id: 'opt_1b',
              text: 'Check all three patients quickly before deciding',
              skillsRevealed: ['Thoroughness', 'Time Management'],
              nextStageId: 'stage_2b',
            },
            {
              id: 'opt_1c',
              text: 'Delegate the fever case to a nurse and handle the others yourself',
              skillsRevealed: ['Delegation', 'Leadership'],
              nextStageId: 'stage_2c',
            },
          ],
        },
        {
          stageId: 'stage_2a',
          prompt: 'The elderly man\'s condition is stabilizing, but the teenager\'s wound is bleeding heavily.',
          aiSystemContext: 'The chest pain patient is being monitored. Now the teen needs attention.',
          options: [
            {
              id: 'opt_2a1',
              text: 'Rush to the teenager while asking a nurse to monitor the elderly patient',
              skillsRevealed: ['Quick Decision Making', 'Team Coordination'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2a2',
              text: 'Ensure the elderly patient is completely stable before moving on',
              skillsRevealed: ['Attention to Detail', 'Caution'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_2b',
          prompt: 'Your quick assessment reveals the elderly man needs immediate attention. The teenager is stable but bleeding.',
          aiSystemContext: 'The initial triage is complete. Time to act on your findings.',
          options: [
            {
              id: 'opt_2b1',
              text: 'Focus on the elderly patient and assign the teen to another doctor',
              skillsRevealed: ['Prioritization', 'Resource Management'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b2',
              text: 'Handle both critical cases simultaneously with nurse support',
              skillsRevealed: ['Multitasking', 'Confidence'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_2c',
          prompt: 'The nurse reports the child\'s fever is higher than expected. Meanwhile, both other patients need you.',
          aiSystemContext: 'Delegation led to new information. Now must reassess.',
          options: [
            {
              id: 'opt_2c1',
              text: 'Trust the nurse to handle the fever and continue with your original plan',
              skillsRevealed: ['Trust', 'Focus'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c2',
              text: 'Quickly reassess all three patients given the new information',
              skillsRevealed: ['Adaptability', 'Thoroughness'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'All three patients are now stable. The teenager\'s parents arrive, upset about the wait.',
          aiSystemContext: 'Medical crisis resolved. Now facing an emotional family situation.',
          options: [
            {
              id: 'opt_3a',
              text: 'Apologize and explain the triage process calmly',
              skillsRevealed: ['Communication', 'Empathy', 'Professionalism'],
              nextStageId: null,
            },
            {
              id: 'opt_3b',
              text: 'Let the nurse explain while you check on other patients',
              skillsRevealed: ['Efficiency', 'Delegation'],
              nextStageId: null,
            },
            {
              id: 'opt_3c',
              text: 'Take time to sit with the family and address all their concerns',
              skillsRevealed: ['Patient Care', 'Empathy', 'Communication'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Patient Diagnosis',
      description: 'Work through a complex case with unclear symptoms to reach an accurate diagnosis.',
      difficulty: 'advanced',
      context: 'A patient presents with unusual symptoms that don\'t fit common diagnoses. You must use your medical knowledge and detective skills to find the cause.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'A 35-year-old patient complains of fatigue, joint pain, and occasional rashes that come and go.',
          aiSystemContext: 'Patient consultation room. The symptoms are vague and could indicate many conditions.',
          options: [
            {
              id: 'opt_1a',
              text: 'Order a comprehensive blood panel immediately',
              skillsRevealed: ['Systematic Approach', 'Thoroughness'],
              nextStageId: 'stage_2a',
            },
            {
              id: 'opt_1b',
              text: 'Ask detailed questions about lifestyle, diet, and recent changes',
              skillsRevealed: ['Communication', 'Investigation'],
              nextStageId: 'stage_2b',
            },
            {
              id: 'opt_1c',
              text: 'Perform a physical examination first',
              skillsRevealed: ['Clinical Skills', 'Observation'],
              nextStageId: 'stage_2c',
            },
          ],
        },
        {
          stageId: 'stage_2a',
          prompt: 'Blood tests show elevated inflammation markers but nothing specific. Patient seems anxious about waiting.',
          aiSystemContext: 'Results are inconclusive. Need to dig deeper while managing patient expectations.',
          options: [
            {
              id: 'opt_2a1',
              text: 'Order more specialized tests including autoimmune panels',
              skillsRevealed: ['Persistence', 'Medical Knowledge'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2a2',
              text: 'Reassure the patient and schedule a follow-up to monitor symptoms',
              skillsRevealed: ['Patient Care', 'Patience'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_2b',
          prompt: 'The patient mentions recently starting a new hobby involving outdoor activities and some dietary supplements.',
          aiSystemContext: 'New information emerges from the conversation.',
          options: [
            {
              id: 'opt_2b1',
              text: 'Research potential connections between supplements and symptoms',
              skillsRevealed: ['Research', 'Critical Thinking'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b2',
              text: 'Consider Lyme disease from outdoor activities and test for it',
              skillsRevealed: ['Pattern Recognition', 'Medical Knowledge'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_2c',
          prompt: 'Physical exam reveals slight swelling in joints and a faint butterfly-shaped rash on the cheeks.',
          aiSystemContext: 'Physical signs point toward a specific direction.',
          options: [
            {
              id: 'opt_2c1',
              text: 'Suspect lupus and order specific autoimmune tests',
              skillsRevealed: ['Pattern Recognition', 'Diagnostic Skills'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c2',
              text: 'Consult with a rheumatologist before proceeding',
              skillsRevealed: ['Collaboration', 'Humility'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'Test results confirm early-stage lupus. You need to deliver this diagnosis to the patient.',
          aiSystemContext: 'Delivering difficult news requires sensitivity and clarity.',
          options: [
            {
              id: 'opt_3a',
              text: 'Explain the diagnosis clearly, including treatment options and prognosis',
              skillsRevealed: ['Communication', 'Empathy', 'Honesty'],
              nextStageId: null,
            },
            {
              id: 'opt_3b',
              text: 'Focus on the positive aspects and modern treatments available',
              skillsRevealed: ['Optimism', 'Encouragement'],
              nextStageId: null,
            },
            {
              id: 'opt_3c',
              text: 'Provide written materials and schedule a follow-up to discuss in detail',
              skillsRevealed: ['Thoroughness', 'Patient Support'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Delivering Difficult News',
      description: 'Learn to communicate sensitive health information with compassion and clarity.',
      difficulty: 'beginner',
      context: 'You must inform a patient\'s family about a serious diagnosis while maintaining professionalism and empathy.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'A patient\'s test results show a serious condition. The family is waiting anxiously in the consultation room.',
          aiSystemContext: 'Preparing to deliver difficult news. The family looks worried.',
          options: [
            {
              id: 'opt_1a',
              text: 'Take a moment to compose yourself before entering',
              skillsRevealed: ['Emotional Intelligence', 'Self-Care'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Enter immediately to not keep them waiting',
              skillsRevealed: ['Respect', 'Urgency'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Ask a senior colleague for advice on how to proceed',
              skillsRevealed: ['Humility', 'Learning'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'You\'re now with the family. They ask directly: "Is it serious, doctor?"',
          aiSystemContext: 'The moment of truth. Family needs honest but compassionate communication.',
          options: [
            {
              id: 'opt_2a',
              text: 'Be direct but gentle: "Yes, we found something concerning that we need to discuss."',
              skillsRevealed: ['Honesty', 'Direct Communication'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'First ask them what they understand so far',
              skillsRevealed: ['Active Listening', 'Patient-Centered Care'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Start by explaining what the tests showed in detail',
              skillsRevealed: ['Thoroughness', 'Education'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'After hearing the news, one family member becomes very upset and starts crying.',
          aiSystemContext: 'Emotional response to difficult news. Need to handle with care.',
          options: [
            {
              id: 'opt_3a',
              text: 'Pause and give them time to process their emotions',
              skillsRevealed: ['Empathy', 'Patience'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Offer tissues and water, showing you\'re there for them',
              skillsRevealed: ['Compassion', 'Practical Support'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Continue explaining the treatment options to give them hope',
              skillsRevealed: ['Positivity', 'Forward Thinking'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'The family asks what they should do next and seems overwhelmed.',
          aiSystemContext: 'Family needs guidance and a clear path forward.',
          options: [
            {
              id: 'opt_4a',
              text: 'Provide a clear, step-by-step plan for next actions',
              skillsRevealed: ['Organization', 'Clarity', 'Leadership'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Suggest they take time to process before making decisions',
              skillsRevealed: ['Understanding', 'Respect for Autonomy'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Offer to connect them with support resources and counseling',
              skillsRevealed: ['Holistic Care', 'Resource Awareness'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
  ],

  software_engineer: [
    {
      title: 'Bug Investigation',
      description: 'Track down and fix a critical bug that\'s affecting production users.',
      difficulty: 'intermediate',
      context: 'A major bug has been reported in the production environment. Users are experiencing errors, and you need to identify and fix the issue quickly.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'Users report that the checkout process is failing intermittently. Error reports are flooding the dashboard.',
          aiSystemContext: 'Urgent production issue. Alarms are going off and the team is gathering.',
          options: [
            {
              id: 'opt_1a',
              text: 'Check the error logs immediately to identify patterns',
              skillsRevealed: ['Systematic Debugging', 'Log Analysis'],
              nextStageId: 'stage_2a',
            },
            {
              id: 'opt_1b',
              text: 'Try to reproduce the error in a test environment first',
              skillsRevealed: ['Methodical Approach', 'Caution'],
              nextStageId: 'stage_2b',
            },
            {
              id: 'opt_1c',
              text: 'Roll back the most recent deployment as a precaution',
              skillsRevealed: ['Quick Action', 'Risk Mitigation'],
              nextStageId: 'stage_2c',
            },
          ],
        },
        {
          stageId: 'stage_2a',
          prompt: 'Logs show a database connection timeout occurring during high traffic. The recent code changes touched the payment module.',
          aiSystemContext: 'Found a clue in the logs pointing to database issues.',
          options: [
            {
              id: 'opt_2a1',
              text: 'Investigate the recent payment module changes',
              skillsRevealed: ['Root Cause Analysis', 'Attention to Detail'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2a2',
              text: 'Check database server health and connection pool settings',
              skillsRevealed: ['Infrastructure Knowledge', 'Holistic Thinking'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_2b',
          prompt: 'You can\'t reproduce the error locally. A colleague suggests it might be a race condition.',
          aiSystemContext: 'Local testing isn\'t revealing the issue. Need to think about production-specific conditions.',
          options: [
            {
              id: 'opt_2b1',
              text: 'Add detailed logging to track the exact flow in production',
              skillsRevealed: ['Observability', 'Patience'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b2',
              text: 'Set up a load test to simulate production traffic',
              skillsRevealed: ['Performance Testing', 'Problem Solving'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_2c',
          prompt: 'The rollback didn\'t fix the issue. Turns out the bug was introduced two deployments ago.',
          aiSystemContext: 'Quick fix didn\'t work. Need to dig deeper.',
          options: [
            {
              id: 'opt_2c1',
              text: 'Review git history to find what changed two deployments ago',
              skillsRevealed: ['Version Control Skills', 'Persistence'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c2',
              text: 'Ask the team who worked on those changes for insights',
              skillsRevealed: ['Collaboration', 'Communication'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'You\'ve identified the bug: a missing database index causing slow queries under load. Now you need to fix it.',
          aiSystemContext: 'Root cause identified. Time to implement the fix.',
          options: [
            {
              id: 'opt_3a',
              text: 'Add the index and deploy immediately with monitoring',
              skillsRevealed: ['Quick Problem Resolution', 'Confidence'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Test the fix in staging first, then deploy during low-traffic hours',
              skillsRevealed: ['Caution', 'Risk Management'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Implement the fix along with a temporary fallback mechanism',
              skillsRevealed: ['Defensive Programming', 'Thoroughness'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'The fix is deployed and working. Your manager asks for a post-mortem document.',
          aiSystemContext: 'Crisis resolved. Time to document and prevent future issues.',
          options: [
            {
              id: 'opt_4a',
              text: 'Write a detailed post-mortem including timeline, root cause, and prevention measures',
              skillsRevealed: ['Documentation', 'Learning Mindset', 'Communication'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Create a brief summary and focus on adding tests to prevent regression',
              skillsRevealed: ['Efficiency', 'Quality Assurance'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Propose a team discussion to share learnings with everyone',
              skillsRevealed: ['Knowledge Sharing', 'Team Building'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Feature Planning & Scoping',
      description: 'Plan and scope a new feature while balancing stakeholder expectations and technical constraints.',
      difficulty: 'beginner',
      context: 'Your product manager wants to add a new social sharing feature. You need to plan the implementation while managing expectations.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'The PM presents a feature request: "Users should be able to share their achievements on social media." They want it done in two weeks.',
          aiSystemContext: 'Initial feature discussion with product manager who has high expectations.',
          options: [
            {
              id: 'opt_1a',
              text: 'Ask clarifying questions about specific requirements and use cases',
              skillsRevealed: ['Requirements Gathering', 'Communication'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Immediately estimate the work needed and discuss timeline',
              skillsRevealed: ['Project Planning', 'Directness'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Research existing social sharing implementations first',
              skillsRevealed: ['Research', 'Due Diligence'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'You discover the PM wants support for 5 different social platforms, custom images, and analytics tracking.',
          aiSystemContext: 'Scope is larger than initially suggested. Need to manage expectations.',
          options: [
            {
              id: 'opt_2a',
              text: 'Propose an MVP with 2 platforms first, then expand later',
              skillsRevealed: ['MVP Thinking', 'Scope Management'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'Agree to the full scope but ask for more time',
              skillsRevealed: ['Honesty', 'Negotiation'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Break down each requirement and estimate individually',
              skillsRevealed: ['Detailed Planning', 'Transparency'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'The PM agrees to start with an MVP. Now you need to plan the technical implementation.',
          aiSystemContext: 'Time to make technical decisions about architecture.',
          options: [
            {
              id: 'opt_3a',
              text: 'Design a flexible system that can easily add more platforms later',
              skillsRevealed: ['Future-Proofing', 'System Design'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Build the simplest solution that meets current requirements',
              skillsRevealed: ['YAGNI Principle', 'Pragmatism'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Use an existing third-party library to speed up development',
              skillsRevealed: ['Efficiency', 'Tool Selection'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'A teammate suggests adding extra features while you\'re building this. "It\'ll only take a few hours more!"',
          aiSystemContext: 'Scope creep pressure from a well-meaning colleague.',
          options: [
            {
              id: 'opt_4a',
              text: 'Politely decline and stick to the agreed scope',
              skillsRevealed: ['Scope Discipline', 'Assertiveness'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Add the features to the backlog for future consideration',
              skillsRevealed: ['Flexibility', 'Documentation'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Discuss with the PM to evaluate if the additions are worth the delay',
              skillsRevealed: ['Collaboration', 'Stakeholder Management'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Code Review',
      description: 'Review a colleague\'s code and provide constructive feedback while maintaining team harmony.',
      difficulty: 'beginner',
      context: 'A junior developer has submitted a pull request for review. The code works but has several issues you need to address.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'You open the PR and notice the code works but has poor variable names, no tests, and duplicated logic.',
          aiSystemContext: 'Reviewing code with multiple issues. Must balance feedback effectively.',
          options: [
            {
              id: 'opt_1a',
              text: 'Comment on each issue with specific suggestions for improvement',
              skillsRevealed: ['Detailed Feedback', 'Teaching'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Schedule a call to walk through the feedback together',
              skillsRevealed: ['Mentoring', 'Communication'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Approve with minor comments since the code works',
              skillsRevealed: ['Pragmatism', 'Efficiency'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'The developer responds defensively to your feedback, saying "It works, so why change it?"',
          aiSystemContext: 'Developer is pushing back on feedback. Need to handle diplomatically.',
          options: [
            {
              id: 'opt_2a',
              text: 'Explain the long-term benefits of clean code and testing',
              skillsRevealed: ['Patience', 'Education', 'Persuasion'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'Share examples of bugs caught by similar improvements in the past',
              skillsRevealed: ['Evidence-Based Arguments', 'Experience Sharing'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Ask them to pair program with you to implement the changes together',
              skillsRevealed: ['Collaboration', 'Hands-On Mentoring'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'The developer agrees to make some changes but pushes back on adding tests due to time pressure.',
          aiSystemContext: 'Partial agreement. Need to prioritize what\'s most important.',
          options: [
            {
              id: 'opt_3a',
              text: 'Insist on at least basic test coverage for critical paths',
              skillsRevealed: ['Quality Standards', 'Persistence'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Accept the PR with a follow-up ticket for tests',
              skillsRevealed: ['Compromise', 'Deadline Awareness'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Offer to write the tests yourself to unblock them',
              skillsRevealed: ['Team Player', 'Generosity'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'The PR is finally ready to merge. The developer thanks you for the feedback.',
          aiSystemContext: 'Successful review process completed. Reflect on the experience.',
          options: [
            {
              id: 'opt_4a',
              text: 'Thank them for being open to feedback and merge the PR',
              skillsRevealed: ['Positive Reinforcement', 'Graciousness'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Suggest setting up regular code review sessions for the team',
              skillsRevealed: ['Process Improvement', 'Initiative'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Document the learnings for the team wiki to help others',
              skillsRevealed: ['Knowledge Sharing', 'Documentation'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
  ],

  lawyer: [
    {
      title: 'Client Consultation',
      description: 'Meet with a new client facing a legal issue and gather the information needed to help them.',
      difficulty: 'beginner',
      context: 'A small business owner comes to you worried about a contract dispute with a supplier. This is your first meeting.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'The client is visibly stressed and says they\'ve been threatened with a lawsuit by their supplier.',
          aiSystemContext: 'First client meeting. Client is anxious and needs reassurance while you gather facts.',
          options: [
            {
              id: 'opt_1a',
              text: 'Reassure them that you\'re here to help, then ask them to explain from the beginning',
              skillsRevealed: ['Empathy', 'Active Listening'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Ask to see all documents related to the dispute first',
              skillsRevealed: ['Thoroughness', 'Evidence Focus'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Explain the legal process for contract disputes to set expectations',
              skillsRevealed: ['Education', 'Transparency'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'The client explains they stopped payments because the supplier delivered defective products. They have some email evidence.',
          aiSystemContext: 'Getting the story. The client has a potential defense.',
          options: [
            {
              id: 'opt_2a',
              text: 'Ask detailed questions about the defects and how they documented them',
              skillsRevealed: ['Investigation', 'Attention to Detail'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'Review the original contract to understand the terms and obligations',
              skillsRevealed: ['Contract Analysis', 'Legal Research'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Ask if they attempted to resolve this with the supplier before stopping payment',
              skillsRevealed: ['Fact Finding', 'Understanding Context'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'After reviewing everything, you see the client has a decent case but the contract has a mediation clause.',
          aiSystemContext: 'Legal analysis complete. Need to advise on strategy.',
          options: [
            {
              id: 'opt_3a',
              text: 'Recommend trying mediation first as required by the contract',
              skillsRevealed: ['Contract Compliance', 'Strategic Thinking'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Suggest sending a formal response to the lawsuit threat',
              skillsRevealed: ['Assertiveness', 'Legal Procedure'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Explore if a direct negotiation with the supplier might resolve this faster',
              skillsRevealed: ['Negotiation', 'Practical Solutions'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'The client asks about costs and how long this might take. They\'re worried about their business finances.',
          aiSystemContext: 'Client concerned about practical matters. Need to be honest.',
          options: [
            {
              id: 'opt_4a',
              text: 'Provide a clear breakdown of potential costs for different scenarios',
              skillsRevealed: ['Transparency', 'Financial Awareness'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Suggest a payment plan and prioritize the most cost-effective approach',
              skillsRevealed: ['Client Care', 'Practical Thinking'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Explain that the costs will depend on the supplier\'s response and be honest about uncertainty',
              skillsRevealed: ['Honesty', 'Managing Expectations'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Courtroom Cross-Examination',
      description: 'Question a witness in court to support your client\'s case.',
      difficulty: 'advanced',
      context: 'You\'re in court defending a client accused of breach of contract. A key witness for the opposing side is about to be cross-examined.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'The opposing witness has just given testimony that your client deliberately failed to deliver services. You know they have inconsistent prior statements.',
          aiSystemContext: 'Courtroom setting. Time to cross-examine strategically.',
          options: [
            {
              id: 'opt_1a',
              text: 'Start by asking seemingly innocent questions to establish a baseline',
              skillsRevealed: ['Strategy', 'Patience'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Immediately confront them with their inconsistent statements',
              skillsRevealed: ['Directness', 'Aggression'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Ask them to repeat their testimony in their own words',
              skillsRevealed: ['Active Listening', 'Building Record'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'The witness seems nervous but is sticking to their story. You notice they\'re avoiding eye contact when discussing specific dates.',
          aiSystemContext: 'Witness showing signs of deception. Opportunity to probe.',
          options: [
            {
              id: 'opt_2a',
              text: 'Press on the specific dates where they seem uncertain',
              skillsRevealed: ['Observation', 'Strategic Questioning'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'Present a document that contradicts their timeline',
              skillsRevealed: ['Evidence Usage', 'Preparation'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Ask open-ended questions to let them contradict themselves',
              skillsRevealed: ['Patience', 'Psychological Tactics'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'The witness has made a statement that contradicts an email they sent. The opposing lawyer objects to your line of questioning.',
          aiSystemContext: 'Legal challenge during cross-examination. Need to respond.',
          options: [
            {
              id: 'opt_3a',
              text: 'Calmly explain to the judge why the question is relevant',
              skillsRevealed: ['Composure', 'Legal Argumentation'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Rephrase the question to address the objection',
              skillsRevealed: ['Adaptability', 'Quick Thinking'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Request to show the email as evidence to support your question',
              skillsRevealed: ['Evidence Management', 'Procedural Knowledge'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'The judge allows your question. The witness admits the email exists but claims they "forgot" about it.',
          aiSystemContext: 'Key moment. The witness\'s credibility is in question.',
          options: [
            {
              id: 'opt_4a',
              text: 'Thank the witness and end your cross-examination on this strong point',
              skillsRevealed: ['Strategic Timing', 'Knowing When to Stop'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Ask a few more questions to emphasize the contradiction for the jury',
              skillsRevealed: ['Persuasion', 'Emphasis'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Ask if there are any other things they might have "forgotten"',
              skillsRevealed: ['Rhetoric', 'Impact'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Contract Negotiation',
      description: 'Negotiate terms of a business contract on behalf of your client.',
      difficulty: 'intermediate',
      context: 'Your client is a startup founder negotiating a partnership deal with a larger company. The terms being offered have some concerning clauses.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'You\'ve reviewed the contract and found a clause that gives the larger company excessive control over your client\'s IP.',
          aiSystemContext: 'Pre-negotiation preparation. Identified a problematic clause.',
          options: [
            {
              id: 'opt_1a',
              text: 'Prepare alternative language that protects your client while being reasonable',
              skillsRevealed: ['Preparation', 'Creative Problem Solving'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Research industry-standard clauses for similar partnerships',
              skillsRevealed: ['Research', 'Due Diligence'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Advise your client to be ready to walk away if this clause can\'t be changed',
              skillsRevealed: ['Client Protection', 'Setting Boundaries'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'During the negotiation, the other company\'s lawyer dismisses your concerns as "standard" and suggests your client is being difficult.',
          aiSystemContext: 'Negotiation tension. Opposing side using pressure tactics.',
          options: [
            {
              id: 'opt_2a',
              text: 'Calmly present data showing this clause is not industry standard',
              skillsRevealed: ['Composure', 'Evidence-Based Argument'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'Acknowledge their perspective but firmly state your client\'s position',
              skillsRevealed: ['Diplomacy', 'Assertiveness'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Suggest a break to let tensions cool before continuing',
              skillsRevealed: ['Emotional Intelligence', 'Tactical Pause'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'The other side offers a compromise: they\'ll modify the IP clause but want to add a non-compete restriction.',
          aiSystemContext: 'Counter-offer on the table. Need to evaluate trade-offs.',
          options: [
            {
              id: 'opt_3a',
              text: 'Consult with your client privately before responding',
              skillsRevealed: ['Client First', 'Consultation'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Counter-propose a time-limited non-compete instead of unlimited',
              skillsRevealed: ['Negotiation', 'Middle Ground'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Ask clarifying questions about the scope of the non-compete',
              skillsRevealed: ['Thoroughness', 'Risk Assessment'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'After extended discussion, both sides have reached a tentative agreement. The other side wants to sign today.',
          aiSystemContext: 'Deal nearly done. Final decisions to make.',
          options: [
            {
              id: 'opt_4a',
              text: 'Request 24 hours to review the final language before signing',
              skillsRevealed: ['Caution', 'Diligence'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Proceed with signing after a final read-through with your client',
              skillsRevealed: ['Efficiency', 'Client Collaboration'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Insist on having the changes in writing before any signing',
              skillsRevealed: ['Documentation', 'Protection'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
  ],

  journalist: [
    {
      title: 'Breaking News Story',
      description: 'Cover a developing news story under tight deadline pressure.',
      difficulty: 'intermediate',
      context: 'A major story is breaking - a local factory fire with reports of injuries. You need to get accurate information out quickly.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'Your editor calls: a factory fire is burning and social media is full of rumors. Some say there are casualties. You have 2 hours until deadline.',
          aiSystemContext: 'Breaking news situation. Urgency versus accuracy tension.',
          options: [
            {
              id: 'opt_1a',
              text: 'Head to the scene immediately while calling official sources on the way',
              skillsRevealed: ['Initiative', 'Multitasking'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Start calling official sources first to verify the basic facts',
              skillsRevealed: ['Verification', 'Methodical Approach'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Monitor official channels and verified news sources before acting',
              skillsRevealed: ['Caution', 'Source Verification'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'At the scene, a witness claims they saw people trapped inside. Fire officials haven\'t confirmed any casualties yet.',
          aiSystemContext: 'Conflicting information. Witness statement versus official sources.',
          options: [
            {
              id: 'opt_2a',
              text: 'Report the witness account but clearly attribute it as unverified',
              skillsRevealed: ['Transparency', 'Attribution'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'Wait for official confirmation before reporting any casualty information',
              skillsRevealed: ['Accuracy', 'Restraint'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Try to find additional witnesses to corroborate the claim',
              skillsRevealed: ['Verification', 'Investigation'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'A competing news outlet has just published that 5 people died. You still can\'t confirm this. Your editor is asking for your story.',
          aiSystemContext: 'Competitive pressure. Risk of being scooped versus accuracy.',
          options: [
            {
              id: 'opt_3a',
              text: 'File a story with what you\'ve verified, noting the unconfirmed reports',
              skillsRevealed: ['Integrity', 'Balance'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Push back and ask for more time to verify the casualty numbers',
              skillsRevealed: ['Courage', 'Ethical Standards'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Try to reach the hospital or family members for confirmation',
              skillsRevealed: ['Resourcefulness', 'Persistence'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'Fire officials finally confirm 3 injuries, no deaths. The competing outlet\'s story was wrong. How do you proceed?',
          aiSystemContext: 'Truth emerges. Your caution was vindicated.',
          options: [
            {
              id: 'opt_4a',
              text: 'Publish the accurate information without commenting on the competitor\'s mistake',
              skillsRevealed: ['Professionalism', 'Focus'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Write a story that highlights the importance of verification in breaking news',
              skillsRevealed: ['Media Literacy', 'Teaching'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Follow up with the families of the injured with their permission',
              skillsRevealed: ['Human Interest', 'Empathy'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Interview Preparation',
      description: 'Prepare for and conduct an important interview with a public figure.',
      difficulty: 'beginner',
      context: 'You\'ve secured an interview with a local politician who\'s been accused of misusing public funds. This is a significant opportunity.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'You have one week to prepare for the interview. The politician\'s office has given you 30 minutes.',
          aiSystemContext: 'Interview preparation phase. Limited time to get information.',
          options: [
            {
              id: 'opt_1a',
              text: 'Research all public records and previous statements about the allegations',
              skillsRevealed: ['Research', 'Thoroughness'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Talk to sources who have worked with or against the politician',
              skillsRevealed: ['Source Development', 'Investigation'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Prepare a list of tough but fair questions covering all angles',
              skillsRevealed: ['Preparation', 'Balance'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'The politician\'s handler calls and asks to see your questions in advance, or they\'ll cancel the interview.',
          aiSystemContext: 'Pressure to compromise journalistic independence.',
          options: [
            {
              id: 'opt_2a',
              text: 'Politely decline and explain that you don\'t share questions in advance',
              skillsRevealed: ['Ethics', 'Independence'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'Share general topics but not specific questions',
              skillsRevealed: ['Compromise', 'Negotiation'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Agree to share questions to secure this important interview',
              skillsRevealed: ['Pragmatism', 'Flexibility'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'During the interview, the politician gives evasive answers to your main questions about the fund allegations.',
          aiSystemContext: 'Interview is happening. Subject is deflecting.',
          options: [
            {
              id: 'opt_3a',
              text: 'Politely but firmly ask the same question again in a different way',
              skillsRevealed: ['Persistence', 'Assertiveness'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Present specific evidence and ask them to respond to it directly',
              skillsRevealed: ['Confrontation', 'Preparation'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Note the non-answer and move on to other questions',
              skillsRevealed: ['Time Management', 'Adaptability'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'The interview is over. You have some good quotes but not the direct admission you hoped for. Time to write.',
          aiSystemContext: 'Post-interview. Processing what you got.',
          options: [
            {
              id: 'opt_4a',
              text: 'Write a fair piece that includes both the allegations and their responses',
              skillsRevealed: ['Fairness', 'Balance'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Highlight the evasive answers to show what they didn\'t address',
              skillsRevealed: ['Analysis', 'Accountability'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Seek additional sources to strengthen the story before publishing',
              skillsRevealed: ['Thoroughness', 'Follow-Up'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
    {
      title: 'Fact-Checking Investigation',
      description: 'Investigate a viral claim to determine if it\'s true or misinformation.',
      difficulty: 'beginner',
      context: 'A viral social media post claims a local company is secretly polluting the river. Thousands have shared it. Your editor wants you to investigate.',
      stages: [
        {
          stageId: 'stage_1',
          prompt: 'The viral post includes a photo of discolored water and claims it\'s from the company\'s illegal dumping. It has 50,000 shares.',
          aiSystemContext: 'Viral claim needs investigation. Starting from scratch.',
          options: [
            {
              id: 'opt_1a',
              text: 'Reverse image search the photo to check if it\'s real and recent',
              skillsRevealed: ['Digital Literacy', 'Verification'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1b',
              text: 'Contact the company for a statement about the allegations',
              skillsRevealed: ['Direct Inquiry', 'Fairness'],
              nextStageId: 'stage_2',
            },
            {
              id: 'opt_1c',
              text: 'Visit the location mentioned in the post to see for yourself',
              skillsRevealed: ['Ground-Truthing', 'Initiative'],
              nextStageId: 'stage_2',
            },
          ],
        },
        {
          stageId: 'stage_2',
          prompt: 'Your initial investigation shows the photo is real and recent, but it\'s from a different location than claimed.',
          aiSystemContext: 'Partial truth discovered. The photo is real but context is wrong.',
          options: [
            {
              id: 'opt_2a',
              text: 'Investigate the actual location of the photo to find the real story',
              skillsRevealed: ['Curiosity', 'Follow-Through'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2b',
              text: 'Contact the original poster to ask about the discrepancy',
              skillsRevealed: ['Source Contact', 'Giving Benefit of Doubt'],
              nextStageId: 'stage_3',
            },
            {
              id: 'opt_2c',
              text: 'Check environmental agency records for any real complaints against the company',
              skillsRevealed: ['Research', 'Public Records'],
              nextStageId: 'stage_3',
            },
          ],
        },
        {
          stageId: 'stage_3',
          prompt: 'You discover the company does have some environmental violations, but they\'re minor and unrelated to the river. The viral post is mostly false.',
          aiSystemContext: 'Complex finding: viral claim is false, but company isn\'t perfect either.',
          options: [
            {
              id: 'opt_3a',
              text: 'Write a fact-check clearly debunking the viral claim',
              skillsRevealed: ['Truth-Telling', 'Clarity'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3b',
              text: 'Write a nuanced piece addressing both the false claim and the real violations',
              skillsRevealed: ['Nuance', 'Comprehensiveness'],
              nextStageId: 'stage_4',
            },
            {
              id: 'opt_3c',
              text: 'Focus on investigating the real environmental violations as a separate story',
              skillsRevealed: ['News Judgment', 'Pivoting'],
              nextStageId: 'stage_4',
            },
          ],
        },
        {
          stageId: 'stage_4',
          prompt: 'Your fact-check is published. The original poster is now attacking you on social media, calling you a "corporate shill."',
          aiSystemContext: 'Backlash from debunking. Personal attacks online.',
          options: [
            {
              id: 'opt_4a',
              text: 'Ignore the attacks and let your reporting speak for itself',
              skillsRevealed: ['Resilience', 'Professionalism'],
              nextStageId: null,
            },
            {
              id: 'opt_4b',
              text: 'Respond professionally with a link to your evidence and methodology',
              skillsRevealed: ['Transparency', 'Engagement'],
              nextStageId: null,
            },
            {
              id: 'opt_4c',
              text: 'Document the harassment in case it escalates',
              skillsRevealed: ['Self-Protection', 'Documentation'],
              nextStageId: null,
            },
          ],
        },
      ],
    },
  ],
};
