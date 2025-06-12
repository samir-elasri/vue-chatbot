import { defineStore } from 'pinia'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

export const useChatbotStore = defineStore('chatbot', {
  state: () => ({
    messages: [] as { role: string; content: string }[],
  }),
  actions: {
    addMessage(message: { role: string; content: string }) {
      this.messages.push(message)
    },

    async sendMessage(userMessage: { role: string; content: string }) {
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: userMessage.content }],
          },
        ],
      }

      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      const botContent =
        data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I didn’t understand that.'
      return { role: 'bot', content: botContent }
    },
  },
})
