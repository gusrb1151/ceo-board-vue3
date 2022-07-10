<template>
  <button
    class="tb-button"
    :class="[customClass, type, look, size, { disabled }, { icon }, { noSlot: noSlot() }]"
    :style="{ color: getColor }"
    @click="onclick"
  >
    <img v-if="icon" :src="iconPath" alt="button-icon">
    <slot></slot>
  </button>
</template>
<script>
import styleVars from '@/assets/style.scss'

export default {
  name: 'meal-button',
  props: {
    customClass: String,
    type: {
      default: 'primary', // text, success, danger, infor, warning
      type: String
    },
    icon: {
      default: '', // file name from under @/assets/
      type: String
    },
    look: {
      default: '', // outlined, light, strip, strip-light, rounded
      type: String
    },
    color: {
      default: '',
      type: String
    },
    size: {
      default: 'normal', // x-small, small, normal, medium, large x-large
      type: String
    },
    state: {
      default: '', // loading, hover, focus, ..
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    static: {
      default: false,
      type: Boolean
    },
    throttled: {
      default: false,
      type: Boolean
    },
    throttleTime: {
      default: 1000,
      type: Number
    }
  },
  setup (props) {
    console.log(1111, props.icon)
    function iconPath () {
      return props.icon.length > 0 ? `@/assets/img/${props.icon}` : ''
    }
    function getColor () {
      try {
        if (props.type !== 'text') return ''
        return styleVars[props.color]
      } catch (error) {
        return ''
      }
    }
    return {
      iconPath,
      getColor
    }
  },
  methods: {
    noSlot () {
      return Object.keys(this.$slots).length <= 0
    },
    onclick ($event) {
      if (this.disabled || this.timeout !== null) {
        $event.stopPropagation()
        return false
      }
      if (!this.throttled) { this.$emit('click', $event); return false }
      if (this.isFirst) {
        this.$emit('click', $event)
        this.isFirst = false
        this.timeout = setTimeout(() => {
          clearTimeout(this.timeout)
          this.timeout = null
          this.isFirst = true
        }, this.throttleTime)
      }
      return false
    },
    virgin () {
      this.isFirst = true
      this.timeout = null
    }
  },
  created () {
    this.virgin()
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/style";
.tb-button {
  min-width: 61px;
  font-size: 14px;
  font-weight: bold;
  padding: 0 16px;
  border-radius: 8px;
  cursor: pointer;

  // shared
  &.primary, &.success, &.danger {
    &.disabled {
      background: $gray_400;
      border: 1px solid $gray_400;
      cursor: not-allowed;
    }
    &.icon {
      min-width: 46px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      > img {
        margin-right: 8px;
      }
      &.noSlot {
        padding: 0;
        > img {
          margin-right: 0;
        }
      }
    }
    &.outlined {
      &.disabled {
        color: $gray_500;
        border: 1px solid $gray_400;
        cursor: not-allowed;
      }
    }
  }

  // types
  &.primary {
    color: $white;
    background: $indigo;
    border: 1px solid $indigo;
    // look
    &.outlined {
      background: $white;
      color: $indigo;
      border: 1px solid $indigo;
    }
  }
  &.text {
    border: none;
    background: $white;
    &.disabled {
      color: $gray_500;
      cursor: not-allowed;
    }
    &:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    &.light {
      font-weight: 300;
    }
    &.strip {
      background: transparent;
    }
    &.strip-light {
      background: transparent;
      font-weight: 300;
    }
  }
  &.success {
    color: $white;
    background: $green;
    border: 1px solid $green;
    &.outlined {
      color: $green;
      background: $white;
      border: 1px solid $green;
    }
  }
  &.danger {
    color: $white;
    background: $danger;
    border: 1px solid $danger;
    &.outlined {
      color: $danger;
      background: $white;
      border: 1px solid $danger;
    }
  }

  // sizes
  &.normal {
    height: 46px;
  }
  &.small {
    height: 40px;
  }
  &.x-small {
    height: 32px;
  }
}
</style>
