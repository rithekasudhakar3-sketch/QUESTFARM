# QUESTFARM

## Overview
QUESTFARM is a React application designed for managing quests and tasks, featuring a chatbot for assistance and a user-friendly interface for navigation. The application supports internationalization, allowing users to interact in multiple languages, including English, Hindi, and Tamil.

## Features
- **Internationalization**: The app is built with `react-i18next`, enabling language switching between English, Hindi, and Tamil.
- **Routing**: Utilizes `react-router-dom` for seamless navigation between different pages.
- **Components**: Modular components for navigation and various pages, ensuring a clean and maintainable codebase.
- **React Query**: Implements `@tanstack/react-query` for efficient data fetching and state management.

## Project Structure
```
QUESTFARM
├── src
│   ├── i18n.ts               # Configuration for internationalization
│   ├── index.tsx             # Entry point of the application
│   ├── App.tsx               # Main application component with routing
│   ├── locales               # Directory containing translation files
│   │   ├── en.json           # English translations
│   │   ├── hi.json           # Hindi translations
│   │   └── ta.json           # Tamil translations
│   ├── components            # Directory for reusable components
│   │   └── Navigation.tsx    # Navigation component
│   └── pages                 # Directory for page components
│       ├── Home.tsx          # Homepage component
│       ├── ChatBot.tsx       # Chatbot page component
│       ├── Quests.tsx        # Quests page component
│       ├── Tasks.tsx         # Tasks page component
│       ├── Profile.tsx       # User profile page component
│       ├── Contact.tsx       # Contact page component
│       └── NotFound.tsx      # 404 Not Found page component
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd QUESTFARM
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To start the development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.