import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateBreadcrumbs } from '../main';

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  return (
    <nav className="bg-white text-black mt-16 z-10">
      <ul className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            <Link
              to={breadcrumb.path}
              className="text-gray-500 hover:text-gray-700"
            >
              {breadcrumb.breadcrumb}
            </Link>
            {index < breadcrumbs.length - 1 && (
              <span className="text-gray-400 mx-2">{'>'}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
