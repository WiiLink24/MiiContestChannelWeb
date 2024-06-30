<template>
<button
  class="inline-flex items-center gap-3 px-3 py-3 hover:no-underline hover:bg-gray-300 hover:dark:bg-slate-600 transition-all rounded-lg"
  @click="$router.go(-1)"
  aria-label="Go back to the previous page"
>
  <i class="fa-solid fa-chevron-left"></i>
  Go back
</button>
</template>