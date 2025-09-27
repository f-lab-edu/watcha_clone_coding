import React from 'react';

const FacebookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h48v48H0z" />
        <path
          fill="currentColor"
          fillRule="nonzero"
          d="M32.5 12.44h-4.18c-.82 0-2.66.16-2.66 3.34v4.08h6.84l-1.14 6.31h-5.7V42.5H19.2V26.17h-5.7v-6.3h5.7v-5.58s-.22-7.79 7.98-7.79h5.32z"
        />
      </g>
    </svg>
  );
};

export default FacebookIcon;
