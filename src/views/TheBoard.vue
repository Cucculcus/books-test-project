<template>
    <div class="flex items-center justify-center pt-[8px] gap-[8px] mb-[24px]">
        <label>Search By</label>
        <Button class="min-w-[92px] min-h-[32px]" :severity="getSeverity('searchByAuthor')" label="Author"
            @click="onSearchByAuthorButton"></Button>
        <Button class="min-w-[92px] min-h-[32px]" :severity="getSeverity('searchBook')" @click="onBookSearchButton"
            label="Book"></Button>
        <InputText v-model="inputValue" class="w-[512px]"></InputText>
        <Button icon="pi pi-search" icon-pos="right" @click="onSearch"></Button>
    </div>

    <div class="flex justify-center items-center ">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ">
            <Card @click="onCard(book.id)"
                class="w-[256px] h-[360px] mb-[10px] w-1/5 border box-border hover:border-[color:var(--p-button-primary-background)] overflow-hidden"
                v-for="book in bookStore.books" :key="book.id">
                <template #header>
                    <img v-if="book.thumbnail" :src="book.thumbnail" alt="Обложка" class="w-full object-fill h-[160px]">
                    <div v-else class="text-center">
                        <div class="text-[108px]">📚</div>
                    </div>
                </template>
                <template #title>
                    <div class="text-center overflow-hidden"> {{ book.title ?? 'Неизвестный автор' }}</div>
                </template>
                <template #subtitle>
                    <div class="text-center">{{ book.authors.toString() }}</div>
                </template>
            </Card>
        </div>
    </div>


</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { InputText, Card, Button } from 'primevue';
import type { searchType } from '@/interfaces';
import { useBookSearch } from '@/useBookSearch';
import { useBookStore } from '@/stores/bookStore';
import { useRouter } from 'vue-router';

const router = useRouter()

const threshold = 300
const isLoading = ref(false)
const bookStore = useBookStore()

const currentSearchType = ref<searchType>('searchBook')
const inputValue = ref<string>('Колобок')


function onCard(bookId: string) {
    router.push({ name: 'BookComponent', params: { id: bookId } })
}

async function onWindowScroll() {
    const scrollTop = window.scrollY
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = window.innerHeight

    if (scrollTop + clientHeight >= scrollHeight - threshold) {
        if (isLoading.value) return
        isLoading.value = true
        try {
            await onSearch()
        } finally {
            isLoading.value = false
        }
    }
}



onMounted(async () => {
    window.addEventListener('scroll', onWindowScroll)

    onUnmounted(() => {
        window.removeEventListener('scroll', onWindowScroll)
    })

    useBookSearch({
        q: `intitle:${inputValue.value}`,
        maxResults: 20
    })

    await nextTick()

})





async function onSearch() {
    if (currentSearchType.value === 'searchBook') {
        try {
            await useBookSearch({
                q: `intitle:${inputValue.value}`,
                maxResults: 20
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    else {
        try {
            await useBookSearch({ q: `inauthor:${inputValue.value}`, maxResults: 20 })
        }
        catch (e) {
            console.log(e)
        }
    }

}

function getSeverity(type: searchType) {
    if (type === currentSearchType.value) {
        return 'active'
    }
    else return 'secondary'
}

function onBookSearchButton() {
    if (currentSearchType.value === 'searchByAuthor') {
        currentSearchType.value = 'searchBook'
    }
}
function onSearchByAuthorButton() {
    if (currentSearchType.value === 'searchBook') {
        currentSearchType.value = 'searchByAuthor'
    }
}

</script>