// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initParticles();
    initNavbar();
    initCounters();
    initExerciseTabs();
    initVivaQuestions();
    initMobileMenu();
    initProgress();
    initScrollAnimations();
});

// ==================== LOADER ====================
function initLoader() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 2500);
}

// ==================== PARTICLE BACKGROUND ====================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 80;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 245, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== NAVBAR ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// ==================== COUNTERS ====================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (counter.closest('.stat-info') && target === 100 ? '%' : '+');
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ==================== SCROLL FUNCTION ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ==================== MODAL ====================
const modalData = {
    api: {
        title: 'What is an API?',
        content: `
            <h3>Definition</h3>
            <p><strong>API (Application Programming Interface)</strong> is a set of rules and protocols that allows different software applications to communicate with each other.</p>
            
            <h3>Real-World Analogy</h3>
            <p>Think of an API like a waiter in a restaurant:</p>
            <ul>
                <li>You (Frontend) → Order food</li>
                <li>Waiter (API) → Takes order to kitchen</li>
                <li>Kitchen (Backend) → Prepares food</li>
                <li>Waiter (API) → Brings food back to you</li>
            </ul>
            
            <h3>Why Use APIs?</h3>
            <ul>
                <li><strong>Data Sharing:</strong> Exchange information between applications</li>
                <li><strong>Separation:</strong> Frontend and backend work independently</li>
                <li><strong>Reusability:</strong> One API can serve multiple clients</li>
                <li><strong>Security:</strong> Controlled access to resources</li>
            </ul>
        `
    },
    rest: {
        title: 'REST API',
        content: `
            <h3>What is REST?</h3>
            <p><strong>REST (Representational State Transfer)</strong> is an architectural style for designing networked applications.</p>
            
            <h3>Key Principles</h3>
            <ul>
                <li><strong>Stateless:</strong> Each request contains all needed information</li>
                <li><strong>Client-Server:</strong> Separation of concerns</li>
                <li><strong>Cacheable:</strong> Responses can be cached</li>
                <li><strong>Uniform Interface:</strong> Standard methods (GET, POST, etc.)</li>
            </ul>
            
            <h3>REST vs SOAP</h3>
            <p><strong>REST:</strong> Lightweight, uses JSON, flexible<br>
            <strong>SOAP:</strong> Heavy, uses XML, strict rules</p>
        `
    },
    json: {
        title: 'JSON Format',
        content: `
            <h3>What is JSON?</h3>
            <p><strong>JSON (JavaScript Object Notation)</strong> is a lightweight data interchange format that's easy for humans to read and write.</p>
            
            <h3>JSON Structure</h3>
            <pre><code>{
  "name": "SSS",
  "age": 25,
  "skills": ["JavaScript", "Python", "APIs"],
  "isActive": true,
  "address": {
    "city": "Tech City",
    "country": "India"
  }
}</code></pre>
            
            <h3>Data Types</h3>
            <ul>
                <li><strong>String:</strong> "text"</li>
                <li><strong>Number:</strong> 123, 45.67</li>
                <li><strong>Boolean:</strong> true, false</li>
                <li><strong>Array:</strong> [1, 2, 3]</li>
                <li><strong>Object:</strong> {"key": "value"}</li>
                <li><strong>Null:</strong> null</li>
            </ul>
            
            <h3>JavaScript Operations</h3>
            <pre><code>// Object to JSON String
const json = JSON.stringify(object);

// JSON String to Object
const object = JSON.parse(jsonString);</code></pre>
        `
    },
    endpoints: {
        title: 'API Endpoints',
        content: `
            <h3>What is an Endpoint?</h3>
            <p>An endpoint is a specific URL where an API can access resources.</p>
            
            <h3>Endpoint Structure</h3>
            <pre><code>https://api.example.com/users/123
   ↓         ↓          ↓     ↓
Protocol  Domain   Resource ID</code></pre>
            
            <h3>Common Patterns</h3>
            <ul>
                <li><code>GET /users</code> → Get all users</li>
                <li><code>GET /users/123</code> → Get specific user</li>
                <li><code>POST /users</code> → Create new user</li>
                <li><code>PUT /users/123</code> → Update user completely</li>
                <li><code>PATCH /users/123</code> → Update user partially</li>
                <li><code>DELETE /users/123</code> → Delete user</li>
            </ul>
        `
    },
    status: {
        title: 'HTTP Status Codes',
        content: `
            <h3>Status Code Categories</h3>
            <p><strong>1xx:</strong> Informational<br>
            <strong>2xx:</strong> Success<br>
            <strong>3xx:</strong> Redirection<br>
            <strong>4xx:</strong> Client Error<br>
            <strong>5xx:</strong> Server Error</p>
            
            <h3>Common Status Codes</h3>
            <ul>
                <li><strong>200 OK:</strong> Request successful</li>
                <li><strong>201 Created:</strong> New resource created (POST)</li>
                <li><strong>204 No Content:</strong> Success, no response body</li>
                <li><strong>400 Bad Request:</strong> Invalid data format</li>
                <li><strong>401 Unauthorized:</strong> Authentication required</li>
                <li><strong>403 Forbidden:</strong> No permission</li>
                <li><strong>404 Not Found:</strong> Resource doesn't exist</li>
                <li><strong>422 Unprocessable:</strong> Validation failed</li>
                <li><strong>500 Internal Server Error:</strong> Server problem</li>
            </ul>
        `
    },
    auth: {
        title: 'Authentication & Authorization',
        content: `
            <h3>Authentication vs Authorization</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background: rgba(0, 245, 255, 0.1);">
                    <th style="padding: 15px; border: 1px solid rgba(0, 245, 255, 0.2);">Authentication</th>
                    <th style="padding: 15px; border: 1px solid rgba(0, 245, 255, 0.2);">Authorization</th>
                </tr>
                <tr>
                    <td style="padding: 15px; border: 1px solid rgba(0, 245, 255, 0.2);">WHO are you?</td>
                    <td style="padding: 15px; border: 1px solid rgba(0, 245, 255, 0.2);">WHAT can you do?</td>
                </tr>
                <tr>
                    <td style="padding: 15px; border: 1px solid rgba(0, 245, 255, 0.2);">Login process</td>
                    <td style="padding: 15px; border: 1px solid rgba(0, 245, 255, 0.2);">Permission check</td>
                </tr>
                <tr>
                    <td style="padding: 15px; border: 1px solid rgba(0, 245, 255, 0.2);">Error: 401</td>
                    <td style="padding: 15px; border: 1px solid rgba(0, 245, 255, 0.2);">Error: 403</td>
                </tr>
            </table>
            
            <h3>Authentication Methods</h3>
            <ul>
                <li><strong>API Keys:</strong> Simple but less secure</li>
                <li><strong>OAuth:</strong> Industry standard, delegated access</li>
                <li><strong>JWT (JSON Web Tokens):</strong> Stateless, compact</li>
            </ul>
            
            <h3>Example Header</h3>
            <pre><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIs...</code></pre>
        `
    }
};

function openModal(concept) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (modalData[concept]) {
        modalBody.innerHTML = `
            <h2>${modalData[concept].title}</h2>
            ${modalData[concept].content}
        `;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// ==================== EXERCISE TABS ====================
function initExerciseTabs() {
    const tabs = document.querySelectorAll('.exercise-tab');
    const panels = document.querySelectorAll('.exercise-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const exerciseType = tab.getAttribute('data-exercise');
            
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`exercise-${exerciseType}`).classList.add('active');
        });
    });
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== EXERCISES ====================

// GET Exercise
async function runGetExercise() {
    const resultDiv = document.getElementById('get-result');
    
    resultDiv.innerHTML = '<div style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i><p style="margin-top: 15px;">Loading users...</p></div>';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        let html = '<div style="margin-bottom: 20px;"><h4 style="color: var(--primary);">✅ Success! Retrieved ' + users.length + ' users</h4></div>';
        html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">';
        
        users.slice(0, 6).forEach(user => {
            html += `
                <div style="padding: 20px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border); border-radius: 10px;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <h5 style="color: var(--light); margin: 0;">${user.name}</h5>
                            <p style="color: var(--gray); margin: 0; font-size: 0.85rem;">ID: ${user.id}</p>
                        </div>
                    </div>
                    <p style="color: var(--gray); margin: 5px 0;"><i class="fas fa-envelope" style="color: var(--primary); width: 20px;"></i> ${user.email}</p>
                    <p style="color: var(--gray); margin: 5px 0;"><i class="fas fa-building" style="color: var(--primary); width: 20px;"></i> ${user.company.name}</p>
                </div>
            `;
        });
        
        html += '</div>';
        resultDiv.innerHTML = html;
        showToast('Successfully loaded users!', 'success');
        
    } catch (error) {
        resultDiv.innerHTML = `<div style="padding: 30px; text-align: center; color: var(--error);"><i class="fas fa-exclamation-triangle" style="font-size: 2rem;"></i><p style="margin-top: 15px;">Error: ${error.message}</p></div>`;
        showToast('Failed to load users', 'error');
    }
}

// POST Exercise
async function runPostExercise() {
    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();
    const resultDiv = document.getElementById('post-result');
    
    if (!title || !body) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    resultDiv.innerHTML = '<div style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i><p style="margin-top: 15px;">Creating post...</p></div>';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        resultDiv.innerHTML = `
            <div style="padding: 30px; background: rgba(16, 185, 129, 0.1); border: 2px solid var(--success); border-radius: 15px;">
                <h4 style="color: var(--success); margin-bottom: 20px;"><i class="fas fa-check-circle"></i> Post Created Successfully!</h4>
                <div style="padding: 20px; background: var(--darker); border-radius: 10px;">
                    <p style="color: var(--gray); margin-bottom: 10px;"><strong style="color: var(--primary);">ID:</strong> ${data.id}</p>
                    <p style="color: var(--gray); margin-bottom: 10px;"><strong style="color: var(--primary);">Title:</strong> ${data.title}</p>
                    <p style="color: var(--gray); margin-bottom: 10px;"><strong style="color: var(--primary);">Body:</strong> ${data.body}</p>
                    <p style="color: var(--gray);"><strong style="color: var(--primary);">User ID:</strong> ${data.userId}</p>
                </div>
                <p style="margin-top: 20px; color: var(--gray); font-size: 0.9rem;"><i class="fas fa-info-circle"></i> Status Code: ${response.status} Created</p>
            </div>
        `;
        
        document.getElementById('post-title').value = '';
        document.getElementById('post-body').value = '';
        showToast('Post created successfully!', 'success');
        
    } catch (error) {
        resultDiv.innerHTML = `<div style="padding: 30px; text-align: center; color: var(--error);"><i class="fas fa-exclamation-triangle" style="font-size: 2rem;"></i><p style="margin-top: 15px;">Error: ${error.message}</p></div>`;
        showToast('Failed to create post', 'error');
    }
}

// PUT Exercise
async function runPutExercise() {
    const resultDiv = document.getElementById('put-result');
    
    resultDiv.innerHTML = '<div style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-spin" style="font-size: 1.5rem; color: var(--primary);"></i></div>';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 1,
                title: 'PUT: Completely New Title',
                body: 'PUT replaces ALL fields. Any missing field becomes null!',
                userId: 1
            })
        });
        
        const data = await response.json();
        
        resultDiv.innerHTML = `
            <div style="padding: 20px; background: rgba(245, 158, 11, 0.1); border: 2px solid var(--warning); border-radius: 10px; margin-top: 20px;">
                <h5 style="color: var(--warning); margin-bottom: 15px;"><i class="fas fa-sync"></i> PUT Response</h5>
                <pre style="background: var(--darker); padding: 15px; border-radius: 8px; overflow-x: auto; color: var(--gray-light); font-size: 0.85rem;">${JSON.stringify(data, null, 2)}</pre>
                <p style="color: var(--warning); margin-top: 15px; font-size: 0.9rem;"><i class="fas fa-exclamation-triangle"></i> All fields must be sent with PUT!</p>
            </div>
        `;
        showToast('PUT request completed', 'success');
        
    } catch (error) {
        resultDiv.innerHTML = `<div style="padding: 20px; color: var(--error);">Error: ${error.message}</div>`;
    }
}

// PATCH Exercise
async function runPatchExercise() {
    const resultDiv = document.getElementById('patch-result');
    
    resultDiv.innerHTML = '<div style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-spin" style="font-size: 1.5rem; color: var(--primary);"></i></div>';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'PATCH: Only Title Updated'
            })
        });
        
        const data = await response.json();
        
        resultDiv.innerHTML = `
            <div style="padding: 20px; background: rgba(139, 92, 246, 0.1); border: 2px solid var(--secondary); border-radius: 10px; margin-top: 20px;">
                <h5 style="color: var(--secondary); margin-bottom: 15px;"><i class="fas fa-edit"></i> PATCH Response</h5>
                <pre style="background: var(--darker); padding: 15px; border-radius: 8px; overflow-x: auto; color: var(--gray-light); font-size: 0.85rem;">${JSON.stringify(data, null, 2)}</pre>
                <p style="color: var(--secondary); margin-top: 15px; font-size: 0.9rem;"><i class="fas fa-check-circle"></i> Only specified fields changed!</p>
            </div>
        `;
        showToast('PATCH request completed', 'success');
        
    } catch (error) {
        resultDiv.innerHTML = `<div style="padding: 20px; color: var(--error);">Error: ${error.message}</div>`;
    }
}

// Clear Results
function clearResults() {
    document.getElementById('get-result').innerHTML = '';
    showToast('Results cleared', 'success');
}

// CRUD - Load Posts
let posts = [];

async function loadPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '<div style="text-align: center; padding: 60px; grid-column: 1/-1;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i><p style="margin-top: 20px;">Loading posts...</p></div>';
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=9');
        posts = await response.json();
        displayPosts();
        showToast('Posts loaded successfully!', 'success');
    } catch (error) {
        container.innerHTML = `<div style="padding: 40px; text-align: center; color: var(--error); grid-column: 1/-1;"><i class="fas fa-exclamation-triangle" style="font-size: 2rem;"></i><p style="margin-top: 15px;">Error loading posts</p></div>`;
        showToast('Failed to load posts', 'error');
    }
}

function displayPosts() {
    const container = document.getElementById('posts-container');
    
    if (posts.length === 0) {
        container.innerHTML = '<div style="padding: 60px; text-align: center; color: var(--gray); grid-column: 1/-1;"><i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 20px;"></i><p>No posts to display</p></div>';
        return;
    }
    
    container.innerHTML = posts.map(post => `
        <div class="post-card">
            <div class="post-header">
                <span class="post-id">ID: ${post.id}</span>
                <i class="fas fa-user" style="color: var(--gray);"></i>
            </div>
            <div class="post-title">${post.title}</div>
            <div class="post-body">${post.body}</div>
            <div class="post-actions">
                <button class="btn btn-secondary" onclick="deletePost(${post.id})" style="padding: 8px 16px; font-size: 0.85rem;">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

async function deletePost(id) {
    if (!confirm('Delete this post?')) return;
    
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        });
        
        posts = posts.filter(p => p.id !== id);
        displayPosts();
        showToast('Post deleted successfully', 'success');
    } catch (error) {
        showToast('Failed to delete post', 'error');
    }
}

function clearPosts() {
    posts = [];
    displayPosts();
    showToast('Posts cleared', 'success');
}

// ==================== VIVA QUESTIONS ====================
const vivaQuestions = [
    {
        category: 'methods',
        question: 'What is the difference between PUT and PATCH?',
        answer: '<strong>PUT</strong> replaces the <strong>entire resource</strong>. You must send ALL fields, and any missing field will become null or be deleted.<br><br><strong>PATCH</strong> updates <strong>only specified fields</strong>. You send only the fields you want to change, and all other fields remain unchanged.'
    },
    {
        category: 'status',
        question: 'What is the difference between 401 and 403 status codes?',
        answer: '<strong>401 Unauthorized:</strong> Authentication is required but missing or failed. The user is NOT logged in.<br><br><strong>403 Forbidden:</strong> The user IS authenticated (logged in) but does NOT have permission to access the resource.'
    },
    {
        category: 'methods',
        question: 'Why doesn\'t GET request have a body?',
        answer: 'GET requests are designed to <strong>retrieve data</strong>, not send it. All parameters are passed in the URL as query strings (e.g., /users?name=SSS&age=25). The body is reserved for methods that create or modify data like POST, PUT, and PATCH.'
    },
    {
        category: 'status',
        question: 'What status code does a successful POST request return?',
        answer: 'A successful POST request returns <strong>201 Created</strong>, not 200 OK. The 201 status indicates that a new resource has been successfully created on the server.'
    },
    {
        category: 'auth',
        question: 'What is the difference between Authentication and Authorization?',
        answer: '<strong>Authentication:</strong> Verifying WHO you are (identity). Example: Login with username/password. Error code: 401.<br><br><strong>Authorization:</strong> Determining WHAT you can do (permissions). Example: Admin can delete, users can only view. Error code: 403.'
    },
    {
        category: 'methods',
        question: 'What is the Content-Type header and why is it important?',
        answer: 'The <strong>Content-Type</strong> header tells the server what format the data is in. For JSON APIs, you must use <code>Content-Type: application/json</code>. Without this header, the server won\'t know how to parse the request body.'
    },
    {
        category: 'advanced',
        question: 'What is JSON and why is it used in APIs?',
        answer: '<strong>JSON (JavaScript Object Notation)</strong> is a lightweight, text-based data format that\'s easy for both humans and machines to read. It uses key-value pairs and is language-independent, making it perfect for data exchange between different systems.'
    },
    {
        category: 'methods',
        question: 'What does idempotent mean in the context of HTTP methods?',
        answer: '<strong>Idempotent</strong> means making the same request multiple times produces the same result as making it once. <strong>GET, PUT, DELETE</strong> are idempotent. <strong>POST and PATCH</strong> are NOT idempotent because multiple requests create multiple resources or different states.'
    },
    {
        category: 'status',
        question: 'What does a 404 status code mean?',
        answer: '<strong>404 Not Found</strong> means the requested resource does not exist on the server. This could be because the URL is wrong, the resource was deleted, or the endpoint doesn\'t exist.'
    },
    {
        category: 'advanced',
        question: 'What is a REST API endpoint?',
        answer: 'An <strong>endpoint</strong> is a specific URL where an API resource can be accessed. For example: <code>https://api.example.com/users/123</code> where <code>/users/123</code> is the endpoint for user with ID 123.'
    },
    {
        category: 'auth',
        question: 'Where should authentication tokens be placed in API requests?',
        answer: 'Authentication tokens should be placed in the <strong>Authorization header</strong>, NOT in the request body. Format: <code>Authorization: Bearer your_token_here</code>. This is the standard and secure way to send credentials.'
    },
    {
        category: 'methods',
        question: 'When should you use POST vs PUT?',
        answer: '<strong>POST:</strong> Use to CREATE new resources when you don\'t know the ID yet. Server assigns the ID.<br><br><strong>PUT:</strong> Use to UPDATE existing resources when you know the exact ID and want to replace the entire resource.'
    },
    {
        category: 'status',
        question: 'What does a 500 status code indicate?',
        answer: '<strong>500 Internal Server Error</strong> indicates a problem on the server side, not with your request. This could be a server crash, database error, or unhandled exception. It\'s not your fault as a client!'
    },
    {
        category: 'advanced',
        question: 'What is the difference between synchronous and asynchronous API calls?',
        answer: '<strong>Synchronous:</strong> Code waits for the response before continuing. Blocks execution.<br><br><strong>Asynchronous:</strong> Code continues while waiting for response. Uses callbacks, promises, or async/await. Modern APIs use async to prevent freezing the application.'
    },
    {
        category: 'methods',
        question: 'Can DELETE requests have a request body?',
        answer: 'While technically possible, <strong>DELETE requests typically do NOT have a body</strong>. The resource to delete is specified in the URL (e.g., /users/123). Some APIs accept a body for complex delete operations, but it\'s not standard practice.'
    },
    {
        category: 'status',
        question: 'What is the difference between 200 and 204 status codes?',
        answer: '<strong>200 OK:</strong> Request successful and response includes data in the body.<br><br><strong>204 No Content:</strong> Request successful but no response body is returned. Often used for DELETE requests where there\'s nothing to return.'
    },
    {
        category: 'auth',
        question: 'What is an API Key and how is it used?',
        answer: 'An <strong>API Key</strong> is a unique identifier used to authenticate requests. It\'s simpler than OAuth but less secure. Usually sent in headers: <code>X-API-Key: your_key_here</code> or as a query parameter. Good for simple projects, not for sensitive data.'
    },
    {
        category: 'advanced',
        question: 'What is CORS and why does it matter?',
        answer: '<strong>CORS (Cross-Origin Resource Sharing)</strong> is a security feature that restricts which domains can access an API. If you get CORS errors, it means the API doesn\'t allow requests from your domain. The API server must enable CORS for your origin.'
    },
    {
        category: 'methods',
        question: 'What happens if you send a body with a GET request?',
        answer: 'Most servers will <strong>ignore the body</strong> in GET requests. GET is designed to retrieve data, not send it. While not technically forbidden, it\'s against HTTP conventions and many servers/libraries don\'t support it. Use query parameters instead.'
    },
    {
        category: 'status',
        question: 'What does a 422 status code mean?',
        answer: '<strong>422 Unprocessable Entity</strong> means the request was well-formed but contains semantic errors. For example, you sent valid JSON but the email format is invalid, or a required field is missing. It\'s about validation failures.'
    },
    {
        category: 'advanced',
        question: 'What is the difference between Fetch and Axios?',
        answer: '<strong>Fetch:</strong> Built-in JavaScript, requires .json() to parse, manual error handling.<br><br><strong>Axios:</strong> External library, auto JSON parsing, better error handling, interceptors. Axios is more feature-rich but Fetch is native and doesn\'t need installation.'
    }
];

function initVivaQuestions() {
    const categories = document.querySelectorAll('.viva-category');
    const questionsContainer = document.getElementById('viva-questions');
    
    // Display all questions initially
    displayVivaQuestions('all');
    
    // Category filter
    categories.forEach(category => {
        category.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');
            const selectedCategory = category.getAttribute('data-category');
            displayVivaQuestions(selectedCategory);
        });
    });
}

function displayVivaQuestions(category) {
    const questionsContainer = document.getElementById('viva-questions');
    const filteredQuestions = category === 'all' 
        ? vivaQuestions 
        : vivaQuestions.filter(q => q.category === category);
    
    questionsContainer.innerHTML = filteredQuestions.map((q, index) => `
        <div class="viva-question" data-index="${index}">
            <div class="question-header">
                <div class="question-text">${q.question}</div>
                <div class="question-toggle">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            <div class="answer-content">
                <div class="answer-text">${q.answer}</div>
                <span class="question-category-tag">${getCategoryName(q.category)}</span>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    document.querySelectorAll('.viva-question').forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('active');
        });
    });
}

function getCategoryName(category) {
    const names = {
        'methods': 'HTTP Methods',
        'status': 'Status Codes',
        'auth': 'Authentication',
        'advanced': 'Advanced'
    };
    return names[category] || category;
}

// ==================== PROGRESS TRACKING ====================
function initProgress() {
    updateProgress();
    
    // Update progress when scrolling through sections
    window.addEventListener('scroll', updateProgress);
}

function updateProgress() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    // Update nav progress
    const navProgress = document.getElementById('navProgress');
    const navProgressText = document.getElementById('navProgressText');
    const circumference = 2 * Math.PI * 18; // radius = 18
    const offset = circumference - (progress / 100) * circumference;
    
    if (navProgress) {
        navProgress.style.strokeDashoffset = offset;
    }
    if (navProgressText) {
        navProgressText.textContent = Math.round(progress) + '%';
    }
    
    // Update overall progress
    const overallProgress = document.getElementById('overallProgress');
    const overallProgressText = document.getElementById('overallProgressText');
    const overallCircumference = 2 * Math.PI * 54; // radius = 54
    const overallOffset = overallCircumference - (progress / 100) * overallCircumference;
    
    if (overallProgress) {
        overallProgress.style.strokeDashoffset = overallOffset;
    }
    if (overallProgressText) {
        overallProgressText.textContent = Math.round(progress) + '%';
    }
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.concept-card, .method-card, .stat-card, .reference-card, .viva-question'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// ==================== METHOD SELECTION ====================
function selectMethod(method) {
    showToast(`${method} method selected! Check the comparison section below.`, 'success');
}

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape') {
        closeModal();
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// ==================== UTILITY FUNCTIONS ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScroll = debounce(() => {
    updateProgress();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c🚀 Welcome to SSS API Learning Hub!', 'font-size: 20px; color: #00f5ff; font-weight: bold;');
console.log('%cBuilt with ❤️ for mastering APIs', 'font-size: 14px; color: #7b2ff7;');
console.log('%cHappy Learning! 📚', 'font-size: 14px; color: #10b981;');

// ==================== SERVICE WORKER (Optional) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable offline support
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('SW registered: ', registration);
        // }).catch(error => {
        //     console.log('SW registration failed: ', error);
        // });
    });
}

// ==================== ANALYTICS (Placeholder) ====================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event:', category, action, label);
}

// Track exercise completions
function trackExerciseCompletion(exerciseType) {
    trackEvent('Exercise', 'Complete', exerciseType);
    updateProgress();
}

// ==================== DARK MODE TOGGLE (Optional Enhancement) ====================
function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
    const isDark = !document.body.classList.contains('light-mode');
    localStorage.setItem('darkMode', isDark);
}

// Restore dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'false') {
    document.body.classList.add('light-mode');
}

// ==================== COPY CODE FUNCTIONALITY ====================
function copyCode(button) {
    const code = button.previousElementSibling.textContent;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
    }).catch(err => {
        showToast('Failed to copy code', 'error');
    });
}

// ==================== EXPORT PROGRESS ====================
function exportProgress() {
    const progress = {
        overallProgress: document.getElementById('overallProgressText')?.textContent || '0%',
        completedExercises: [],
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(progress, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sss-api-learning-progress.json';
    link.click();
    URL.revokeObjectURL(url);
    
    showToast('Progress exported successfully!', 'success');
}

// ==================== SHARE FUNCTIONALITY ====================
async function shareProgress() {
    const shareData = {
        title: 'SSS API Learning Hub',
        text: `I'm learning APIs! Check out my progress: ${document.getElementById('overallProgressText')?.textContent || '0%'} complete!`,
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            showToast('Shared successfully!', 'success');
        } else {
            // Fallback to clipboard
            await navigator.clipboard.writeText(shareData.text + '\n' + shareData.url);
            showToast('Link copied to clipboard!', 'success');
        }
    } catch (err) {
        console.log('Share failed:', err);
    }
}

// ==================== PRACTICE MODE ====================
let practiceMode = false;

function togglePracticeMode() {
    practiceMode = !practiceMode;
    
    if (practiceMode) {
        document.body.classList.add('practice-mode');
        showToast('Practice mode activated! Try solving without hints.', 'success');
    } else {
        document.body.classList.remove('practice-mode');
        showToast('Practice mode deactivated.', 'success');
    }
}

// ==================== RANDOM QUESTION GENERATOR ====================
function getRandomQuestion() {
    const randomQ = vivaQuestions[Math.floor(Math.random() * vivaQuestions.length)];
    
    showToast('Random question loaded!', 'success');
    
    // Scroll to viva section
    document.getElementById('viva').scrollIntoView({ behavior: 'smooth' });
    
    // Highlight the question after scrolling
    setTimeout(() => {
        const questions = document.querySelectorAll('.viva-question');
        questions.forEach((q, i) => {
            if (vivaQuestions[i] === randomQ) {
                q.classList.add('active');
                q.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }, 1000);
}

// ==================== PRINT NOTES ====================
function printNotes() {
    window.print();
    showToast('Opening print dialog...', 'success');
}

// ==================== AUTO-SAVE EXERCISE INPUTS ====================
function autoSaveInputs() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
        
        input.addEventListener('input', debounce(() => {
            localStorage.setItem(input.id, input.value);
        }, 500));
    });
}

// Initialize auto-save
autoSaveInputs();

// ==================== ACHIEVEMENT SYSTEM ====================
const achievements = {
    firstExercise: { name: 'First Steps', description: 'Complete your first exercise' },
    allMethods: { name: 'Method Master', description: 'Try all HTTP methods' },
    vivaExpert: { name: 'Viva Expert', description: 'Read all viva questions' },
    speedster: { name: 'Speedster', description: 'Complete 3 exercises in 5 minutes' }
};

function unlockAchievement(achievementKey) {
    if (!localStorage.getItem(`achievement_${achievementKey}`)) {
        localStorage.setItem(`achievement_${achievementKey}`, 'true');
        const achievement = achievements[achievementKey];
        
        showToast(`🏆 Achievement Unlocked: ${achievement.name}!`, 'success');
    }
}

// ==================== SEARCH FUNCTIONALITY ====================
function searchContent(query) {
    const searchResults = [];
    const normalizedQuery = query.toLowerCase();
    
    // Search through viva questions
    vivaQuestions.forEach((q, index) => {
        if (q.question.toLowerCase().includes(normalizedQuery) || 
            q.answer.toLowerCase().includes(normalizedQuery)) {
            searchResults.push({
                type: 'viva',
                question: q.question,
                index: index
            });
        }
    });
    
    return searchResults;
}

// ==================== BOOKMARK SYSTEM ====================
let bookmarkedQuestions = JSON.parse(localStorage.getItem('bookmarks') || '[]');

function toggleBookmark(questionIndex) {
    const index = bookmarkedQuestions.indexOf(questionIndex);
    
    if (index > -1) {
        bookmarkedQuestions.splice(index, 1);
        showToast('Bookmark removed', 'success');
    } else {
        bookmarkedQuestions.push(questionIndex);
        showToast('Question bookmarked!', 'success');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkedQuestions));
}

function showBookmarks() {
    const bookmarked = vivaQuestions.filter((q, i) => bookmarkedQuestions.includes(i));
    
    if (bookmarked.length === 0) {
        showToast('No bookmarks yet!', 'error');
        return;
    }
    
    displayVivaQuestions('all'); // This would need to be modified to show only bookmarked
    showToast(`Showing ${bookmarked.length} bookmarked questions`, 'success');
}


// ==================== EXPORT TO PDF (Placeholder) ====================
function exportToPDF() {
    showToast('PDF export feature coming soon!', 'success');
    // Would need a library like jsPDF
}


// ==================== QUIZ DATA ====================
const quizQuestions = {
    beginner: [
        {
            question: "What does API stand for?",
            options: [
                "Application Programming Interface",
                "Advanced Programming Integration",
                "Automated Process Interface",
                "Application Process Integration"
            ],
            correct: 0,
            explanation: "API stands for Application Programming Interface. It's a set of rules and protocols that allows different software applications to communicate with each other."
        },
        {
            question: "Which HTTP method is used to retrieve data?",
            options: ["POST", "GET", "PUT", "DELETE"],
            correct: 1,
            explanation: "GET is used to retrieve/read data from the server. It does not modify any data and should not have a request body."
        },
        {
            question: "What status code indicates a successful request?",
            options: ["404", "500", "200", "401"],
            correct: 2,
            explanation: "Status code 200 OK indicates that the request was successful and the server has returned the requested data."
        },
        {
            question: "What does JSON stand for?",
            options: [
                "JavaScript Object Notation",
                "Java Syntax Object Notation",
                "JavaScript Online Network",
                "Java Standard Object Network"
            ],
            correct: 0,
            explanation: "JSON stands for JavaScript Object Notation. It's a lightweight data-interchange format that's easy for humans to read and write."
        },
        {
            question: "Which HTTP method is used to create new resources?",
            options: ["GET", "DELETE", "POST", "PATCH"],
            correct: 2,
            explanation: "POST is used to create new resources on the server. It typically returns a 201 Created status code on success."
        },
        {
            question: "What does REST stand for?",
            options: [
                "Remote Execution Service Technology",
                "Representational State Transfer",
                "Reliable Execution State Transfer",
                "Remote State Transfer"
            ],
            correct: 1,
            explanation: "REST stands for Representational State Transfer. It's an architectural style for designing networked applications."
        },
        {
            question: "Which status code means 'Not Found'?",
            options: ["400", "401", "404", "500"],
            correct: 2,
            explanation: "Status code 404 means the requested resource could not be found on the server."
        },
        {
            question: "What is the purpose of an API endpoint?",
            options: [
                "To store data permanently",
                "A specific URL where API resources can be accessed",
                "To encrypt data",
                "To compress data"
            ],
            correct: 1,
            explanation: "An endpoint is a specific URL where an API resource can be accessed. For example: /users/123 to access user with ID 123."
        },
        {
            question: "Which HTTP method is idempotent?",
            options: ["POST", "PATCH", "GET", "All of the above"],
            correct: 2,
            explanation: "GET is idempotent, meaning multiple identical requests will produce the same result as a single request. POST is NOT idempotent."
        },
        {
            question: "What format is commonly used for API data exchange?",
            options: ["XML only", "JSON only", "Both JSON and XML", "Plain text only"],
            correct: 2,
            explanation: "APIs commonly use both JSON and XML for data exchange, though JSON is more popular in modern REST APIs due to its simplicity."
        }
    ],
    intermediate: [
        {
            question: "What's the main difference between PUT and PATCH?",
            options: [
                "PUT is faster than PATCH",
                "PUT replaces entire resource, PATCH updates specific fields",
                "PATCH is for creating, PUT is for updating",
                "They are exactly the same"
            ],
            correct: 1,
            explanation: "PUT replaces the entire resource (all fields must be sent), while PATCH updates only the specified fields, leaving others unchanged."
        },
        {
            question: "What status code is returned when authentication is required but not provided?",
            options: ["403 Forbidden", "401 Unauthorized", "404 Not Found", "400 Bad Request"],
            correct: 1,
            explanation: "401 Unauthorized means authentication is required but was not provided or failed. 403 means you're authenticated but don't have permission."
        },
        {
            question: "What does the Content-Type header specify?",
            options: [
                "The size of the data",
                "The format of the data being sent",
                "The authentication method",
                "The API version"
            ],
            correct: 1,
            explanation: "Content-Type header tells the server what format the data is in (e.g., application/json). It's essential for proper data parsing."
        },
        {
            question: "Which HTTP method should be used for partial updates?",
            options: ["PUT", "PATCH", "POST", "UPDATE"],
            correct: 1,
            explanation: "PATCH is designed for partial updates where you only send the fields that need to be changed."
        },
        {
            question: "What does a 422 status code indicate?",
            options: [
                "Server error",
                "Not found",
                "Unprocessable entity (validation error)",
                "Unauthorized access"
            ],
            correct: 2,
            explanation: "422 Unprocessable Entity means the request was well-formed but contains semantic errors, typically validation failures."
        },
        {
            question: "What's the difference between 401 and 403 status codes?",
            options: [
                "No difference, they're the same",
                "401 = not authenticated, 403 = authenticated but no permission",
                "403 = not authenticated, 401 = authenticated but no permission",
                "Both mean 'not found'"
            ],
            correct: 1,
            explanation: "401 Unauthorized means you're not logged in. 403 Forbidden means you're logged in but don't have permission to access the resource."
        },
        {
            question: "Should GET requests have a request body?",
            options: [
                "Yes, always",
                "No, parameters should go in URL as query strings",
                "Only for large data",
                "Only with authentication"
            ],
            correct: 1,
            explanation: "GET requests should not have a body. All parameters should be passed in the URL as query strings (e.g., /users?name=John&age=25)."
        },
        {
            question: "What does 'idempotent' mean in the context of HTTP methods?",
            options: [
                "The request is encrypted",
                "Multiple identical requests produce the same result as one request",
                "The request is very fast",
                "The request requires authentication"
            ],
            correct: 1,
            explanation: "Idempotent means making the same request multiple times produces the same result. GET, PUT, and DELETE are idempotent; POST is not."
        },
        {
            question: "What status code should a successful POST request return?",
            options: ["200 OK", "201 Created", "204 No Content", "202 Accepted"],
            correct: 1,
            explanation: "A successful POST request that creates a new resource should return 201 Created, not 200 OK."
        },
        {
            question: "What is CORS?",
            options: [
                "A database system",
                "Cross-Origin Resource Sharing - security feature restricting API access",
                "A type of API authentication",
                "A programming language"
            ],
            correct: 1,
            explanation: "CORS (Cross-Origin Resource Sharing) is a security feature that restricts which domains can access an API from browsers."
        },
        {
            question: "Where should API authentication tokens typically be placed?",
            options: [
                "In the request body",
                "In the URL",
                "In the Authorization header",
                "In a cookie only"
            ],
            correct: 2,
            explanation: "Authentication tokens should be placed in the Authorization header (e.g., 'Authorization: Bearer token'), not in the body or URL."
        },
        {
            question: "What does a 500 status code indicate?",
            options: [
                "Client error - bad request",
                "Server error - internal problem",
                "Success",
                "Authentication required"
            ],
            correct: 1,
            explanation: "500 Internal Server Error indicates a problem on the server side, not with the client's request."
        },
        {
            question: "Can DELETE requests have a request body?",
            options: [
                "Yes, always required",
                "No, never allowed",
                "Technically possible but not standard practice",
                "Only with authentication"
            ],
            correct: 2,
            explanation: "While technically possible, DELETE requests typically don't have a body. The resource to delete is specified in the URL."
        },
        {
            question: "What's the difference between 200 and 204 status codes?",
            options: [
                "No difference",
                "200 includes response body, 204 has no content",
                "204 is an error, 200 is success",
                "200 is for GET, 204 is for POST"
            ],
            correct: 1,
            explanation: "200 OK includes data in the response body. 204 No Content means success but no body is returned (common for DELETE)."
        },
        {
            question: "What does 'stateless' mean in REST API context?",
            options: [
                "The API doesn't work",
                "Each request contains all needed information; server doesn't store session",
                "The API is very fast",
                "The API doesn't use databases"
            ],
            correct: 1,
            explanation: "Stateless means each request must contain all necessary information. The server doesn't store session data between requests."
        }
    ],
    advanced: [
        {
            question: "What happens if you send all fields with PATCH instead of PUT?",
            options: [
                "Server will reject it",
                "It works the same as PUT",
                "PATCH still only updates specified fields, but practically similar to PUT",
                "It causes an error"
            ],
            correct: 2,
            explanation: "If you send all fields with PATCH, it will update all of them, making it functionally similar to PUT, but the semantic intent is different."
        },
        {
            question: "Which HTTP methods are considered 'safe' (don't modify server state)?",
            options: [
                "GET only",
                "GET and HEAD",
                "GET, POST, PUT",
                "All methods are safe"
            ],
            correct: 1,
            explanation: "Safe methods (GET, HEAD) don't modify server state. They only retrieve data. POST, PUT, PATCH, DELETE all modify state."
        },
        {
            question: "What's the recommended way to handle pagination in REST APIs?",
            options: [
                "Return all data at once",
                "Use query parameters like ?page=1&limit=20",
                "Create separate endpoints for each page",
                "Pagination is not recommended"
            ],
            correct: 1,
            explanation: "Pagination should use query parameters like ?page=1&limit=20 or ?offset=0&limit=20 to control which subset of data to return."
        },
        {
            question: "What's the purpose of the OPTIONS HTTP method?",
            options: [
                "To update data",
                "To delete data",
                "To describe communication options for the target resource",
                "To create new resources"
            ],
            correct: 2,
            explanation: "OPTIONS is used to describe the communication options (allowed methods, CORS headers) for the target resource."
        },
        {
            question: "What is rate limiting in APIs?",
            options: [
                "Slowing down all requests",
                "Restricting number of requests a client can make in a time period",
                "A security vulnerability",
                "A way to compress data"
            ],
            correct: 1,
            explanation: "Rate limiting restricts the number of API requests a client can make within a specific time period to prevent abuse."
        },
        {
            question: "What's the difference between API versioning in URL vs header?",
            options: [
                "No difference",
                "URL (/v1/users) is more visible, header is more RESTful but less discoverable",
                "Headers are always better",
                "URL versioning doesn't work"
            ],
            correct: 1,
            explanation: "URL versioning (/v1/users) is more visible and easier to use. Header versioning is more RESTful but less discoverable and harder to test."
        },
        {
            question: "What does the 'ETag' header represent?",
            options: [
                "Error tag for debugging",
                "A version identifier for caching and concurrency control",
                "Email tag for notifications",
                "Encryption tag"
            ],
            correct: 1,
            explanation: "ETag (entity tag) is a version identifier used for caching and optimistic concurrency control to detect changes."
        },
        {
            question: "What's the recommended HTTP method for bulk operations?",
            options: [
                "Multiple POST requests",
                "Single POST to a batch endpoint with array of operations",
                "PUT with all data",
                "DELETE everything and recreate"
            ],
            correct: 1,
            explanation: "Bulk operations should use a batch endpoint (POST /batch) with an array of operations to reduce network overhead."
        },
        {
            question: "What is HATEOAS in REST?",
            options: [
                "A security protocol",
                "Hypermedia As The Engine Of Application State - links in responses",
                "A database system",
                "An authentication method"
            ],
            correct: 1,
            explanation: "HATEOAS means including hypermedia links in API responses to guide clients on available actions and navigation."
        },
        {
            question: "How should API errors be structured?",
            options: [
                "Plain text messages only",
                "HTTP status code only",
                "Status code + structured error object with code, message, and details",
                "No error handling needed"
            ],
            correct: 2,
            explanation: "Errors should include HTTP status code plus a structured JSON object with error code, message, and detailed information."
        },
        {
            question: "What's the purpose of the 'Accept' header?",
            options: [
                "To accept terms and conditions",
                "To specify which content types client can handle in response",
                "To authenticate the request",
                "To accept cookies"
            ],
            correct: 1,
            explanation: "The Accept header tells the server which content types (e.g., application/json, application/xml) the client can handle."
        },
        {
            question: "What is the difference between OAuth and JWT?",
            options: [
                "They're the same thing",
                "OAuth is authorization framework, JWT is token format",
                "JWT is always more secure",
                "OAuth is outdated"
            ],
            correct: 1,
            explanation: "OAuth is an authorization framework/protocol, while JWT (JSON Web Token) is a token format that can be used with OAuth or standalone."
        },
        {
            question: "Should you use HTTP or HTTPS for production APIs?",
            options: [
                "HTTP is fine",
                "HTTPS is mandatory for security",
                "Doesn't matter",
                "Only HTTPS for authentication endpoints"
            ],
            correct: 1,
            explanation: "HTTPS is mandatory for production APIs to encrypt data in transit and protect against man-in-the-middle attacks."
        },
        {
            question: "What's the best practice for handling API deprecation?",
            options: [
                "Delete old endpoints immediately",
                "Version APIs, announce deprecation, provide migration path, sunset date",
                "Never deprecate anything",
                "Just stop supporting it without notice"
            ],
            correct: 1,
            explanation: "Proper deprecation includes versioning, clear announcement, migration documentation, and a reasonable sunset date."
        },
        {
            question: "What does the 429 status code mean?",
            options: [
                "Success",
                "Not found",
                "Too Many Requests - rate limit exceeded",
                "Server error"
            ],
            correct: 2,
            explanation: "429 Too Many Requests indicates the client has exceeded the rate limit. Usually includes Retry-After header."
        },
        {
            question: "What's the recommended approach for handling API timeouts?",
            options: [
                "Wait forever",
                "Implement timeout with retry logic and exponential backoff",
                "Cancel immediately",
                "Timeouts are not needed"
            ],
            correct: 1,
            explanation: "Implement reasonable timeouts with retry logic using exponential backoff to handle temporary failures gracefully."
        },
        {
            question: "What is GraphQL's main advantage over REST?",
            options: [
                "It's always faster",
                "Clients can request exactly the data they need in one request",
                "It's easier to learn",
                "It doesn't need a server"
            ],
            correct: 1,
            explanation: "GraphQL allows clients to request exactly the data they need in a single request, avoiding over-fetching and under-fetching."
        },
        {
            question: "How should sensitive data be handled in API logs?",
            options: [
                "Log everything for debugging",
                "Redact/mask sensitive data like passwords, tokens, PII",
                "Don't log anything",
                "Only log errors"
            ],
            correct: 1,
            explanation: "Sensitive data (passwords, tokens, credit cards, PII) should be redacted or masked in logs to prevent security breaches."
        },
        {
            question: "What's the purpose of API documentation tools like Swagger/OpenAPI?",
            options: [
                "To replace the API",
                "To provide interactive documentation and API contract specification",
                "Only for testing",
                "Only for internal use"
            ],
            correct: 1,
            explanation: "Swagger/OpenAPI provides interactive API documentation and serves as a machine-readable API contract specification."
        },
        {
            question: "What is the recommended way to handle API versioning?",
            options: [
                "Never version, always update the same endpoint",
                "Use URL versioning (/v1/) or header versioning, maintain old versions",
                "Change API randomly",
                "Versioning is not necessary"
            ],
            correct: 1,
            explanation: "Use clear versioning (URL or header), maintain multiple versions during transition, and communicate changes clearly."
        }
    ]
};

// ==================== QUIZ STATE ====================
let currentQuiz = {
    level: '',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    startTime: null,
    endTime: null
};

// ==================== START QUIZ ====================
function startQuiz(level, questionCount) {
    // Reset state
    currentQuiz = {
        level: level,
        questions: shuffleArray(quizQuestions[level]).slice(0, questionCount),
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
        startTime: Date.now(),
        endTime: null
    };

    // Show quiz container
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';

    // Update title
    document.getElementById('quiz-title').textContent = `${capitalizeFirst(level)} Quiz`;
    document.getElementById('total-questions').textContent = currentQuiz.questions.length;

    // Show first question
    showQuestion();

    // Start timer
    startTimer();

    showToast(`${capitalizeFirst(level)} quiz started! Good luck!`, 'success');
}

// ==================== SHOW QUESTION ====================
function showQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const questionCard = document.getElementById('quiz-question-card');

    // Update progress
    updateQuizProgress();

    // Update question number
    document.getElementById('q-number').textContent = currentQuiz.currentQuestionIndex + 1;
    document.getElementById('current-question').textContent = currentQuiz.currentQuestionIndex + 1;

    // Update question text
    document.getElementById('question-text').textContent = question.question;

    // Create options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.onclick = () => selectAnswer(index);

        const letter = String.fromCharCode(65 + index); // A, B, C, D
        optionDiv.innerHTML = `
            <div class="option-letter">${letter}</div>
            <span>${option}</span>
        `;

        optionsContainer.appendChild(optionDiv);
    });

    // Hide explanation
    document.getElementById('quiz-explanation').style.display = 'none';

    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentQuiz.currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = true;
}

// ==================== SELECT ANSWER ====================
function selectAnswer(answerIndex) {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');

    // Remove previous selection
    options.forEach(opt => opt.classList.remove('selected'));

    // Mark selected
    options[answerIndex].classList.add('selected');

    // Check answer
    const isCorrect = answerIndex === question.correct;

    // Show correct/incorrect
    options.forEach((opt, index) => {
        opt.classList.add('disabled');
        if (index === question.correct) {
            opt.classList.add('correct');
        }
        if (index === answerIndex && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });

    // Update score
    if (isCorrect) {
        currentQuiz.score++;
        showToast('Correct! Well done! ✅', 'success');
    } else {
        showToast('Incorrect. See explanation below.', 'error');
    }

    // Save answer
    currentQuiz.answers[currentQuiz.currentQuestionIndex] = {
        selected: answerIndex,
        correct: question.correct,
        isCorrect: isCorrect
    };

    // Show explanation
    const explanationDiv = document.getElementById('quiz-explanation');
    document.getElementById('explanation-text').textContent = question.explanation;
    explanationDiv.style.display = 'block';

    // Update score display
    document.getElementById('quiz-score').textContent = 
        `${currentQuiz.score}/${currentQuiz.currentQuestionIndex + 1}`;

    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

// ==================== NAVIGATION ====================
function nextQuestion() {
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentQuestionIndex++;
        showQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (currentQuiz.currentQuestionIndex > 0) {
        currentQuiz.currentQuestionIndex--;
        showPreviousAnswer();
    }
}

function showPreviousAnswer() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const previousAnswer = currentQuiz.answers[currentQuiz.currentQuestionIndex];

    // Update UI
    updateQuizProgress();
    document.getElementById('q-number').textContent = currentQuiz.currentQuestionIndex + 1;
    document.getElementById('current-question').textContent = currentQuiz.currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.question;

    // Show options with previous answer
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option disabled';

        if (previousAnswer) {
            if (index === question.correct) {
                optionDiv.classList.add('correct');
            }
            if (index === previousAnswer.selected && !previousAnswer.isCorrect) {
                optionDiv.classList.add('incorrect');
            }
            if (index === previousAnswer.selected) {
                optionDiv.classList.add('selected');
            }
        }

        const letter = String.fromCharCode(65 + index);
        optionDiv.innerHTML = `
            <div class="option-letter">${letter}</div>
            <span>${option}</span>
        `;

        optionsContainer.appendChild(optionDiv);
    });

    // Show explanation
    if (previousAnswer) {
        const explanationDiv = document.getElementById('quiz-explanation');
        document.getElementById('explanation-text').textContent = question.explanation;
        explanationDiv.style.display = 'block';
    }

    // Update buttons
    document.getElementById('prev-btn').disabled = currentQuiz.currentQuestionIndex === 0;
    document.getElementById('next-btn').disabled = false;
}

// ==================== FINISH QUIZ ====================
function finishQuiz() {
    currentQuiz.endTime = Date.now();

    // Hide quiz, show results
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    // Calculate results
    const totalQuestions = currentQuiz.questions.length;
    const percentage = Math.round((currentQuiz.score / totalQuestions) * 100);
    const timeTaken = Math.floor((currentQuiz.endTime - currentQuiz.startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    // Update results display
    document.getElementById('results-percentage').textContent = `${percentage}%`;
    document.getElementById('results-fraction').textContent = 
        `${currentQuiz.score}/${totalQuestions}`;
    document.getElementById('correct-answers').textContent = currentQuiz.score;
    document.getElementById('incorrect-answers').textContent = 
        totalQuestions - currentQuiz.score;
    document.getElementById('time-taken').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Animate progress circle
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (percentage / 100) * circumference;
    document.getElementById('results-progress').style.strokeDashoffset = offset;

    // Set icon and message based on performance
    const resultsIcon = document.getElementById('results-icon');
    const resultsTitle = document.getElementById('results-title');
    const resultsMessage = document.getElementById('results-message');

    resultsIcon.className = 'results-icon';
    if (percentage >= 90) {
        resultsIcon.classList.add('excellent');
        resultsIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        resultsTitle.textContent = 'Outstanding! 🏆';
        resultsMessage.textContent = 'Excellent work! You have mastered this topic. You\'re ready for real-world API development!';
    } else if (percentage >= 70) {
        resultsIcon.classList.add('good');
        resultsIcon.innerHTML = '<i class="fas fa-star"></i>';
        resultsTitle.textContent = 'Great Job! ⭐';
        resultsMessage.textContent = 'Very good performance! You have a solid understanding. Review the missed questions to perfect your knowledge.';
    } else if (percentage >= 50) {
        resultsIcon.classList.add('average');
        resultsIcon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        resultsTitle.textContent = 'Good Effort! 👍';
        resultsMessage.textContent = 'You\'re on the right track, but there\'s room for improvement. Review the concepts and try again!';
    } else {
        resultsIcon.classList.add('poor');
        resultsIcon.innerHTML = '<i class="fas fa-book-open"></i>';
        resultsTitle.textContent = 'Keep Learning! 📚';
        resultsMessage.textContent = 'Don\'t worry! Learning takes time. Review the materials, practice more, and try the quiz again.';
    }

    // Scroll to results
    document.getElementById('quiz-results').scrollIntoView({ behavior: 'smooth' });

    showToast('Quiz completed! Check your results.', 'success');
}

// ==================== QUIZ ACTIONS ====================
function quitQuiz() {
    if (confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
        backToQuizSelect();
        showToast('Quiz cancelled', 'error');
    }
}

function restartQuiz() {
    startQuiz(currentQuiz.level, currentQuiz.questions.length);
}

function reviewAnswers() {
    // Go back to quiz view
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    // Start from beginning
    currentQuiz.currentQuestionIndex = 0;
    showPreviousAnswer();

    showToast('Review mode: Navigate through your answers', 'success');
}

function backToQuizSelect() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';

    // Stop timer if running
    if (window.quizTimerInterval) {
        clearInterval(window.quizTimerInterval);
    }
}

// ==================== PROGRESS UPDATE ====================
function updateQuizProgress() {
    const progress = ((currentQuiz.currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progress}%`;
}

// ==================== TIMER ====================
function startTimer() {
    if (window.quizTimerInterval) {
        clearInterval(window.quizTimerInterval);
    }

    window.quizTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        document.getElementById('quiz-timer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// ==================== UTILITY FUNCTIONS ====================
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==================== KEYBOARD SHORTCUTS FOR QUIZ ====================
document.addEventListener('keydown', (e) => {
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer && quizContainer.style.display === 'block') {
        // Number keys 1-4 to select options
        if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.quiz-option');
            if (options[optionIndex] && !options[optionIndex].classList.contains('disabled')) {
                selectAnswer(optionIndex);
            }
        }
        // Arrow keys for navigation
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
            const nextBtn = document.getElementById('next-btn');
            if (!nextBtn.disabled) {
                nextQuestion();
            }
        }
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.getElementById('prev-btn');
            if (!prevBtn.disabled) {
                previousQuestion();
            }
        }
    }
});

// ==================== INITIALIZE QUIZ ====================
console.log('✅ Quiz system initialized with', 
    Object.keys(quizQuestions).reduce((sum, key) => sum + quizQuestions[key].length, 0), 
    'total questions'
);
// ==================== FINAL INITIALIZATION ====================
console.log('✅ All systems initialized successfully!');
console.log('💡 Tip: Open DevTools (F12) to see API requests in the Network tab');
console.log('🎯 Start your learning journey with the exercises!');

// Track page load time
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${(loadTime / 1000).toFixed(2)} seconds`);
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Don't show error toast for every error, just log it
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
