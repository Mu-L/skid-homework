import { useEffect, useRef } from "react";
import JXG, { Board } from "jsxgraph";

import "jsxgraph/distrib/jsxgraph.css";

export type JSXGraphDiagramProps = {
  jesseScript: string;
};

export default function JSXGraphDiagram({ jesseScript }: JSXGraphDiagramProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const boardInstance = useRef<Board>(null);

  useEffect(() => {
    // Initialize the board
    if (boardRef.current) {
      boardInstance.current = JXG.JSXGraph.initBoard(boardRef.current.id, {
        boundingbox: [-1, 10, 11, -10],
        axis: true,
        showCopyright: false,
        keepaspectratio: false,
      });

      // Parse and execute the JesseCode
      boardInstance.current.jc.parse(jesseScript);
    }

    // Cleanup on unmount to prevent memory leaks and duplicate boards
    return () => {
      if (boardInstance.current) {
        JXG.JSXGraph.freeBoard(boardInstance.current);
      }
    };
  }, [jesseScript]);

  return (
    <div style={{ padding: "20px" }}>
      <div
        id="jxgbox"
        ref={boardRef}
        style={{
          width: "600px",
          height: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}
