<script setup>
import { logs, modes } from "../assets/sponsors.json";
let type = {}
modes.forEach(i => {
    type[i.type] = i.title
})
</script>
        
<template>
    <h2>赞助方式</h2>
    <div class="sponsor-pay">
        <div class="sponsor-pay-item" v-for="item in modes">
            <div class="pay-img-item">
                <a :href="item.path" target="_blank" rel="noopener noreferrer">
                    <img :src="item.path" :alt="item.type" :title="item.title">
                </a>
            </div>
            <div>{{ item.title }}</div>
        </div>
    </div>
    <div class="sponsor-content">
        <slot></slot>
    </div>
    <h2>赞助列表</h2>
    <table class="sponsor-table">
        <thead>
            <td></td>
            <td>老板</td>
            <td>￥金额</td>
            <td>赞助方式</td>
            <td>日期</td>
        </thead>
        <template v-for="(item, index) in logs">
            <tr>
                <td class="number">{{ index+ 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.money }}</td>
                <td>{{ type[item.type] }}</td>
                <td>{{ item.date }}</td>
            </tr>
        </template>
    </table>
    <slot name="footer"></slot>
</template>
<style lang="less" scoped>
.sponsor-pay {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 20px 0;

    .sponsor-pay-item {
        margin: 0 10px;
        margin: 0 10px;
        font-size: .8em;
        font-weight: bold;


        .pay-img-item {
            position: relative;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0 0 14px 0 #0000000f;
            margin-bottom: 10px;
            transition: all .3s;
            cursor: pointer;

            img {
                width: 160px;
            }

            &:hover {
                z-index: 1;
                box-shadow: 0 0 14px 0 #00000028;
                transform: scale(1.5);
            }
        }
    }
}



.sponsor-table {
    width: 100%;
    display: table;
    text-align: center;
    border: 1px solid var(--vp-c-divider);
    font-size: .9em;

    .number {
        width: 60px;
        text-align: center;
    }

    thead {
        background-color: var(--vp-c-bg-soft);
        font-weight: bold;
    }

    tr {
        border-top: none;
        background-color: var(--vp-c-bg-soft);

        &:nth-child(2n) {
            background-color: transparent;
        }
    }

    td {
        border: none;
        padding: 6px 10px;
    }
}
</style>