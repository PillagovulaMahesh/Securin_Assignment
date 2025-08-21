# 📖 Securin Recipes Explorer

A full-stack web application that lets users explore **Southern US recipes** with filtering and detailed views.  

- **Frontend**: Next.js + Tailwind CSS  
- **Backend**: Node.js + Express  
- **Database**: JSON file (`US_recipes.json`)  
- **Deployment**: Vercel (Frontend), Vercel/Render (Backend)  

---

## 🚀 Features
- Browse recipes with filters (Cuisine, Rating, Total Time, etc).  
- View detailed recipe information in a **drawer-style modal**.  
- Responsive and modern UI built with **Tailwind + Framer Motion**.  
- Backend serves recipes from `US_recipes.json`.  
- Ready for deployment on **Vercel**.  

## ⚡ Installation & Setup

### 1. Clone the repo
\`\`\`bash
git clone https://github.com/your-username/securin-recipes.git
cd securin-recipes
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
npm start
\`\`\`

- Runs on **http://localhost:5000**  

### 3. Frontend Setup
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

- Open **http://localhost:3000**  

---

## 🌐 Deployment

- **Frontend**: Deploy `frontend/` folder to **Vercel**.  
- **Backend**: Deploy `backend/` to **Render / Vercel Serverless Functions / Railway**.  
- Update API base URL in `frontend/components/RecipeTable.jsx`.  

---

## 🛠 Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, Lucide Icons  
- **Backend**: Node.js, Express  
- **Database**: JSON file (`US_recipes.json`)  
