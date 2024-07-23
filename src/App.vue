<template>
    <div class="badass-todo">
        <div class="title has-text-centered">TODO APP ERA</div>

        <form @submit.prevent="addTodo" class="m-4">
            <div class="field has-addons has-addons-centered">
                <div class="control">
                    <input
                        v-model="newTodoContent"
                        class="input"
                        type="text"
                        placeholder="Add a note"
                    />
                </div>
                <div class="control">
                    <button :disabled="!newTodoContent" class="button is-info">
                        Add
                    </button>
                </div>
            </div>
        </form>

        <!-- <div v-for=""></div> -->

        <div
            v-for="todo in todos"
            :key="todo.id"
            class="card"
            :class="{ 'has-background-success-dark': todo.done }"
        >
            <div class="card-content">
                <div class="content">
                    <div class="columns is-mobile is-vcentered">
                        <div
                            class="column"
                            :class="{ 'has-text-success': todo.done }"
                        >
                            {{ todo.content }}
                        </div>
                        <div class="column is-5 has-text-right">
                            <button
                                @click="toggleDone(todo.id)"
                                class="button"
                                :class="todo.done ? 'is-success' : 'is-dark'"
                            >
                                &check;
                            </button>
                            <button
                                @click="deleteTodo(todo.id)"
                                class="button is-danger ml-2"
                            >
                                &cross;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// IMPORTS
import { ref, onMounted } from "vue";

import { db } from "@/firebase";
import {
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    query,
    orderBy,
} from "firebase/firestore";

const todosCollectionRef = collection(db, "todos");
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

const todos = ref([]);

onMounted(() => {
    onSnapshot(todosCollectionQuery, (querySnapshot) => {
        const fbTodos = [];
        querySnapshot.forEach((doc) => {
            const todo = {
                id: doc.id,
                content: doc.data().content,
                done: doc.data().done,
            };

            fbTodos.push(todo);
        });
        todos.value = fbTodos;
    });
});

const newTodoContent = ref("");

const addTodo = () => {
    addDoc(todosCollectionRef, {
        content: newTodoContent.value,
        done: false,
        date: Date.now(),
    });
    newTodoContent.value = "";
};

const deleteTodo = (id) => {
    deleteDoc(doc(todosCollectionRef, id));
};

const toggleDone = (id) => {
    const index = todos.value.findIndex((todo) => todo.id === id);
    updateDoc(doc(todosCollectionRef, id), {
        done: !todos.value[index].done,
    });
};
</script>

<style>
@import "bulma/css/bulma.min.css";

.badass-todo {
    max-width: 400px;
    padding: 20px;
    margin: 0 auto;
}
</style>
