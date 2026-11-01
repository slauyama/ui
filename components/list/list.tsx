import { Children, HTMLAttributes, isValidElement } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Divider } from "../divider/divider";
import { ListItem } from "./listItem";

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  dividers?: boolean;
}

const STANDARD_DECELERATE = [0, 0, 0, 1] as const;

/** Rows added after the first render slide in from the left; removed rows slide out to the right as their space closes. */
function ListRoot({
  children,
  dividers = false,
  className = "",
  style,
  ...rest
}: ListProps) {
  const reduceMotion = useReducedMotion();
  const rows = Children.toArray(children).filter(isValidElement);
  return (
    <div
      className={`flex flex-col py-2 m-0 list-none bg-transparent rounded-[inherit] ${className}`}
      role="group"
      style={style}
      {...rest}
    >
      <AnimatePresence initial={false}>
        {rows.map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, height: 0, x: -20, overflow: "hidden" }}
            animate={{
              opacity: 1,
              height: "auto",
              x: 0,
              transition: {
                duration: reduceMotion ? 0 : 0.25,
                ease: STANDARD_DECELERATE,
              },
              transitionEnd: { overflow: "visible" },
            }}
            exit={{
              opacity: 0,
              height: 0,
              x: 24,
              overflow: "hidden",
              transition: {
                duration: reduceMotion ? 0 : 0.2,
                ease: STANDARD_DECELERATE,
              },
            }}
          >
            {row}
            {dividers && i < rows.length - 1 ? <Divider /> : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export const List = Object.assign(ListRoot, { Item: ListItem });
