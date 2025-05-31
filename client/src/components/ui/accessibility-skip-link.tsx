import { memo } from 'react';
import { useSkipLink } from '@/hooks/use-accessibility';

interface SkipLinkProps {
  readonly targetId: string;
  readonly label: string;
}

const AccessibilitySkipLink = memo<SkipLinkProps>(({ targetId, label }) => {
  const { skipLinkRef, onSkipLinkClick } = useSkipLink(targetId);

  return (
    <a
      ref={skipLinkRef}
      href={`#${targetId}`}
      onClick={onSkipLinkClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sage focus:text-white focus:rounded-md focus:shadow-lg"
      tabIndex={0}
    >
      {label}
    </a>
  );
});

AccessibilitySkipLink.displayName = 'AccessibilitySkipLink';

export default AccessibilitySkipLink;