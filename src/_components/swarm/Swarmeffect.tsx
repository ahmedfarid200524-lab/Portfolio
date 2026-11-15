"use client";

import React from "react";
import SwarmCursor from "../../components/SwarmCursor";

const Swarmeffect = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-50">
      <SwarmCursor
        count={800}
        size={2.6}
        spread={90}
        swirl={0.6}
        clickEffect="burst"
      />
    </div>
  );
};

export default Swarmeffect;