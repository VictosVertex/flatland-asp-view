'use client';

import { usePathname } from 'next/navigation';

type NavigationBarElementProps = {
  title: string;
  url: string;
  className?: string;
};

export default function NavigationBarElement(props: NavigationBarElementProps) {
  const pathname = usePathname();
  const { title, url, className } = props;

  return (
    <li className={`group relative ${className || ''}`}>
      <a href={url} className="text-l">
        {title}
      </a>
      <span
        className={`absolute bottom-0 left-0 h-[3px] w-0 bg-blue-300 duration-500 group-hover:transition-all ${
          pathname === url || pathname.slice(1) === url
            ? 'w-full'
            : 'group-hover:w-full'
        }`}
      />
    </li>
  );
}

NavigationBarElement.defaultProps = {
  className: '',
};
