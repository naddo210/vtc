import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);       // inner text
  const navItemsRef = useRef(null);   // <ul>
  const logoWrapRef = useRef(null);   // animated wrapper
  const phRef = useRef(null);         // placeholder for final layout
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileCourses, setShowMobileCourses] = useState(false);
  
  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset dropdown state when menu closes
      setShowMobileCourses(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!navbarRef.current || !logoRef.current || !navItemsRef.current || !logoWrapRef.current) return;

    const SCROLL_THRESHOLD = 100;
    const FINAL_NAV_HEIGHT = 80;
    const FINAL_LEFT_PADDING = 24;
    
    // Check if device is mobile/small screen (max-width: 768px)
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    
    // Skip animation setup for mobile devices
    if (isMobileDevice) {
      // Set navbar to final state immediately for mobile
      gsap.set(navbarRef.current, {
        backgroundColor: "rgba(203, 21, 23, 1)",
        height: FINAL_NAV_HEIGHT,
        paddingTop: 16,
        paddingBottom: 16,
      });
      gsap.set(logoRef.current, { scale: 1, opacity: 1 });
      gsap.set(navItemsRef.current.children, { opacity: 1, x: 0, y: 0 });
      return; // Exit early for mobile devices
    }

    // Add will-change for smooth GPU-backed transforms (desktop only)
    logoWrapRef.current.style.willChange = "transform";
    logoRef.current.style.willChange = "transform, opacity";

    const setHeroState = () => {
      centerAbsolute(logoWrapRef.current);
      gsap.set(navbarRef.current, {
        backgroundColor: "rgba(203, 21, 23, 0.9)",
        height: 200,
        paddingTop: 60,
        paddingBottom: 60,
      });
      gsap.set(logoRef.current, { scale: 2.5, opacity: 0 });
      gsap.set(navItemsRef.current.children, { opacity: 0, x: 40, y: -10 });
      gsap.to(logoRef.current, { scale: 2.5, opacity: 1, duration: 0.8, ease: "power3.out" });
    };

    const setFinalState = () => {
      gsap.set(navbarRef.current, {
        backgroundColor: "rgba(203, 21, 23, 1)",
        height: FINAL_NAV_HEIGHT,
        paddingTop: 16,
        paddingBottom: 16,
      });
      ensurePlaceholder();
      // Place logo in flex flow at the placeholder spot
      gsap.set(logoWrapRef.current, {
        position: "static",
        left: "auto",
        top: "auto",
        x: 0,
        y: 0,
        transform: "none",
        zIndex: "auto",
      });
      gsap.set(logoRef.current, { scale: 1, opacity: 1 });
      gsap.set(navItemsRef.current.children, { opacity: 1, x: 0, y: 0 });
    };

    // Create a detached clone to measure final center without mutating live DOM
    const measureFinalTargetDetached = () => {
      const nav = navbarRef.current;
      const container = queryContainer(nav);

      // Create a detached measurement container
      const measureRoot = document.createElement("div");
      measureRoot.style.cssText =
        "position:fixed;left:-99999px;top:0;visibility:hidden;width:100vw;";
      document.body.appendChild(measureRoot);

      // Clone minimal structure for measurement
      const navClone = nav.cloneNode(false);
      const inner = document.createElement("div");
      inner.className = "container";
      inner.style.cssText = "display:flex;align-items:center;justify-content:space-between;padding-left:24px;padding-right:24px;height:auto;";
      const leftSlot = document.createElement("div");
      leftSlot.style.cssText = "flex-shrink:0;display:inline-flex;";
      const logoClone = logoWrapRef.current.cloneNode(true);

      // Assemble clone tree
      navClone.style.cssText = `height:${FINAL_NAV_HEIGHT}px;padding-top:16px;padding-bottom:16px;`;
      measureRoot.appendChild(navClone);
      navClone.appendChild(inner);
      inner.appendChild(leftSlot);
      leftSlot.appendChild(logoClone);

      // Force layout
      // eslint-disable-next-line no-unused-expressions
      navClone.offsetHeight;

      // Measure target center from clone
      const leftEdge = inner.getBoundingClientRect().left + FINAL_LEFT_PADDING;
      const wrapRect = logoClone.getBoundingClientRect();
      const targetCenterX = leftEdge + wrapRect.width / 2;
      const targetCenterY = navClone.getBoundingClientRect().top + FINAL_NAV_HEIGHT / 2;

      // Cleanup
      document.body.removeChild(measureRoot);
      return { targetCenterX, targetCenterY };
    };

    const ensurePlaceholder = () => {
      if (phRef.current) return phRef.current;
      const ph = document.createElement("div");
      ph.style.cssText = "width:0;height:0;margin-left:0;display:inline-flex;";
      phRef.current = ph;
      // Insert placeholder before the logo wrapper so it marks the final spot
      const container = navbarRef.current.querySelector(".container");
      if (container) {
        container.insertBefore(ph, container.firstChild);
      }
      return ph;
    };

    const commitToFlowAtPlaceholder = () => {
      // Replace placeholder with the real logo wrapper in flow
      const ph = ensurePlaceholder();
      const container = navbarRef.current.querySelector(".container");
      if (container && ph.parentNode === container) {
        container.replaceChild(logoWrapRef.current, ph);
      }
      logoWrapRef.current.style.position = "static";
      logoWrapRef.current.style.left = "auto";
      logoWrapRef.current.style.top = "auto";
      logoWrapRef.current.style.transform = "none";
      logoWrapRef.current.style.removeProperty("z-index");
    };

    const animateToFinal = () => {
      // Batch read/write: read in rAF, then run a timeline
      requestAnimationFrame(() => {
        const { targetCenterX, targetCenterY } = measureFinalTargetDetached();

        const startWrapRect = logoWrapRef.current.getBoundingClientRect();
        const startCenterX = startWrapRect.left + startWrapRect.width / 2;
        const startCenterY = startWrapRect.top + startWrapRect.height / 2;

        const deltaX = targetCenterX - startCenterX;
        const deltaY = targetCenterY - startCenterY;

        // Stage nav items but do not animate until logo finishes
        gsap.set(navItemsRef.current.children, { opacity: 0, x: 40, y: -10 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            // After logo lands, slide in nav items
            gsap.to(navItemsRef.current.children, {
              opacity: 1,
              x: 0,
              y: 0,
              stagger: 0.08,
              duration: 0.5,
              ease: "power3.out",
            });
            // Commit to flow at placeholder to avoid any snap
            commitToFlowAtPlaceholder();
          },
        });

        // Parallel: navbar shrink + logo move + logo scale
        tl.to(navbarRef.current, {
          backgroundColor: "rgba(203, 21, 23, 1)",
          height: FINAL_NAV_HEIGHT,
          paddingTop: 16,
          paddingBottom: 16,
          duration: 0.75,
        }, 0);

        tl.to(logoWrapRef.current, {
          x: `+=${deltaX}`,
          y: `+=${deltaY}`,
          duration: 0.75,
        }, 0);

        tl.to(logoRef.current, {
          scale: 1,
          duration: 0.75,
        }, 0);
      });
    };

    // Initialize based on scroll
    const alreadyScrolled = window.scrollY > SCROLL_THRESHOLD;
    if (alreadyScrolled) {
      ensurePlaceholder();
      setFinalState();
    } else {
      // Only set hero state on desktop
      if (!window.matchMedia("(max-width: 768px)").matches) {
        setHeroState();
      }
    }

    // Desktop one-shot trigger - only for desktop devices
    const mq = window.matchMedia("(min-width: 768px)");
    let transitioned = alreadyScrolled;
    const onScroll = () => {
      // Skip all animation logic on mobile devices
      if (!mq.matches) return;
      if (transitioned) return;
      if (window.scrollY <= SCROLL_THRESHOLD) return;
      transitioned = true;
      ensurePlaceholder();
      animateToFinal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <nav ref={navbarRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 h-full">
          {/* Animated logo wrapper */}
          <div ref={logoWrapRef} className="flex-shrink-0">
            <div ref={logoRef}>
              <Link to="/" className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-wide whitespace-nowrap drop-shadow-lg block">
                VTC SMART CLASSES<sup className="text-xs sm:text-sm">®</sup>
              </Link>
            </div>
          </div>

          {/* Nav items */}
          <ul ref={navItemsRef} className="flex space-x-6 text-white font-semibold hidden md:flex">
            <li><Link to="/about" className="hover:text-gray-200 transition-colors">About</Link></li>
            <li className="relative group">
              <div className="flex items-center cursor-pointer hover:text-gray-200 transition-colors">
                <span>Courses</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/courses/neet" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">NEET</Link>
                <Link to="/courses/jee" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">JEE</Link>
                <Link to="/courses/mht-cet" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">MHT-CET</Link>
                <Link to="/courses/foundation-builder" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">Foundation Builder</Link>
                <Link to="/courses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">All Courses</Link>
              </div>
            </li>
            <li><Link to="/events" className="hover:text-gray-200 transition-colors">Events</Link></li>
              <li><Link to="/gallery" className="hover:text-gray-200 transition-colors">Gallery</Link></li>
              <li><Link to="/resources" className="hover:text-gray-200 transition-colors">Resources</Link></li>
              <li><Link to="/student-zone" className="hover:text-gray-200 transition-colors">Student Zone</Link></li>
          
            <li><Link to="/contact" className="flex items-center hover:text-gray-200 transition-colors"><FaPhone className="mr-1" /> Contact Us</Link></li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="text-white text-2xl md:hidden hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-red-800 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes className="animate-pulse" /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`fixed top-0 left-0 w-full h-full z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} 
        style={{ backgroundColor: "#cb1517" }}
      >
        <div className="pt-24 px-8 overflow-y-auto h-full pb-20">
          <ul className="space-y-6 text-white text-lg font-semibold">
            <li><Link to="/about" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
            <li className="relative">
              <div 
                className="flex justify-between items-center py-2 px-3 hover:bg-red-800 rounded-lg transition-colors cursor-pointer"
                onClick={() => setShowMobileCourses(!showMobileCourses)}
              >
                <span>Courses</span>
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform duration-300 ${showMobileCourses ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              {showMobileCourses && (
                <ul className="ml-4 mt-2 space-y-2 animate-fadeIn">
                  <li><Link to="/courses/foundation-builder" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Foundation Builder</Link></li>
                  <li><Link to="/courses/neet" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>NEET</Link></li>
                  <li><Link to="/courses/jee" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>JEE</Link></li>
                  <li><Link to="/courses/mht-cet" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>MHT-CET</Link></li>
                  <li><Link to="/courses" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>All Courses</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/events" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Events</Link></li>
            <li><Link to="/gallery" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link></li>
            <li><Link to="/resources" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link></li>
            <li><Link to="/student-zone" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Student Zone</Link></li>
            <li><Link to="/how-to-apply" className="block py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}>How to Apply</Link></li>
            <li><Link to="/contact" className="flex items-center py-2 px-3 hover:bg-red-800 rounded-lg transition-colors" onClick={() => setIsMobileMenuOpen(false)}><FaPhone className="mr-2" /> Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}

function centerAbsolute(el) {
  gsap.set(el, {
    position: "absolute",
    left: "50%",
    top: "50%",
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
    zIndex: 70,
  });
}

function queryContainer(navEl) {
  const doc = navEl.ownerDocument;
  const container = doc.querySelector(".container");
  return container || navEl;
}

export default Navbar;
