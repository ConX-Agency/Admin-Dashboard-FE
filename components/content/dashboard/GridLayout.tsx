import React, { useEffect, useMemo, useState } from 'react';
const { Responsive, WidthProvider } = require('react-grid-layout');
import {
  AboutLayouts,
  AllLayouts,
  MediaLayouts,
  ProjectsLayouts,
  keys,
} from "@/lib/layout.helper";
import Blocks from "./Blocks";
import { LayoutProps, TabKey } from '@/data/dashboard';
import { motion } from "framer-motion";

function DashboardGridLayout({ tab }: LayoutProps) {
  const [currentLayout, setCurrentLayout] = useState(AllLayouts);
  const [rowHeight, setRowHeight] = useState(140);
  const [isDraggable, setIsDraggable] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false); 

  useEffect(() => {
    switch (tab) {
      case TabKey.All:
        setCurrentLayout(AllLayouts);
        break;
      case TabKey.Campaigns:
        setCurrentLayout(AboutLayouts);
        break;
      case TabKey.Influencers:
        setCurrentLayout(AboutLayouts);
        break;
      case TabKey.Clients:
        setCurrentLayout(ProjectsLayouts);
        break;
      case TabKey.Socials:
        setCurrentLayout(MediaLayouts);
        break;
      case TabKey.Financials:
        setCurrentLayout(MediaLayouts);
        break;
      default:
        setCurrentLayout(AllLayouts);
    }
  }, [tab]);

  useEffect(() => {
    const handleResize = () => {
      const width = document.documentElement.clientWidth;

      if (width <= 374) {
        setRowHeight(140);
      } else if (width >= 375 && width <= 800) {
        setRowHeight(170);
      } else if (width > 800 && width <= 1200) {
        setRowHeight(188);
      } else if (width > 1200) {
        setRowHeight(280);
      }

      if (width <= 800) {
        setIsDraggable(false);
      } else {
        setIsDraggable(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 300); 

    return () => clearTimeout(timer);
  }, []);

  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    []
  );

  return (
    <div className="w-full h-full mx-auto mb-0 relative max-w-[1201px] grid-div-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="m-auto grid-container"
      >
        <ResponsiveReactGridLayout
          className="m-auto grid-container"
          breakpoints={{ lg: 1200, md: 800, sm: 0 }}
          cols={{ lg: 4, md: 4, sm: 2 }}
          rowHeight={rowHeight}
          isDraggable={isDraggable}
          draggableCancel=".noDrag"
          layouts={currentLayout}
          margin={[15, 15]}
        >
          {keys.map((key) => {
            const isFocused = currentLayout.lg.find(item => item.i === key)?.isFocused as boolean;
            return (
              <div
                key={key}
                className={`bg-nav-light flex justify-center items-center shadow-[inset_0_0_0_2px_rgba(0,0,0,0)] 
                  rounded-3xl text-2xl text-[#1d1d1f] visible cursor-grab active:cursor-grabbing grid-item ${showAnimation ? 'animating' : 'initial'}`}
              >
                <Blocks keyProp={key} isFocused={isFocused} />
              </div>
            );
          })}
        </ResponsiveReactGridLayout>
      </motion.div>
    </div>
  );
}

export default DashboardGridLayout;
