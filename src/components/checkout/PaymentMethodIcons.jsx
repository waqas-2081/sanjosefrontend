import React from 'react';

export function StripeMark({ active }) {
  return (
    <i
      className={`fa-solid fa-credit-card pcm-fa-mark${active ? ' pcm-fa-mark--active' : ''}`}
      aria-hidden="true"
    />
  );
}

export function PayPalMark({ active }) {
  return (
    <i
      className={`fa-brands fa-paypal pcm-fa-mark${active ? ' pcm-fa-mark--active' : ''}`}
      aria-hidden="true"
    />
  );
}

export function CashAppMark({ active }) {
  return (
    <span className={`pcm-cash-mark${active ? ' pcm-cash-mark--active' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" width="32" height="32">
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="8"
          fill={active ? '#fff' : '#00d632'}
        />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontSize="18"
          fontWeight="800"
          fontFamily="Arial, sans-serif"
          fill={active ? '#00d632' : '#fff'}
        >
          $
        </text>
      </svg>
    </span>
  );
}
