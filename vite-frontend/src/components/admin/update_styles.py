import os
import glob

replacements = {
    "bg-slate-950": "bg-surface-container-lowest",
    "bg-slate-900": "bg-deep-charcoal",
    "bg-slate-800": "bg-surface-container-high",
    "bg-white/5": "bg-surface-container",
    "bg-white/10": "bg-surface-container-high",
    "border-white/5": "border-glass-border",
    "border-white/10": "border-glass-border",
    "border-white/20": "border-glass-border/80",
    "text-slate-500": "text-on-surface-variant",
    "text-slate-400": "text-on-surface-variant",
    "text-slate-300": "text-on-surface-variant",
    "text-slate-200": "text-on-surface",
    "text-white": "text-on-surface",
    "text-indigo-400": "text-warm-gold",
    "text-indigo-500": "text-warm-gold/80",
    "bg-indigo-600": "bg-warm-gold",
    "bg-indigo-500": "bg-primary",
    "hover:bg-indigo-500": "hover:bg-primary",
    "hover:bg-indigo-600": "hover:bg-primary",
    "bg-indigo-500/10": "bg-warm-gold/10",
    "bg-indigo-500/20": "bg-warm-gold/20",
    "border-indigo-500/20": "border-warm-gold/20",
    "ring-indigo-500": "ring-warm-gold",
    "shadow-indigo-500/20": "shadow-warm-gold/20",
    "shadow-indigo-500/10": "shadow-warm-gold/10",
}

files = glob.glob("/home/span/dev/spanstay/vite-frontend/src/components/admin/*.jsx") + \
        glob.glob("/home/span/dev/spanstay/vite-frontend/src/components/users/*.jsx") + \
        glob.glob("/home/span/dev/spanstay/vite-frontend/src/components/ui/**/*.jsx", recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")

print("Done.")
