<template>
    <div
        class="relative w-full max-w-md p-4 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-lg overflow-hidden">
        <!-- soft gloss overlay -->
        <div
            class="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 via-white/10 to-transparent mix-blend-screen opacity-40"></div>

        <div ref="chatContainer" class="h-64 overflow-y-auto pr-2 space-y-2">
            <div
                v-for="(msg,i) in messages"
                :key="i"
                :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
                <div
                    :class="[
              'relative px-4 py-2 rounded-3xl max-w-xs text-sm font-sans',
              msg.role === 'user'
                ? 'bg-blue-500/40 text-white'
                : 'bg-gray-200/40 text-gray-800'
            ]">
                    {{ msg.content }}
                    <!-- "tail" via pseudo-element -->
                </div>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-4 flex items-center gap-2">
            <input
                v-model="prompt"
                type="text"
                placeholder="run a prompt..."
                class="flex-1 rounded-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/25 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50 transition"/>
            <button
                type="submit"
                :disabled="loading || !prompt.trim()"
                class="rounded-full px-5 py-2 bg-blue-500/40 backdrop-blur-md border border-white/25 text-white font-medium shadow-sm hover:bg-blue-500/60 disabled:opacity-50 transition">
                {{ loading ? '…' : 'Send' }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import {ref, nextTick} from 'vue'
    import {useChatbotStore} from '../stores/chatbot'

    const store = useChatbotStore()
    const prompt = ref('')
    const loading = ref(false)
    const messages = store.messages
    const chatContainer = ref < HTMLElement | null > (null)

    const scrollToBottom = async() => {
        await nextTick()
        chatContainer.value
            ?.scrollTo({top: chatContainer.value.scrollHeight, behavior: 'smooth'})
    }

    const handleSubmit = async() => {
        if (!prompt.value.trim()) 
            return
        store.addMessage({role: 'user', content: prompt.value})
        const userText = prompt.value
        prompt.value = ''
        loading.value = true
        try {
            const response = await store.sendMessage({role: 'user', content: userText})
            store.addMessage(response)
        } catch (e) {
            console.error(e)
        } finally {
            loading.value = false
            scrollToBottom()
        }
    }
</script>