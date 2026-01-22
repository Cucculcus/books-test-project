<template>
    <div class="flex flex-row gap-[64px] items-center pt-[48px] pl-[96px] ">
        <div class="pt-[48px]">
            <Card
                class="w-[360px] h-[512px] mb-[10px] border border-(--p-button-primary-background) box-border  overflow-hidden">
                <template #header>
                    <img v-if="book?.thumbnail" :src="book?.thumbnail" alt="Обложка" class="w-full object-fill h-full">
                    <div v-else class="text-center">
                        <div class="text-[108px]">📚</div>
                    </div>
                </template>
            </Card>
        </div>
        <div class="flex flex-col items-start pt-[24px]">
            <p class="mb-[32px] text-2xl font-bold text-[color:var(--p-primary-color)]">
                {{ book?.title?.toString() }}
            </p>
            <p class="mb-[24px] text-lg text-[color:var(--p-text-color)]">
                Автор: {{ book?.authors?.toString() || 'Автор не указан' }}
            </p>
            <p class="mb-[24px] text-lg text-[color:var(--p-text-color)]">
                Жанр: {{ book?.categories?.toString() || 'Не указан' }}
            </p>
            <p class="mb-[24px] text-lg text-[color:var(--p-text-color)] leading-relaxed opacity-90">
                Описание: {{ book?.description?.toString() || 'Описание отсутствует' }}
            </p>
            <p class="mb-[24px] text-lg text-[color:var(--p-text-color)] opacity-90">
                Язык: {{ book?.language || 'Неизвестен' }}
            </p>
            <p class="mb-[24px] text-lg text-[color:var(--p-text-color)] opacity-90">
                Страниц: {{ book?.pageCount || '—' }}
            </p>
            <p class="mb-[24px] text-lg text-[color:var(--p-text-color)] opacity-90">
                Дата публикации: {{ book?.publishedDate || 'Не указана' }}
            </p>
            <p class="text-lg text-[color:var(--p-text-color)] opacity-90">
                ISBN: {{ book?.isbn || '—' }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useBookStore } from '@/stores/bookStore';
import { Card } from 'primevue';


const route = useRoute()
const bookStore = useBookStore()

const book = ref(bookStore.find(route.params.id))

</script>