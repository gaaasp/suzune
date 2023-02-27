<script lang="ts">
    import type { Homeworks } from "$lib/types";
    import { capitalize, formatDate, formatSize, list } from "$lib/utils";
    import { DocumentsList } from "../documents";
    import { Button, Emoji, List, Text } from "../ui";

    export let homeworks: Homeworks;
</script>

<List elevated values={homeworks} empty="No homework" let:child={homework}>
    <div class="flex">
        <Emoji>{homework.homework.subject.emoji}</Emoji>
        <div class="py-1 space-y-2 flex-1 mr-2">
            <div class="flex items-center justify-between">
                <div>
                    <Text large>{homework.homework.subject.name}</Text>
                    <Text tertiary>{list([homework.homework.teacher, homework.homework.added ? `Given ${formatDate(homework.homework.added)}` : "", homework.homework.options.exam ? "Exam" : ""])}</Text>
                </div>
                {#if homework.homework.status !== "DISABLED"}
                    <input type="checkbox" value={homework.homework.status === "DONE"} />
                {/if}
            </div>
            {#if homework.homework.options.uploadable}
                <Button as="label" class="w-full">
                    Upload
                    <input class="hidden" type="file" multiple />
                </Button>
            {/if}
            {#if homework.homework.content}
                <div>
                    {@html homework.homework.content}
                </div>
            {/if}
            {#if homework.homework.session}
                <details>
                    <summary class="text-lg">
                        Lesson content
                    </summary>
                    <div>{@html homework.homework.session}</div>
                </details>
            {/if}
            {#if homework.homework.documents.length}
                <Text large>
                    Documents
                </Text>
                <DocumentsList all={Object.fromEntries(homework.homework.documents.map(doc => [doc.id, doc]))} integration={homework.integration.id} document={{ id: "messages", name: "", kind: "folder", parents: [], children: homework.homework.documents.map(({ id }) => id) }} />
            {/if}
            {#if homework.homework.returned.length}
                <Text large>
                    Returned documents
                </Text>
                <List empty="No returned document" values={homework.homework.returned} let:child={document}>
                    <div class="flex">
                        <Emoji>📄</Emoji>
                        <div class="py-1 flex-1">
                            <Text large>{document.name}</Text>
                            <Text tertiary>{list([document.date ? capitalize(formatDate(document.date)) : "", formatSize(document.size)])}</Text>
                        </div>
                    </div>
                </List>
            {/if}
            {#if homework.homework.comments.length}
                <details>
                    <summary class="text-lg">Comments</summary>
                    <List empty="No comment" values={homework.homework.comments} let:child={comment}>
                        <div class="flex">
                            <Emoji>🗨️</Emoji>
                            <div class="py-1 flex-1 mr-2">
                                <Text large>{comment.author}</Text>
                                {#if comment.date}
                                    <Text tertiary>{capitalize(formatDate(comment.date))}</Text>
                                {/if}
                                <div>
                                    {@html comment.content}
                                </div>
                            </div>
                        </div>
                    </List>
                </details>
            {/if}
        </div>
    </div>
</List>
