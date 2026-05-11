"use client";

import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

/**
 * Lightweight client component that toggles a 'sidebar-open' class on the body.
 * Used exclusively for mobile screens.
 */
export function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Sync state with body class in case it gets changed externally
    const checkState = () => setIsOpen(document.body.classList.contains("sidebar-open"));
    
    // Check initial
    checkState();
    
    // Observe class changes on body
    const observer = new MutationObserver(checkState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    document.body.classList.toggle("sidebar-open");
  };

  return (
    <button
      onClick={toggleMenu}
      aria-label="Toggle Sidebar"
      className="md:hidden p-2 -ml-2 text-gray-500 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors z-[60]"
    >
      {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
    </button>
  );
}
