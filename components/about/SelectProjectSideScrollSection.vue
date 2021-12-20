<template>
  <div ref="Project" class="project">
    <div ref="ProjectWrapper" class="project-wrapper">
      <AppCircleBg
        ref="IntroCircleBg"
        :state="isCircleBgState"
        :modifier="'about-project'"
      />
      <div class="project-inner">
        <div class="l-container">
          <div ref="ProjectTitleWrapper" class="project-title-wrapper">
            <AppTextUnderline
              :state="isTextUnderlineState"
              :origin="'right'"
              :modifier="'about-project-01'"
            />
            <AppTextUnderline
              :state="isTextUnderlineState"
              :start="0.12"
              :origin="'left'"
              :modifier="'about-project-02'"
            />
            <div ref="ProjectList" class="project-list">
              <div
                ref="ProjectItemWrapperRotate"
                class="project-item-wrapper-rotate"
              >
                <div
                  ref="ProjectItemWrapperTranslate"
                  class="project-item-wrapper-translate"
                >
                  <div
                    v-for="data in projectData"
                    :key="data.id"
                    class="project-item"
                  >
                    <a href="./">{{ data.fullTitle }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { vw, vwSp } from '../../lib/vw'
import projectData from '@/assets/json/project.json'

export default {
  data: () => {
    return {
      projectData: projectData,
      isCircleBgState: '',
      isTextUnderlineState: '',
    }
  },
  mounted() {
    this.wrapper = this.$refs.ProjectItemWrapperRotate
    this.text = this.$refs.ProjectItemWrapperTranslate
    this.$gsap.set(this.wrapper, {
      rotate: 3,
      transformOrigin: 'left',
    })
    this.$gsap.set(this.text, {
      yPercent: 103.8,
    })

    this.$nextTick(() => {
      setTimeout(() => {
        this.scrollFix()

        this.$gsap.to(
          {},
          {
            scrollTrigger: {
              once: true,
              // start: 'start end',
              trigger: this.$refs.ProjectWrapper,
              onEnter: () => {
                this.$gsap.to(this.wrapper, {
                  duration: this.$siteConfig.duration * 2.0,
                  ease: this.$easing.transform,
                  rotate: 0,
                })
                this.$gsap.to(this.text, {
                  duration: this.$siteConfig.duration,
                  ease: this.$easing.transform,
                  yPercent: 0,
                })
                this.isCircleBgState = 'extend'
                this.isTextUnderlineState = 'extend'
              },
            },
          }
        )
      }, 100)
    })
  },
  methods: {
    scrollFix() {
      this.$gsap.fromTo(
        this.$refs.ProjectList,
        {
          x: 0,
        },
        {
          x: () =>
            -(
              this.$refs.ProjectList.clientWidth -
              this.$refs.ProjectWrapper.clientWidth +
              80 +
              120 +
              20
            ),
          ease: 'none',
          scrollTrigger: {
            start: 'center center',
            end: () => `+=${3500 - window.innerHeight}px`,
            trigger: this.$refs.ProjectWrapper,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      )
      /**
       * セクション固定
       */
      this.fixSec = this.$gsap.to(this.$refs.ProjectWrapper, {
        ease: 'none',
        scrollTrigger: {
          pin: true,
          pinType: this.$siteConfig.isTouch ? 'fixed' : 'transform',
          trigger: this.$refs.ProjectWrapper,
          start: 'end',
          end: () => `+=${5000 - window.innerHeight}px`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  height: 3500px;
}

// .project-bg{
// }

.project-wrapper {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--viewportHeight) !important;
  background-color: $darkBlack;
  // z-index: -1;
}

.project-inner {
  width: 100%;
  padding: 0 40px;
}

.project-title-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: vw(200);
  margin: 0 40px 0 0;
}

.project-list {
  position: absolute;
  top: auto;
  left: auto;
  overflow: hidden;
}

.project-item-wrapper-translate {
  display: flex;
}

.project-item {
  position: relative;
  flex-shrink: 0;
  color: $black;
  font-size: vw(140);
  font-family: $sixcaps;
  white-space: nowrap;

  &:not(:last-of-type) {
    margin: 0 vw(100) 0 0;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: vw(-60);
      transform: translate3d(0, -50%, 0);
      width: vw(20);
      height: vw(20);
      border-radius: 50%;
      background-color: $black;
    }
  }
}
</style>