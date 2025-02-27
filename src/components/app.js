import { Header } from "./header.js";
import { Content } from "./content.js";
import { Footer } from "./footer.js";
import { SubmitGameForm } from "./submit-game-form.js";
// useState is already available globally from main.js

// Root App component
export const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  // Listen for the submit button click
  useEffect(() => {
    const submitButton = document.getElementById('submit-game-btn');
    
    const handleSubmitClick = () => openForm();
    
    if (submitButton) {
      submitButton.addEventListener('click', handleSubmitClick);
    }
    
    // Cleanup
    return () => {
      if (submitButton) {
        submitButton.removeEventListener('click', handleSubmitClick);
      }
    };
  }, []);

  return html`
    <div class="bg-yellow-50 min-h-screen">
      <${Header} />
      <${Content} />
      <${Footer} />
      <${SubmitGameForm} isOpen=${isFormOpen} onClose=${closeForm} />
    </div>
  `;
};
