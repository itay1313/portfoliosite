<template>
  <button @click="onClick"><slot></slot></button>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#ffffff',
    },
  },

  methods: {
    onClick(e) {
      e.preventDefault()

      if (this.url === '/' && this.$route.name === 'index') return
      if (this.url === '/about' && this.$route.name === 'about') return
      if (this.url === '/archive' && this.$route.name === 'archive') return

        this.$preDefaultEvent(true);
        this.$asscroll.disable()
        this.$store.commit('bg-transition/start', this.color)
        this.$store.commit('mouse/loading')

        setTimeout(() => {
          this.$router.push(`${this.url}`)
        }, this.$SITECONFIG.pageTransitionDuration)
    },
  },
}
</script>
