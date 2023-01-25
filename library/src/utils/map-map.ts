export function mapMap<TKI, TVI, TKO, TVO>(
    map: Map<TKI, TVI>,
    f: (k: TKI, v: TVI, m: Map<TKI, TVI>) => [TKO, TVO]
): Map<TKO, TVO> {
    return new Map([...map].map((p) => f(p[0], p[1], map)));
}
