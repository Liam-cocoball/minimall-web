<template>
    <div class="tz">
        <div class="item item1">
            <img src="../assets/tz.png" alt="通知" />
        </div>
        <div class="item item2">
            <span class="message">
                1.专业提供高质量各种ID,安全保障、找回包赔、不能用包换,24小时付款自动发货。
                2.一手货源,承接大客户批量购买,联系右下角在线客服。
                3.本站所有商品均为空白身份注册,不包含公民隐私信息!
            </span>
        </div>
    </div>


</template>

<script setup lang="ts">


</script>

<style scoped>
.tz {
    display: flex;
    align-content: flex-end;
    border: 1px solid white;
    border-radius: 3px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
}

.tz div {
    width: 46px;

}

img {
    height: 15px;
}

.message {
    padding-left: 16px;
    position: absolute;
    /* 1388 */
    left: 0px; 
}

.item2 {
    position: relative;
    flex-grow: 1;
    white-space: nowrap;
    /* 保证文本不会换行 */
    overflow: hidden;
    /* 超出容器部分隐藏 */
    text-overflow: ellipsis;
    /* 超出部分显示为省略号 */
}
</style>