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
7. **Hash Tables**: Key-value pair storage with O(1) lookup
8. **Heaps**: Specialized tree for priority queues

## Time Complexity:
- Array access: O(1)
- Linked list traversal: O(n)
- Binary search tree: O(log n)

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
- Sorting (Bubble, Quick, Merge, Heap)
- Searching (Linear, Binary)
- Graph traversal (DFS, BFS)
- Dynamic Programming
- Greedy Algorithms`,
        completed: false,
      },
      {
        id: "cs-4",
        title: "Artificial Intelligence Fundamentals",
        notes: `# Artificial Intelligence Fundamentals

## What is AI?
Artificial Intelligence is the simulation of human intelligence by machines. It involves creating algorithms that can learn, reason, and make decisions.

## Key AI Concepts:
1. **Machine Learning**: Systems that learn from data
   - Supervised Learning (labeled data)
   - Unsupervised Learning (unlabeled data)
   - Reinforcement Learning (reward-based)

2. **Neural Networks**: Inspired by biological neurons
   - Deep Learning
   - Convolutional Neural Networks (CNNs)
   - Recurrent Neural Networks (RNNs)

3. **Natural Language Processing (NLP)**:
   - Text analysis and generation
   - Language translation
   - Sentiment analysis

## Applications:
- Image recognition
- Voice assistants
- Autonomous vehicles
- Recommendation systems
- Medical diagnosis

## Popular AI Frameworks:
- TensorFlow
- PyTorch
- Scikit-learn
- Keras`,
        completed: false,
      },
      {
        id: "cs-5",
        title: "Machine Learning Basics",
        notes: `# Machine Learning Basics

## Types of Machine Learning:

### 1. Supervised Learning
Training data includes correct answers (labels)
- **Classification**: Categorizing data (spam detection)
- **Regression**: Predicting continuous values (house prices)

### 2. Unsupervised Learning
Finding patterns in unlabeled data
- **Clustering**: Grouping similar items
- **Dimensionality Reduction**: Simplifying data

### 3. Reinforcement Learning
Learning through trial and error with rewards

## Key Algorithms:
- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forests
- K-Nearest Neighbors (KNN)
- Support Vector Machines (SVM)
- K-Means Clustering

## ML Workflow:
1. Data Collection
2. Data Preprocessing
3. Feature Engineering
4. Model Selection
5. Training
6. Evaluation
7. Deployment

## Important Metrics:
- Accuracy
- Precision & Recall
- F1-Score
- Confusion Matrix`,
        completed: false,
      },
      {
        id: "cs-6",
        title: "Deep Learning & Neural Networks",
        notes: `# Deep Learning & Neural Networks

## What is Deep Learning?
A subset of machine learning using neural networks with multiple layers to learn complex patterns.

## Neural Network Components:
- **Input Layer**: Receives data
- **Hidden Layers**: Process and transform data
- **Output Layer**: Produces predictions
- **Activation Functions**: ReLU, Sigmoid, Tanh
- **Weights & Biases**: Learnable parameters

## Types of Neural Networks:

### 1. Feedforward Neural Networks (FNN)
Basic architecture where data flows in one direction

### 2. Convolutional Neural Networks (CNN)
Specialized for image processing
- Convolution layers
- Pooling layers
- Used in computer vision

### 3. Recurrent Neural Networks (RNN)
Process sequential data
- LSTM (Long Short-Term Memory)
- GRU (Gated Recurrent Unit)
- Used in NLP and time series

### 4. Transformer Models
Modern architecture for NLP
- Self-attention mechanism
- BERT, GPT, T5

## Training Concepts:
- Backpropagation
- Gradient Descent
- Learning Rate
- Batch Size
- Epochs
- Overfitting & Underfitting

## Regularization Techniques:
- Dropout
- L1/L2 Regularization
- Batch Normalization`,
        completed: false,
      },
      {
        id: "cs-7",
        title: "Data Structures & Algorithms (DSA)",
        notes: `# Data Structures & Algorithms (DSA)

## Why DSA Matters:
Essential for technical interviews, competitive programming, and writing efficient code.

## Core Data Structures:

### Arrays & Strings
- Fixed vs Dynamic arrays
- Two-pointer technique
- Sliding window
- String manipulation

### Linked Lists
- Singly vs Doubly linked
- Fast & slow pointer
- Cycle detection
- Reversal techniques

### Stacks & Queues
- LIFO & FIFO principles
- Applications: Expression evaluation, BFS/DFS
- Monotonic stack/queue

### Trees
- Binary Trees
- Binary Search Trees (BST)
- AVL Trees (balanced)
- Tree traversals: Inorder, Preorder, Postorder
- Level-order traversal

### Graphs
- Adjacency matrix vs list
- DFS (Depth-First Search)
- BFS (Breadth-First Search)
- Dijkstra's algorithm
- Topological sort

### Heaps
- Min-Heap & Max-Heap
- Priority Queue
- Heap sort

### Hash Tables
- Hash functions
- Collision resolution
- Applications

## Essential Algorithms:

### Sorting
- Bubble Sort: O(n²)
- Merge Sort: O(n log n)
- Quick Sort: O(n log n) average
- Heap Sort: O(n log n)

### Searching
- Binary Search: O(log n)
- Linear Search: O(n)

### Dynamic Programming
- Memoization
- Tabulation
- Common problems: Fibonacci, Knapsack, LCS

### Greedy Algorithms
- Activity selection
- Huffman coding
- Minimum spanning tree

### Divide & Conquer
- Merge sort
- Quick sort
- Binary search

## Big O Notation:
- O(1): Constant
- O(log n): Logarithmic
- O(n): Linear
- O(n log n): Linearithmic
- O(n²): Quadratic
- O(2ⁿ): Exponential`,
        completed: false,
      },
      {
        id: "cs-8",
        title: "Advanced DSA Problem Solving",
        notes: `# Advanced DSA Problem Solving

## Problem-Solving Patterns:

### 1. Two Pointers
Used for array/string problems
- Pair sum in sorted array
- Remove duplicates
- Container with most water

### 2. Sliding Window
For contiguous subarrays
- Maximum sum subarray
- Longest substring without repeating chars
- Minimum window substring

### 3. Fast & Slow Pointers
Linked list cycle detection
- Floyd's cycle detection
- Finding middle element

### 4. Merge Intervals
- Overlapping intervals
- Insert interval
- Meeting rooms

### 5. Cyclic Sort
- Find missing number
- Find duplicate number

### 6. In-place Reversal of Linked List
- Reverse entire list
- Reverse sublist
- Palindrome check

### 7. Tree BFS/DFS
- Level order traversal
- Zigzag traversal
- Path sum problems

### 8. Graph Algorithms
- Island problems
- Clone graph
- Course schedule

### 9. Dynamic Programming Patterns
- Fibonacci pattern
- 0/1 Knapsack
- Unbounded knapsack
- Longest common subsequence
- Palindromic subsequence

### 10. Backtracking
- Permutations
- Combinations
- Subset problems
- N-Queens

## Interview Tips:
1. Clarify the problem
2. Think of edge cases
3. Discuss brute force first
4. Optimize step by step
5. Write clean code
6. Test with examples
7. Analyze time & space complexity

## Common Interview Problems:
- Reverse Linked List
- Valid Parentheses
- Binary Tree Traversals
- Two Sum / Three Sum
- Longest Palindromic Substring
- Merge K Sorted Lists
- Implement LRU Cache
- Word Search
- Course Schedule
- Number of Islands`,
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
