// Error component
export const ErrorMessage = () => {
    return html`
        <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
            <p class="font-bold">Error</p>
            <p>Failed to load games. Please try again later.</p>
        </div>
    `;
}; 
