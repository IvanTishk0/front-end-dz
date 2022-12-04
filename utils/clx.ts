export function clx(...args: any[]) {
    return args.filter(Boolean).join(" ");
}

// clx(class1, class2) => class1 + " " + class2