<template>
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="isLoading" class="loading-overlay">
            <div class="loading-content">
                <div class="spinner"></div>
                <p>Cargando...</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true
        };
    },
    methods: {
        hideLoading() {
            this.isLoading = false;
        },
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight; // Trigger reflow
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = 0;
            el.addEventListener('transitionend', done, { once: true });
        }
    },
    created() {
        // Simulate an async operation, replace this with your actual data fetching logic
        setTimeout(() => {
            this.hideLoading();
        }, 3000); // Adjust the timeout to your needs
    }
};
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(255, 102, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loading-content {
    text-align: center;
    color: white;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 10px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* TailwindCSS transition classes */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}
</style>