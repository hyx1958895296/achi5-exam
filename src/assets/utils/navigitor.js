export default {
    navigator(name) {
        if (this.$router.currentRoute.name == name) return;
        this.$router.push({
            name: name,
        });
    },
    install(Vue) {
        Vue.prototype.$navigator = this.navigator;
    }
}