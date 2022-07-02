<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let fileSelected = false;

  const dispatch = createEventDispatcher();

  function onFileSelected(e: Event) {
    let files = (e.target as HTMLInputElement).files;
    e.preventDefault();
    if (files.length > 0) {
      dispatch("file-selected", files[0]);
      fileSelected = true;
    }
  }

  function onFileDropped(e: DragEvent) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    if (files.length > 0) {
      dispatch("file-selected", files[0]);
      fileSelected = true;
    }
  }

</script>

<header class="bg-white">
  <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
    <div class="max-w-xl">
      <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Time Tracking
        Aggregator</h2>
      <p class="mt-5 text-xl text-gray-500">Upload a timing export as json for the last month.</p>
    </div>
    <div class="mt-10 w-full max-w-xs">
      <div class="mt-1 sm:mt-0 sm:col-span-2" class:hidden={fileSelected}>
        <div on:drop={(e) => onFileDropped(e)} on:dragover={(e) => e.preventDefault()} class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div class="space-y-1 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                 aria-hidden="true">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex text-sm text-gray-600">
              <label for="file-upload"
                     class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Upload a timing export</span>
                <input on:change={(e) => onFileSelected(e)} id="file-upload" name="file-upload" type="file" class="sr-only">
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs text-gray-500">JSON</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>