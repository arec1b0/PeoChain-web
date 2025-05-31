// Advanced State Management - Modular Zustand Architecture
import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Type-safe state interfaces
export interface UIState {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  modalStack: string[]
  notifications: Notification[]
  loadingStates: Record<string, boolean>
  errors: Record<string, string | null>
}

export interface AppState {
  user: User | null
  preferences: UserPreferences
  cache: Record<string, unknown>
  networkStats: NetworkStats
  lastUpdated: number
}

export interface AnimationState {
  reducedMotion: boolean
  currentTransitions: Set<string>
  pageTransition: {
    isTransitioning: boolean
    direction: 'forward' | 'backward' | null
    previousRoute: string | null
  }
}

interface Notification {
  readonly id: string
  readonly type: 'success' | 'error' | 'warning' | 'info'
  readonly title: string
  readonly message: string
  readonly timestamp: number
  readonly duration?: number
  readonly persistent?: boolean
}

interface User {
  readonly id: string
  readonly username: string
  readonly email: string
  readonly role: 'user' | 'admin'
  readonly preferences: UserPreferences
}

interface UserPreferences {
  readonly theme: 'light' | 'dark' | 'system'
  readonly language: string
  readonly notifications: boolean
  readonly animations: boolean
  readonly accessibility: {
    readonly highContrast: boolean
    readonly reducedMotion: boolean
    readonly screenReader: boolean
  }
}

interface NetworkStats {
  readonly totalTransactions: number
  readonly tps: number
  readonly blockHeight: number
  readonly validators: number
  readonly lastBlockTime: number
}

// UI Store - Local interface state
export const useUIStore = create<UIState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        theme: 'system',
        sidebarOpen: false,
        modalStack: [],
        notifications: [],
        loadingStates: {},
        errors: {},

        // Actions
        setTheme: (theme: 'light' | 'dark' | 'system') => {
          set((state) => {
            state.theme = theme
          })
        },

        toggleSidebar: () => {
          set((state) => {
            state.sidebarOpen = !state.sidebarOpen
          })
        },

        pushModal: (modalId: string) => {
          set((state) => {
            state.modalStack.push(modalId)
          })
        },

        popModal: () => {
          set((state) => {
            state.modalStack.pop()
          })
        },

        addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => {
          set((state) => {
            const newNotification: Notification = {
              ...notification,
              id: crypto.randomUUID(),
              timestamp: Date.now()
            }
            state.notifications.push(newNotification)
          })
        },

        removeNotification: (id: string) => {
          set((state) => {
            state.notifications = state.notifications.filter(n => n.id !== id)
          })
        },

        setLoading: (key: string, loading: boolean) => {
          set((state) => {
            state.loadingStates[key] = loading
          })
        },

        setError: (key: string, error: string | null) => {
          set((state) => {
            state.errors[key] = error
          })
        },

        clearErrors: () => {
          set((state) => {
            state.errors = {}
          })
        }
      })),
      { name: 'ui-store' }
    )
  )
)

// App Store - Global application state with persistence
export const useAppStore = create<AppState>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((set, get) => ({
          user: null,
          preferences: {
            theme: 'system',
            language: 'en',
            notifications: true,
            animations: true,
            accessibility: {
              highContrast: false,
              reducedMotion: false,
              screenReader: false
            }
          },
          cache: {},
          networkStats: {
            totalTransactions: 0,
            tps: 0,
            blockHeight: 0,
            validators: 0,
            lastBlockTime: 0
          },
          lastUpdated: Date.now(),

          // Actions
          setUser: (user: User | null) => {
            set((state) => {
              state.user = user
              state.lastUpdated = Date.now()
            })
          },

          updatePreferences: (preferences: Partial<UserPreferences>) => {
            set((state) => {
              Object.assign(state.preferences, preferences)
              state.lastUpdated = Date.now()
            })
          },

          updateNetworkStats: (stats: Partial<NetworkStats>) => {
            set((state) => {
              Object.assign(state.networkStats, stats)
              state.lastUpdated = Date.now()
            })
          },

          setCacheValue: (key: string, value: unknown) => {
            set((state) => {
              state.cache[key] = value
            })
          },

          clearCache: () => {
            set((state) => {
              state.cache = {}
            })
          }
        }))
      ),
      {
        name: 'app-storage',
        partialize: (state) => ({
          preferences: state.preferences,
          cache: state.cache
        })
      }
    ),
    { name: 'app-store' }
  )
)

// Animation Store - Motion and transition state
export const useAnimationStore = create<AnimationState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        reducedMotion: false,
        currentTransitions: new Set(),
        pageTransition: {
          isTransitioning: false,
          direction: null,
          previousRoute: null
        },

        // Actions
        setReducedMotion: (reduced: boolean) => {
          set((state) => {
            state.reducedMotion = reduced
          })
        },

        startTransition: (transitionId: string) => {
          set((state) => {
            state.currentTransitions.add(transitionId)
          })
        },

        endTransition: (transitionId: string) => {
          set((state) => {
            state.currentTransitions.delete(transitionId)
          })
        },

        startPageTransition: (direction: 'forward' | 'backward', previousRoute: string) => {
          set((state) => {
            state.pageTransition = {
              isTransitioning: true,
              direction,
              previousRoute
            }
          })
        },

        endPageTransition: () => {
          set((state) => {
            state.pageTransition = {
              isTransitioning: false,
              direction: null,
              previousRoute: null
            }
          })
        }
      })),
      { name: 'animation-store' }
    )
  )
)

// Computed selectors for optimized re-renders
export const selectActiveModal = (state: UIState) => 
  state.modalStack[state.modalStack.length - 1] || null

export const selectIsLoading = (key: string) => (state: UIState) => 
  state.loadingStates[key] || false

export const selectError = (key: string) => (state: UIState) => 
  state.errors[key] || null

export const selectUnreadNotifications = (state: UIState) => 
  state.notifications.filter(n => !n.persistent).length

export const selectUserPreferences = (state: AppState) => 
  state.preferences

export const selectNetworkHealth = (state: AppState) => {
  const { tps, validators } = state.networkStats
  return {
    healthy: tps > 1000 && validators > 100,
    tps,
    validators
  }
}

// Type exports for components
export type UIActions = ReturnType<typeof useUIStore>
export type AppActions = ReturnType<typeof useAppStore>
export type AnimationActions = ReturnType<typeof useAnimationStore>