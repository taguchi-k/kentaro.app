type AppendUnderscore<P extends string> = `__${P}`;
type Map<T extends string | number | symbol> = { [P in T]: P };
type Underscored<T extends string> = Map<AppendUnderscore<T>>;

/**
 * @see https://michalzalecki.com/nominal-typing-in-typescript/#approach-4-intersection-types-and-brands
 *
 * もとの実装は __bland にしているが、そうすると Nominal<Nominal<T>> が never になってしまい、期待通りの挙動とならない。
 * それを防ぐために Underscored<T> を導入している。
 */
export type Nominal<K, T extends string> = K & Underscored<T>;
