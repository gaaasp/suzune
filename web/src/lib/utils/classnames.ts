export type Classname = string | Classname[] | { [key: string]: boolean };

export function cn(...classnames: Classname[]): string {
    return classnames
        .map(classname => typeof classname === "string" ? classname : Array.isArray(classname) ? cn(...classname) : Object.entries(classname).filter(([_key, value]) => value).map(([key, _value]) => key).join(""))
        .filter(classname => classname)
        .join(" ")
}
