<script setup >
import { useData } from 'vitepress'
import { onMounted, ref } from "vue";
import { useActiveAnchor } from "vitepress/dist/client/theme-default/composables/outline";

const { theme, frontmatter } = useData()

const container = ref()
const marker = ref()

/* onMounted(() => {
    useActiveAnchor(container, marker)
}) */

function handleClick({ target: el }) {
    const id = '#' + el.href.split('#')[1]
    const heading = document.querySelector(decodeURIComponent(id))
    heading?.focus()

    marker.value.style.top = el.offsetTop + 33 + 'px';
    marker.value.style.opacity = '1';
}
</script>
    
<template>
    <div class="VPDocAsideOutline has-outline" ref="container"
        v-if="Array.isArray(frontmatter.headers) && frontmatter.headers.length">
        <div class="content">
            <div class="outline-marker" ref="marker" />
            <div class="outline-title">
                {{ theme.outlineTitle || 'On this page' }}
            </div>
            <nav aria-labelledby="doc-outline-aria-label">
                <span class="visually-hidden" id="doc-outline-aria-label">
                    Table of Contents for current page
                </span>
                <ul class="root">
                    <li v-for="{ title, link } in frontmatter.headers">
                        <a class="outline-link" :href="link" @click="handleClick">
                            {{ title }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
    
<style scoped>
.VPDocAsideOutline {
    display: none;
}

.VPDocAsideOutline.has-outline {
    display: block;
}

.content {
    position: relative;
    border-left: 1px solid var(--vp-c-divider-light);
    padding-left: 16px;
    font-size: 13px;
    font-weight: 500;
}

.outline-marker {
    position: absolute;
    top: 32px;
    left: -1px;
    z-index: 0;
    opacity: 0;
    width: 1px;
    height: 18px;
    background-color: var(--vp-c-brand);
    transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s;
}

.outline-title {
    letter-spacing: 0.4px;
    line-height: 28px;
    font-size: 13px;
    font-weight: 600;
}

.outline-link {
    display: block;
    line-height: 28px;
    color: var(--vp-c-text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.5s;
}

.outline-link:hover,
.outline-link.active {
    color: var(--vp-c-text-1);
    transition: color 0.25s;
}

.outline-link.nested {
    padding-left: 13px;
}

.root {
    position: relative;
    z-index: 1;
}
</style>