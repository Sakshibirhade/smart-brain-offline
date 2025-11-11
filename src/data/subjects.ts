import { Subject, Quiz, FAQItem, FlashCard } from "@/types/study";

export const subjects: Subject[] = [
  {
    id: "cs",
    name: "Computer Science",
    icon: "Code",
    color: "from-blue-500 to-cyan-500",
    progress: 45,
    chapters: [
      {
        id: "cs-1",
        title: "Introduction to Programming",
        notes: `# Introduction to Programming

## What is Programming?
Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++.

## Key Concepts:
- **Variables**: Containers for storing data values
- **Functions**: Reusable blocks of code
- **Loops**: Repeating actions multiple times
- **Conditionals**: Making decisions in code

## Example (JavaScript):
\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

Programming requires logical thinking and problem-solving skills.`,
        completed: true,
      },
      {
        id: "cs-2",
        title: "Data Structures",
        notes: `# Data Structures

## Common Data Structures:
1. **Arrays**: Ordered collections of elements
2. **Linked Lists**: Nodes connected via pointers
3. **Stacks**: LIFO (Last In, First Out)
4. **Queues**: FIFO (First In, First Out)
5. **Trees**: Hierarchical structures
6. **Graphs**: Networks of connected nodes

Understanding data structures is crucial for writing efficient code.`,
        completed: false,
      },
      {
        id: "cs-3",
        title: "Algorithms",
        notes: `# Algorithms

## What are Algorithms?
An algorithm is a step-by-step procedure for solving a problem or accomplishing a task.

## Algorithm Complexity:
- **Time Complexity**: How execution time grows with input size
- **Space Complexity**: How memory usage grows with input size

## Common Algorithms:
- Sorting (Bubble, Quick, Merge)
- Searching (Linear, Binary)
- Graph traversal (DFS, BFS)`,
        completed: false,
      },
    ],
  },
  {
    id: "math",
    name: "Mathematics",
    icon: "Calculator",
    color: "from-purple-500 to-pink-500",
    progress: 60,
    chapters: [
      {
        id: "math-1",
        title: "Algebra Basics",
        notes: `# Algebra Basics

## Variables and Expressions
Algebra uses letters to represent unknown values.

## Key Concepts:
- **Equations**: Mathematical statements showing equality
- **Solving for x**: Finding unknown values
- **Linear equations**: ax + b = c

## Example:
Solve: 2x + 5 = 13
- Subtract 5: 2x = 8
- Divide by 2: x = 4`,
        completed: true,
      },
      {
        id: "math-2",
        title: "Geometry",
        notes: `# Geometry

## Basic Shapes:
- **Triangle**: 3 sides, angles sum to 180°
- **Square**: 4 equal sides, all angles 90°
- **Circle**: All points equidistant from center

## Formulas:
- Area of circle: πr²
- Circumference: 2πr
- Pythagorean theorem: a² + b² = c²`,
        completed: true,
      },
      {
        id: "math-3",
        title: "Calculus Fundamentals",
        notes: `# Calculus Fundamentals

## Derivatives
The derivative measures how a function changes as its input changes.

## Integrals
Integration is the reverse of differentiation.

## Applications:
- Physics (velocity, acceleration)
- Economics (marginal cost)
- Engineering (optimization)`,
        completed: false,
      },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    icon: "Atom",
    color: "from-green-500 to-emerald-500",
    progress: 30,
    chapters: [
      {
        id: "physics-1",
        title: "Newton's Laws of Motion",
        notes: `# Newton's Laws of Motion

## First Law (Inertia)
An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.

## Second Law (F = ma)
Force equals mass times acceleration.

## Third Law (Action-Reaction)
For every action, there is an equal and opposite reaction.

These laws form the foundation of classical mechanics.`,
        completed: true,
      },
      {
        id: "physics-2",
        title: "Energy and Work",
        notes: `# Energy and Work

## Types of Energy:
- **Kinetic Energy**: Energy of motion (½mv²)
- **Potential Energy**: Stored energy (mgh)

## Work
Work = Force × Distance

## Conservation of Energy
Energy cannot be created or destroyed, only transformed.`,
        completed: false,
      },
      {
        id: "physics-3",
        title: "Electricity and Magnetism",
        notes: `# Electricity and Magnetism

## Electric Current
Flow of electric charge through a conductor.

## Ohm's Law
V = IR (Voltage = Current × Resistance)

## Magnetism
Magnetic fields are produced by moving charges.`,
        completed: false,
      },
    ],
  },
  {
    id: "english",
    name: "English",
    icon: "BookOpen",
    color: "from-orange-500 to-red-500",
    progress: 75,
    chapters: [
      {
        id: "english-1",
        title: "Grammar Essentials",
        notes: `# Grammar Essentials

## Parts of Speech:
1. **Nouns**: Person, place, thing, or idea
2. **Verbs**: Action or state of being
3. **Adjectives**: Describe nouns
4. **Adverbs**: Describe verbs, adjectives, or other adverbs

## Sentence Structure:
- Subject + Verb + Object
- Example: "She (subject) reads (verb) books (object)."

Good grammar is essential for clear communication.`,
        completed: true,
      },
      {
        id: "english-2",
        title: "Writing Techniques",
        notes: `# Writing Techniques

## Essay Structure:
1. **Introduction**: Hook + Thesis
2. **Body**: Supporting paragraphs
3. **Conclusion**: Summary + Final thoughts

## Tips for Better Writing:
- Use active voice
- Vary sentence length
- Show, don't tell
- Edit and revise`,
        completed: true,
      },
      {
        id: "english-3",
        title: "Literature Analysis",
        notes: `# Literature Analysis

## Literary Devices:
- **Metaphor**: Comparing unlike things
- **Simile**: Comparison using "like" or "as"
- **Symbolism**: Objects representing ideas
- **Irony**: Saying opposite of what's meant

## Theme Analysis:
Identifying central ideas and messages in texts.`,
        completed: true,
      },
    ],
  },
];

export const quizzes: Quiz[] = [
  {
    id: "quiz-cs-1",
    subjectId: "cs",
    questions: [
      {
        id: "q1",
        question: "What is a variable in programming?",
        options: [
          "A container for storing data",
          "A type of loop",
          "A function",
          "A conditional statement",
        ],
        correctAnswer: 0,
      },
      {
        id: "q2",
        question: "Which data structure follows LIFO principle?",
        options: ["Queue", "Array", "Stack", "Linked List"],
        correctAnswer: 2,
      },
      {
        id: "q3",
        question: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Program Utility",
          "Common Processing Unit",
        ],
        correctAnswer: 0,
      },
      {
        id: "q4",
        question: "Which of these is NOT a programming language?",
        options: ["Python", "HTML", "JavaScript", "Photoshop"],
        correctAnswer: 3,
      },
      {
        id: "q5",
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "quiz-math-1",
    subjectId: "math",
    questions: [
      {
        id: "q1",
        question: "What is 15% of 200?",
        options: ["20", "25", "30", "35"],
        correctAnswer: 2,
      },
      {
        id: "q2",
        question: "What is the area of a circle with radius 5? (Use π ≈ 3.14)",
        options: ["78.5", "31.4", "15.7", "62.8"],
        correctAnswer: 0,
      },
      {
        id: "q3",
        question: "Solve: 3x + 7 = 22",
        options: ["x = 3", "x = 5", "x = 7", "x = 9"],
        correctAnswer: 1,
      },
      {
        id: "q4",
        question: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: 1,
      },
      {
        id: "q5",
        question: "What is the derivative of x²?",
        options: ["x", "2x", "x³", "2"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "quiz-physics-1",
    subjectId: "physics",
    questions: [
      {
        id: "q1",
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: 1,
      },
      {
        id: "q2",
        question: "According to Newton's second law, F = ?",
        options: ["ma", "m/a", "a/m", "m + a"],
        correctAnswer: 0,
      },
      {
        id: "q3",
        question: "What is the speed of light in vacuum?",
        options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁹ m/s"],
        correctAnswer: 0,
      },
      {
        id: "q4",
        question: "Kinetic energy formula is:",
        options: ["mgh", "½mv²", "mv", "m/v"],
        correctAnswer: 1,
      },
      {
        id: "q5",
        question: "What does Ohm's Law state?",
        options: ["V = IR", "V = I/R", "V = I + R", "V = I - R"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "quiz-english-1",
    subjectId: "english",
    questions: [
      {
        id: "q1",
        question: "Which is a noun?",
        options: ["Quickly", "Beautiful", "Happiness", "Run"],
        correctAnswer: 2,
      },
      {
        id: "q2",
        question: "What is a metaphor?",
        options: [
          "Comparison using 'like' or 'as'",
          "Direct comparison without 'like' or 'as'",
          "Exaggeration",
          "Sound repetition",
        ],
        correctAnswer: 1,
      },
      {
        id: "q3",
        question: "Which sentence uses active voice?",
        options: [
          "The book was read by Sarah.",
          "Sarah read the book.",
          "The book has been read.",
          "The book is being read.",
        ],
        correctAnswer: 1,
      },
      {
        id: "q4",
        question: "What is an adjective?",
        options: [
          "An action word",
          "A describing word",
          "A connecting word",
          "A naming word",
        ],
        correctAnswer: 1,
      },
      {
        id: "q5",
        question: "Which is correct?",
        options: [
          "They're going to there house.",
          "Their going to they're house.",
          "They're going to their house.",
          "There going to their house.",
        ],
        correctAnswer: 2,
      },
    ],
  },
];

export const faqs: FAQItem[] = [
  {
    question: "How do I start studying effectively?",
    answer:
      "Start with a clear plan! Choose a subject, review the chapter notes, then test yourself with quizzes. Consistency is key - study a little every day rather than cramming.",
    category: "Study Tips",
  },
  {
    question: "What is the best way to memorize formulas?",
    answer:
      "Use our flashcard games! Active recall through practice is more effective than passive reading. Also, try to understand WHY formulas work, not just memorize them.",
    category: "Study Tips",
  },
  {
    question: "How can I improve my quiz scores?",
    answer:
      "Review the chapter notes thoroughly before taking quizzes. When you get a question wrong, go back and study that topic. Retake quizzes to reinforce learning.",
    category: "Quizzes",
  },
  {
    question: "What are the key programming concepts?",
    answer:
      "Focus on: variables (storing data), functions (reusable code), loops (repetition), and conditionals (decision-making). Practice writing small programs daily.",
    category: "Computer Science",
  },
  {
    question: "How do I solve algebra equations?",
    answer:
      "Isolate the variable by performing the same operation on both sides. For example, in 2x + 5 = 13: subtract 5 from both sides (2x = 8), then divide by 2 (x = 4).",
    category: "Mathematics",
  },
  {
    question: "What is Newton's First Law?",
    answer:
      "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. This is also called the Law of Inertia.",
    category: "Physics",
  },
  {
    question: "How can I improve my writing?",
    answer:
      "Read more! Reading exposes you to different styles and vocabulary. Also: outline before writing, use active voice, vary sentence length, and always edit your work.",
    category: "English",
  },
  {
    question: "Does SmartStudy work offline?",
    answer:
      "Yes! SmartStudy is designed to work completely offline after installation. All your notes, quizzes, and progress are stored locally on your device.",
    category: "App Features",
  },
];

export const flashCards: FlashCard[] = [
  {
    id: "fc-cs-1",
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
    subjectId: "cs",
  },
  {
    id: "fc-cs-2",
    question: "What is a function?",
    answer: "A reusable block of code that performs a specific task",
    subjectId: "cs",
  },
  {
    id: "fc-cs-3",
    question: "What does API stand for?",
    answer: "Application Programming Interface",
    subjectId: "cs",
  },
  {
    id: "fc-math-1",
    question: "What is the Pythagorean theorem?",
    answer: "a² + b² = c²",
    subjectId: "math",
  },
  {
    id: "fc-math-2",
    question: "Area of a circle formula?",
    answer: "πr²",
    subjectId: "math",
  },
  {
    id: "fc-math-3",
    question: "What is the quadratic formula?",
    answer: "x = (-b ± √(b² - 4ac)) / 2a",
    subjectId: "math",
  },
  {
    id: "fc-physics-1",
    question: "What is Newton's Second Law?",
    answer: "F = ma (Force = mass × acceleration)",
    subjectId: "physics",
  },
  {
    id: "fc-physics-2",
    question: "Kinetic energy formula?",
    answer: "KE = ½mv²",
    subjectId: "physics",
  },
  {
    id: "fc-physics-3",
    question: "What is Ohm's Law?",
    answer: "V = IR (Voltage = Current × Resistance)",
    subjectId: "physics",
  },
  {
    id: "fc-english-1",
    question: "What is a metaphor?",
    answer: "A direct comparison between two unlike things without using 'like' or 'as'",
    subjectId: "english",
  },
  {
    id: "fc-english-2",
    question: "What is alliteration?",
    answer: "Repetition of the same sound at the start of words (e.g., 'Peter Piper picked')",
    subjectId: "english",
  },
  {
    id: "fc-english-3",
    question: "What is a thesis statement?",
    answer: "The main argument or claim of an essay, usually in the introduction",
    subjectId: "english",
  },
];
