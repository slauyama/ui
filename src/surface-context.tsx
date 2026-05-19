import { createContext, ReactNode, useContext } from "react";
import { Surface } from "./surfaces";

const SurfaceContext = createContext<Surface>("surface");

export function SurfaceProvider({
  surface,
  children,
}: {
  surface: Surface;
  children: ReactNode;
}) {
  return (
    <SurfaceContext.Provider value={surface}>{children}</SurfaceContext.Provider>
  );
}

export function useSurface(): Surface {
  return useContext(SurfaceContext);
}
