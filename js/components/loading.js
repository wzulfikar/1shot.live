// Loading component
export const Loading = () => {
    return html`
        <div class="flex flex-col items-center justify-center py-12 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div class="animate-spin rounded-none h-10 w-10 border-4 border-black border-t-transparent mb-4"></div>
            <p class="text-black font-bold">Loading games...</p>
        </div>
    `;
}; 
