<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <section class="wrap">
    <article class="login_box">
      <div class="logo_area">
        <img class="logo" src="@/assets/img/logo.svg" alt="logo" />
      </div>
      <div class="login_content">
        <div class="label">이메일</div>
        <input
          v-model="data.email"
          type="email"
          class="input"
          placeholder="이메일을 입력해주세요."
          @keydown="isEnterKey"
        />
      </div>
      <div class="login_content">
        <div class="label">비밀번호</div>
        <input
          v-model="data.password"
          type="password"
          :class="['input']"
          placeholder="비밀번호를 입력해주세요."
          @keydown="isEnterKey"
        />
        <!-- <p v-if="isShowErrMsg" class="errormsg-wrap">{{ errorMag }}</p> -->
      </div>
      <div class="login_content btn_area">
        <tb-button @click="loginHandler" class="width_100" :disabled="isLoginBtnDisabled()">
          로그인
        </tb-button>
      </div>
      <div class="bottom_area">
        로그인에 문제가 생겼나요?
        <a class="contact_btn">
          문의하기>
        </a>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login'

export default defineComponent({
  name: 'LoginView',
  setup () {
    const router = useRouter()
    const data = reactive({
      email: '',
      password: ''
    })
    function isLoginBtnDisabled () {
      return (data.email === '' || data.password === '')
    }
    function loginHandler () {
      login(data).then((res: any) => {
        router.push('/')
      }).catch()
    }
    return {
      data,
      loginHandler,
      isLoginBtnDisabled
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/style";
.width_100 {
  width: 100%;
}
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: $gray_200;
  .login_box {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 392px;
    background: $white;
    padding: 36px;
    border: 1px solid $gray_e0;
    box-shadow: 4px 4px 24px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include mobile {
      width: 90%;
    }
    .logo_area {
      width: 100%;
      text-align: center;
      padding-bottom: 24px;
    }

    .login_content {
      width: 320px;
      padding-bottom: 16px;
      &.btn_area {
        padding-top: 8px;
      }
      .label {
        padding-left: 4px;
        font-size: $subtitle;
        font-weight: bold;
        color: $gray_800;
        padding-bottom: 8px;
      }
      .input {
        width: 100%;
        height: 40px;
        border: 1px solid $gray_e0;
        border-radius: 8px;
        padding: 0 12px;
        font-size: $subtitle;
        &:focus {
          border: 1.5px solid $light_blue;
        }
        &:invalid {
          border: 1px solid $danger;
        }
        &:disabled {
          border: 1px solid $gray_600;
          background: $gray_400;
          color: $gray_600;
          opacity: 1;
          -webkit-text-fill-color: inherit;
          cursor: not-allowed;
        }
        &::placeholder {
          color: $gray_600;
        }
        &[type=text], &[type=number] {
          appearance: none;
        }
        &.input_error {
          border: 2px solid $danger;
        }
      }
      .errormsg-wrap {
        margin-top: 8px;
        padding-left: 4px;
        color: $danger;
      }
      .login-btn {
        width: 100%;
      }
    }
    .bottom_area {
      display: flex;
      width: 100%;
      justify-content: space-between;
      font-size: $subtitle;
      color: $gray_600;
      .contact_btn {
        font-size: $subtitle;
        font-weight: bold;
        color: $light_blue;
        cursor: pointer;
      }
    }
  }
}
</style>
