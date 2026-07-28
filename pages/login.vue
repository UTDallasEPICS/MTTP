<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-bold text-center mb-2" style="color: #122C4F">March to the Polls</h1>
      <p class="text-center text-gray-500 mb-6">Sign in to your account</p>

      <div v-if="!otpSent">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="you@example.com"
          class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none mb-4"
          @keyup.enter="sendOtp"
        />
        <button
          @click="sendOtp"
          :disabled="loading || !email"
          class="w-full bg-blue-800 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {{ loading ? 'Sending...' : 'Send Code' }}
        </button>
      </div>

      <div v-else>
        <p class="text-sm text-gray-600 mb-4">
          A verification code was sent to <strong>{{ email }}</strong>
        </p>
        <label for="otp" class="block text-sm font-medium text-gray-700 mb-1">Verification code</label>
        <input
          v-model="otp"
          type="text"
          id="otp"
          placeholder="Enter 6-digit code"
          class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-800 focus:outline-none mb-4 tracking-widest text-center text-lg"
          @keyup.enter="verifyOtp"
          maxlength="6"
        />
        <button
          @click="verifyOtp"
          :disabled="loading || !otp"
          class="w-full bg-blue-800 text-white p-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {{ loading ? 'Verifying...' : 'Sign In' }}
        </button>
        <button
          @click="otpSent = false; otp = ''; error = ''"
          class="mt-3 w-full text-sm text-blue-800 hover:underline"
        >
          Use a different email
        </button>
      </div>

      <p v-if="error" class="text-red-600 text-sm mt-4 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { authClient } from "~~/lib/auth-client";

definePageMeta({ layout: false });

const email = ref("");
const otp = ref("");
const otpSent = ref(false);
const loading = ref(false);
const error = ref("");

async function sendOtp() {
  loading.value = true;
  error.value = "";
  const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
    email: email.value,
    type: "sign-in",
  });
  loading.value = false;
  if (sendError) {
    error.value = sendError.message ?? "Failed to send code. Are you a registered user?";
    return;
  }
  otpSent.value = true;
}

async function verifyOtp() {
  loading.value = true;
  error.value = "";
  const { error: verifyError } = await authClient.signIn.emailOtp({
    email: email.value,
    otp: otp.value,
  });
  loading.value = false;
  if (verifyError) {
    error.value = verifyError.message ?? "Invalid or expired code";
    return;
  }
  navigateTo("/");
}
</script>
