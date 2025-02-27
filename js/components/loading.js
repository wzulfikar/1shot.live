// Loading component
export const Loading = () => {
    return html`
        <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
            <p class="mt-4 text-gray-600">Loading games...</p>
        </div>
    `;
}; 
