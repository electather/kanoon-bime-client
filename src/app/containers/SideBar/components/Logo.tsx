import React from 'react';
import { Link } from 'react-router-dom';

export const Logo: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <div className="isoLogoWrapper">
    {collapsed ? (
      <div>
        <h3>
          <Link to="/dashboard">
            {/* <i className={siteConfig.siteIcon} /> */}
            ICON
          </Link>
        </h3>
      </div>
    ) : (
      <h3>
        {/* <Link to="/dashboard">{siteConfig.siteName}</Link> */}
        SiteName
      </h3>
    )}
  </div>
);
