// app/javascript/controllers/kanban_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["taskList"]
  
  connect() {
    this.setupDraggable()
  }
  
  setupDraggable() {
    this.taskListTargets.forEach(list => {
      list.addEventListener("dragstart", this.handleDragStart.bind(this))
      list.addEventListener("dragend", this.handleDragEnd.bind(this))
      list.addEventListener("dragover", this.handleDragOver.bind(this))
      list.addEventListener("drop", this.handleDrop.bind(this))
    })
  }
  
  handleDragStart(event) {
    const task = event.target.closest(".task-card")
    if (!task) return
    
    event.dataTransfer.setData("text/plain", task.dataset.taskId)
    event.dataTransfer.effectAllowed = "move"
  }
  
  handleDragEnd(event) {
    // Cleanup if needed
  }
  
  handleDragOver(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }
  
  async handleDrop(event) {
    event.preventDefault()
    const taskId = event.dataTransfer.getData("text/plain")
    const newStatus = event.currentTarget.dataset.status
    const taskCard = document.querySelector(`[data-task-id="${taskId}"]`)
    
    if (taskCard && newStatus) {
      // Move card visually
      event.currentTarget.appendChild(taskCard)
      
      // Update status via API
      try {
        const response = await fetch(`/tasks/${taskId}/update_status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": document.querySelector("[name='csrf-token']").content
          },
          body: JSON.stringify({ status: newStatus })
        })
        
        if (!response.ok) {
          throw new Error("Failed to update task status")
        }
        
        // Update counters
        this.updateCounters()
      } catch (error) {
        console.error("Error updating task:", error)
        location.reload()
      }
    }
  }
  
  updateCounters() {
    this.taskListTargets.forEach(list => {
      const count = list.querySelectorAll(".task-card").length
      const badge = list.closest(".card").querySelector(".badge")
      if (badge) badge.textContent = count
    })
  }
}