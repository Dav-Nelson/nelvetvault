# Nel VetVault

A community-driven EdTech platform designed for the Faculty of Veterinary Medicine, University of Jos. Nel VetVault serves as a centralized hub for veterinary students to access past questions, clinical notes, and study materials.

## 🚀 Built For the Community, By the Community
The core philosophy of Nel VetVault is that **students are contributors, not just consumers.** Every resource uploaded makes the platform more valuable for the next student.

## 🛠 Tech Stack
- **Frontend:** React (Vite), React Router, Tailwind CSS
- **Backend:** Supabase (Postgres, Storage, Auth)
- **Deployment:** Netlify

## 🤝 How to Contribute
We welcome contributions from fellow students to make this platform better! Whether it's adding features, improving UI/UX, or fixing bugs, your help is appreciated.

1. **Fork the repo.**
2. **Create a feature branch:** `git checkout -b feature/amazing-improvement`
3. **Commit your changes:** `git commit -m 'feat: add some amazing improvement'`
4. **Push to the branch:** `git push origin feature/amazing-improvement`
5. **Open a Pull Request.**

### Local Development
1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up your `.env` file (see below).
4. Start the development server: `npm run dev`

### Environment Variables
You will need to set up a Supabase project and provide the following in a `.env` file:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## ⚖️ License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
