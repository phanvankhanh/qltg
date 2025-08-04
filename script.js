// Todo Manager Application
class TodoManager {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.editingTodoId = null;
        
        this.initializeElements();
        this.bindEvents();
        this.renderTodos();
        this.updateStats();
    }

    initializeElements() {
        // Form elements
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        
        // List elements
        this.todoList = document.getElementById('todoList');
        
        // Stats elements
        this.totalTodos = document.getElementById('totalTodos');
        this.completedTodos = document.getElementById('completedTodos');
        this.pendingTodos = document.getElementById('pendingTodos');
        
        // Filter elements
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        // Clear buttons
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.clearAllBtn = document.getElementById('clearAll');
        
        // Modal elements
        this.editModal = document.getElementById('editModal');
        this.editForm = document.getElementById('editForm');
        this.editInput = document.getElementById('editInput');
        this.closeModalBtn = document.getElementById('closeModal');
        this.cancelEditBtn = document.getElementById('cancelEdit');
    }

    bindEvents() {
        // Form submission
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Clear buttons
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });

        this.clearAllBtn.addEventListener('click', () => {
            this.clearAll();
        });

        // Modal events
        this.editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEdit();
        });

        this.closeModalBtn.addEventListener('click', () => {
            this.closeModal();
        });

        this.cancelEditBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal when clicking outside
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: this.generateId(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
        this.todoInput.value = '';
        this.todoInput.focus();

        // Show success message
        this.showNotification('Công việc đã được thêm thành công!', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            this.editingTodoId = id;
            this.editInput.value = todo.text;
            this.showModal();
        }
    }

    saveEdit() {
        const text = this.editInput.value.trim();
        if (!text) return;

        const todo = this.todos.find(t => t.id === this.editingTodoId);
        if (todo) {
            todo.text = text;
            this.saveTodos();
            this.renderTodos();
            this.closeModal();
            this.showNotification('Công việc đã được cập nhật!', 'success');
        }
    }

    deleteTodo(id) {
        if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification('Công việc đã được xóa!', 'info');
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        this.renderTodos();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'pending':
                return this.todos.filter(t => !t.completed);
            default:
                return this.todos;
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('Không có công việc nào đã hoàn thành!', 'warning');
            return;
        }

        if (confirm(`Bạn có chắc chắn muốn xóa ${completedCount} công việc đã hoàn thành?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification(`${completedCount} công việc đã được xóa!`, 'success');
        }
    }

    clearAll() {
        if (this.todos.length === 0) {
            this.showNotification('Không có công việc nào để xóa!', 'warning');
            return;
        }

        if (confirm(`Bạn có chắc chắn muốn xóa tất cả ${this.todos.length} công việc?`)) {
            this.todos = [];
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification('Tất cả công việc đã được xóa!', 'success');
        }
    }

    showModal() {
        this.editModal.style.display = 'block';
        this.editInput.focus();
        this.editInput.select();
    }

    closeModal() {
        this.editModal.style.display = 'none';
        this.editingTodoId = null;
        this.editInput.value = '';
    }

    renderTodos() {
        const filteredTodos = this.getFilteredTodos();
        
        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                    <p style="color: #666; text-align: center;">
                        ${this.currentFilter === 'all' ? 'Chưa có công việc nào. Hãy thêm công việc đầu tiên!' : 
                          this.currentFilter === 'completed' ? 'Chưa có công việc nào hoàn thành.' : 
                          'Chưa có công việc nào đang làm.'}
                    </p>
                </div>
            `;
            return;
        }

        this.todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="todoManager.toggleTodo('${todo.id}')">
                    ${todo.completed ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="action-btn edit-btn" onclick="todoManager.editTodo('${todo.id}')" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="todoManager.deleteTodo('${todo.id}')" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `).join('');
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;

        this.totalTodos.textContent = total;
        this.completedTodos.textContent = completed;
        this.pendingTodos.textContent = pending;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#ffc107' : '#17a2b8'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
            animation: slideIn 0.3s ease;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);

        // Add slideOut animation
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(slideOutStyle);
    }
}

// Initialize the application
const todoManager = new TodoManager();

// Add some sample todos for demonstration
if (todoManager.todos.length === 0) {
    const sampleTodos = [
        { text: 'Hoàn thành báo cáo dự án', completed: false },
        { text: 'Gọi điện cho khách hàng', completed: true },
        { text: 'Chuẩn bị presentation cho meeting', completed: false },
        { text: 'Đọc sách về quản lý thời gian', completed: false }
    ];

    sampleTodos.forEach((sample, index) => {
        const todo = {
            id: todoManager.generateId(),
            text: sample.text,
            completed: sample.completed,
            createdAt: new Date(Date.now() - (index * 60000)).toISOString()
        };
        todoManager.todos.push(todo);
    });

    todoManager.saveTodos();
    todoManager.renderTodos();
    todoManager.updateStats();
} 