import { toast } from 'sonner'

/**
 * Enterprise-grade notification system with color-coded messages
 * 
 * Color Coding:
 * - Success (Green): Created, Saved, Filed Successfully, Downloaded, Exported, Transferred
 * - Error (Red): Filing Error, Delete Error, Save Error, etc.
 * - Warning (Orange): Validation warnings, cautions
 * - Info (Blue): General information, processing status
 */

export const notifications = {
  created: (entityType: string, entityName?: string) => {
    const message = entityName 
      ? `${entityType} "${entityName}" created successfully`
      : `${entityType} created successfully`
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  saved: (entityType: string, entityName?: string) => {
    const message = entityName 
      ? `${entityType} "${entityName}" saved successfully`
      : `${entityType} saved successfully`
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  deleted: (entityType: string, entityName?: string) => {
    const message = entityName 
      ? `${entityType} "${entityName}" deleted successfully`
      : `${entityType} deleted successfully`
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  downloaded: (fileName: string) => {
    toast.success(`File "${fileName}" downloaded successfully`, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  exported: (fileType: string, fileName?: string) => {
    const message = fileName 
      ? `${fileType} exported as "${fileName}" successfully`
      : `${fileType} exported successfully`
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  uploaded: (fileName: string) => {
    toast.success(`File "${fileName}" uploaded successfully`, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  transferred: (entityType: string, destination?: string) => {
    const message = destination 
      ? `${entityType} transferred to ${destination} successfully`
      : `${entityType} transferred successfully`
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  filed: (entityType: string, entityName?: string) => {
    const message = entityName 
      ? `${entityType} "${entityName}" filed successfully`
      : `${entityType} filed successfully`
    toast.success(message, {
      duration: 5000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600',
        fontSize: '15px'
      }
    })
  },

  filingError: (entityType: string, errorMessage?: string) => {
    const message = errorMessage 
      ? `Filing error for ${entityType}: ${errorMessage}`
      : `Error filing ${entityType}. Please check the details and try again.`
    toast.error(message, {
      duration: 6000,
      style: {
        background: '#ef4444',
        color: 'white',
        border: '2px solid #dc2626',
        fontWeight: '600'
      }
    })
  },

  error: (title: string, message?: string) => {
    const fullMessage = message ? `${title}: ${message}` : title
    toast.error(fullMessage, {
      duration: 5000,
      style: {
        background: '#ef4444',
        color: 'white',
        border: '2px solid #dc2626',
        fontWeight: '600'
      }
    })
  },

  validationError: (message: string) => {
    toast.error(message, {
      duration: 5000,
      style: {
        background: '#ef4444',
        color: 'white',
        border: '2px solid #dc2626',
        fontWeight: '600'
      }
    })
  },

  warning: (message: string) => {
    toast.warning(message, {
      duration: 5000,
      style: {
        background: '#f97316',
        color: 'white',
        border: '2px solid #ea580c',
        fontWeight: '600'
      }
    })
  },

  info: (message: string) => {
    toast.info(message, {
      duration: 4000,
      style: {
        background: '#3b82f6',
        color: 'white',
        border: '2px solid #2563eb',
        fontWeight: '600'
      }
    })
  },

  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        background: '#001f3f',
        color: 'white',
        border: '2px solid #003366',
        fontWeight: '600'
      }
    })
  },

  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId)
  },

  dismissAll: () => {
    toast.dismiss()
  },

  imported: (entityType: string, count?: number) => {
    const message = count 
      ? `${count} ${entityType}(s) imported successfully`
      : `${entityType} imported successfully`
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  synced: (entityType: string) => {
    toast.success(`${entityType} synchronized successfully`, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  statusChanged: (entityType: string, newStatus: string) => {
    toast.info(`${entityType} status changed to "${newStatus}"`, {
      duration: 4000,
      style: {
        background: '#3b82f6',
        color: 'white',
        border: '2px solid #2563eb',
        fontWeight: '600'
      }
    })
  },

  approved: (entityType: string, entityName?: string) => {
    const message = entityName 
      ? `${entityType} "${entityName}" approved successfully`
      : `${entityType} approved successfully`
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  rejected: (entityType: string, reason?: string) => {
    const message = reason 
      ? `${entityType} rejected: ${reason}`
      : `${entityType} rejected`
    toast.error(message, {
      duration: 5000,
      style: {
        background: '#ef4444',
        color: 'white',
        border: '2px solid #dc2626',
        fontWeight: '600'
      }
    })
  },

  emailSent: (recipient?: string) => {
    const message = recipient 
      ? `Email sent to ${recipient} successfully`
      : `Email sent successfully`
    toast.success(message, {
      duration: 4000,
      style: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      }
    })
  },

  custom: (message: string, type: 'success' | 'error' | 'warning' | 'info', duration: number = 4000) => {
    const styles = {
      success: {
        background: '#10b981',
        color: 'white',
        border: '2px solid #059669',
        fontWeight: '600'
      },
      error: {
        background: '#ef4444',
        color: 'white',
        border: '2px solid #dc2626',
        fontWeight: '600'
      },
      warning: {
        background: '#f97316',
        color: 'white',
        border: '2px solid #ea580c',
        fontWeight: '600'
      },
      info: {
        background: '#3b82f6',
        color: 'white',
        border: '2px solid #2563eb',
        fontWeight: '600'
      }
    }

    toast[type](message, {
      duration,
      style: styles[type]
    })
  }
}

export default notifications
