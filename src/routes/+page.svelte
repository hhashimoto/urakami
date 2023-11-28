<script lang="ts">
	import { db } from '$lib/db.js';
	import { liveQuery } from 'dexie';

    let content = "";
    let saving = false;

    $: papers = liveQuery(
        () => db.papers.where('archived').equals(0).reverse().toArray()
    );

    async function save() {
        if (saving) return;

        try {
            saving = true;
            const id = await db.papers.add({
                body: content,
                archived: 0
            });
            content = "";
            console.log(`save paper ok!: id = ${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            saving = false;
        }
    }

    async function handleKeyUp(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === 'Enter') {
            save();
        }
    }
</script>

<h1>Papers</h1>

<div class="editor">
    <textarea name="content" bind:value={content} on:keyup={handleKeyUp} />
    {#if saving}
        <p>saving...</p>
    {:else}
        <p>Save: Ctrl + Enter</p>
    {/if}
</div>

{#if $papers}
    {#each $papers as paper (paper.id)}
        <div class="paper">{paper.body}</div>
    {/each}
{/if}

<style>
    div.editor {
        margin: 1em;
        width: 600px;
        height: 400px;
    }

    textarea {
        width: 100%;
        height: 80%;
    }

    div.paper {
        margin: 1em;
        width: 600px;
        border-style: dashed;
    }
</style>