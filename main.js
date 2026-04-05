/**
 * StorageView | Core Frontend Logic
 * Initializing the "AstraDrive" Dashboard experience.
 */

class StorageViewApp {
    constructor() {
        this.config = {
            clientId: localStorage.getItem('google_client_id') || '',
            clientSecret: localStorage.getItem('google_client_secret') || '',
        };
        
        this.init();
    }

    init() {
        console.log("🚀 StorageView UI Initialized");
        this.setupEventListeners();
        this.loadMockData(); // Initial view before APIs are connected
    }

    setupEventListeners() {
        // Search functionality placeholder
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', (e) => {
            console.log("Searching for:", e.target.value);
        });

        // Add Storage button (Will trigger the OAuth flow later)
        const addStorageBtn = document.querySelector('.btn-primary');
        addStorageBtn.addEventListener('click', () => {
            this.promptCredentials();
        });

        // File item interactions
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', () => {
                const fileName = item.querySelector('.file-name').innerText;
                alert(`Opening ${fileName}... (Bridge currently in development)`);
            });
        });
    }

    loadMockData() {
        // This is where real API data will be injected later
        console.log("Loading dashboard statistics...");
    }

    /**
     * Temporary UI helper to let the user input their credentials directly
     * in the dashboard for testing.
     */
    promptCredentials() {
        const type = prompt("Storage Type? (gdrive / r2)", "gdrive");
        
        if (type === 'gdrive') {
            const id = prompt("Google Client ID:", this.config.clientId);
            const secret = prompt("Google Client Secret:", this.config.clientSecret);
            if (id && secret) {
                localStorage.setItem('google_client_id', id);
                localStorage.setItem('google_client_secret', secret);
                alert("Google Drive credentials saved!");
            }
        } else if (type === 'r2') {
            const bucket = prompt("R2 Bucket Name:");
            const accessKey = prompt("R2 Access Key ID:");
            const secretKey = prompt("R2 Secret Access Key:");
            const accountId = prompt("Cloudflare Account ID:");
            
            if (bucket && accessKey && secretKey && accountId) {
                localStorage.setItem('r2_bucket', bucket);
                localStorage.setItem('r2_access_key', accessKey);
                localStorage.setItem('r2_secret_key', secretKey);
                localStorage.setItem('r2_account_id', accountId);
                alert("Cloudflare R2 credentials saved!");
            }
        }
    }
}

// Instantiate the app
window.app = new StorageViewApp();
