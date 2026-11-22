import React from 'react';
import { Magnetic } from '../../motion/Magnetic';

interface RollOverLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  magnetic?: boolean;
  className?: string;
}

export const RollOverLink: React.FC<RollOverLinkProps> = ({
  children,
  icon,
  magnetic = true,
  className = '',
  ...props
}) => {
  const content = (
    <a
      className={`group relative overflow-hidden inline-flex items-center gap-2 cursor-pointer transition-colors ${className}`}
      {...props}
    >
      <div className="relative overflow-hidden h-[1.3em] flex flex-col justify-start">
        <span className="block transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
          {children}
        </span>
        <span
          className="absolute inset-0 block transform translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
          aria-hidden="true"
        >
          {children}
        </span>
      </div>
      {icon && (
        <span className="transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </a>
  );

  if (magnetic) {
    return <Magnetic strength={0.3}>{content}</Magnetic>;
  }
  return content;
};
