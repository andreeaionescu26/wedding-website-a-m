import React from 'react';

const LeafAnimation = ({ size = 'large', variant = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
    xlarge: 'w-40 h-40',
  };

  // Different rotation targets based on variant
  const rotationConfigs = {
    default: '10deg',      // Normal upright (password protection)
    horizontal: '90deg',  // Rotates to horizontal (RSVP form)
    inverted: '180deg',   // Upside down (landing page)
  };

  const finalRotation = rotationConfigs[variant] || rotationConfigs.default;

  return (
    <div className={`leaf-animation-wrapper ${className}`}>
      <style>{`
        .leaf-animation-wrapper {
          position: relative;
          display: inline-block;
        }

        /* Much slower reveal - starts with just a tiny bit visible */
        @keyframes revealFromTop {
          0% {
            clip-path: inset(0 0 99.5% 0);
            opacity: 0;
          }
          100% {
            clip-path: inset(0 0 0 0);
            opacity: 1;
          }
        }

        /* Rotation during reveal - ends at different angles */
        @keyframes gentleRotateIn-${variant} {
          0% {
            transform: translateY(15px) rotate(-8deg) scale(0.9);
          }
          70% {
            transform: translateY(0) rotate(-4deg) scale(0.95);
          }
          100% {
            transform: translateY(0) rotate(${finalRotation}) scale(1);
          }
        }

        /* Subtle continuous breathing after animation */
        @keyframes gentleBreath-${variant} {
          0%, 100% {
            transform: scale(1) rotate(${finalRotation}) translateY(0);
          }
          50% {
            transform: scale(1.02) rotate(${finalRotation}) translateY(-2px);
          }
        }

        .leaf-animation-wrapper img {
          clip-path: inset(0 0 99.5% 0);
          opacity: 0;
          animation: 
            revealFromTop 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
            gentleRotateIn-${variant} 4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
            gentleBreath-${variant} 4s ease-in-out 4.5s infinite;
          position: relative;
          z-index: 2;
        }

        /* Balanced glow */
        .leaf-animation-wrapper::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 130px;
          height: 130px;
          background: radial-gradient(
            circle,
            rgba(141, 155, 112, 0.57) 0%,
            rgba(141, 155, 112, 0.38) 22%,
            rgba(141, 155, 112, 0.2) 42%,
            rgba(141, 155, 112, 0.08) 62%,
            transparent 80%
          );
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          filter: blur(18px);
        }

        @keyframes balancedGlow {
          0% {
            transform: translate(-50%, -50%) scale(0.4);
            opacity: 0;
          }
          35% {
            opacity: 0.9;
          }
          60% {
            opacity: 0.75;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.6);
            opacity: 0;
          }
        }

        .leaf-animation-wrapper::after {
          animation: balancedGlow 2.1s ease-out 4.2s 1;
        }
      `}</style>
      
      <img 
        src="/leaf_icon.png" 
        alt="Leaf"
        className={sizeClasses[size]}
      />
    </div>
  );
};

export default LeafAnimation;