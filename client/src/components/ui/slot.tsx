import React from 'react'

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  asChild?: boolean
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, asChild = false, ...props }: SlotProps, ref: React.Ref<HTMLElement>) => {
    // If asChild is true, we clone the first child and merge the props
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ...children.props,
        ref: ref ? (mergedRef: HTMLElement) => {
          // Handle both function refs and ref objects
          if (typeof ref === 'function') ref(mergedRef)
          else if (ref && 'current' in ref) ref.current = mergedRef
          
          const { ref: childRef } = children.props
          if (typeof childRef === 'function') childRef(mergedRef)
          else if (childRef && 'current' in childRef) childRef.current = mergedRef
        } : children.props.ref,
      })
    }
    
    return <span ref={ref} {...props}>{children}</span>
  }
)

Slot.displayName = 'Slot'
