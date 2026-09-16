import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[#a9583e] active:bg-[#8e432d] shadow-2xs",
        outline:
          "border-border bg-background text-foreground hover:bg-muted/60 hover:text-foreground active:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#e8e0d2] active:bg-[#e0d6c4] border border-border/50",
        secondaryDark:
          "bg-[#252320] text-[#faf9f5] hover:bg-[#2d2a27] border border-[#363430]",
        ghost:
          "hover:bg-muted/60 hover:text-foreground active:bg-muted",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-5 text-sm rounded-md",
        xs: "h-6 gap-1 rounded-sm px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs",
        lg: "h-11 gap-2 rounded-md px-6 text-sm font-medium",
        icon: "size-10 rounded-md",
        "icon-sm": "size-8 rounded-md",
        "icon-xs": "size-6 rounded-sm",
        "icon-circular": "size-9 rounded-full border border-border bg-background text-foreground hover:bg-muted/60",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
