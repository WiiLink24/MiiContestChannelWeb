<script setup lang="ts">
const closeReportModal = () => {
    document.getElementById('report-modal').classList.add('sm:hidden');
    document.getElementById('report-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}
</script>

<template>
    <div id="report-modal"
        class="w-full h-full top-0 left-0 pt-10 pl-3 pr-3  bg-gray-300/45 dark:bg-slate-700/45 backdrop-blur-md sm:flex block items-center justify-center sm:hidden hidden z-[1000000] overflow-scroll fixed">
        <div>
            <div class="flex items-center justify-between">
                <img src="/img/safetyMonitoring-logo.png" class="mb-3 dark:invert" style="height:60px;">
                <div @click="closeReportModal()"
                    class="text-black dark:text-white text-3xl hover:scale-110 hover:text-red-400 hover:cursor-pointer transition-all">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <hr class="mt-6 mb-3 border-black dark:border-white">
            <div class="mb-5 flex sm:flex-row flex-col gap-3 items-center">
                <img id="report-modal-mii-face" class="w-28 h-30 rounded-lg" alt="Mii Image">
                <div class="flex flex-col">
                    <h2 class="text-4xl flex sm:flex-row flex-col sm:items-start gap-10">
                        <div class="flex flex-col">
                            <p class="text-black dark:text-white m-0 text-md opacity-30">Would you like to report the
                                Mii</p> <span id="report-modal-mii-name" class="text-black dark:text-white"></span>
                                <p class="text-black dark:text-white flex items-center gap-3"><span id="report-modal-mii-creator"
                            class="text-black dark:text-white"></span> | <span id="report-modal-mii-flag"
                            class="text-black dark:text-white"></span> | <span id="report-modal-mii-gender"
                            class="text-black dark:text-white"></span></p>
                        </div>
                        <div class="flex flex-col">
                            <p class="text-black dark:text-white m-0 text-md opacity-30">with the ID</p> <span
                                id="report-modal-mii-id" class="text-black dark:text-white"></span>
                        </div>
                    </h2>
                </div>
            </div>

            <form action="localhost:3000/report">
                <input type="hidden" id="report-mii-id" name="report-mii-id">
                <input id="report-reason" name="report-reason" placeholder="Reason for reporting (optional)"
                    class="w-full h-20 mt-3 pl-10 bg-gray-500/80 dark:bg-slate-500/80 border-2 border-white/5 text-white rounded-t-2xl rounded-b-md"></input>
                <button type="submit"
                    class="w-full mt-2 pt-3 pb-3 rounded-t-md rounded-b-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all">Report</button>
            </form>
            <p class="text-black dark:text-white opacity-30"><i class="fa-solid fa-triangle-exclamation mt-10"></i> This
                action is irreversible and will be reviewed by our moderation team.<br>Misuse of
                the tool may result in temporary or permanent ban from all WiiLink services.</p>
        </div>
    </div>
</template>