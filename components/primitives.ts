import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      orangeToWhite: "from-[#ff8e3c] to-[#eff0f3]",
      whiteToPink: "from-[#fffffe] to-[#d9376e]",
      lightGrayToWhite: "from-[#eff0f3] to-[#fffffe]",
      orangeToPink: "from-[#ff8e3c] to-[#d9376e]",
      charcoalToLightGray: "from-[#2a2a2a] to-[#eff0f3]",
      orangeFade: "from-[#ff8e3c] to-[#fffffe]"
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "orangeToWhite",
        "whiteToPink",
        "lightGrayToWhite",
        "blackToCharcoal",
        "orangeToPink",
        "charcoalToLightGray",
        "orangeFade"
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
