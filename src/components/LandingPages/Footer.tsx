import { Link } from "@heroui/link";

import { TwitterIcon } from "@/components/icons";

// Email icon component
const EmailIcon = ({
  className = "",
  size = 20,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    className={className}
    fill="none"
    height={size}
    stroke="currentColor"
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

// Location icon component
const LocationIcon = ({
  className = "",
  size = 20,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    className={className}
    fill="none"
    height={size}
    stroke="currentColor"
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

// Facebook icon component
const FacebookIcon = ({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
      fill="currentColor"
    />
  </svg>
);

// Instagram icon component
const InstagramIcon = ({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"
      fill="currentColor"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0 max-w-xs">
            <img alt="FitFlo Logo" className="h-14 mb-2" src="/logoicon.svg" />
            <p className="text-gray-600">
              FitFlo - Your personal health companion.
            </p>
            <p className="text-gray-600">
              Helping you track symptoms and manage healthcare.
            </p>
            <p className="mt-4 text-gray-600">Made with ❤️ in Indonesia.</p>
          </div>

          {/* Right side content wrapper */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 md:ml-auto">
            {/* Contact Information */}
            <div className="mb-6 md:mb-0">
              <p className="text-gray-600 mb-2 text-right">
                <EmailIcon className="inline-block h-5 w-5 mr-2" />
                hello@fitflo.site
              </p>
              <p className="text-gray-600 text-right">
                <LocationIcon className="inline-block h-5 w-5 mr-2" />
                Bandung, Indonesia
              </p>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-right">
              <div>
                <h5 className="text-gray-800 font-medium mb-4">Product</h5>
                <ul>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      API
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-gray-800 font-medium mb-4">Company</h5>
                <ul>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-gray-800 font-medium mb-4">Legal</h5>
                <ul>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-600 hover:text-blue-500" href="#">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; 2024 FitFlo - All rights reserved
          </p>
          <div className="flex space-x-4">
            <Link className="text-gray-600 hover:text-blue-500" href="#">
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link className="text-gray-600 hover:text-blue-500" href="#">
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link className="text-gray-600 hover:text-blue-500" href="#">
              <InstagramIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
