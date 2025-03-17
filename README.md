# 🏥 HealthHack Frontend

A modern, feature-rich healthcare management system built with cutting-edge web technologies. This frontend application provides an intuitive interface for healthcare professionals and patients, offering seamless interaction with healthcare services.

## ✨ Features

- 📊 Interactive Dashboard
- 👥 User Management
- 📋 Patient Records Management
- 📅 Appointment Scheduling
- 📈 Data Visualization with Recharts
- 🔄 Real-time Updates
- 📱 Responsive Design
- 🎨 Modern UI with Ant Design & HeroUI
- 🌐 Flow Diagram Support with ReactFlow

## 🛠 Tech Stack

### Core

- [React 18](https://react.dev/) - Latest version of the popular UI library
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [TypeScript](https://www.typescriptlang.org/) - For type-safe code
- [React Router](https://reactrouter.com/) - For application routing

### UI Components & Styling

- [Ant Design](https://ant.design/) - Enterprise-grade UI components
- [HeroUI](https://heroui.com) - Modern UI component library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion) - For smooth animations
- [Embla Carousel](https://www.embla-carousel.com/) - For carousel components

### Data Visualization & Interaction

- [Recharts](https://recharts.org/) - For data visualization
- [ReactFlow](https://reactflow.dev/) - For interactive node-based interfaces
- [html2canvas](https://html2canvas.hertzen.com/) & [jsPDF](https://rawgit.com/MrRio/jsPDF/master/docs/index.html) - For report generation

### State Management & API

- [Axios](https://axios-http.com/) - For HTTP requests
- [Yup](https://github.com/jquense/yup) - For form validation

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd HealthHack-FE
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

   Note: If using pnpm, add this to your `.npmrc`:

   ```
   public-hoist-pattern[]=*@heroui/*
   ```

## 🚀 Development

1. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

2. **Lint your code**

   ```bash
   npm run lint
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
HealthHack-FE/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable components
│   ├── config/        # Configuration files
│   ├── context/       # React context providers
│   ├── layouts/       # Layout components
│   ├── lib/          # Library configurations
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── styles/       # Global styles
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
├── public/           # Public static files
└── config files      # Various configuration files
```

## 🔧 Configuration

The project includes several configuration files:

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `.eslintrc.json` - ESLint rules
- `postcss.config.js` - PostCSS configuration
- `components.json` - Component configurations

## 🚀 Deployment

The project is configured for deployment on Vercel. The `vercel.json` file contains the necessary deployment configurations.

## 🧪 Testing

The project uses TypeScript for type checking. Run type checking with:

```bash
npm run typecheck
```

## 📝 Code Style

We use ESLint and Prettier for code formatting and maintaining code quality. Our setup includes:

- TypeScript ESLint rules
- React-specific ESLint rules
- Import sorting
- Unused import detection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/) community
- [Vite](https://vitejs.dev/) team
- [Ant Design](https://ant.design/) team
- [HeroUI](https://heroui.com) team
- All other open-source contributors

---

Made with ❤️ by the HealthHack Team
