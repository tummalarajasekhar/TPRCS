// app/lib/data.ts

export type CourseMode = 'OFFLINE' | 'ONLINE_LIVE' | 'RECORDED';

export const CATEGORIES = ["All", "Full Stack", "Languages", "App Dev", "Placement/Aptitude", "Marketing"];

export const COURSES = [
    // --- 1. MERN STACK ---
    {
        id: 1,
        title: "MERN Stack Masterclass",
        category: "Full Stack",
        description: "Build production-ready apps with MongoDB, Express, React, and Node.js.",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        instructor: "Sai Kumar (Ex-TCS)",
        rating: 4.8,
        students: 142,
        pricing: {
            OFFLINE: { price: 15000, location: "Brodipet 4th Lane", features: ["AC Lab", "Offline Mentorship", "Placement Call"] },
            ONLINE_LIVE: { price: 8000, location: "Zoom Live", features: ["Live Interaction", "Doubt Sessions", "Recordings"] },
            RECORDED: { price: 2500, location: "App Access", features: ["Lifetime Access", "Source Code", "Q&A Forum"] }
        },
        curriculum: [
            { title: "Module 1: Web Foundation & ES6+", duration: "Week 1", topics: ["HTTP/HTTPS, DNS, Client-Server", "let, const, Arrow Functions", "Destructuring & Spread Operator", "Promises & Async/Await"] },
            { title: "Module 2: React.js Essentials", duration: "Week 2", topics: ["Virtual DOM Architecture", "JSX Syntax & Components", "Props vs State", "Handling Events"] },
            { title: "Module 3: Advanced React Hooks", duration: "Week 3", topics: ["useEffect & Lifecycle", "useContext for Global State", "Custom Hooks", "Performance Optimization"] },
            { title: "Module 4: State Management (Redux)", duration: "Week 4", topics: ["Redux Toolkit Setup", "Slices & Reducers", "Async Thunks", "React-Redux Provider"] },
            { title: "Module 5: Node.js & Express Backend", duration: "Week 5", topics: ["Event Loop Architecture", "Building REST APIs", "Middleware & Error Handling", "JWT Authentication"] },
            { title: "Module 6: MongoDB Database", duration: "Week 6", topics: ["NoSQL vs SQL", "Mongoose Schemas", "Complex Aggregations", "Data Validation"] },
            { title: "Module 7: Deployment & DevOps", duration: "Week 7", topics: ["Docker Basics", "Deploying to AWS EC2", "CI/CD Pipelines", "Nginx Configuration"] },
            { title: "Module 8: Capstone Project", duration: "Week 8", topics: ["E-Commerce Application", "Payment Gateway Integration", "Admin Dashboard", "Resume Building"] }
        ]
    },

    // --- 2. PYTHON FULL STACK ---
    {
        id: 2,
        title: "Python Full Stack",
        category: "Full Stack",
        description: "Modern web development with Django/FastAPI backend and React frontend.",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        instructor: "Ravi Teja (Sr. Developer)",
        rating: 4.7,
        students: 98,
        pricing: {
            OFFLINE: { price: 15000, location: "Brodipet Lab", features: ["Real Projects", "Internship Mode"] },
            ONLINE_LIVE: { price: 8000, location: "Google Meet", features: ["Live Coding", "Notes"] },
            RECORDED: { price: 2500, location: "App Access", features: ["Self Paced", "Assignments"] }
        },
        curriculum: [
            { title: "Module 1: Python Core Syntax", duration: "Week 1", topics: ["Variables, Data Types, Loops", "Functions & Modules", "List Comprehensions", "File Handling"] },
            { title: "Module 2: Object Oriented Python", duration: "Week 2", topics: ["Classes & Objects", "Inheritance & Polymorphism", "Encapsulation", "Magic Methods"] },
            { title: "Module 3: Database with SQL", duration: "Week 3", topics: ["PostgreSQL Setup", "SQL Queries (JOINs, Indexing)", "Database Design", "Normalization"] },
            { title: "Module 4: Django Framework Basics", duration: "Week 4", topics: ["MVT Architecture", "Django ORM", "Admin Panel Customization", "Routing & Views"] },
            { title: "Module 5: Django REST Framework", duration: "Week 5", topics: ["Serializers", "API Views", "Authentication & Permissions", "Swagger Documentation"] },
            { title: "Module 6: React Integration", duration: "Week 6", topics: ["Connecting Django with React", "Axios Interceptors", "JWT Handling", "State Management"] },
            { title: "Module 7: Real-time Features", duration: "Week 7", topics: ["WebSockets with Django Channels", "Redis & Caching", "Background Tasks (Celery)", "Notifications"] }
        ]
    },

    // --- 3. JAVA FULL STACK ---
    {
        id: 3,
        title: "Java Full Stack (Spring Boot)",
        category: "Full Stack",
        description: "Enterprise level development using Java, Spring Boot, Hibernate, and Microservices.",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        instructor: "Murali Krishna",
        rating: 4.9,
        students: 210,
        pricing: {
            OFFLINE: { price: 16000, location: "Koretapadu", features: ["Enterprise Projects", "System Design"] },
            ONLINE_LIVE: { price: 9000, location: "Google Meet", features: ["Live Coding", "Spring Boot Notes"] },
            RECORDED: { price: 3000, location: "App Access", features: ["Backend Logic", "Frontend Integration"] }
        },
        curriculum: [
            { title: "Module 1: Java Core", duration: "Week 1", topics: ["JVM Architecture", "Collections Framework", "Multithreading", "Exception Handling"] },
            { title: "Module 2: Advanced Java", duration: "Week 2", topics: ["Java 8 Features (Streams, Lambda)", "JDBC Connectivity", "Servlets & JSP", "Design Patterns"] },
            { title: "Module 3: Spring Framework", duration: "Week 3", topics: ["Dependency Injection (IoC)", "Spring MVC Flow", "Spring Boot Setup", "Annotations Deep Dive"] },
            { title: "Module 4: Hibernate & JPA", duration: "Week 4", topics: ["ORM Concepts", "Entity Mapping", "HQL & JPQL", "Caching Strategies"] },
            { title: "Module 5: Microservices", duration: "Week 5", topics: ["Service Discovery (Eureka)", "API Gateway", "Fault Tolerance (Resilience4j)", "Distributed Tracing"] },
            { title: "Module 6: Frontend with Angular", duration: "Week 6", topics: ["TypeScript Basics", "Components & Modules", "Data Binding", "Services & Dependency Injection"] },
            { title: "Module 7: Testing & Deployment", duration: "Week 7", topics: ["JUnit & Mockito", "Dockerizing Spring Boot", "Jenkins Pipelines", "Cloud Deployment"] }
        ]
    },

    // --- 4. APP DEVELOPMENT (FLUTTER) ---
    {
        id: 4,
        title: "App Development (Flutter)",
        category: "App Dev",
        description: "Build Android and iOS apps with a single codebase using Google's Flutter.",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        instructor: "Anil Kumar",
        rating: 4.6,
        students: 85,
        pricing: {
            OFFLINE: { price: 14000, location: "Koretapadu", features: ["Live Device Testing", "Store Upload Guide"] },
            ONLINE_LIVE: { price: 7500, location: "Zoom", features: ["Emulator Setup", "Live Debugging"] },
            RECORDED: { price: 2000, location: "App Access", features: ["Build 5 Apps", "Source Code"] }
        },
        curriculum: [
            { title: "Module 1: Dart Programming", duration: "Week 1", topics: ["Dart Syntax", "Null Safety", "OOP in Dart", "Async Programming"] },
            { title: "Module 2: Flutter Widgets", duration: "Week 2", topics: ["Stateless vs Stateful", "Layouts (Row, Column, Stack)", "Material Design", "Navigation"] },
            { title: "Module 3: State Management", duration: "Week 3", topics: ["Provider Pattern", "Riverpod", "BLoC Architecture", "GetX"] },
            { title: "Module 4: API Integration", duration: "Week 4", topics: ["HTTP Package", "JSON Parsing", "Error Handling", "Loading States"] },
            { title: "Module 5: Local Database", duration: "Week 5", topics: ["SQLite", "Hive Database", "Shared Preferences", "Offline Capability"] },
            { title: "Module 6: Native Features", duration: "Week 6", topics: ["Camera Access", "Geolocation & Maps", "Push Notifications", "Background Services"] }
        ]
    },

    // --- 5. DSA WITH PYTHON ---
    {
        id: 5,
        title: "DSA with Python",
        category: "Languages",
        description: "Master Data Structures & Algorithms specifically using Python. Best for Interviews.",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        instructor: "Srinivas (IIT Alumni)",
        rating: 5.0,
        students: 300,
        pricing: {
            OFFLINE: { price: 7000, location: "Brodipet", features: ["Whiteboard Logic", "FAANG Questions"] },
            ONLINE_LIVE: { price: 4000, location: "Zoom", features: ["Live Logic Building", "Leetcode Solving"] },
            RECORDED: { price: 1500, location: "App Access", features: ["100+ Problems", "Visualizations"] }
        },
        curriculum: [
            { title: "Module 1: Time & Space Complexity", duration: "Week 1", topics: ["Big O Notation", "Analysis of Algorithms", "Recursion Basics", "Master Theorem"] },
            { title: "Module 2: Basic Data Structures", duration: "Week 2", topics: ["Arrays & Strings", "Linked Lists (Singly/Doubly)", "Stacks & Queues", "Two Pointer Technique"] },
            { title: "Module 3: Sorting & Searching", duration: "Week 3", topics: ["Binary Search", "Merge Sort", "Quick Sort", "Heap Sort"] },
            { title: "Module 4: Trees & Graphs", duration: "Week 4", topics: ["Binary Trees", "BST", "BFS & DFS", "Graph Algorithms (Dijkstra)"] },
            { title: "Module 5: Dynamic Programming", duration: "Week 5", topics: ["Memoization vs Tabulation", "Knapsack Problem", "Longest Common Subsequence", "Grid Problems"] },
            { title: "Module 6: Advanced Topics", duration: "Week 6", topics: ["Tries", "Segment Trees", "Bit Manipulation", "Greedy Algorithms"] }
        ]
    },

    // --- 6. DIGITAL MARKETING ---
    {
        id: 6,
        title: "Digital Marketing Pro",
        category: "Marketing",
        description: "Master SEO, Social Media Ads (Meta/Google), and Content Strategy.",
        image: "https://cdn-icons-png.flaticon.com/512/1998/1998087.png",
        instructor: "Priya (Marketing Lead)",
        rating: 4.5,
        students: 60,
        pricing: {
            OFFLINE: { price: 12000, location: "Brodipet", features: ["Live Ad Campaigns", "Client Handling"] },
            ONLINE_LIVE: { price: 6000, location: "Zoom", features: ["Screen Sharing", "Analytics Tools"] },
            RECORDED: { price: 2000, location: "App Access", features: ["Tools Mastery", "Case Studies"] }
        },
        curriculum: [
            { title: "Module 1: Marketing Fundamentals", duration: "Week 1", topics: ["Customer Persona", "Marketing Funnel", "Branding Basics", "Market Research"] },
            { title: "Module 2: SEO Mastery", duration: "Week 2", topics: ["Keyword Research", "On-Page SEO", "Off-Page (Backlinks)", "Technical SEO"] },
            { title: "Module 3: Social Media Marketing", duration: "Week 3", topics: ["Instagram Algorithm", "LinkedIn Growth", "Content Calendar", "Viral Strategies"] },
            { title: "Module 4: Google Ads (PPC)", duration: "Week 4", topics: ["Campaign Setup", "Keyword Bidding", "Quality Score", "Retargeting"] },
            { title: "Module 5: Facebook & Meta Ads", duration: "Week 5", topics: ["Ads Manager", "Audience Targeting", "Pixel Setup", "A/B Testing"] },
            { title: "Module 6: Analytics & Reporting", duration: "Week 6", topics: ["Google Analytics 4", "Data Studio Reports", "ROI Calculation", "Client Reporting"] }
        ]
    }
];