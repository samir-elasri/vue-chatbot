# 📦 vuechatbot

A beautiful, lightweight Vue 3 chatbot component powered by **Google Gemini 2.0 Flash**. Easily drop it into any Vue 3 + Vite project.

---

## 🚀 Features

- ✨ Clean modern UI using Tailwind CSS 4
- 💬 Renders Markdown using `marked`
- 🔒 Uses your own Google Gemini 2.0 Flash API key
- ⚡ Fast, reactive, and styled with glassmorphism effects
- 🧠 State managed with Pinia

---

## 📦 Installation

```bash
npm install @samir-elasri/vuechatbot
```

### ✍️ Peer Dependencies

Make sure your project also includes:

```bash
npm install vue@^3.3.0 pinia
```

Tailwind CSS is required in your consuming project. Follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation) if you haven’t already.

---

## 🧪 Usage

```vue
<script setup>
import VueChatbot from '@samir-elasri/vuechatbot'
</script>

<template>
  <VueChatbot />
</template>
```

---

## 🔐 Environment Variables

You must provide your **Google Gemini 2.0 Flash API key** via an environment variable:

Create a `.env` file in the root of your Vue app:

```env
VITE_GEMINI_API_KEY=your_google_gemini_flash_api_key_here
```

The chatbot uses this key to query the Gemini 2.0 Flash model.

---

## 🛠️ Development

To contribute or run locally:

```bash
git clone https://github.com/samir-elasri/vuechatbot.git
cd vuechatbot
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 📄 License

MIT © [Samir Elasri](https://github.com/samir-elasri)