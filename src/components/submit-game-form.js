export const SubmitGameForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    url: '',
    xProfile: '',
    gameName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ url: '', xProfile: '', gameName: '' });
    // Close the popup
    onClose();
  };

  if (!isOpen) return null;

  return html`
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md rounded relative">
        <button 
          onClick=${onClose}
          class="absolute top-2 right-2 text-black hover:text-gray-700"
          aria-label="Close"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
        
        <h2 class="text-2xl font-bold mb-4 text-black">Submit Your Game</h2>
        
        <form onSubmit=${handleSubmit}>
          <div class="mb-4">
            <label class="block text-black font-bold mb-2" for="gameName">
              Game Name
            </label>
            <input
              type="text"
              id="gameName"
              name="gameName"
              value=${formData.gameName}
              onChange=${handleChange}
              class="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-black font-bold mb-2" for="url">
              Game URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value=${formData.url}
              onChange=${handleChange}
              class="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="https://"
              required
            />
          </div>
          
          <div class="mb-6">
            <label class="block text-black font-bold mb-2" for="xProfile">
              X.com Profile
            </label>
            <input
              type="text"
              id="xProfile"
              name="xProfile"
              value=${formData.xProfile}
              onChange=${handleChange}
              class="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="@username"
              required
            />
          </div>
          
          <div class="flex justify-end">
            <button
              type="button"
              onClick=${onClose}
              class="mr-2 px-4 py-2 bg-gray-200 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="neo-button px-4 py-2 bg-green-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-500 font-bold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}; 
